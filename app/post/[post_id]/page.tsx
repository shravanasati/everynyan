import { getAuthUser } from "@/lib/user";
import PostView from "@/components/Posts/PostView/PostView";
import { Unauthorized } from "@/components/Unauthorized";

export default async function PostPage() {
  const user = await getAuthUser();

  if (user) {
    return <PostView />;
  } else {
    return <Unauthorized />;
  }
}
