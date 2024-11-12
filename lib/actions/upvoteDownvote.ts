"use server"

import { downvotePost, upvotePost } from "@/lib/firebase/posts"
import { getAuthUser } from "@/lib/user"

async function voteChangeAction( postID: string, voteType: "up" | "down", undo: boolean) {
  const user = await getAuthUser()
  if (!user) {
    return { error: "You must be logged in to vote on a post" }
  }

  const res = voteType === "up" ? await upvotePost(postID, undo) : await downvotePost( postID, undo)
  if (!res) {
    return { error: "Failed to vote on post" }
  }

  return { success: true }
}

export async function upvotePostAction(postID: string, undo: boolean) {
  return await voteChangeAction(postID, "up", undo)
}

export async function downvotePostAction( postID: string, undo: boolean) {
  return await voteChangeAction( postID, "down", undo)
}