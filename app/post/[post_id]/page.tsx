import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";
import PostView from "@/components/Posts/PostView/PostView";

export default async function PostPage() {
  const isLoggedin = await getAuthUser();

  if (isLoggedin) {
    return <PostView />;
  } else {
    redirect("/login");
  }
}
