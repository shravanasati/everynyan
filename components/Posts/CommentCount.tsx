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
      <div className="w-max px-5 py-[0.50rem] rounded-3xl font-thin text-xs flex gap-1 justify-center items-center bg-primary/10 cursor-pointer hover:bg-primary/30 transition-colors text-white/40">
        <MessageCircle className="size-6" />
        <span className="text-base font-semibold">{noOfComments}</span>
      </div>
    </Link>
  );
}

export default CommentCount;
