'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { resolveReport, type DBReport } from '@/lib/firebase/reports'
import { parseISO } from "date-fns"
import { toZonedTime, format } from "date-fns-tz"
import { useState } from "react"
import { approveContent, rejectContent } from "@/lib/actions/report"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"


type ReportPropType = Omit<DBReport, 'createdAt' | 'resolvedAt'> & {
  createdAt: string
  resolvedAt: string | null
}

type AdminReportsProps = {
  reports: ReportPropType[]
}

const formatDate = (timestamp: string) => {
  const date = parseISO(timestamp)
  const istDate = toZonedTime(date, 'Asia/Kolkata')
  return format(istDate, 'yyyy-MM-dd HH:mm:ss zzz', { timeZone: 'Asia/Kolkata' })
}


function createHyperLink(report: ReportPropType) {
  const isPost = report.commentID ? false : true
  let href: string;
  let linkText: string;
  if (isPost) {
    href = `/post/${report.postID}`
    linkText = report.postID!
  } else {
    // todo see if this working
    href = `/post/${report.postID}#${report.commentID}`
    linkText = report.commentID!
  }
  return (
    <span className="underline">
      <Link href={href} target="_blank"> {linkText} </Link>
    </span>
  )
}

export function AdminReports({ reports }: AdminReportsProps) {
  const [pendingReports, setPendingReports] = useState(reports.filter(r => r.status == "pending"))
  const { toast } = useToast()
  const handleModeration = async (report: ReportPropType, action: "approve" | "reject") => {
    const isPost = report.commentID ? false : true
    const moderationFunc = action == "approve" ? approveContent : rejectContent
    const resp = await moderationFunc(
      (report.postID || report.commentID)!,
      isPost ? "post" : "comment"
    )
    if (!resp.success) {
      console.error(resp.message)
      toast({
        title: "Moderation unsuccessfull",
        variant: "destructive",
        description: `${resp.message}`
      })
      return
    }
    await resolveReport(report.reportID)
    setPendingReports(pendingReports.filter(item => item != report))
    toast({
      title: "Moderation successfull",
      description: `${isPost ? "Post" : "Comment"} <${isPost ? report.postID : report.commentID}> ${action}d`
    })
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Admin Reports</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Created At</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Flag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingReports.map((report, index) => (
                <TableRow key={index}>
                  <TableCell>{formatDate(report.createdAt)}</TableCell>
                  <TableCell>{report.commentID ? 'Comment' : 'Post'}</TableCell>
                  <TableCell>{createHyperLink(report)}</TableCell>
                  <TableCell>{report.flag}</TableCell>
                  <TableCell>{report.status}</TableCell>
                  <TableCell>
                    {(
                      <div className="flex space-x-2">
                        <Button size="sm" className="bg-green-500 text-black" onClick={async () => {
                          await handleModeration(report, "approve")
                        }}>Approve</Button>

                        <Button size="sm" variant="destructive" className="text-black" onClick={async () => {
                          await handleModeration(report, "reject")
                        }}>Reject</Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}