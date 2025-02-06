import { Dock } from "@/components/Dock";
import { PostCreator } from "@/components/PostCreator";
import { Unauthorized } from "@/components/Unauthorized";
import { getAuthUser } from "@/lib/user";

export const metadata = {
  title: "Create Post",
  description: "Create a post on everynyan",
};

// todo use query params to populate the form

export default async function CreatePost() {
  const user = await getAuthUser();

  if (!user) {
    return <Unauthorized />;
  }

  return (
    <>
      <PostCreator role={user.role ?? "user"} /> <Dock />
    </>
  );
}