import { boardList } from "@/lib/boards"
import { getPostsByBoard, getPostsFeed, PaginatedResult } from "@/lib/firebase/posts"
import { Post } from "@/lib/models"
import { getAuthUser } from "@/lib/user"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const revalidate = 60
const validBoards = boardList.map(e => e.href) as [string, ...string[]]

const bodySchema = z.strictObject({
  board: z.enum(validBoards).nullable(),
  orderByField: z.enum(["upvotes", "comment_count", "downvotes", "timestamp"]),
  lastDocID: z.string().nullable(),
  limitTo: z.number().min(1).max(10),
})

// todo refresh cookies

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const result = bodySchema.safeParse(data)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid request body: " + result.error.flatten().fieldErrors }, { status: 400 })
    }

    const { board, orderByField, lastDocID, limitTo } = result.data
    let posts: PaginatedResult<Post> 
    if (board) {
      posts = await getPostsByBoard(board, orderByField, lastDocID, limitTo)
    } else {
      posts = await getPostsFeed(orderByField, lastDocID, limitTo)
    }
    return NextResponse.json(posts)
  }

  catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "An internal server occured, try again later." }, { status: 500 })
  }
}
