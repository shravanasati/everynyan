import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";

interface BoardProps {
  params: {
    boardName: string;
  };
}

async function getBoardData(boardName: string) {
  const boardData = {
    name: boardName,
    posts: [`Post 1 for ${boardName}`, `Post 2 for ${boardName}`],
  };
  return boardData;
}

export default async function BoardDetailPage({ params }: BoardProps) {
  if (!await getAuthUser()) {
    redirect("/login");
  }

  const { boardName } = params;
  const boardData = await getBoardData(boardName);

  return (
    <div>
      <h1>Board: {boardData.name}</h1>
      <ul>
        {boardData.posts.map((post, index) => (
          <li key={index}>{post}</li>
        ))}
      </ul>
    </div>
  );
}
