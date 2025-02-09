import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GiphyPicker } from './GiphyPicker';
import { IGif } from '@giphy/js-types';
import { X } from 'lucide-react';
import { Gif } from '@/lib/models';

interface CommentInputProps {
  onSubmit: (comment: string, gif: Gif | null) => void;
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
      const gifData = selectedGif ? {
        src: selectedGif?.images.original.webp || "",
        alt: selectedGif?.alt_text || "",
        height: selectedGif?.images.original.height || 0,
        width: selectedGif?.images.original.width || 0,
      } : null;
      onSubmit(comment, gifData);
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
            src={selectedGif.images.original.webp || "/placeholder.svg"}
            className='object-cover '
            alt={selectedGif.alt_text}
            width={selectedGif.images.original.width}
            height={selectedGif.images.original.height}
          />
          <Button
            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full size-6"
            onClick={() => setSelectedGif(null)}
          >
            <X />
          </Button>
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