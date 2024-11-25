import { boardList } from "@/lib/boards"
import { getPostsByBoard, getPostsFeed, PaginatedResult } from "@/lib/firebase/posts"
import { Post } from "@/lib/models"
import { getAuthUser } from "@/lib/user"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const revalidate = 60
const validBoards = boardList.map(e => e.href) as [string, ...string[]]

const querySchema = z.strictObject({
  board: z.enum(validBoards).optional().nullable(),
  orderByField: z.enum(["upvotes", "comment_count", "downvotes", "timestamp"]),
  lastDocID: z.string().optional().nullable(),
  limitTo: z.number().min(1).max(10),
})

// todo refresh cookies

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const dataEntries = Array.from(request.nextUrl.searchParams.entries()).map(([key, value]) => {
      if (key === "limitTo") {
        return [key, parseInt(value)];
      }
      return [key, value];
    });

    const data = Object.fromEntries(dataEntries);
    const result = querySchema.safeParse(data)

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
