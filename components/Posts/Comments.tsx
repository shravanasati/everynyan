"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import VoteCounter from "@/components/Posts/VoteCounter"
import ReportContent from "@/components/Posts/ReportContent"
import { MessageSquare } from "lucide-react"
import { useState, useCallback } from 'react'
import { DBComment } from "@/lib/models"
import { createComment } from "@/lib/actions/createComment"
import { CommentInput } from "./CommentInput"

interface CommentProps {
  commentID: string
  postID: string
  level: number
  content: string
  upvotes: number
  downvotes: number
  onReply: () => void
}

function Comment({ commentID, postID, content, upvotes, downvotes, onReply }: CommentProps) {
  return (
    <Card className="w-full" id={commentID}>
      <CardContent className="p-4">
        <div className="rounded-lg bg-primary/5 p-3 mb-3">
          <p className="text-sm text-foreground whitespace-pre-wrap break-words">{content}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <VoteCounter upVotes={upvotes} downVotes={downvotes} commentID={commentID} postID={postID} />
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-primary"
              onClick={onReply}
            >
              <MessageSquare size={18} className="mr-1" />
              <span className="sr-only">Reply to comment</span>
              Reply
            </Button>
            <ReportContent postID={postID} commentID={commentID} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface CommentsProps {
  postID: string;
  initialComments: DBComment[];
}

export default function Comments({ postID, initialComments }: CommentsProps) {
  const [comments, setComments] = useState<DBComment[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [newReply, setNewReply] = useState('');

  const handleReply = useCallback((commentId: string) => {
    setReplyingTo(commentId);
  }, []);

  const submitReply = useCallback(async () => {
    if (!replyingTo || !newReply.trim()) return;

    const parentComment = comments.find(c => c.id === replyingTo);
    if (!parentComment) return;

    const resp = await createComment({ body: newReply, postID: postID, parentID: replyingTo, level: parentComment.level + 1 });
    if (!resp.success) return;

    setComments(prevComments => [...prevComments, resp.data!]);
    setReplyingTo(null);
    setNewReply('');
  }, [replyingTo, newReply, comments]);

  const submitTopLevelComment = useCallback(async (commentBody: string) => {
    const resp = await createComment({ body: commentBody, postID: postID, parentID: null, level: 0 });
    if (!resp.success) return;
    // todo handle errors
    setComments(prevComments => [...prevComments, resp.data!]);
  }, [])

  const sortedComments = comments.sort((a, b) => {
    if (a.parent_id === b.parent_id) {
      return (a.timestamp as any) - (b.timestamp as any);
    }
    return a.level - b.level;
  });

  return (
    <div className="space-y-4 mb-4" id="comments">
      <CommentInput onSubmit={submitTopLevelComment} />
      {sortedComments.map((comment: DBComment) => (
        <div key={comment.id} style={{ marginLeft: `${comment.level * 20}px` }}>
          <Comment
            commentID={comment.id}
            postID={postID}
            level={comment.level}
            content={comment.body}
            upvotes={comment.upvotes}
            downvotes={comment.downvotes}
            onReply={() => handleReply(comment.id)}
          />
          {replyingTo === comment.id && (
            <div className="mt-2 space-y-2 mb-4">
              <textarea
                className="w-full bg-secondary p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
                placeholder="Write your reply..."
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setReplyingTo(null)}>Cancel</Button>
                <Button onClick={submitReply}>Submit Reply</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}