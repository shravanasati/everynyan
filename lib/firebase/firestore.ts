import { Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/app";

export type OTPEntry = {
  otp: string;
  timestamp: Timestamp;
};

export async function saveOTP(email: string, otp: string) {
  const otpRef = db.collection("otp").doc(email)
  await otpRef.set({
    otp,
    timestamp: Timestamp.now(),
  });

}

export async function getOTP(email: string) {
  const otpRef = db.collection("otp").doc(email)
  const otpSnap = await otpRef.get()

  if (otpSnap.exists) {
    return otpSnap.data() as OTPEntry;
  }

  return null;
}

export async function deleteOTP(email: string) {
  const otpRef = db.collection("otp").doc(email)
  await otpRef.delete();
}

export async function storeToken(token: string, isAdmin: boolean) {
  const tokenRef = db.collection("tokens").doc(token);
  await tokenRef.set({
    token,
    role: isAdmin ? "admin" : "user",
    timestamp: Timestamp.now(),
  });
}

export async function deleteToken(token: string) {
  const tokenRef = db.collection("tokens").doc(token);
  await tokenRef.delete();
}

export async function getToken(token: string) {
  const tokenRef = db.collection("tokens").doc(token);
  const tokenSnap = await tokenRef.get();

  if (tokenSnap.exists) {
    return tokenSnap.data();
  }

  return null;
}
