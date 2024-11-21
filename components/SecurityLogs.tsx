'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type FirestoreTimestamp = {
  seconds: number
  nanoseconds: number
}

export type RawSecurityLog = {
  type_: string
  timestamp: FirestoreTimestamp
  detail: string
}


export type SecurityLogType = {
  type_: string
  timestamp: string
  detail: string
}

export function SecurityLogs({ logs = [] }: { logs?: SecurityLogType[] }) {
  const [filterType, setFilterType] = useState<string>('all')

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
          <SelectTrigger className="w-fit">
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
                <TableRow key={log.timestamp}>
                  <TableCell className="font-mono">{log.timestamp}</TableCell>
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