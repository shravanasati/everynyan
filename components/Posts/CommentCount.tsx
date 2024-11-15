import { MessageCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

function CommentCount({
  noOfComments,
  postSlug,
}: {
  noOfComments: number;
  postSlug: string;
}) {
  // todo fix noOfComments to not count rejected comments
  return (
    <Link href={`/post/${postSlug}#comments`}>
      <div className="h-8 w-[21rem] sm:w-auto px-4 sm:px-2 py-4 rounded-full flex gap-1 justify-center items-center bg-primary/20 cursor-pointer hover:bg-primary/30 transition-colors">
        <MessageCircle size={20} />
        <span className="text-base">{noOfComments}</span>
      </div>
    </Link>
  );
}

export default CommentCount;
