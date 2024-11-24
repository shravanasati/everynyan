import { getAuthUser } from "@/lib/user";
import "@/app/scrollbar.css";
import { Unauthorized } from "@/components/Unauthorized";
import { getPostsByBoard } from "@/lib/firebase/posts";
import { Board, boardList } from "@/lib/boards";
import { notFound } from "next/navigation";
import BoardHeader from "@/components/BoardHeader";
import { InfiniteScrollingPosts } from "@/components/InfiniteScrollingPosts";
import { Metadata } from "next";

interface BoardProps {
  params: {
    boardName: string;
  };
}

function getBoardMetadata(boardName: string, boardListProp: Board[]) {
  const boardMetadata = boardListProp.find(
    (board: Board) => board.href === boardName
  );

  if (!boardMetadata) {
    console.warn(`Board "${boardName}" not found in the list.`);
    return {
      title: "Board does not exist",
      description: "Metadata is not available for non-existing board",
    };
  }

  return {
    title: `${boardMetadata.title} | EveryNyan`,
    description:
      boardMetadata.description || `Welcome to ${boardMetadata.title} board.`,
  };
}

export async function generateMetadata({
  params,
}: BoardProps): Promise<Metadata> {
  const boardMetadata = getBoardMetadata(params.boardName, boardList);

  // const ogImageUrl = new URL(
  //   `/api/og?title=${encodeURIComponent(boardMetadata.title)}`,
  //   process.env.NEXT_PUBLIC_BASE_URL
  // ).toString();

  return {
    title: boardMetadata.title,
    description: `${boardMetadata.description} | EveryNyan`,
    // openGraph: {
    //   title: `${boardMetadata.title} | EveryNyan`,
    //   description:
    //     boardMetadata.description || `Welcome to ${boardMetadata.title} board.`,
    //   images: [
    //     {
    //       url: ogImageUrl,
    //       width: 1200,
    //       height: 630,
    //       alt: `${boardMetadata.title} | EveryNyan`,
    //     },
    //   ],
    // },
    // twitter: {
    //   card: "summary_large_image",
    //   title: `${boardMetadata.title} | EveryNyan`,
    //   description:
    //     boardMetadata.description || `Welcome to ${boardMetadata.title} board.`,
    //   images: [ogImageUrl],
    // },
  };
}

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
  const data = JSON.stringify(posts);

  return (
    <div className="min-h-screen bg-background">
      <BoardHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-6 everynyan-scroll">
          {/* {postItems.map((post, index) => (
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
          ))} */}
          <InfiniteScrollingPosts data={data} boardName={boardName} />
        </div>
      </main>
    </div>
  );
}
