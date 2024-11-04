"use client";

import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import { useState } from "react";

export function UpDwVote() {
  const [netVotes, setNetVotes] = useState(18);
  const [isUpVoted, setUpVoted] = useState(false);
  const [isDownVoted, setDownVoted] = useState(false);

  const handleVote = (vote: "up" | "down") => {
    if (vote === "up") {
      if (isUpVoted) {
        setUpVoted(false);
        setNetVotes((prev) => prev - 1);
      } else {
        setUpVoted(true);
        setDownVoted(false);

        if (isDownVoted) {
          setNetVotes((prev) => prev + 2);
        } else {
          setNetVotes((prev) => prev + 1);
        }
      }
    } else if (vote === "down") {
      if (isDownVoted) {
        setDownVoted(false);
        setNetVotes((prev) => prev + 1);
      } else {
        setDownVoted(true);
        setUpVoted(false);

        if (isUpVoted) {
          setNetVotes((prev) => prev - 2);
        } else {
          setNetVotes((prev) => prev - 1);
        }
      }
    }
  };

  return (
    <div className="h-6 max-w-28 px-2 py-4 rounded-2xl flex gap-2 justify-center items-center bg-primary/20">
      <ArrowBigUp
        className={`cursor-pointer ${
          !isDownVoted && isUpVoted ? "fill-primary text-primary" : ""
        }`}
        onClick={() => handleVote("up")}
      />
      <span className="h-full p-1.5 flex justify-center items-center text-base cursor-default">
        {netVotes}
      </span>
      <ArrowBigDown
        className={`cursor-pointer ${
          isDownVoted && !isUpVoted ? "fill-primary text-primary" : ""
        }`}
        onClick={() => handleVote("down")}
      />
    </div>
  );
}
