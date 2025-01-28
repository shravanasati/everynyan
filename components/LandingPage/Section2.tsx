"use client";

import DottedCard from "@/components/DottedCard";
import { Gem, Users, VenetianMask } from "lucide-react";
import { motion } from "framer-motion";

function Section2() {
  const gridItems = [
    {
      color: "blue",
      lucideIcon: Gem,
      title: "Exclusive",
      description: "Built for Our University Community",
    },
    {
      color: "yellow",
      lucideIcon: VenetianMask,
      title: "Anonymous",
      description: "Your identity stays private, always!",
    },
    {
      color: "purple",
      lucideIcon: Users,
      title: "Diverse",
      description: "Explore Boards tailored to your interest",
    },
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
    hidden: {
      opacity: 0,
      y: 50,
    },
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

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="min-h-[85vh] w-full py-16 px-4 flex flex-col items-center justify-between">
      <div className="max-w-6xl w-full mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-primary"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
        >
          EveryNyan is...
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {gridItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DottedCard
                color={item.color}
                lucideIcon={item.lucideIcon}
                title={item.title}
                description={item.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default Section2;
