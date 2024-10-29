import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Section1() {
  return (
    <div className="h-screen relative">
      <div className="grid md:grid-cols-2 grid-cols-1 grid-rows-1 gap-1 h-full">
        <div className="flex flex-col justify-center md:items-start items-center">
          <h1 className="text-5xl md:ml-9 md:text-7xl font-black motion-preset-blur-right motion-duration-2000 mb-6 md:text-left text-center tracking-wider">
            Hello<span className="text-primary"> EveryNyan!</span>
          </h1>
          <p className="w-4/5 font-bold text-white/65 md:text-2xl text-sm md:ml-9 md:text-left text-center motion-preset-fade motion-duration-2000 leading-2 md:tracking-wide tracking-widest">
            EveryNyan is your go-to spot to rant, gossip, confess, and spill the
            tea! <br />
            <span className="font-bold text-white/90 text-center">
              That too completely anonymously :)
            </span>
          </p>
          <Link href="#" className="flex">
            <Button
              className="md:py-6  py-2 md:px-8 px-2 mt-4 md:ml-9 text-sm md:text-xl flex justify-center items-center opacity-100 md:font-black font-bold hover:motion-preset-confetti hover:motion-duration-1000 hover:md:py-6 hover:py-2 hover:md:px-8 hover:px-2 hover:mt-4 hover:md:ml-9 hover:flex animate-subtlePulse"
              variant="outline"
            >
              Let&apos;s GO!{" "}
            </Button>
          </Link>
        </div>

        <div className="hidden md:flex p-10">
          <Image
            src="/hero.png"
            alt="chiyo chichi floating lolz"
            height="2400"
            width="1697"
            className="animate-float"
          />
        </div>
      </div>
    </div>
  );
}
