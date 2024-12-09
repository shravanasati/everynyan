"use server"

import { z } from "zod"


const formSchema = z.strictObject({
  title: z.string().min(2, {
    message: 'Title must be at least 2 characters.',
  }).max(100, {
    message: 'Title must not exceed 100 characters.',
  }),
  body: z.string().min(10, {
    message: 'Body must be at least 10 characters.',
  }).max(500, {
    message: 'Body must not exceed 500 characters.',
  }),
  link: z.string().url({
    message: 'Please enter a valid URL.',
  }),
})


export async function broadcastNotification(values: z.infer<typeof formSchema>) {
  try {
    const result = formSchema.safeParse(values)
    if (!result.success) {
      return { success: false, error: result.error.errors[0].message }
    }

    const url = `${process.env.NEXT_PUBLIC_NOTIFICATIONS_PUSH_ADDRESS}/broadcast`
    const data= result.data
    const notificationObject = {
      title: data.title,
      description: data.body,
      link: data.link,
    }

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(notificationObject),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.NOTIFICATIONS_API_KEY,
      },
    })

    const text = await resp.text()

    if (resp.status !== 200) {
      return { success: false, error: "Notifications server returned non-200 status code: " + text }
    }

    return { success: true, error: '' }
  } catch (e) {
    return { success: false, error: (e as Error).message}
  }
}