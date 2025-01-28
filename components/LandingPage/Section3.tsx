"use client";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "A feed that curates content across all boards and gives you a glimpse of what's happening in the community while respecting your short lived attention span",
    name: "Feed",
    src: "/parallax/feed.jpg",
  },
  {
    quote:
      "Post your thoughts, questions, or anything you want to share with the community with complete anonimity and no feaer of being judged",
    name: "Posts",
    src: "/parallax/create.jpg",
  },
  {
    quote:
      "Interact with posts by upvoting or downvoting them and again with complete anonimity. No one will know what you upvoted or downvoted",
    name: "Interact",
    src: "/parallax/updownvote.jpg",
  },
  {
    quote:
      "Comment on posts and interact with the community. Again, with complete anonimity. No one will know who you are",
    name: "Comments",
    src: "/parallax/comments.jpg",
  },
  {
    quote:
      "Get notified when someone interacts with your posts or comments. Get notified when someone comments on your posts and yes you are still anonymous",
    name: "Notifications",
    src: "/parallax/notifications.jpg",
  },
];

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

export default function Section3() {
  return (
    <div className="min-h-[80vh]">
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-center  mt-4 -mb-12 md:mb-0 text-secondary"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={titleVariants}
      >
        EveryNyan has....
      </motion.h2>
      <AnimatedTestimonials testimonials={testimonials} autoplay={false} />
    </div>
  );
}
