'use server'

import { z } from "zod"
import { getOTP, storeToken } from "@/lib/firebase/firestore"
import {addSecurityLog} from "@/lib/firebase/security_log"
// import {deleteOTP} from "@/lib/firebase/firestore"
import { uniEmailRegex, TOKEN_EXPIRY_DURATION } from "@/lib/utils"
import { encrypt, hash, newToken } from "@/lib/crypt"
import { cookies } from "next/headers"

if (!process.env.MODERATOR_EMAILS) {
  throw new Error("MODERATOR_EMAILS env var is not defined")
}

const moderatorEmails = process.env.MODERATOR_EMAILS.split(",")

const OTPSchema = z.strictObject({
	otp: z.string().length(6).regex(/^\d+$/, "OTP must contain only numbers"),
	email: z.string().toLowerCase().regex(uniEmailRegex, "Invalid email"),
})

export async function signin(values: z.infer<typeof OTPSchema>) {
	const result = OTPSchema.safeParse(values)

	if (!result.success) {
		return { success: false, error: result.error.errors[0].message }
	}

  const otpEntry = await getOTP(result.data.email)
  if (!otpEntry) {
    return { success: false, error: "OTP not found" }
  }
  const expirationTime = otpEntry.timestamp.toMillis() + 10 * 60 * 1000 // 10 minutes
  if (expirationTime < Date.now()) {
    return { success: false, error: "OTP expired. Please request a new one." }
  }
  if (otpEntry.otp !== hash(result.data.otp)) {
    return { success: false, error: "Invalid OTP" }
  }

  const userID = hash(result.data.email)
  const token = newToken()
  const isAdmin = moderatorEmails.includes(result.data.email)
  const tokenObj = {
    "userID": userID,
    "token": token,
    "role": isAdmin ? "admin" : "user",
  }

  // store token in firebase
  await storeToken(userID, token, isAdmin)

  if (isAdmin) {
    await addSecurityLog({
      type_: "admin_login",
      detail: `Admin ${result.data.email.split(".")[0]} logged in`,
    })
  }

  // store token in cookie
  cookies().set("session", encrypt(JSON.stringify(tokenObj)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: TOKEN_EXPIRY_DURATION, // 2 weeks
    domain: process.env.NODE_ENV === "production" ? "everynyan.tech" : undefined,
  })

  // await deleteOTP(result.data.email)
	return { success: true }
}
