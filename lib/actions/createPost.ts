'use server'
import { boardList } from "../boards"
import { z } from "zod"
import { getAuthUser } from "@/lib/user"
import { savePost } from "@/lib/firebase/firestore"
import { getPostSlug } from "../utils"

const createPostSchema = z.strictObject({
  board: z.string().toLowerCase().refine(val => boardList.map(item => item.title.toLowerCase()).includes(val), {
    message: "Invalid board"
  }),
  title: z.string().min(1, "Title cannot be empty").max(100, "Title is too long. It must be within 100 characters"),
  body: z.string().min(1, "Post cannot be empty").max(4000, "Post is too long. It must be within 4000 characters"),
})

export async function createPost(values: z.infer<typeof createPostSchema>) {
  if (!await getAuthUser()) {
    return { success: false, errors: { server: "You must be logged in to create a post" } }
  }

  const result = createPostSchema.safeParse(values)
  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors }
  }

  console.log(`Creating post on board: ${values.board}`)

  try {
    const data = result.data
    const postID = await savePost(data.title, data.body, data.board)
    console.log(`Post created with ID: ${postID}`)
    return { success: true, slug: getPostSlug(postID, data.title) }

  } catch (error) {
    console.error(error)
    return { success: false, errors: { server: "An error occurred. Please try again later." } }
  }

}