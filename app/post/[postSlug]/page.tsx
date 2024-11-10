import { getAuthUser } from "@/lib/user";
import PostView from "@/components/Posts/PostView/PostView";
import { Unauthorized } from "@/components/Unauthorized";

interface PostPageProps {
  params: {
    postSlug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const user = await getAuthUser();
  if (!user) {
    return <Unauthorized />;
  }
  const isAdmin = user.role === "admin"

  const slug = params.postSlug
  const postID = slug.substring(slug.length - 6)
  return <PostView isAdmin={isAdmin} postID = {postID} />;
}
