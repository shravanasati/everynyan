import { OTPPage } from "@/components/VerifyOTP";
import { getAuthUser } from "@/lib/user";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Verify OTP",
  description: "Verify OTP for logging in",
};

export default async function VerifyOTP() {
  if (await getAuthUser()) {
    redirect("/board");
  }

  return <OTPPage />
}