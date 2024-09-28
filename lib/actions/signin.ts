'use server'

import { z } from "zod"
import { deleteOTP, getOTP, storeToken } from "@/lib/firebase/firestore"
import { uniEmailRegex } from "@/lib/utils"
import { encrypt, newToken } from "@/lib//crypt"
import { cookies } from "next/headers"

const OTPSchema = z.object({
	otp: z.string().length(6).regex(/^\d+$/, "OTP must contain only numbers"),
	email: z.string().regex(uniEmailRegex, "Invalid email"),
})

export async function signin(values: z.infer<typeof OTPSchema>) {
	const result = OTPSchema.safeParse(values)

	if (!result.success) {
		return { success: false, error: result.error.errors[0].message }
	}

  const otpEntry = await getOTP(values.email)
  if (!otpEntry) {
    return { success: false, error: "OTP not found" }
  }
  const expirationTime = otpEntry.timestamp.toMillis() + 10 * 60 * 1000 // 10 minutes
  if (expirationTime < Date.now()) {
    return { success: false, error: "OTP expired. Please request a new one." }
  }
  if (otpEntry.otp !== values.otp) {
    return { success: false, error: "Invalid OTP" }
  }
  
  console.log(`OTP verified for email: ${values.email}`)
  const token = newToken()
  const tokenObj = {
    "token": token,
  }

  // store token in firebase
  await storeToken(token)

  // store token in cookie
  cookies().set("session", encrypt(JSON.stringify(tokenObj)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7 * 2, // 2 weeks
  })

  await deleteOTP(values.email)
	return { success: true }
}
