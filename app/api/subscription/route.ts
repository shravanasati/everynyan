import { getAuthUser } from "@/lib/user"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser()
    if (!user) {
      return NextResponse.json({ success: false, error: "unauthenticated" }, { status: 401 })
    }

    const subscription = await req.json()
    const url = `${process.env.NEXT_PUBLIC_NOTIFICATIONS_PUSH_ADDRESS}/push-subscription?token=${user.token}`

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(subscription),
      headers: {
        "Authorization": "Bearer " + process.env.NOTIFICATIONS_API_KEY || ""
      }
    })

    const text = await resp.text()

    if (resp.status != 200) {
      return NextResponse.json({ success: false, error: text }, { status: resp.status })
    }

    return NextResponse.json({ success: true, error: "" }, { status: 200 })
  } catch (e) {
    return NextResponse.json({ success: false, error: (e as Error).message }, {status: 500})
  }
}