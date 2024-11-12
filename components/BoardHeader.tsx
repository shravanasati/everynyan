"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BoardHeader() {
  const pathName = usePathname();

  return (
    <div className="w-full max-w-3xl mx-auto py-4 px-4 md:px-0 sticky">
      <Link
        href={pathName}
        className="flex item-center justify-center text-sm md:text-base font-medium text-primary/50 hover:text-primary transition-colors hover:motion-scale-in-[0.5] hover:motion-rotate-in-[-10deg] hover:motion-blur-in-[10px] hover:motion-delay-[0.75s]/rotate hover:motion-delay-[0.75s]/blur"
      >
        <span className="text-4xl">{pathName.slice(7)}</span>
      </Link>
    </div>
  );
}
