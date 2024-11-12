import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface CommentInputProps {
  onSubmit: (comment: string) => void;
}

export function CommentInput({ onSubmit }: CommentInputProps) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
    }
  };

  return (
    <div className="space-y-2">
      <Textarea
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={3}
        className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={!comment.trim()}>
          Post Comment
        </Button>
      </div>
    </div>
  );
}