'use server'

import { z } from "zod"
import { generateOTP, uniEmailRegex } from "@/lib/utils"
import { saveOTP } from "@/lib/firebase/firestore"
import { sendOTPEmail } from "@/lib/email"

const sendOTPSchema = z.object({
	email: z.string().regex(uniEmailRegex, "Invalid email address"),
	tnc: z.boolean().refine(val => val === true, {
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

    const otp = generateOTP().toString()
    console.log(`Generated OTP: ${otp} for email: ${values.email}`)
    console.log(`Saving OTP to firestore and sending email...`)
    await saveOTP(values.email, otp)
    console.log(`OTP saved to firestore`)
    await sendOTPEmail(values.email, otp)
    console.log(`OTP sent to email`)
  
    return { success: true }

  } catch (error) {
    console.error(error)
    return { success: false, errors: { server: "An error occurred. Please try again." } }
  }
}