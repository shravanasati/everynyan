"use client";

import { Loader2, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

function Share({ postLink }: { postLink: string }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    setIsCopied(true);
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/post/${postLink}`);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };
  return (
    <div
      className={cn("h-6 w-[14.5rem] md:w-16 px-2 py-4 rounded-2xl flex gap-1 justify-center items-center bg-primary/20", isCopied ? "cursor-not-allowed" : "cursor-pointer")}
      onClick={handleClick}
      aria-disabled={isCopied}
    >
      {
        !isCopied ? <Share2 className="size-6 text-primary-600" /> : <Loader2 className="size-6 text-primary animate-spin" />
      }
    </div>
  );
}

export default Share;
