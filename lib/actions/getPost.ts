"use server"

import { getPostByID } from "@/lib/firebase/posts"
import { getAuthUser } from "../user"

export default async function getPost(postID: string) {
  const user = await getAuthUser()
  if (!user) {
    return { status: 401, error: "Unauthorized" }
  }

  const isAdmin = user.role == "admin"
  const post = await getPostByID(postID)
  if (!post) {
    return { status: 404, error: "Post not found" }
  }
  if (post.moderation_status == "rejected" && !isAdmin) {
    return { status: 403, error: "Forbidden" }
  }

  // ensure author hashes are not leaked to the frontend
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { author, timestamp, ...rest } = post

  return { status: 200, data: rest }
}
