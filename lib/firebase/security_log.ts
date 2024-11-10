import { collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/app";

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