"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Share from "@/components/Posts/Share";
import ReportContent from "@/components/Posts/ReportContent";
import UpDwVote from "@/components/Posts/VoteCounter";
import "@/app/scrollbar.css";
import ReactMarkdown from "react-markdown";
import { getPostSlug } from "@/lib/utils";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import rehypeRaw from "rehype-raw";

interface PostProps {
  id: string;
  title: string;
  content: string;
  boardName: string;
  upVotes?: number;
  downVotes?: number;
}

export default function PerPost({
  id,
  title,
  content,
  boardName,
  upVotes,
  downVotes,
}: PostProps) {
  const postSlug = getPostSlug(id, title);
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="space-y-1 p-3 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
          <CardTitle className="text-xl sm:text-2xl font-bold break-words">
            {title}
          </CardTitle>

          <Link href={`/board/${boardName}`}>
            <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              {boardName}
            </span>
          </Link>

        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-3 sm:p-6">
        <div className="rounded-lg bg-primary/5 p-3 sm:p-4 mb-3 sm:mb-4 flex-grow overflow-y-auto">
          <ReactMarkdown
            className="line-clamp-3 sm:line-clamp-4"
            components={{
              a: (props) => <a className="text-primary" {...props} />,
            }}
            rehypePlugins={[rehypeRaw]}
          >
            {DOMPurify.sanitize(content)}
          </ReactMarkdown>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2 mt-3 sm:mt-0">
          <UpDwVote upVotes={upVotes} downVotes={downVotes} />
          <div className="flex gap-2 justify-between sm:justify-end">
            <Share postLink={postSlug} />
            <ReportContent />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
