"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import VoteCounter from "@/components/Posts/VoteCounter";
import ReportContent from "@/components/Posts/ReportContent";
import { parseISO } from "date-fns";
import { MessageCircle, MinusCircleIcon, PlusCircleIcon, Spline } from "lucide-react";
import { useState, useCallback, useMemo } from "react";
import { Comment as CommentType } from "@/lib/models";
import { createComment } from "@/lib/actions/createComment";
import { CommentInput } from "./CommentInput";

type ReturnedComment = CommentType & { timestamp: string };

interface CommentNodeType extends ReturnedComment {
  replies: CommentNodeType[];
}

interface SingleCommentProps {
  comment: CommentNodeType;
  postID: string;
  onReply: (commentId: string) => void;
  replyingTo: string | null;
  onSubmitReply: (body: string) => Promise<void>;
  onCancelReply: () => void;
}

const SingleComment: React.FC<SingleCommentProps> = ({
  comment,
  postID,
  onReply,
  replyingTo,
  onSubmitReply,
  onCancelReply,
}) => {
  const [replyText, setReplyText] = useState("");
  const isReplying = replyingTo === comment.id;
  const [subCommentVisible, setSubCommentVisible] = useState(false);
  const handleSubmitReply = async () => {
    if (!replyText.trim()) return;
    await onSubmitReply(replyText);
    setReplyText("");
  };

  return (
    <div className="w-full">
      <Card className="relative w-full border-none" id={comment.id}>
        <div className={`absolute top-0 -left-6 flex items-center justify-center ${comment.parent_id != null ? 'block' : 'hidden'}`}>
          <Spline strokeDasharray="1 3" strokeDashoffset={0.8} className="-rotate-90 w-8 text-[#2F2612]" strokeLinecap="square"/>
        </div>
        <CardContent className="p-3">
          <div className="rounded-lg bg-primary/5 p-3 mb-3 ">
            <p className="text-sm text-foreground whitespace-pre-wrap break-words">
              {comment.body}
            </p>
          </div>

          <div className="flex items-center justify-between mt-2 sm:space-y-0">
            <div className="flex items-center justify-between gap-3">
              {comment.replies.length > 0 ? (
                <div
                  className="rounded-3xl p-2 bg-primary/10 text-white/40 cursor-pointer"
                  onClick={() => setSubCommentVisible((prev) => !prev)}
                >
                  {/* For show and hidden feature of comments */}
                  {subCommentVisible ? (
                    <MinusCircleIcon className="size-[1.2rem]" />
                  ) : (
                    <PlusCircleIcon className="size-[1.2rem]" />
                  )}
                </div>
              ) : null}

              <VoteCounter
                upVotes={comment.upvotes}
                downVotes={comment.downvotes}
                commentID={comment.id}
                postID={postID}
              />
            </div>
            <div className="flex items-center justify-end space-x-2 w-full sm:w-auto">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-primary w-max flex items-center justify-center"
                onClick={() => onReply(comment.id)}
              >
                <MessageCircle size={18} className="mr-1" />
                <div>
                  <span className="sr-only">Reply to comment</span>
                  Reply
                </div>
              </Button>
              <ReportContent
                postID={postID}
                commentID={comment.id}
                className="relative"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {isReplying && (
        <div className="mt-2 space-y-2 mb-4">
          <textarea
            className="w-full bg-secondary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={3}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write your reply..."
          />
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancelReply}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReply}>Submit Reply</Button>
          </div>
        </div>
      )}

      {(comment.replies.length > 0 && subCommentVisible) && (
        <div className="pl-8 relative h-max pt-4 space-y-4">
          <div className="w-[1px] h-full rounded-full bg-transparent border absolute left-[0.8rem] top-0 overflow-hidden border-dashed" />
          {comment.replies.map((reply) => (
            <SingleComment
              key={reply.id}
              comment={reply}
              postID={postID}
              onReply={onReply}
              replyingTo={replyingTo}
              onSubmitReply={onSubmitReply}
              onCancelReply={onCancelReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Comments({
  postID,
  initialComments,
}: {
  postID: string;
  initialComments: ReturnedComment[];
}) {
  const [comments, setComments] = useState<ReturnedComment[]>(initialComments);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Convert flat comments array to nested structure
  const commentTree = useMemo(() => {
    const commentMap = new Map<string, CommentNodeType>();
    const rootComments: CommentNodeType[] = [];

    // Initialize all comments with empty replies array
    comments.forEach((comment) => {
      commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Build the tree structure
    comments.forEach((comment) => {
      const commentWithReplies = commentMap.get(comment.id)!;
      if (comment.parent_id === null) {
        rootComments.push(commentWithReplies);
      } else {
        const parentComment = commentMap.get(comment.parent_id);
        if (parentComment) {
          parentComment.replies.push(commentWithReplies);
        }
      }
    });

    // Sort root comments and their replies by timestamp
    const sortByTimestamp = (a: CommentNodeType, b: CommentNodeType) =>
      parseISO(a.timestamp).getTime() - parseISO(b.timestamp).getTime();

    const sortCommentsRecursively = (comments: CommentNodeType[]) => {
      comments.sort(sortByTimestamp);
      comments.forEach((comment) => {
        if (comment.replies.length > 0) {
          sortCommentsRecursively(comment.replies);
        }
      });
    };

    sortCommentsRecursively(rootComments);
    return rootComments;
  }, [comments]);

  const handleReply = useCallback((commentId: string) => {
    setReplyingTo(commentId);
  }, []);

  const handleSubmitReply = useCallback(
    async (body: string) => {
      if (!replyingTo) return;

      const parentComment = comments.find((c) => c.id === replyingTo);
      if (!parentComment) return;

      const resp = await createComment({
        body,
        postID,
        parentID: replyingTo,
        level: parentComment.level + 1,
      });

      if (!resp.success) return;
      setComments((prevComments) => [...prevComments, resp.data!]);
      setReplyingTo(null);
    },
    [replyingTo, comments, postID]
  );

  const submitTopLevelComment = useCallback(
    async (commentBody: string) => {
      const resp = await createComment({
        body: commentBody,
        postID,
        parentID: null,
        level: 0,
      });

      if (!resp.success) return;
      setComments((prevComments) => [...prevComments, resp.data!]);
    },
    [postID]
  );

  return (
    <div className="space-y-4 mb-4" id="comments">
      <CommentInput onSubmit={submitTopLevelComment} />
      {commentTree.map((comment) => (
        <SingleComment
          key={comment.id}
          comment={comment}
          postID={postID}
          onReply={handleReply}
          replyingTo={replyingTo}
          onSubmitReply={handleSubmitReply}
          onCancelReply={() => setReplyingTo(null)}
        />
      ))}
    </div>
  );
}
