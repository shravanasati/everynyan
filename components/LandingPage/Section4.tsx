"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { PulsatingButton } from "../ui/pulsating-button";

const stats = [
  { value: "120+", label: "Users" },
  { value: "200+", label: "Posts" },
  { value: "500+", label: "Comments" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

function Section4() {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px 0px",
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        controls.start("visible");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isInView, controls]);

  return (
    <div
      ref={ref}
      className="min-h-[70vh] flex flex-col justify-center items-center px-4"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={controls}
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: -20 },
        }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
      >
        So far we have
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center"
            variants={itemVariants}
          >
            <span className="text-5xl md:text-6xl font-bold text-primary/75 text-center">
              {stat.value}
            </span>
            <span className="text-xl md:text-2xl text-primary/70 text-center w-full">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        className="relative justify-center mt-8 scale-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <Link href="/login">
          <PulsatingButton
            className="bg-foreground text-primary font-bold text-xl tracking-widest border-2 border-border"
            pulseColor="#B59246"
          >
            Join Us!
          </PulsatingButton>
        </Link>
      </motion.div>
    </div>
  );
}

export default Section4;
