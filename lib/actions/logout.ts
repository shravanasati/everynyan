"use server"

import { cookies } from "next/headers"
import { deleteToken } from "@/lib/firebase/firestore"
import { decrypt } from "@/lib/crypt"
import { redirect } from "next/navigation"

export async function logout() {
  try {
	const session = cookies().get("session")
	if (session) {
	  const token = JSON.parse(decrypt(session.value))
	  if (token.token) {
		await deleteToken(token.token)
	  }
	}
  }
  catch (err) {
	console.error("error in logout", err)
  } finally {
	cookies().set("session", "", { maxAge: 0 })
	redirect("/")
  }
}