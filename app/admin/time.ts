import { FirestoreTimestamp } from "@/components/SecurityLogs";

export function convertTimestamp(timestamp: FirestoreTimestamp): string {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toISOString()
}