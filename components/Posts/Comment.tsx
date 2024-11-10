import { MessageCircle } from "lucide-react";
import React from "react";

function CommentButton({ noOfComments }: { noOfComments: number }) {
  // TODO: when post schema is done the comment button should open the comment of the post
  return (
    <div className="h-6 w-28 md:w-20 px-2 py-4 rounded-2xl flex gap-1 justify-center items-center bg-primary/20 cursor-pointer">
      <MessageCircle className="size-6" />
      <span className="h-full p-1.5 flex justify-center items-center text-base cursor-default">
        {noOfComments}
      </span>
    </div>
  );
}

export default CommentButton;
