"use client";

import {
  downvoteCommentAction,
  downvotePostAction,
  upvoteCommentAction,
  upvotePostAction,
} from "@/lib/actions/upvoteDownvote";
import { ArrowBigDown, ArrowBigUp, Minus } from "lucide-react";
import { useEffect, useState } from "react";

export default function VoteCounter({
  upVotes,
  downVotes,
  postID,
  commentID,
}: {
  upVotes: number;
  downVotes: number;
  postID: string;
  commentID?: string;
}) {
  const [currentUpVotes, setCurrentUpVotes] = useState(upVotes);
  const [currentDownVotes, setCurrentDownVotes] = useState(downVotes);
  const [isUpVoted, setUpVoted] = useState(false);
  const [isDownVoted, setDownVoted] = useState(false);

  let isComment = false;
  let storageVotePrefix = "post";
  if (commentID) {
    isComment = true;
    storageVotePrefix = "comment";
  }

  const setLocalStorageVote = (vote: "upvoted" | "downvoted" | "none") => {
    localStorage.setItem(
      `${storageVotePrefix}-vote-${isComment ? commentID : postID}`,
      vote
    );
  };

  // todo localStorage can be easily manipulated by the user, so this is not a secure way to store vote status, consider using a server side solution
  // Load vote status from local storage on component mount
  useEffect(() => {
    const storedVote = localStorage.getItem(
      `${storageVotePrefix}-vote-${isComment ? commentID : postID}`
    );
    if (storedVote === "upvoted") setUpVoted(true);
    if (storedVote === "downvoted") setDownVoted(true);
  }, []);

  const upvoteRequest = async () => {
    const upvotePromise = isComment
      ? upvoteCommentAction(postID, commentID!, isUpVoted)
      : upvotePostAction(postID, isUpVoted);
    const resp = await upvotePromise;
    if (resp.error) {
      console.error(resp.error);
      // Revert on failure
      setUpVoted((prev) => !prev);
      setCurrentUpVotes((prev) => prev + (isUpVoted ? 1 : -1));
      if (isDownVoted) {
        setDownVoted(true);
        setCurrentDownVotes((prev) => prev + 1);
      }
      setLocalStorageVote(isUpVoted ? "upvoted" : "none");
    }
  };

  const downvoteRequest = async () => {
    const downvotePromise = isComment
      ? downvoteCommentAction(postID, commentID!, isDownVoted)
      : downvotePostAction(postID, isDownVoted);
    const resp = await downvotePromise;
    if (resp.error) {
      console.error(resp.error);
      // Revert on failure
      setDownVoted((prev) => !prev);
      setCurrentDownVotes((prev) => prev + (isDownVoted ? 1 : -1));
      if (isUpVoted) {
        setUpVoted(true);
        setCurrentUpVotes((prev) => prev + 1);
      }
      setLocalStorageVote(isDownVoted ? "downvoted" : "none");
    }
  };

  const handleVote = async (vote: "up" | "down") => {
    if (vote === "up") {
      if (isUpVoted) {
        // Undo upvote
        setUpVoted(false);
        setCurrentUpVotes((prev) => prev - 1);
        setLocalStorageVote("none");
      } else {
        // Perform upvote
        setUpVoted(true);
        setCurrentUpVotes((prev) => prev + 1);
        if (isDownVoted) {
          setDownVoted(false);
          setCurrentDownVotes((prev) => prev - 1);
          await downvoteRequest();
        }
        setLocalStorageVote("upvoted");
      }
      await upvoteRequest();
    } else if (vote === "down") {
      if (isDownVoted) {
        // Undo downvote
        setDownVoted((prev) => !prev);
        setCurrentDownVotes((prev) => prev - 1);
        setLocalStorageVote("none");
      } else {
        // Perform downvote
        setDownVoted(true);
        setCurrentDownVotes((prev) => prev + 1);
        if (isUpVoted) {
          setUpVoted((prev) => !prev);
          setCurrentUpVotes((prev) => prev - 1);
          await upvoteRequest();
        }
        setLocalStorageVote("downvoted");
      }
      await downvoteRequest();
    }
  };

  return (
    <div className="h-8 px-2 sm:px-3 py-1 rounded-2xl flex gap-1 sm:gap-2 justify-center items-center bg-primary/20 w-full sm:w-auto">
      <ArrowBigUp
        className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${
          !isDownVoted && isUpVoted ? "fill-primary text-primary" : ""
        }`}
        onClick={() => handleVote("up")}
      />
      <span className="h-full flex justify-center items-center cursor-default text-sm sm:text-base">
        {currentUpVotes}
      </span>
      <span className="flex justify-center items-center cursor-default">
        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
      </span>
      <span className="h-full flex justify-center items-center cursor-default text-sm sm:text-base">
        {currentDownVotes}
      </span>
      <ArrowBigDown
        className={`cursor-pointer w-5 h-5 sm:w-6 sm:h-6 ${
          isDownVoted && !isUpVoted ? "fill-primary text-primary" : ""
        }`}
        onClick={() => handleVote("down")}
      />
    </div>
  );
}
