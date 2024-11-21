import { Timestamp, FieldValue } from "firebase-admin/firestore"
import { db } from "@/lib/firebase/app";
import { Post } from "@/lib/models";
import { generatePostID } from "@/lib/utils";

export interface PaginatedResult<T> {
  items: T[];
  lastDocID: string | null;
  hasMore: boolean;
}

// get all posts from a board whose moderation status is not rejected
export async function getPostsByBoard(board: string, orderByField: string = "timestamp", lastDocID: string | null = null, limitTo: number = 10) {
  let postsRef = db.collection("posts").
    where("board", "==", board).
    where("moderation_status", "!=", "rejected").
    orderBy(orderByField, "desc").
    limit(limitTo + 1)

  if (lastDocID) {
    const lastDoc = await db.collection("posts").doc(lastDocID).get()
    postsRef = postsRef.startAfter(lastDoc)
  }

  const postsSnap = await postsRef.get()
  const docs = postsSnap.docs;
  const hasMore = docs.length > limitTo; // Check if more data exists
  const items = docs.slice(0, limitTo).map((doc) => doc.data() as Post); // Exclude the extra document

  const result: PaginatedResult<Post> = {
    items,
    lastDocID: hasMore ? (docs[docs.length - 2].data() as Post).id : null,
    hasMore,
  };

  return result
}

export async function getPostByID(postID: string) {
  const postRef = db.collection("posts").doc(postID)
  const postSnap = await postRef.get()
  if (!postSnap.exists) {
    return null;
  }

  return postSnap.data() as Post;
}

export async function savePost(title: string, body: string, board: string) {
  const postID = generatePostID();
  const postRef = db.collection("posts").doc(postID)

  await postRef.set({
    id: postID,
    title: title,
    board: board,
    upvotes: 0,
    downvotes: 0,
    comment_count: 0,
    body: body,
    moderation_status: "pending",
    timestamp: Timestamp.now(),
  })

  return postID;
}

export async function updatePostModerationStatus(postID: string, newStatus: "approved" | "rejected") {
  try {
    const docRef = db.collection("posts").doc(postID)
    await docRef.update({
      "moderation_status": newStatus
    })
    return true
  } catch (e) {
    console.error("error in update post moderation status", e)
    return false
  }
}

async function votePost(postID: string, undo: boolean, field: "upvotes" | "downvotes") {
  const postRef = db.collection("posts").doc(postID)
  try {
    await postRef.update({
      [field]: FieldValue.increment(undo ? -1 : 1)
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }

}

export async function upvotePost(postID: string, undo: boolean) {
  return await votePost(postID, undo, "upvotes")
}

export async function downvotePost(postID: string, undo: boolean) {
  return await votePost(postID, undo, "downvotes")
}