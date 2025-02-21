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

  const url = `${process.env.NEXT_PUBLIC_NOTIFICATIONS_PUSH_ADDRESS}/send`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Authorization": "Bearer " + process.env.NOTIFICATIONS_API_KEY,
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

function getCommentContent(comment: CommentType) {
  if (comment.body) {
    return comment.body
  } else {
    // if the comment is only a gif and doesnt have a body
    return comment.gif!.alt
  }
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
      const title = `New reply on your comment '${trimString(getCommentContent(parentComment), 20)}'`
      const description = trimString(getCommentContent(newComment), 40)

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
  try {
    const notifications = await getNotifications(postID, newComment)
    if (notifications.length === 0) {
      return
    }

    const dbNotifications: (NotificationRequest & { status: "read" | "unread" })[] =
      notifications.map((notification) => ({
        user: notification.user,
        title: notification.title,
        description: notification.description,
        link: notification.link,
        status: "unread",
      }))

    const results = await Promise.allSettled([
      sendNotificationRequest(notifications),
      saveNotifications(dbNotifications)
    ])

    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Operation ${index === 0 ? 'sendNotificationRequest' : 'saveNotifications'} failed:`, result.reason)
      }
    })
  } catch (error) {
    console.error('Error in createUserNotification:', error)
  }
}

export async function getConnectionCount() {
  try {
    const resp = await fetch(`${process.env.NEXT_PUBLIC_NOTIFICATIONS_PUSH_ADDRESS}/connections`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.NOTIFICATIONS_API_KEY}`
      }
    })

    const text = await resp.text()

    if (resp.status !== 200) {
      return 'failed to get connection count: ' + text
    }

    return text
  } catch (e) {
    return (e as Error).message
  }
}