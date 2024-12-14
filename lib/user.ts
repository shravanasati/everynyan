"use server"

import { cookies } from "next/headers"
import { decrypt } from "./crypt"
import { deleteToken, getToken, updateTokenLifetime } from "./firebase/firestore"
import { cache } from "react"
import { Timestamp } from "firebase-admin/firestore"
import { TOKEN_EXPIRY_DURATION } from "./utils"

type Role = "admin" | "user"

export type User = {
	token: string | undefined;
	role: Role | undefined;
}

export const getAuthUser = cache(async () => {
	const session = cookies().get("session")
	if (!session) {
		return null
	}

	try {
		const tokenObj: User = JSON.parse(decrypt(session.value))
		if (!tokenObj.token) {
			return null
		}
		if (!tokenObj.role) {
			return null
		}
		const dbToken = await getToken(tokenObj.token)
		if (!dbToken) {
			return null
		}

		if (dbToken.token !== tokenObj.token || dbToken.role !== tokenObj.role) {
			deleteToken(tokenObj.token).catch(console.error)
			return null
		}

		const now = Timestamp.now()
		const expiryTime = dbToken.timestamp.seconds + TOKEN_EXPIRY_DURATION
		if (now.seconds > expiryTime) {
			deleteToken(tokenObj.token).catch(console.error)
			return null
		}

		// if everything is fine, refresh the token lifetime
		refreshUser()

		return tokenObj
	}
	catch (error) {
		console.error("error in getAuthUser", error)
		return null
	}
})

function refreshUser() {
	try {
		const session = cookies().get("session")
		if (!session) {
			return null
		}

		const user = JSON.parse(decrypt(session.value))
		if (!user.token) {
			return null
		}

		const now = Timestamp.now()
		updateTokenLifetime(user.token, now)

		cookies().set("session", session.value, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: TOKEN_EXPIRY_DURATION, // 2 weeks
			domain: process.env.NODE_ENV === "production" ? "everynyan.tech" : undefined,
		})

	} catch (error) {
		console.error("error in refreshUser", error)
	}

}