import { Timestamp } from "firebase-admin/firestore";
import { db } from "./app";

export type Report = {
  postID: string,
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
  const reportID = `${report.postID || report.commentID || ""}_${Timestamp.now().seconds}`;
  const reportRef = db.collection("reports").doc(reportID)

  await reportRef.set({
    ...report,
    createdAt: Timestamp.now(),
    resolvedAt: null,
    reportID: reportID
  });
}

export async function getUnresolvedReports() {
  const reportsRef = db.collection("reports").where("status", "==", "pending")
  const reportsSnap = await reportsRef.get();
  const reports = reportsSnap.docs.map(doc => doc.data());
  return reports as DBReport[];
}

export async function resolveReport(reportID: string) {
  const reportRef = db.collection("reports").doc(reportID);
  const postID = ((await reportRef.get()).data() as DBReport).postID;

  const allPostReports = await db.collection("reports").where("postID", "==", postID).get();

  const batch = db.batch();
  allPostReports.docs.forEach(doc => batch.update(doc.ref, { status: "resolved", resolvedAt: Timestamp.now() }));

  await batch.commit();
}