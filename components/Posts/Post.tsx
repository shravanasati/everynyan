import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import UpDwVote from "@/components/Posts/UpDwVote";
import Cmt from "@/components/Posts/Cmt";
import Share from "@/components/Posts/Share";
import ReportContent from "@/components/Posts/ReportContent";
import Link from "next/link";
import { PostData } from "@/lib/utils";

export default function Post({
  title,
  content,
  upVotes,
  downVotes,
  board,
  noOfComments,
}: PostData) {
  return (
    <Card className="w-full min-h-[12rem] my-2 rounded-sm shadow-md hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="p-4">
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:items-center sm:space-y-0">
          <Link
            href="."
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
        <p className="line-clamp-3 sm:line-clamp-4">{content}</p>
      </CardContent>
      <CardFooter className="p-4 flex items-center justify-center md:justify-start flex-wrap gap-2">
        <UpDwVote upVotes={upVotes} downVotes={downVotes} />
        <Cmt noOfComments={noOfComments} />
        <Share />
        <ReportContent />
      </CardFooter>
    </Card>
  );
}
