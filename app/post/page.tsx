import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function PostPage() {
  const isLoggedin = await getAuthUser();

  isLoggedin ? redirect("/board") : redirect("/login");
}
