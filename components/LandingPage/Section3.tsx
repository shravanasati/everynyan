"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ParallaxImage({ id, src }: { id: number, src: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 300);

  return (
    <section className="h-screen flex justify-center items-center relative scroll-snap-center perspective-500">
      <div
        ref={ref}
        className="w-[300px] h-[400px] relative max-h-[90vh] mx-5 bg-white overflow-hidden"
      >
        <Image
          src={`/placeholder.svg?height=400&width=300`}
          alt="A London skyscraper"
          className="absolute inset-0 w-full h-full object-cover"
          width={300}
          height={400}
        />
      </div>
      <motion.h2
        style={{ y }}
        className="m-0 text-white left-[calc(50%+130px)] text-[56px] font-bold tracking-[-3px] leading-tight absolute"
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  );
}

export default function Section3() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="min-h-screen text-white">
      {[1, 2, 3, 4, 5].map((image, index) => (
        <ParallaxImage id={image} key={index} />
      ))}
      <motion.div
        className="fixed left-0 right-0 h-[5px] bg-primary bottom-[50px]"
        style={{ scaleX }}
      />
    </div>
  );
}
