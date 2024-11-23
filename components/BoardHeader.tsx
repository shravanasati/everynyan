"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const routeEmojis: { [key: string]: string } = {
  confessions: "🤫",
  yap: "🗣️🔊",
  random: "🌀❓",
  gyan: "🤓☝️",
};

export default function BoardHeader() {
  const pathName = usePathname();
  const boardName = pathName.slice(7);
  const emoji = routeEmojis[boardName];
  const capitalizedBoardName =
    boardName.charAt(0).toUpperCase() + boardName.slice(1);

  const emojiVariants = {
    initial: { y: 0, rotate: 0 },
    hover: {
      y: [0, -10, 0],
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="w-full py-6 px-4 md:px-8 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={pathName}
            className="group flex items-center justify-center space-x-3 text-foreground hover:text-primary transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <motion.span
              className="text-3xl"
              variants={emojiVariants}
              initial="initial"
              whileHover="hover"
            >
              {emoji || "☕"}
            </motion.span>
            <motion.span
              className="text-3xl md:text-4xl font-bold tracking-wider"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {capitalizedBoardName || "Feed"}
            </motion.span>
            <motion.span
              className="text-3xl"
              variants={emojiVariants}
              initial="initial"
              whileHover="hover"
            >
              {emoji || "☕"}
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
