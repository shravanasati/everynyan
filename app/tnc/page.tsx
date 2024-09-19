"use client"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function TermsAndConditions() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Card className="w-full max-w-md bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-zinc-50">
            Terms and Conditions
          </CardTitle>
          <CardDescription className="text-zinc-400 text-base">
            With great Freedom, Comes great Responsibilities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h1 className="font-extrabold text-2xl text-zinc-50">
            Platform vs. Publisher
          </h1>
          <p className="text-xl text-zinc-400">
            Please note that Everynyan is a platform for user-generated content.
            Any posts made on the platform do not represent the views or
            opinions of Everynyan or SaltNpeppeR(developers behind Everynyan).
            We encourage you to share your thoughts, but remember that the
            responsibility for the content lies with the individual users.
          </p>

          <h1 className="font-extrabold text-2xl text-zinc-50 mt-4">
            Anonymity and Data we use
          </h1>
          <p className="text-xl text-zinc-400">
            Your anonymity is our priority. When you post on Everynyan, your
            identity remains completely hidden. Not even the developers can see
            your activity or personal information. However, we reserve the right
            to monitor and manage the content published on the platform to
            ensure a safe and respectful environment for all users.
          </p>

          <h1 className="font-extrabold text-2xl text-zinc-50 mt-4">
            Freedom of Expression
          </h1>
          <p className="text-xl text-zinc-400">
            Everynyan is a space for everyone, and we value your freedom of
            expression. We encourage you to share your ideas and opinions
            openly. However, we ask that you be mindful and considerate in your
            posts, as we strive to maintain a positive and inclusive community.
          </p>
          <div className="min-w-full flex justify-center gap-4 mt-4">
            <Button className="" variant="secondary" onClick={router.back}>
              Go Back
            </Button>
          </div>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  );
}
