"use client";

import { downvotePostAction, upvotePostAction } from "@/lib/actions/upvoteDownvote";
import { ArrowBigDown, ArrowBigUp, Minus } from "lucide-react";
import { useEffect, useState } from "react";

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
  const [currentUpVotes, setCurrentUpVotes] = useState(upVotes);
  const [currentDownVotes, setCurrentDownVotes] = useState(downVotes);
  const [isUpVoted, setUpVoted] = useState(false);
  const [isDownVoted, setDownVoted] = useState(false);

  // todo localStorage can be easily manipulated by the user, so this is not a secure way to store vote status, consider using a server side solution
  // Load vote status from local storage on component mount
  useEffect(() => {
    const storedVote = localStorage.getItem(`post-vote-${postID}`);
    if (storedVote === "upvoted") setUpVoted(true);
    if (storedVote === "downvoted") setDownVoted(true);
  }, [postID]);

  const upvoteRequest = async () => {
    const resp = await upvotePostAction(board, postID, isUpVoted);
    if (resp.error) {
      console.error(resp.error);
      // Revert on failure
      setUpVoted(prev => !prev);
      setCurrentUpVotes((prev) => prev + (isUpVoted ? 1 : -1));
      if (isDownVoted) {
        setDownVoted(true);
        setCurrentDownVotes((prev) => prev + 1);
      }
      localStorage.setItem(`post-vote-${postID}`, isUpVoted ? "upvoted" : "none");
    }
  }

  const downvoteRequest = async () => {
    const resp = await downvotePostAction(board, postID, isDownVoted);
    if (resp.error) {
      console.error(resp.error);
      // Revert on failure
      setDownVoted(prev => !prev);
      setCurrentDownVotes((prev) => prev + (isDownVoted ? 1 : -1));
      if (isUpVoted) {
        setUpVoted(true);
        setCurrentUpVotes((prev) => prev + 1);
      }
      localStorage.setItem(`post-vote-${postID}`, isDownVoted ? "downvoted" : "none");
    }
  }

  const handleVote = async (vote: "up" | "down") => {
    if (vote === "up") {
      if (isUpVoted) {
        // Undo upvote
        setUpVoted(false);
        setCurrentUpVotes((prev) => prev - 1);
        localStorage.setItem(`post-vote-${postID}`, "none");
      } else {
        // Perform upvote
        setUpVoted(true);
        setCurrentUpVotes((prev) => prev + 1);
        if (isDownVoted) {
          setDownVoted(false);
          setCurrentDownVotes((prev) => prev - 1);
          await downvoteRequest();
        }
        localStorage.setItem(`post-vote-${postID}`, "upvoted");
      }
      await upvoteRequest();

    } else if (vote === "down") {
      if (isDownVoted) {
        // Undo downvote
        setDownVoted(prev => !prev);
        setCurrentDownVotes((prev) => prev - 1);
        localStorage.setItem(`post-vote-${postID}`, "none");
      } else {
        // Perform downvote
        setDownVoted(true);
        setCurrentDownVotes((prev) => prev + 1);
        if (isUpVoted) {
          setUpVoted(prev => !prev);
          setCurrentUpVotes((prev) => prev - 1);
          await upvoteRequest();
        }
        localStorage.setItem(`post-vote-${postID}`, "downvoted");
      }
      await downvoteRequest();
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
