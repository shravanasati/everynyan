import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import VoteCounter from "@/components/Posts/VoteCounter";
import CommentButton from "@/components/Posts/Comment";
import Share from "@/components/Posts/Share";
import ReportContent from "@/components/Posts/ReportContent";
import Link from "next/link";
import { Post as PostType } from "@/lib/post";
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
  board,
}: PostType) {
  const postSlug = getPostSlug(id, title);
  return (
    <Card className="w-full min-h-[12rem] my-2 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <Link
            href={`/post/${postSlug}`}
            className="text-lg sm:text-xl md:text-2xl font-bold hover:underline line-clamp-2"
          >
            {title}
          </Link>
          <Link
            href={`/board/${board}`}
            className="text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {board}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-4 text-sm sm:text-base">
        <ReactMarkdown
          className="line-clamp-3 sm:line-clamp-4"
          components={{
            a: (props) => <a className="text-primary" {...props} />,
          }}
          rehypePlugins={[rehypeRaw]}
        >
          {DOMPurify.sanitize(trimBodyContent(body))}
        </ReactMarkdown>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-center md:justify-start flex-wrap gap-2">
        <VoteCounter upVotes={upvotes} downVotes={downvotes} />
        <CommentButton noOfComments={0} />
        <Share postLink={postSlug} />
        <ReportContent postID={id} />
      </CardFooter>
    </Card>
  );
}
