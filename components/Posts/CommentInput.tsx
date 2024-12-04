"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import GifInput from "./GifInput";

interface CommentInputProps {
  onSubmit: (comment: string) => void;
}

export function CommentInput({ onSubmit }: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const handleSubmit = async () => {
    if (comment.trim()) {
      setDisableInput(true);
      setCooldown(5);
      onSubmit(comment);
      setComment("");

      const countdownInterval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            setDisableInput(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="space-y-2 w-full">
      <Textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded-md focus:outline-none focus:border-2 resize-none"
      />
      <div className="flex justify-end gap-2">
        <GifInput />
        <Button
          onClick={handleSubmit}
          disabled={!comment.trim() || disableInput || comment.length > 500}
        >
          {disableInput ? `Wait ${cooldown}s...` : "Post Comment"}
        </Button>
      </div>
    </div>
  );
}
