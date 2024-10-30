"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "@/lib/useMousePosition";
import maskSvg from "../../public/mask.svg";

export default function Section2() {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <main className="h-screen relative bg-[#090909]">
      <motion.div
        className="w-full h-full flex items-center justify-center text-black bg-primary absolute"
        animate={{
          WebkitMaskPosition: `${x - size / 2}px ${y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        style={{
          WebkitMaskImage: `url(${maskSvg.src})`,
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <p
          className="w-full max-w-[1000px] p-10 text-6xl leading-tight cursor-default"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          A visual designer - with skills that haven&apos;t been replaced by A.I
          (yet) - making good stuff only if the paycheck is equally good.
        </p>
      </motion.div>

      <div className="w-full h-full flex items-center justify-center text-white/80">
        <p className="w-full max-w-[1000px] p-10 text-6xl leading-tight cursor-default">
          I&apos;m a <span className="text-primary">selectively skilled</span>{" "}
          product designer with strong focus on producing high quality &
          impactful digital experience.
        </p>
      </div>
    </main>
  );
}
