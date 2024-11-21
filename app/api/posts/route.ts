import { getPostsByBoard } from "@/lib/firebase/posts"
import { getAuthUser } from "@/lib/user"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

export const revalidate = 60

const bodySchema = z.strictObject({
  board: z.string(),
  orderByField: z.string(),
  lastDocID: z.string().optional().nullable(),
  limitTo: z.number(),
})

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    console.log(data)
    const result = bodySchema.safeParse(data)
    if (!result.success) {
      return NextResponse.json({ error: "Invalid request body: " + result.error.flatten().fieldErrors }, { status: 400 })
    }
    const { board, orderByField, lastDocID, limitTo } = result.data
    const posts = await getPostsByBoard(board, orderByField, lastDocID, limitTo)
    return NextResponse.json(posts)
  }

  catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ error: "An internal server occured, try again later." }, { status: 500 })
  }
}
