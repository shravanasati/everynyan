import { getAuthUser } from "@/lib/user";
import PostView from "@/components/Posts/PostView/PostView";
import { Unauthorized } from "@/components/Unauthorized";
import { notFound } from "next/navigation";

interface PostPageProps {
  params: {
    postSlug: string;
  };
}

// todo dynamically generate metadata

export default async function PostPage({ params }: PostPageProps) {
  const user = await getAuthUser();
  if (!user) {
    return <Unauthorized />;
  }
  const isAdmin = user.role === "admin"

  const slug = params.postSlug
  if (slug.length < 6) {
    return notFound()
  }

  const postID = slug.substring(slug.length - 6)
  return <PostView isAdmin={isAdmin} postID = {postID} />;
}
