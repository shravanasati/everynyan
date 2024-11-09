import {
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  Timestamp,
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "@/lib/firebase/app";
import { generatePostID } from "@/lib/utils";

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

interface SecurityLog {
  type_: "admin_login" | "moderation_action"
  detail: string
}

export async function addSecurityLog(log: SecurityLog) {
  const logRef = doc(db, "security_logs", log.type_ + "_" + Date.now());

  await setDoc(logRef, {
    ...log,
    timestamp: Timestamp.now(),
  });
}

export async function getSecurityLogs() {
  const logsRef = collection(db, "security_logs");
  const logsSnap = await getDocs(logsRef);

  const logs = logsSnap.docs.map(doc => doc.data());
  return logs;
}
