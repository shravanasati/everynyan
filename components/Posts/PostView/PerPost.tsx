"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Share from "@/components/Posts/Share";
import ReportContent from "@/components/Posts/ReportContent";
import VoteCounter from "@/components/Posts/VoteCounter";
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
  upVotes: number;
  downVotes: number;
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
    <Card className="w-full flex flex-col border-0 bg-primary/5 rounded-md">
      <CardHeader className="relative space-y-1 py-3 px-1 sm:p-6">
        <div className="flex flex-col gap-2">
          <CardTitle className="text-xl sm:text-2xl font-bold break-words">
            {title}
          </CardTitle>
          <Link href={`/board/${boardName}`}>
            <span className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
              {boardName}
            </span>
          </Link>
        </div>
        <ReportContent postID={id} className="absolute top-6 right-5" />
      </CardHeader>
      <CardContent className="">
        <div className="mb-3 sm:mb-4 max-h-52 overflow-y-scroll py-4 px-2 everynyan-scroll rounded-md bg-primary/[0.025]">
          <ReactMarkdown
            components={{
              a: (props) => <a className="text-primary" {...props} />,
            }}
            rehypePlugins={[rehypeRaw]}
          >
            {DOMPurify.sanitize(content)}
          </ReactMarkdown>
        </div>
        <div className="flex flex-row gap-2 items-center">
          <VoteCounter upVotes={upVotes} downVotes={downVotes} postID={id} />
          <Share postLink={postSlug} />
        </div>
      </CardContent>
    </Card>
  );
}
