import { RawSecurityLog, SecurityLogType, SecurityLogs, FirestoreTimestamp } from "@/components/SecurityLogs"
import { Unauthorized } from "@/components/Unauthorized"
import { getSecurityLogs } from "@/lib/firebase/firestore"
import { getAuthUser } from "@/lib/user"

export function convertTimestamp(timestamp: FirestoreTimestamp): string {
  return new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000).toISOString()
}

export default async function AdminPage() {
  const user = await getAuthUser()
  if (!user || user.role !== "admin") {
    return <Unauthorized />
  }

  const securityLogs = await getSecurityLogs()

  // sort logs by timestamp
  securityLogs.sort((a, b) => b.timestamp - a.timestamp)

  const rawLogs = securityLogs as RawSecurityLog[]

  const formattedLogs = rawLogs.map(log => ({
    type_: log.type_,
    timestamp: convertTimestamp(log.timestamp),
    detail: log.detail
  }))

  return (
    <div className="container mx-2 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
      <SecurityLogs logs={formattedLogs as SecurityLogType[]} />
    </div>
  )
}