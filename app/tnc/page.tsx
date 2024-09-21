import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 p-6 text-zinc-50">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold">Terms and Conditions</h1>
        <p className="text-zinc-400 mt-2">
          With great Freedom, Comes great Responsibilities.
        </p>
      </header>

      <main className="w-full max-w-3xl space-y-12">
        {sections.map((section, index) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-bold">{section.title}</h2>
            <p className="text-zinc-400 leading-relaxed">{section.content}</p>
          </div>
        ))}

        <div className="flex justify-center mt-12 gap-6">
          <Link href="/">
            <Button variant="secondary">Home</Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary">LogIn</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
