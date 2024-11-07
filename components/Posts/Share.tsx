"use client";

import { useState } from "react";

function Share() {
  const [isCopied, setIsCopied] = useState(false);

  const handleClick = async () => {
    setIsCopied(true);
    // TODO: replace it with link in here
    const postLink = "sata andagi";
    try {
      await navigator.clipboard.writeText(postLink);
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };
  return (
    <div
      className={`h-6 w-28 md:w-20 px-2 py-4 rounded-2xl flex gap-1 justify-center items-center bg-primary/20  text-base ${
        isCopied ? "text-primary cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {`${isCopied ? "Done!" : "Share"}`}
    </div>
  );
}

export default Share;
