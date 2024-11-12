import { Cat } from "lucide-react";

export function Meow() {
  return (
    <>
      <div className="size-10 sm:size-12 md:size-14 border border-primary/50 flex justify-center items-center rounded-lg cursor-pointer group hover:border-primary transition-colors text-primary/50 hover:text-primary hover:motion-preset-flomoji-[🐱]">
        <span className="scale-[1.5]">
          <Cat />
        </span>
      </div>
    </>
  );
}
