'use server'

import { z } from "zod"
import { uniEmailRegex, nextLocalStorage } from "../utils"

const signInSchema = z.object({
	email: z.string().regex(uniEmailRegex, "Invalid email address"),
	tnc: z.boolean().refine(val => val === true, {
		message: "You must accept the terms and conditions"
	})
})

export async function signin(values: z.infer<typeof signInSchema>) {
	const result = signInSchema.safeParse(values)

	if (!result.success) {
		return { success: false, errors: result.error.flatten().fieldErrors }
	}

	

	return { success: true }
}