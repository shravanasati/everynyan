import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import VoteCounter from "@/components/Posts/VoteCounter";
import CommentCount from "@/components/Posts/CommentCount";
import Share from "@/components/Posts/Share";
import ReportContent from "@/components/Posts/ReportContent";
import Link from "next/link";
import { Post as PostType } from "@/lib/models";
import ReactMarkdown from "react-markdown";
import DOMPurify from "isomorphic-dompurify";
import rehypeRaw from "rehype-raw";
import { getPostSlug } from "@/lib/utils";

function trimBodyContent(content: string) {
  if (content.length > 50) {
    return content.substring(0, 50) + "...";
  }
  return content;
}

export default function Post({
  id,
  title,
  body,
  upvotes,
  downvotes,
  comment_count,
  board,
}: PostType) {
  const postSlug = getPostSlug(id, title);
  return (
    <Card className="relative w-full min-h-[12rem] my-2 rounded-md bg-primary/[0.015] border-none py-2">
      <Link href={`/post/${postSlug}`} className="absolute z-0 w-full h-full" />
      <CardHeader className="p-3 sm:p-4 relative w-full">
        <ReportContent postID={id} className="top-4 right-4" />
        <div className="flex flex-col w-max space-y-2 ">
          <Link
            href={`/post/${postSlug}`}
            className="text-base sm:text-lg md:text-xl font-bold  line-clamp-1 sm:line-clamp-none flex-grow hover:underlinei"
          >
            {title}
          </Link>
          <Link
            href={`/board/${board}`}
            className="text-xs w-max sm:text-sm text-muted-foreground hover:text-primary transition-colors duration-200 whitespace-nowrap"
          >
            {board}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-3 sm:p-4 text-sm">
        <ReactMarkdown
          className="line-clamp-3 sm:line-clamp-4"
          components={{
            a: (props) => (
              <a className="text-primary hover:underline" {...props} />
            ),
          }}
          rehypePlugins={[rehypeRaw]}
        >
          {DOMPurify.sanitize(trimBodyContent(body))}
        </ReactMarkdown>
      </CardContent>
      <CardFooter className="p-3 sm:p-4 flex flex-wrap items-center justify-start gap-2 sm:gap-3">
        <div className="w-full h-max flex flex-row items-center justify-between gap-2 sm:gap-3">
          <div className="flex-1 flex items-center justify-start gap-4 relative z-10">
            <VoteCounter upVotes={upvotes} downVotes={downvotes} postID={id} />
            <CommentCount noOfComments={comment_count} postSlug={postSlug} />
          </div>
          <div className="w-max h-max relative z-10">
            <Share postLink={postSlug} />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
