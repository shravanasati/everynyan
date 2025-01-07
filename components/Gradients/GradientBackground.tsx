"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function GradientBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div className={cn("fixed inset-0 -z-50 overflow-hidden", className)}>
      {/* Base gradient layer */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle at center, #FCAF3C 0%, transparent 40%)",
          opacity: 0.15,
        }}
      />

      {/* Overlay gradient layer with offset timing */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1.50, 0.90, 1.50],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle at center, #FCAF3C 0%, transparent 40%)",
          opacity: 0.1,
        }}
      />
    </div>
  );
}
