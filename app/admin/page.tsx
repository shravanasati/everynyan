import { SecurityLog, SecurityLogs } from "@/components/SecurityLogs"
import { getSecurityLogs } from "@/lib/firebase/firestore"

export default async function AdminPage() {
  const securityLogs = await getSecurityLogs()
  
  // sort logs by timestamp
  securityLogs.sort((a, b) => b.timestamp - a.timestamp)
  
   return (
    <div className="container mx-2 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
      <SecurityLogs logs={securityLogs as SecurityLog[]} />
    </div>
  )
}