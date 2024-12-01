import { getParentComments } from "./firebase/comments";
import { saveNotifications } from "./firebase/notifications";
import { getPostByID } from "./firebase/posts";
import { Comment as CommentType } from "./models";
import { getPostSlug } from "./utils";

type NotificationRequest = {
  user: string,
  title: string,
  description: string,
  link: string,
}

async function sendNotificationRequest(notifs: NotificationRequest[]) {
  const payload = JSON.stringify(notifs)

  const url = `${process.env.NOTIFICATIONS_PUSH_ADDRESS}/send`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  })
  if (response.status !== 200) {
    console.error("Error sending notification request", await response.text())
  }

}

function trimString(str: string, length: number) {
  return str.length > length ? str.substring(0, length) + '...' : str
}

async function getNotifications(postID: string, newComment: CommentType): Promise<NotificationRequest[]> {
  if (!newComment.author) {
    return []
  }

  const post = await getPostByID(postID)
  if (!post) {
    return []
  }

  const notifiableUsers: Set<string> = new Set()
  const notifications: NotificationRequest[] = []
  if (post.author && post.author !== newComment.author) {
    notifiableUsers.add(post.author)
    notifications.push({
      user: post.author,
      title: `New comment on your post '${trimString(post.title, 20)}'`,
      description: trimString(newComment.body, 40),
      link: `/post/${getPostSlug(post.id, post.title)}#${newComment.id}`,
    })
  }

  if (newComment.level > 0) {
    // alert all parent comment authors
    const parentCommentAuthors = await getParentComments(postID, newComment.parent_id)
    parentCommentAuthors.forEach((parentComment) => {
      if (parentComment.author === newComment.author) return;
      if (notifiableUsers.has(parentComment.author!)) return;

      notifiableUsers.add(parentComment.author!)
      const title = `New reply on your comment '${trimString(parentComment.body, 20)}'`
      const description = trimString(newComment.body, 40)

      notifications.push({
        user: parentComment.author!, // we know it's not null because we checked it in the getParentComments function
        title: title,
        description: description,
        link: `/post/${getPostSlug(post.id, post.title)}#${newComment.id}`,
      })
    })
  }

  if (!notifiableUsers) {
    return []
  }

  return notifications
}

export async function createUserNotification(postID: string, newComment: CommentType) {
  const notifications = await getNotifications(postID, newComment)
  if (notifications.length === 0) {
    return
  }
  const dbNotifications: (NotificationRequest & { status: "read" | "unread" })[] = notifications.map((notification) => ({
    user: notification.user,
    title: notification.title,
    description: notification.description,
    link: notification.link,
    status: "unread",
  }))

  await Promise.all([sendNotificationRequest(notifications), saveNotifications(dbNotifications)])
}