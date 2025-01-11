"use client";

import Link from "next/link";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import ShinyButton from "@/components/ui/shiny-button";
import { motion } from "framer-motion";

export default function Section1() {
  return (
    <motion.div
      className="h-screen w-full flex flex-col justify-center items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="scale-[0.8] mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <ShinyButton className="rounded-full cursor-default">
          <p className="text-white">✨Stay updated with notifications</p>
        </ShinyButton>
      </motion.div>
      <HeroTitle />
      <HeroDescription />
      <motion.div
        className="relative justify-center mt-4 scale-95"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Link href="/login">
          <InteractiveHoverButton
            text="&nbsp; Let's Go"
            className="border-primary/90"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

function HeroTitle() {
  return (
    <motion.div
      className="w-full flex justify-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.7 }}
    >
      <h1 className="text-5xl md:text-7xl md:tracking-widest bg-gradient-to-b from-yellow-500 to-orange-200 bg-clip-text text-transparent text-center px-4 ">
        Hello EveryNyan!
      </h1>
    </motion.div>
  );
}

function HeroDescription() {
  return (
    <motion.div
      className="w-4/5 flex flex-col items-center mt-4 md:mt-8 bg-gradient-to-t from-yellow-50 to-amber-100 bg-clip-text text-transparent md:text-lg text-center text-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.7 }}
    >
      <div>Your anonymous haven for rants and gossip,</div>
      <div>confessions and spilling the tea!</div>
      <div className="mt-2">
        Join us to share your thoughts and secrets without judgment.
      </div>
    </motion.div>
  );
}
