import { UpDwVote } from "@/components/Posts/UpDwVote";
import { isLoggedIn } from "@/lib/user";
import { redirect } from "next/navigation";

interface BoardProps {
  params: {
    boardName: string;
  };
}

async function getBoardData(boardName: string) {
  const boardData = {
    name: boardName,
    posts: [
      {
        board: { boardName },
        title: `Post 1 for ${boardName}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae incidunt earum ab ullam aliquid dicta quas blanditiis quod aspernatur necessitatibus quo est provident impedit, quos facere quia suscipit! Iusto.`,
      },
      {
        board: { boardName },
        title: `Post 2 for ${boardName}`,
        content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque vitae incidunt earum ab ullam aliquid dicta quas blanditiis quod aspernatur necessitatibus quo est provident impedit, quos facere quia suscipit! Iusto.`,
      },
    ],
  };
  return boardData;
}

export default async function BoardDetailPage({ params }: BoardProps) {
  if (!(await isLoggedIn())) {
    redirect("/login");
  }

  const { boardName } = params;
  const boardData = await getBoardData(boardName);

  return (
    <div className="min-h-[92vh] px-4">
      <h1>Board: {boardData.name}</h1>
      <ul>
        {boardData.posts.map((post, index) => (
          <li key={index}>
            {post.title} <br />
            {post.content}
            <UpDwVote />
          </li>
        ))}
      </ul>
    </div>
  );
}
