import { Timestamp } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/app";

interface SecurityLog {
  type_: "admin_login" | "moderation_action"
  detail: string
}

export async function addSecurityLog(log: SecurityLog) {
  const logID = `${log.type_}_${Date.now()}`;
  const logRef = db.collection("security_logs").doc(logID);

  await logRef.set({
    ...log,
    timestamp: Timestamp.now(),
  });
}

export async function getSecurityLogs() {
  const logsRef = db.collection("security_logs");
  const logsSnap = await logsRef.get();

  const logs = logsSnap.docs.map(doc => doc.data());
  return logs;
}