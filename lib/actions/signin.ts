'use server'

import { z } from "zod"
import { getOTP } from "@/lib/firebase/firestore"
import { uniEmailRegex } from "@/lib/utils"

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
  // todo generate a session token and store it in a cookie, firebase

	return { success: true }
}
