"use client";

import { ArrowBigDown, ArrowBigUp, Minus } from "lucide-react";
import { useState } from "react";

export default function VoteCounter({
  upVotes = 0,
  downVotes = 0,
}: {
  upVotes?: number;
  downVotes?: number;
}) {
  const [currentUpVotes, setCurrentUpVotes] = useState(upVotes);
  const [currentDownVotes, setCurrentDownVotes] = useState(downVotes);
  const [isUpVoted, setUpVoted] = useState(false);
  const [isDownVoted, setDownVoted] = useState(false);

  const handleVote = (vote: "up" | "down") => {
    if (vote === "up") {
      if (isUpVoted) {
        setUpVoted(false);
        setCurrentUpVotes((prev) => prev - 1);
      } else {
        setUpVoted(true);
        if (isDownVoted) {
          setDownVoted(false);
          setCurrentDownVotes((prev) => prev - 1);
        }
        setCurrentUpVotes((prev) => prev + 1);
      }
    } else if (vote === "down") {
      if (isDownVoted) {
        setDownVoted(false);
        setCurrentDownVotes((prev) => prev - 1);
      } else {
        setDownVoted(true);
        if (isUpVoted) {
          setUpVoted(false);
          setCurrentUpVotes((prev) => prev - 1);
        }
        setCurrentDownVotes((prev) => prev + 1);
      }
    }
  };

  return (
    <div className="h-8 px-3 py-1 rounded-2xl flex gap-2 justify-center items-center bg-primary/20 min-w-[14.5rem] md:min-w-40">
      <ArrowBigUp
        className={`cursor-pointer ${
          !isDownVoted && isUpVoted ? "fill-primary text-primary" : ""
        }`}
        onClick={() => handleVote("up")}
      />
      <span className="h-full flex justify-center items-center cursor-default">
        {currentUpVotes}
      </span>
      <span className="flex justify-center items-center cursor-default">
        <Minus className="w-4 h-4" />
      </span>
      <span className="h-full flex justify-center items-center cursor-default">
        {currentDownVotes}
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
