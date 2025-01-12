"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  type MotionValue,
} from "framer-motion";

const ParallaxImages = [
  {
    src: "/parallax/create.jpg",
    text: "Create",
    description: "Easily create and share your ideas with the world.",
  },
  {
    src: "/parallax/feed.jpg",
    text: "Feed",
    description: "Explore content tailored to your preferences.",
  },
  {
    src: "/parallax/updownvote.jpg",
    text: "Interact",
    description: "Engage with others through upvotes and downvotes.",
  },
  {
    src: "/parallax/comments.jpg",
    text: "Comment",
    description: "Join the conversation and share your thoughts.",
  },
  {
    src: "/parallax/notifications.jpg",
    text: "Notifications",
    description: "Stay updated with real-time notifications.",
  },
];

function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function ParallaxImage({
  src,
  text,
  description,
}: {
  src: string;
  text: string;
  description: string;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useParallax(scrollYProgress, 150);
  const inView = useInView(ref, { margin: "0px 0px -50% 0px" }); // Trigger when 50% of the element is visible

  return (
    <motion.section
      ref={ref}
      className="h-[75vh] flex justify-center items-center relative scroll-snap-center perspective-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="w-[300px] h-[400px] relative max-h-[80vh] mx-5 border-2 border-border overflow-hidden rounded-lg shadow-lg ">
        <Image
          src={src}
          alt={text}
          className="absolute inset-0 w-full h-full object-cover"
          width={300}
          height={400}
        />
      </div>
      <motion.div
        style={{ y }}
        className="flex flex-col items-center md:items-start md:ml-10 text-left"
      >
        <span className="w-[11.5rem]  text-primary text-[24px] sm:text-[28px] md:text-[36px] lg:text-[40px] font-bold tracking-[-0.5px] sm:tracking-[-1px] mb-1 text-left">
          {text}
        </span>
        <p className="text-primary/60 text-[14px] sm:text-[16px] md:text-[18px] mt-2 md:mt-0 max-w-[300px] text-left">
          {description}
        </p>
      </motion.div>
    </motion.section>
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
      {ParallaxImages.map((image, index) => (
        <ParallaxImage
          key={index}
          src={image.src}
          text={image.text}
          description={image.description}
        />
      ))}
      <motion.div
        className="fixed left-0 right-0 h-2 bg-primary bottom-[50px] rounded-full"
        style={{ scaleX }}
      />
    </div>
  );
}
