import { isLoggedIn } from "@/lib/user";
import { redirect } from "next/navigation";
import { boardList } from "@/lib/boards";
import { BoardsView } from "@/components/BoardsView";

export default async function BoardsPage() {
  const loggedIn = await isLoggedIn();
  if (!loggedIn) {
    redirect("/login");
  }

  return <BoardsView boards={boardList} />;
}
