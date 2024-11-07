import { format, toZonedTime } from 'date-fns-tz'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export type SecurityLog = {
  type_: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  detail: string
}

export function SecurityLogs({ logs = [] }: { logs?: SecurityLog[] }) {
  const formatDate = (timestamp: SecurityLog['timestamp']) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
    const istDate = toZonedTime(date, 'Asia/Kolkata')
    return format(istDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Asia/Kolkata' })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Security Logs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Timestamp (IST)</TableHead>
                <TableHead className="w-[150px]">Type</TableHead>
                <TableHead>Detail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="font-mono">{formatDate(log.timestamp)}</TableCell>
                  <TableCell>{log.type_}</TableCell>
                  <TableCell>{log.detail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}