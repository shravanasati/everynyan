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
import { Loader2, ExternalLink } from "lucide-react"



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
    <Link href={href} target="_blank">
      <div className="hover:underline flex items-center">
        {linkText} <ExternalLink size={16} className="ml-1" />
      </div >
    </Link>
  )
}

type LoadingState = {
  approve: boolean
  reject: boolean
}

export function AdminReports({ reports }: AdminReportsProps) {
  const [pendingReports, setPendingReports] = useState(reports.filter(r => r.status == "pending"))
  const { toast } = useToast()
  const initialLoadingStates: Record<string, LoadingState> = pendingReports.reduce(
    (acc, report) => {
      acc[report.reportID] = { approve: false, reject: false };
      return acc;
    },
    {} as Record<string, LoadingState>
  );
  const [loadingStates, setLoadingStates] = useState<Record<string, LoadingState>>(initialLoadingStates)

  const handleModeration = async (report: ReportPropType, action: "approve" | "reject") => {
    setLoadingStates(prev => ({
      ...prev,
      [report.reportID]: { ...prev[report.reportID], [action]: true }
    }))

    try {
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
    } catch (e) {
      console.error(e)
      toast({
        title: "Moderation failed",
        variant: "destructive",
        description: "An unexpected error occurred"
      })
    } finally {
      setLoadingStates(prev => ({
        ...prev,
        [report.reportID]: { ...prev[report.reportID], [action]: false }
      }))
    }
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
                        <Button size="sm" className="bg-green-500 text-black"
                          onClick={async () => {
                            await handleModeration(report, "approve")
                          }}
                          disabled={loadingStates[report.reportID]?.approve || loadingStates[report.reportID]?.reject}
                        >
                          {loadingStates[report.reportID]?.approve ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Approving
                            </>
                          ) : (
                            'Approve'
                          )}
                        </Button>

                        <Button size="sm" variant="destructive" className="text-black"
                          onClick={async () => {
                            await handleModeration(report, "reject")
                          }}
                          disabled={loadingStates[report.reportID]?.approve || loadingStates[report.reportID]?.reject}
                        >
                          {loadingStates[report.reportID]?.reject ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Rejecting
                            </>
                          ) : (
                            'Reject'
                          )}
                        </Button>
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