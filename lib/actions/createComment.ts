'use server'

import { z } from "zod"
import { getAuthUser } from "@/lib/user"
import { addComment } from "@/lib/firebase/comments"
import { convertTimestamp } from "../utils"
import { Comment } from "../models"

const createCommentSchema = z.strictObject({
  postID: z.string().min(6, "Invalid post ID").max(6, "Invalid post ID"),
  level: z.number().int().min(0, "Invalid comment level").max(10, "Jyada reply ho raha hai"),
  body: z.string().min(1, "Comment cannot be empty").max(500, "Comment is too long. It must be within 500 characters"),
  parentID: z.string().nullable(),
})

export async function createComment(values: z.infer<typeof createCommentSchema>) {
  if (!await getAuthUser()) {
    return {
      success: false, errors: {
        server: "You must be logged in to post a comment"
      }
    }
  }

  const result = createCommentSchema.safeParse(values)

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors
    }
  }

  const data = result.data

  try {
    const newComment = await addComment(data.postID, data.body, data.level, data.parentID)
    if (!newComment) {
      return { success: false, errors: { server: "An error occurred. Please try again later." } }
    }
    const returnedComment = newComment as unknown as Comment & { timestamp: string }
    returnedComment.timestamp = convertTimestamp(newComment.timestamp)
    return { success: true, data: returnedComment }
  } catch (e) {
    console.error(e)
    return { success: false, errors: { server: "An error occurred. Please try again later." } }
  }
}