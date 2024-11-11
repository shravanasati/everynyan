import { collection, doc, getDocs, query, setDoc, Timestamp, where } from "firebase/firestore";
import { db } from "./app";

export type Report = {
  postID?: string,
  commentID?: string,
  flag: string,
  status: "pending" | "resolved",
}

export type DBReport = Report & {
  reportID: string
  createdAt: Timestamp,
  resolvedAt: Timestamp | null,
}

export async function reportContent(report: Report) {
  if (!report.postID && !report.commentID) {
    throw new Error("either postID or commentID is required");
  }

  const reportID = `${report.postID || report.commentID || ""}_${Timestamp.now().seconds}`;
  const reportRef = doc(db, "reports", reportID);
  await setDoc(reportRef, {
    ...report,
    createdAt: Timestamp.now(),
    resolvedAt: null,
    reportID: reportID
  });
}

export async function getUnresolvedReports() {
  const reportsRef = collection(db, "reports");
  const reportsSnap = await getDocs(query(reportsRef, where("status", "==", "pending")));

  const reports = reportsSnap.docs.map(doc => doc.data());
  return reports as DBReport[];
}

export async function resolveReport(reportID: string) {
  const reportRef = doc(db, "reports", reportID);
  await setDoc(reportRef, { status: "resolved", resolvedAt: Timestamp.now() }, { merge: true });
}