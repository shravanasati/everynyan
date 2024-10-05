'use server'
import { boardList } from "../boards"
import { z } from "zod"
import { isLoggedIn } from "@/lib/user"
import { savePost } from "@/lib/firebase/firestore"
import type { Post } from "@/lib/post"

const createPostSchema = z.strictObject({
  board: z.string().refine(val => boardList.includes(val), {
    message: "Invalid board"
  }),
  title: z.string().min(1, "Title cannot be empty").max(100, "Title is too long. It must be within 100 characters"),
  content: z.string().min(1, "Post cannot be empty").max(4000, "Post is too long. It must be within 4000 characters"),
})

export async function createPost(values: z.infer<typeof createPostSchema>) {
  if (!await isLoggedIn()) {
    return { success: false, errors: { server: "You must be logged in to create a post" } }
  }

  const result = createPostSchema.safeParse(values)
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  console.log(`Creating post on board: ${values.board}`)
  try {
    await savePost(result.data as Post)
  } catch (error) {
    console.error(error)
    return { success: false, errors: { server: "An error occurred. Please try again later." } }
  }

  return { success: true }
}