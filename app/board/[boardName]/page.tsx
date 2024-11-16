import Post from "@/components/Posts/Post";
import { getAuthUser } from "@/lib/user";
import "@/app/scrollbar.css";
import { Unauthorized } from "@/components/Unauthorized";
import { getPostsByBoard } from "@/lib/firebase/posts";
import { boardList } from "@/lib/boards";
import { notFound } from "next/navigation";
import BoardHeader from "@/components/BoardHeader";
import { LoadingPost, CaughtUp } from "@/components/LoadingPost";

interface BoardProps {
  params: {
    boardName: string;
  };
}

// todo dynamically generate metadata

export default async function BoardDetailPage({ params }: BoardProps) {
  if (!(await getAuthUser())) {
    return <Unauthorized />;
  }

  const { boardName } = params;
  const allowedBoardNames = boardList.map((item) => item.href);
  if (!allowedBoardNames.includes(boardName)) {
    return notFound();
  }
  const posts = await getPostsByBoard(boardName);
  // todo @ni3rav implement pagination, use the lastDoc and hasMore results of above function
  // !! alright immma do this once the test drive begins and comment component is ready man, will start test drive from 14th onward right?
  const postItems = posts.items;

  return (
    <div className="min-h-screen bg-background">
      <BoardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6 everynyan-scroll">
          {postItems.map((post, index) => (
            <Post
              key={post.id || index}
              title={post.title}
              body={post.body}
              board={post.board}
              upvotes={post.upvotes}
              downvotes={post.downvotes}
              id={post.id}
              moderation_status="pending"
              comment_count={post.comment_count}
            />
          ))}
          {posts.hasMore ? <LoadingPost /> : <CaughtUp />}
        </div>
      </main>
    </div>
  );
}
