import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";
import { LoginPage } from "@/components/LoginPage";

export const metadata = {
  title: "Login",
  description: "Login to everynyan",
};

export default async function Login() {
  if (await getAuthUser()) {
    redirect("/");
  }

  return <LoginPage />;
}
