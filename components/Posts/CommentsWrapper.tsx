import { getPostComments } from "@/lib/firebase/comments";
import { convertTimestamp } from "@/lib/utils";
import Comments from "./Comments";

export default async function CommentsWrapper({ postID }: { postID: string }) {
  const comments = await getPostComments(postID);
  comments.forEach((c) => delete c.author)

  const formattedComments = comments.map((comment) => ({
    ...comment,
    timestamp: convertTimestamp(comment.timestamp),
  }));

  return (
      <div className="flex-grow overflow-auto everynyan-scroll">
        <Comments postID={postID} initialComments={formattedComments} />
      </div>
  )
}