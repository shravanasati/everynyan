import { isLoggedIn } from "@/lib/user";
import Link from "next/link";
import { redirect } from "next/navigation";
import { boardList } from "@/lib/boards";

export default async function BoardsPage() {
  if (!await isLoggedIn()) {
    redirect("/login");
  }

  const boards = boardList;
  return (
    <div className="h-screen w-full bg-red-500">
      <h1>hello choose a board</h1>
      <ul>
        {boards.map((board) => (
          <li key={board}>
            <Link href={`/board/${board}`}>{board}</Link>
          </li> 
        ))}
      </ul>
    </div>
  );
}
