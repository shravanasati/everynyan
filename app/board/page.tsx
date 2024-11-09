import { getAuthUser } from "@/lib/user";
import { boardList } from "@/lib/boards";
import { BoardsView } from "@/components/BoardsView";
import { Unauthorized } from "@/components/Unauthorized";

export default async function BoardsPage() {
  const loggedIn = await getAuthUser();
  if (!loggedIn) {
    return <Unauthorized />;
  }

  return <BoardsView boards={boardList} />;
}
