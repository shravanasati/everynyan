import {
	doc,
	getDoc,
	setDoc,
	deleteDoc,
	Timestamp,
} from "firebase/firestore";

import { db } from "@/lib/firebase/app";
import type { Post } from "@/lib/post";

export type OTPEntry = {
	otp: string;
	timestamp: Timestamp;
};

export async function saveOTP(email: string, otp: string) {
	const otpRef = doc(db, "otp", email);

	await setDoc(otpRef, {
		otp,
		timestamp: Timestamp.now(),
	});
}

export async function getOTP(email: string) {
	const otpRef = doc(db, "otp", email);
	const otpSnap = await getDoc(otpRef);

	if (otpSnap.exists()) {
		return otpSnap.data() as OTPEntry;
	}

	return null;
}

export async function deleteOTP(email: string) {
	const otpRef = doc(db, "otp", email);
	await deleteDoc(otpRef);
}

export async function storeToken(token: string, isAdmin: boolean) {
  const tokenRef = doc(db, "tokens", token);

  await setDoc(tokenRef, {
    token,
	role: isAdmin ? "admin" : "user",
    timestamp: Timestamp.now(),
  });
}

export async function deleteToken(token: string) {
  const tokenRef = doc(db, "tokens", token);
  await deleteDoc(tokenRef);
}

export async function getToken(token: string) {
  const tokenRef = doc(db, "tokens", token);
  const tokenSnap = await getDoc(tokenRef);

  if (tokenSnap.exists()) {
    return tokenSnap.data();
  }

  return null;
}

export async function savePost(post: Post) {
  const postRef = doc(db, "posts", post.board);

  await setDoc(postRef, {
	title: post.title,
	content: post.content,
	comments: [],
	moderation_status: "pending",
	timestamp: Timestamp.now(),
  });

  return postRef.id;
}