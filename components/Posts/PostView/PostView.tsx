import "@/app/scrollbar.css";
import PerPost from "@/components/Posts/PostView/PerPost";
import { getPostComments } from "@/lib/firebase/comments";
import { getPostByID } from "@/lib/firebase/posts";
import { notFound } from "next/navigation";
import Comments from "../Comments";
import { convertTimestamp } from "@/lib/utils";


async function PostView({
  postID,
  isAdmin,
}: {
  postID: string;
  isAdmin: boolean;
}) {
  const [post, comments] = await Promise.all([getPostByID(postID), getPostComments(postID)]);
  if (!post || (post.moderation_status == "rejected" && !isAdmin)) {
    return notFound();
  }

  // ensure author hashes are not leaked to the frontend
  delete post.author
  comments.forEach((c) => delete c.author)

  const formattedComments = comments.map((comment) => ({
    ...comment,
    timestamp: convertTimestamp(comment.timestamp),
  }));

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6 everynyan-scroll">
          <PerPost
            boardName={post.board}
            content={post.body}
            title={post.title}
            upVotes={post.upvotes}
            downVotes={post.downvotes}
            id={post.id}
          />
          <div className="flex-grow overflow-auto everynyan-scroll">
            <Comments postID={postID} initialComments={formattedComments} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default PostView;
