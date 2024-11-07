'use client'

import { useState, useMemo } from 'react'
import { format, toZonedTime } from 'date-fns-tz'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type SecurityLog = {
  type_: string
  timestamp: {
    seconds: number
    nanoseconds: number
  }
  detail: string
}

export function SecurityLogs({ logs = [] }: { logs?: SecurityLog[] }) {
  const [filterType, setFilterType] = useState<string>('all')

  const formatDate = (timestamp: SecurityLog['timestamp']) => {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000)
    const istDate = toZonedTime(date, 'Asia/Kolkata')
    return format(istDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Asia/Kolkata' })
  }

  const uniqueTypes = useMemo(() => {
    return ['all', ...Array.from(new Set(logs.map(log => log.type_)))]
  }, [logs])

  const filteredLogs = useMemo(() => {
    return filterType === 'all' ? logs : logs.filter(log => log.type_ === filterType)
  }, [logs, filterType])


  return (
    <Card className="w-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Security Logs</CardTitle>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {uniqueTypes.map((type) => (
              <SelectItem key={type} value={type}>
                {type === 'all' ? 'All Types' : type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              {filteredLogs.map((log) => (
                <TableRow key={log.timestamp.seconds}>
                  <TableCell className="font-mono">{formatDate(log.timestamp)}</TableCell>
                  <TableCell>{log.type_}</TableCell>
                  <TableCell>{log.detail}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>)
}