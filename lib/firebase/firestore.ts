import {
	collection,
	onSnapshot,
	query,
	getDocs,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	orderBy,
	Timestamp,
	runTransaction,
	where,
	addDoc,
} from "firebase/firestore";

import { db } from "@/lib/firebase/app";

export async function saveOTP(email: string, otp: string) {
	const otpRef = doc(db, "otp", email);

	await setDoc(otpRef, {
		otp,
		timestamp: Timestamp.now(),
	});
}