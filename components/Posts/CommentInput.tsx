import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GiphyPicker } from './GiphyPicker';
import Image from 'next/image';
import { IGif } from '@giphy/js-types';

interface CommentInputProps {
  onSubmit: (comment: string, gifUrl?: string) => void;
}

export function CommentInput({ onSubmit }: CommentInputProps) {
  const [comment, setComment] = useState("");
  const [disableInput, setDisableInput] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [showGiphyPicker, setShowGiphyPicker] = useState(false);
  const [selectedGif, setSelectedGif] = useState<IGif | null>(null);

  const handleSubmit = async () => {
    if (comment.trim() || selectedGif) {
      setDisableInput(true);
      setCooldown(5);
      onSubmit(comment, selectedGif?.images.original.url);
      setComment("");
      setSelectedGif(null);

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

  const handleGifSelect = (gif: IGif) => {
    setSelectedGif(gif);
    setShowGiphyPicker(false);
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
      {selectedGif && (
        <div className="relative size-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedGif.images.original.url || "/placeholder.svg"}
            className='object-cover '
            alt="Selected GIF"
          />
          <button
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
            onClick={() => setSelectedGif(null)}
          >
            X
          </button>
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button onClick={() => setShowGiphyPicker(!showGiphyPicker)}>
          {showGiphyPicker ? 'Hide GIFs' : 'Add GIF'}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={(!comment.trim() && !selectedGif) || disableInput || comment.length > 500}
        >
          {disableInput ? `Wait ${cooldown}s...` : "Post Comment"}
        </Button>
      </div>
      {showGiphyPicker && <GiphyPicker onGifSelect={handleGifSelect} />}
    </div>
  );
}