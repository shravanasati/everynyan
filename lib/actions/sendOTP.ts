'use server'

import { z } from "zod"
import { generateOTP, uniEmailRegex } from "@/lib/utils"
import { getOTP, saveOTP } from "@/lib/firebase/firestore"
import { sendOTPEmail } from "@/lib/email"
import isRateLimited from "@/lib/ratelimit"

const sendOTPSchema = z.strictObject({
	email: z.string().toLowerCase().regex(uniEmailRegex, "Invalid email address"),
	tos: z.boolean().refine(val => val === true, {
		message: "You must accept the terms and conditions"
	})
})

// this action is used to generate an OTP, save it to firestore, and send it to the user's email
export async function sendOTP(values: z.infer<typeof sendOTPSchema>) {
	const result = sendOTPSchema.safeParse(values)

	if (!result.success) {
		return { success: false, errors: result.error.flatten().fieldErrors }
	}

  try {
    if (await isRateLimited(1, 60000)) {
      return { success: false, errors: { server: "Rate limit exceeded. Please try again later." } }
    }

    const otpExists = await getOTP(result.data.email)
    if (otpExists) {
      // rate limit OTPs to 1 per minute
      const expirationTime = otpExists.timestamp.toMillis() + 60000
      if (expirationTime > Date.now()) {
        return { success: false, errors: { email: "An OTP has already been sent to this email. Please check your email." }, retryAfter: new Date(expirationTime)}
      }
    }

    const otp = generateOTP().toString()
    await saveOTP(result.data.email, otp)
    await sendOTPEmail(result.data.email, otp)
  
    return { success: true }

  } catch (error) {
    console.error(error)
    return { success: false, errors: { server: "An error occurred. Please try again." } }
  }
}