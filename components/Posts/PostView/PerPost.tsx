"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Share from "@/components/Posts/Share";
import ReportContent from "@/components/Posts/ReportContent";
import UpDwVote from "@/components/Posts/UpDwVote";
import "@/app/scrollbar.css";

interface PostProps {
  title: string;
  content: string;
  boardName: string;
  createdAt: Date;
  upVotes?: number;
  downVotes?: number;
}

export default function PerPost({
  title,
  content,
  boardName,
  //   createdAt,
  upVotes,
  downVotes,
}: PostProps) {
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="space-y-1 p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <CardTitle className="text-xl sm:text-2xl font-bold break-words">
            {title}
          </CardTitle>
          <span className="text-xs sm:text-sm text-muted-foreground">
            {boardName}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-3 sm:p-6">
        <div className="rounded-lg bg-primary/5 p-3 sm:p-4 mb-3 sm:mb-4 flex-grow overflow-y-auto">
          <p className="text-sm everynyan-scroll">{content}</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2 mt-3 sm:mt-0">
          <UpDwVote upVotes={upVotes} downVotes={downVotes} />
          <div className="flex gap-2 justify-between sm:justify-end">
            <Share />
            <ReportContent />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
