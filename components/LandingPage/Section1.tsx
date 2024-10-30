import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Section1() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden -z-50">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-1 h-full">
        <div className="flex flex-col justify-center md:items-start items-center p-4 md:p-9 h-screen">
          <h1 className="text-5xl md:text-7xl font-black motion-preset-blur-right motion-duration-2000 mb-6 md:text-left text-center tracking-wider">
            Hello<span className="text-primary"> EveryNyan!</span>
          </h1>
          <p className="w-full md:w-4/5 font-bold text-white/65 text-sm md:text-2xl md:text-left text-center motion-preset-fade motion-duration-2000 leading-relaxed md:tracking-wide tracking-widest">
            EveryNyan is your go-to spot to rant, gossip, confess, and spill the
            tea! <br className="hidden md:inline" />
            <span className="font-bold text-white/90 block mt-2">
              That too completely anonymously :)
            </span>
          </p>
          <Link href="/login" className="mt-4">
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-2xl font-black hover:motion-preset-confetti hover:motion-duration-1000 animate-subtlePulse hover:flex"
            >
              Let&apos;s Go!
            </Button>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center p-10">
          <Image
            src="/hero.png"
            alt="chiyo chichi floating lolz"
            height={600}
            width={424}
            className="animate-float max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
