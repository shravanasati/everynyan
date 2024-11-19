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
  return (
    <Link href={`/post/${postSlug}#comments`}>
      <div className="w-max px-6 py-[0.70rem] rounded-3xl font-thin text-xs flex gap-1 justify-center items-center bg-primary/10 cursor-pointer hover:bg-primary/30 transition-colors text-white/40">
        <MessageCircle className="size-4" />
        <span className="text-xs">{noOfComments}</span>
      </div>
    </Link>
  );
}

export default CommentCount;
