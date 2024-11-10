"use server"

import { downvotePost, upvotePost } from "@/lib/firebase/posts"
import { getAuthUser } from "@/lib/user"

async function voteChangeAction(board: string, postID: string, voteType: "up" | "down") {
  const user = await getAuthUser()
  if (!user) {
    return { error: "You must be logged in to vote on a post" }
  }

  const res = voteType === "up" ? await upvotePost(board, postID) : await downvotePost(board, postID)
  if (!res) {
    return { error: "Failed to vote on post" }
  }

  return { success: true }
}

export async function upvotePostAction(board: string, postID: string) {
  return await voteChangeAction(board, postID, "up")
}

export async function downvotePostAction(board: string, postID: string) {
  return await voteChangeAction(board, postID, "down")
}