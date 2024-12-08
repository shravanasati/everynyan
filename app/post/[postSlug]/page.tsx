// import { getAuthUser } from "@/lib/user";
import PostView from "@/components/Posts/PostView/PostView";
// import { Unauthorized } from "@/components/Unauthorized";
import { notFound } from "next/navigation";
import { Dock } from "@/components/Dock";
import { getAuthUser } from "@/lib/user";
import { Unauthorized } from "@/components/Unauthorized";

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

  const slug = params.postSlug;
  if (slug.length < 6) {
    return notFound();
  }

  const postID = slug.substring(slug.length - 6);
  return (
    <>
      <PostView  postID={postID} />
      <Dock />
    </>
  );
}
