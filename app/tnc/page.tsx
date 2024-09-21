"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  {
    title: "Platform vs. Publisher",
    content:
      "Please note that Everynyan is a platform for user-generated content. Any posts made on the platform do not represent the views or opinions of Everynyan or SaltNpeppeR(developers behind Everynyan). We encourage you to share your thoughts, but remember that the responsibility for the content lies with the individual users.",
  },
  {
    title: "Anonymity and Data we use",
    content:
      "Your anonymity is our priority. When you post on Everynyan, your identity remains completely hidden. Not even the developers can see your activity or personal information. However, we reserve the right to monitor and manage the content published on the platform to ensure a safe and respectful environment for all users.",
  },
  {
    title: "Freedom of Expression",
    content:
      "Everynyan is a space for everyone, and we value your freedom of expression. We encourage you to share your ideas and opinions openly. However, we ask that you be mindful and considerate in your posts, as we strive to maintain a positive and inclusive community.",
  },
];

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-2xl bg-zinc-900 border-zinc-800 text-zinc-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Terms and Conditions
          </CardTitle>
          <p className="text-zinc-400">
            With great Freedom, Comes great Responsibilities.
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {sections.map((section, index) => (
            <section key={index}>
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p className="text-zinc-400">{section.content}</p>
            </section>
          ))}
          <div className="flex justify-center mt-6">
            <Button variant="secondary" onClick={() => router.back()}>
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
