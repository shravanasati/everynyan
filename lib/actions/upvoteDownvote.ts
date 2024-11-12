"use server"

import { downvotePost, upvotePost } from "@/lib/firebase/posts"
import { getAuthUser } from "@/lib/user"
import { downvoteComment, upvoteComment } from "@/lib/firebase/comments"

async function postVoteChangeAction(postID: string, voteType: "up" | "down", undo: boolean) {
  const user = await getAuthUser()
  if (!user) {
    return { error: "You must be logged in to vote on a post" }
  }

  const res = voteType === "up" ? await upvotePost(postID, undo) : await downvotePost(postID, undo)
  if (!res) {
    return { error: "Failed to vote on post" }
  }

  return { success: true }
}

export async function upvotePostAction(postID: string, undo: boolean) {
  return await postVoteChangeAction(postID, "up", undo)
}

export async function downvotePostAction(postID: string, undo: boolean) {
  return await postVoteChangeAction(postID, "down", undo)
}

async function commentVoteChangeAction(postID: string, commentID: string, voteType: "up" | "down", undo: boolean) {
  const user = await getAuthUser()
  if (!user) {
    return { error: "You must be logged in to vote on a comment" }
  }

  const res = voteType === "up" ? await upvoteComment(postID, commentID, undo) : await downvoteComment(postID, commentID, undo)
  if (!res) {
    return { error: "Failed to vote on comment" }
  }

  return { success: true }
}

export async function upvoteCommentAction(postID: string, commentID: string, undo: boolean) {
  return await commentVoteChangeAction(postID, commentID, "up", undo)
}

export async function downvoteCommentAction(postID: string, commentID: string, undo: boolean) {
  return await commentVoteChangeAction(postID, commentID, "down", undo)
}
