import { OTPPage } from "@/components/VerifyOTP";
import { isLoggedIn } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function VerifyOTP() {
  if (await isLoggedIn()) {
    redirect("/board");
  }

  return <OTPPage />
}