"use server"

import { db } from "../firebase/app";

export async function saveFcmToken(token: string, fcm_token: string) {
    const fcmTokenRef = db.collection("token").doc(token);
    // update the document with fcm_token
    await fcmTokenRef.set({ fcm_token }, { merge: true });
}
