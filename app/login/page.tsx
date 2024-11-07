import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { LoginPage } from "@/components/LoginPage";

export default async function Login() {
  if (await getAuthUser()) {
    redirect("/board");
  }

  return <LoginPage />;
}
