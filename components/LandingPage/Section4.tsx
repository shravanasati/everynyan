"use client";

import { motion } from "framer-motion";

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
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center px-4">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center mb-16 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        So far we have
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center"
        initial="hidden"
        animate="visible"
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
            <span className="text-xl md:text-2xl text-primary/70 text-center  w-full">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Section4;
