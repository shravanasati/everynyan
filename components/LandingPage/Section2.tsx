import Marquee from "@/components/ui/marquee";

const Keywords = ["Meme", "Yap", "Rant", "Gossip", "Confess", "Meow"];

function MarqueeRows() {
  return (
    <div className="relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee className="[--duration:20s]">
        {Keywords.map((keyword, index) => (
          <h1 key={index} className="text-4xl md:text-6xl font-black opacity-80">
            {keyword}.
          </h1>
        ))}
      </Marquee>
      <Marquee reverse className="[--duration:20s]">
        {Keywords.map((keyword, index) => (
          <h1 key={index} className="text-4xl md:text-6xl font-black opacity-80">
            {keyword}.
          </h1>
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3"></div>
    </div>
  );
}

export default function Section2() {
  return (
    <div className="h-screen flex items-start justify-center">
      <MarqueeRows />
    </div>
  );
}
