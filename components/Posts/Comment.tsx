import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function CommentButton({ noOfComments, postSlug }: { noOfComments: number, postSlug: string }) {
  return (
    <Link href={`/post/${postSlug}#comments`}>
      <div className="h-6 w-28 md:w-20 px-2 py-4 rounded-2xl flex gap-1 justify-center items-center bg-primary/20 cursor-pointer">
        <MessageCircle className="size-6" />
        <span className="h-full p-1.5 flex justify-center items-center text-base cursor-default">
          {noOfComments}
        </span>
      </div>
    </Link>
  );
}

export default CommentButton;
