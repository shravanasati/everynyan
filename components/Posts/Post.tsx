// !! TODO: fuckaround for pagination and lazyloading and like that 

import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import UpDwVote from "@/components/Posts/UpDwVote";
import Cmt from "@/components/Posts/Cmt";
import Link from "next/link";

interface PostData {
  title: string;
  content: string;
  board: string;
  netVotes: number;
  noOfComments: number;
}

export default function Post({
  title,
  content,
  netVotes,
  board,
  noOfComments,
}: PostData) {
  return (
    <Card className="w-full min-h-48 mt-1 rounded-sm mb-1">
      <CardHeader className="text-lg sm:text-xl md:text-2xl font-bold sm:font-extrabold">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          {/*TODO:  enter the /board/boardName/p/post_id href here */}
          <Link href="." className="mb-2 sm:mb-0">
            {title}
          </Link>
          <Link
            href={`/board/${board}`}
            className="text-sm sm:text-base text-muted-foreground"
          >
            {board}
          </Link>
        </div>
      </CardHeader>
      <CardContent className="text-xs sm:text-sm font-medium">
        {content}
      </CardContent>
      <CardFooter className="flex items-center justify-start">
        <div className="flex items-center gap-2">
          <UpDwVote netVotesServer={netVotes} />
          <Cmt noOfComments={noOfComments} />
        </div>
      </CardFooter>
    </Card>
  );
}
