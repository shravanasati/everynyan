import Post from "@/components/Posts/Post";
import { getAuthUser } from "@/lib/user";
import "@/app/scrollbar.css";
import { Unauthorized } from "@/components/Unauthorized";
import { getPostsByBoard } from "@/lib/firebase/posts";
import { boardList } from "@/lib/boards";
import { notFound } from "next/navigation";


interface BoardProps {
  params: {
    boardName: string;
  };
}

export default async function BoardDetailPage({ params }: BoardProps) {
  if (!(await getAuthUser())) {
    return <Unauthorized />;
  }

  const { boardName } = params;
  const allowedBoardNames = boardList.map((item) => item.href);
  if (!allowedBoardNames.includes(boardName)) {
    return notFound()
  }
  const posts = await getPostsByBoard(boardName);

  return (
    <div className="min-h-[92vh] px-4 flex items-center justify-center">
      <div className="md:w-1/2 w-11/12 min-h-fulll px-2 everynyan-scroll">
        {posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            body={post.body}
            board={post.board}
            upvotes={post.upvotes}
            downvotes={post.downvotes}
            id={post.id}
            moderation_status={"pending"}
            comments={[]} />
        ))}
      </div>
    </div>
  );
}
