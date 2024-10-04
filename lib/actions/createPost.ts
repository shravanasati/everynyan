'use server'
import { boardList } from "../boards"
import { z } from "zod"
import { isLoggedIn } from "@/lib/user"

const createPostSchema = z.strictObject({
  board: z.string().refine(val => boardList.includes(val), {
    message: "Invalid board"
  }),
  markdown: z.string(),
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

  return { success: true, boards: boardList }
}