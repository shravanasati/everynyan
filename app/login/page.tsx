import { isLoggedIn } from "@/lib/user";
import { redirect } from "next/navigation";
import { LoginPage } from "@/components/LoginPage";

export default async function Login() {
  if (await isLoggedIn()) {
    redirect("/board");
  }

  return <LoginPage />
}