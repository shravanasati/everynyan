import type { Comment as CommentType, DBComment } from "@/lib/models";
import { db } from "./app";
import { collection, doc, getDocs, increment, query, Timestamp, updateDoc, where, writeBatch } from "firebase/firestore";
import { generateCommentID } from "../utils";

export async function addComment(postID: string, commentBody: string, level: number, parentID: string | null) {
  try {
    const batch = writeBatch(db)
    const commentID = generateCommentID()
    const comment: CommentType = {
      id: commentID,
      body: commentBody,
      level: level,
      upvotes: 0,
      downvotes: 0,
      parent_id: parentID,
      moderation_status: "pending"
    }

    const postRef = doc(db, "posts", postID)
    const commentsRef = doc(collection(postRef, "comments"), commentID)

    const dbComment = {
      ...comment,
      timestamp: Timestamp.now()
    }
    batch.set(commentsRef, dbComment)

    batch.update(postRef, {
      comment_count: increment(1)
    })

    await batch.commit()
    return dbComment
  } catch (e) {
    console.error("error in adding comment", e)
  }

}

export async function getPostComments(postID: string) {
  const postRef = doc(db, "posts", postID)
  const commentsRef = collection(postRef, "comments")
  const commentsSnap = await getDocs(query(commentsRef, where("moderation_status", "!=", "rejected")))

  const comments: DBComment[] = []
  commentsSnap.forEach((comment) => {
    comments.push(comment.data() as DBComment)
  })

  return comments
}

async function voteComment(postID: string, commentID: string, undo: boolean, field: "upvotes" | "downvotes") {
  const commentRef = doc(db, "posts", postID, "comments", commentID)
  try {
    await updateDoc(commentRef, {
      [field]: increment(undo ? -1 : 1)
    })
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}

export async function upvoteComment(postID: string, commentID: string, undo: boolean) {
  return await voteComment(postID, commentID, undo, "upvotes")
}

export async function downvoteComment(postID: string, commentID: string, undo: boolean) {
  return await voteComment(postID, commentID, undo, "downvotes")
}

export async function updateCommentModerationStatus(postID: string, commentID: string, newStatus: "approved" | "rejected") {
  try {
    const docRef = doc(db, "posts", postID, "comments", commentID)
    await updateDoc(docRef, {
      "moderation_status": newStatus
    })
    return true
  } catch (e) {
    console.error("error in update comment moderation status", e)
    return false
  }
}
