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
	DocumentData,
} from "firebase/firestore";

import { db } from "@/lib/firebase/app";

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
