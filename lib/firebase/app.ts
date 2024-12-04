import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging"
import { firebaseConfig } from "./config";
import { getFirestore } from "firebase-admin/firestore";

export const firebaseApp =
  getApps().length === 0 ? initializeApp({
    credential: cert(firebaseConfig),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  }) : getApps()[0];
export const db = getFirestore(firebaseApp);
export const messaging = getMessaging(firebaseApp);

