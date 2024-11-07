import Post from "@/components/Posts/Post";
import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";

interface BoardProps {
  params: {
    boardName: string;
  };
}

async function getBoardData(boardName: string) {
  const boardData = {
    posts: [
      {
        board: boardName,
        title: `Post 1 for ${boardName}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae incidunt earum ab ullam aliquid dicta quas blanditiis quod aspernatur necessitatibus quo est provident impedit, quos facere quia suscipit! Iusto.`,
        upVotes: 31,
        downVotes: 3,
        noOfComments: 10,
      },
      {
        board: boardName,
        title: `Post 2 for ${boardName}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae incidunt earum ab ullam aliquid dicta quas blanditiis quod aspernatur necessitatibus quo est provident impedit, quos facere quia suscipit! Iusto.`,
        upVotes: 12,
        downVotes: 2,
        noOfComments: 10,
      },
      {
        board: boardName,
        title: `Post 2 for ${boardName}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae incidunt earum ab ullam aliquid dicta quas blanditiis quod aspernatur necessitatibus quo est provident impedit, quos facere quia suscipit! Iusto.`,
        upVotes: 12,
        downVotes: 2,
        noOfComments: 10,
      },
      {
        board: boardName,
        title: `Post 2 for ${boardName}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae incidunt earum ab ullam aliquid dicta quas blanditiis quod aspernatur necessitatibus quo est provident impedit, quos facere quia suscipit! Iusto.`,
        upVotes: 12,
        downVotes: 2,
        noOfComments: 10,
      },
      {
        board: boardName,
        title: `Post 2 for ${boardName}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae incidunt earum ab ullam aliquid dicta quas blanditiis quod aspernatur necessitatibus quo est provident impedit, quos facere quia suscipit! Iusto.`,
        upVotes: 12,
        downVotes: 2,
        noOfComments: 10,
      },
    ],
  };
  return boardData;
}

export default async function BoardDetailPage({ params }: BoardProps) {
  if (!(await getAuthUser())) {
    redirect("/login");
  }

  const { boardName } = params;
  const boardData = await getBoardData(boardName);

  return (
    <div className="min-h-[92vh] px-4 flex items-center justify-center">
      <div className="md:w-1/2 w-11/12 min-h-fulll px-2">
        {boardData.posts.map((post, index) => (
          <Post
            key={index}
            title={post.title}
            content={post.content}
            board={post.board}
            upVotes={post.upVotes}
            downVotes={post.downVotes}
            noOfComments={post.noOfComments}
          />
        ))}
      </div>
    </div>
  );
}
