"use server"

import { cookies } from "next/headers"
import { decrypt } from "./crypt"
import { getToken } from "./firebase/firestore"

export async function isLoggedIn() {
	const session = cookies().get("session")
	if (!session) {
		return false
	}

	try {
		const tokenObj = JSON.parse(decrypt(session.value))
		if (!tokenObj.token) {
			return false
		}
		const dbToken = await getToken(tokenObj.token)
		if (!dbToken) {
			return false
		}
		return true
	}
	catch (error) {
		return false
	}
}