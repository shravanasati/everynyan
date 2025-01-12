import { type LucideIcon } from "lucide-react";
import { Cat } from "lucide-react";
import { cn } from "@/lib/utils";

interface DottedCardProps {
  color?: string | "yellow" | "blue" | "green" | "red" | "purple";
  lucideIcon: LucideIcon;
  title: string;
  description: string;
}

interface SvgBackgroundProps {
  className?: string;
  color?: string | "yellow" | "blue" | "green" | "red" | "purple";
}

function DottedCard({
  color = "yellow",
  lucideIcon: Icon = Cat,
  title = "Meow",
  description = "Meow meow meow meow meow Meow meow meow meow meow Meow meow meow meow meow Meow meow meow meow meow",
}: DottedCardProps) {
  return (
    <div
      className={cn(
        "relative h-48 w-[350px] rounded-md border-2 grid place-items-center overflow-hidden",
        {
          "border-yellow-300": color === "yellow",
          "border-blue-300": color === "blue",
          "border-green-300": color === "green",
          "border-red-300": color === "red",
          "border-purple-300": color === "purple",
        }
      )}
    >
      <div className="absolute inset-0 z-0">
        <SvgBackground
          color={color}
          className={cn("w-full h-full", {
            "text-yellow-600/80": color === "yellow",
            "text-blue-600/80": color === "blue",
            "texy-green-600/80": color === "green",
            "text-red-600/80": color === "red",
            "text-purple-600/80": color === "purple",
          })}
        />
      </div>

      <div className="relative z-10 w-11/12 h-5/6 flex flex-col items-start justify-end">
        <Icon
          size={56}
          className={cn({
            "text-yellow-300": color === "yellow",
            "text-blue-300": color === "blue",
            "text-green-300": color === "green",
            "text-red-300": color === "red",
            "text-purple-300": color === "purple",
          })}
        />
        <h1
          className={cn(`text-3xl mt-2 mb-3 line-clamp-1 font-bold`, {
            "text-yellow-300": color === "yellow",
            "text-blue-300": color === "blue",
            "text-green-300": color === "green",
            "text-red-300": color === "red",
            "text-purple-300": color === "purple",
          })}
        >
          {title}
        </h1>
        <p
          className={cn(`text-clip line-clamp-2 font-light`, {
            "text-yellow-300/75": color === "yellow",
            "text-blue-300/75": color === "blue",
            "text-green-300/75": color === "green",
            "text-red-300/75": color === "red",
            "text-purple-300/75": color === "purple",
          })}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

export default DottedCard;

function SvgBackground({ className, color = "blue" }: SvgBackgroundProps) {
  return (
    <svg
      className={cn(
        "w-full h-full",
        {
          "text-yellow-300": color === "yellow",
          "text-blue-300": color === "blue",
          "text-green-300": color === "green",
          "text-red-300": color === "red",
          "text-purple-300": color === "purple",
        },
        className
      )}
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <pattern
        id={`dotPattern-${color}`}
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1.5" fill="currentColor" />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#dotPattern-${color})`} />
    </svg>
  );
}
