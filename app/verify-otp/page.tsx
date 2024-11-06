import { OTPPage } from "@/components/VerifyOTP";
import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";

export default async function VerifyOTP() {
  if (await getAuthUser()) {
    redirect("/board");
  }

  return <OTPPage />
}