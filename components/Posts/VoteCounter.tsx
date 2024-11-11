"use client";

import { downvotePostAction, upvotePostAction } from "@/lib/actions/upvoteDownvote";
import { ArrowBigDown, ArrowBigUp, Minus } from "lucide-react";
import { useState } from "react";

export default function VoteCounter({
  upVotes = 0,
  downVotes = 0,
  postID,
  board
}: {
  upVotes?: number;
  downVotes?: number;
  postID: string;
  board: string;
}) {
  // todo store isUpVoted and isDownVoted in local storage to persist state and prevent multiple votes
  const [currentUpVotes, setCurrentUpVotes] = useState(upVotes);
  const [currentDownVotes, setCurrentDownVotes] = useState(downVotes);
  const [isUpVoted, setUpVoted] = useState(false);
  const [isDownVoted, setDownVoted] = useState(false);

  const handleVote = async (vote: "up" | "down") => {
    if (vote === "up") {
      if (isUpVoted) {
        // User is undoing their upvote
        setUpVoted(false);
        setCurrentUpVotes((prev) => prev - 1);
      } else {
        // User is upvoting
        setUpVoted(true);
        setCurrentUpVotes((prev) => prev + 1);
        if (isDownVoted) {
          setDownVoted(false);
          setCurrentDownVotes((prev) => prev - 1);
        }
      }
      
      // Call upvote action and handle error by reverting state if it fails
      const resp = await upvotePostAction(board, postID);
      if (resp.error) {
        console.error(resp.error);
        // Revert state on failure
        setUpVoted(!isUpVoted);
        setCurrentUpVotes((prev) => prev + (isUpVoted ? 1 : -1));
        if (isDownVoted) {
          setDownVoted(true);
          setCurrentDownVotes((prev) => prev + 1);
        }
      }
    } else if (vote === "down") {
      if (isDownVoted) {
        // User is undoing their downvote
        setDownVoted(false);
        setCurrentDownVotes((prev) => prev - 1);
      } else {
        // User is downvoting
        setDownVoted(true);
        setCurrentDownVotes((prev) => prev + 1);
        if (isUpVoted) {
          setUpVoted(false);
          setCurrentUpVotes((prev) => prev - 1);
        }
      }

      // Call downvote action and handle error by reverting state if it fails
      const resp = await downvotePostAction(board, postID);
      if (resp.error) {
        console.error(resp.error);
        // Revert state on failure
        setDownVoted(!isDownVoted);
        setCurrentDownVotes((prev) => prev + (isDownVoted ? 1 : -1));
        if (isUpVoted) {
          setUpVoted(true);
          setCurrentUpVotes((prev) => prev + 1);
        }
      }
    }
  };

  return (
    <div className="h-8 px-3 py-1 rounded-2xl flex gap-2 justify-center items-center bg-primary/20 min-w-[14.5rem] md:min-w-40">
      <ArrowBigUp
        className={`cursor-pointer ${!isDownVoted && isUpVoted ? "fill-primary text-primary" : ""}`}
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
        className={`cursor-pointer ${isDownVoted && !isUpVoted ? "fill-primary text-primary" : ""}`}
        onClick={() => handleVote("down")}
      />
    </div>
  );
}
