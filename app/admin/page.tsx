import { AdminReports } from "@/components/AdminReports"
import { RawSecurityLog, SecurityLogType, SecurityLogs } from "@/components/SecurityLogs"
import { Unauthorized } from "@/components/Unauthorized"
import { getUnresolvedReports } from "@/lib/firebase/reports"
import { getSecurityLogs } from "@/lib/firebase/security_log"
import { getAuthUser } from "@/lib/user"
import { convertTimestamp, formatDate } from "@/lib/utils"

export const metadata = {
  title: "Admin Page",
  description: "Admin page for everynyan"
}

export default async function AdminPage() {
  const user = await getAuthUser()
  if (!user || user.role !== "admin") {
    return <Unauthorized />
  }

  const [securityLogs, unresolvedReports] = await Promise.all(
    [getSecurityLogs(), getUnresolvedReports()]
  )

  // sort logs by timestamp
  securityLogs.sort((a, b) => b.timestamp - a.timestamp)

  const rawLogs = securityLogs as RawSecurityLog[]

  const formattedLogs = rawLogs.map(log => ({
    type_: log.type_,
    timestamp: formatDate(convertTimestamp(log.timestamp)),
    detail: log.detail
  }))

  const formattedReports = unresolvedReports.map(report => ({
    ...report,
    createdAt: formatDate(convertTimestamp(report.createdAt)),
    resolvedAt: report.resolvedAt ? formatDate(convertTimestamp(report.resolvedAt)) : null
  }))

  return (
    <div className="container mx-2 py-8">
      <h1 className="text-3xl font-bold mb-6 ml-2">Admin Page</h1>
      <div className="m-2">
        <AdminReports reports={formattedReports} />
      </div>
      <div className="m-2">
        <SecurityLogs logs={formattedLogs as SecurityLogType[]} />
      </div>
    </div>
  )
}