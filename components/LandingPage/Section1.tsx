import Link from "next/link";
import InteractiveHoverButton from "../ui/interactive-hover-button";
import ShinyButton from "../ui/shiny-button";

export default function Section1() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <div className="scale-[0.8] mb-4">
        <ShinyButton className="rounded-full cursor-default">
          <p className="text-white">✨Stay updated with notifications</p>
        </ShinyButton>
      </div>
      <HeroTitle />
      <HeroDescription />
      <Link href="/login" className="relative justify-center mt-4 scale-95">
        <InteractiveHoverButton text="&nbsp; Let's Go" className="border-primary/90"/>
      </Link>
    </div>
  );
}

function HeroTitle() {
  return (
    <div className="w-full flex justify-center">
      <h1 className="text-5xl md:text-7xl md:tracking-widest bg-gradient-to-b from-yellow-500 to-orange-200 bg-clip-text text-transparent text-center">
        Hello EveryNyan!
      </h1>
    </div>
  );
}

function HeroDescription() {
  return (
    <div className="w-4/5 flex flex-col items-center mt-4 md:mt-8 bg-gradient-to-t from-yellow-50 to-amber-100 bg-clip-text text-transparent md:text-lg text-center text-sm">
      <div>Your anonymous haven for rants and gossip,</div>
      <div>confessions and spilling the tea!</div>
      <div className="mt-2">
        Join us to share your thoughts and secrets without judgment.
      </div>
    </div>
  );
}
