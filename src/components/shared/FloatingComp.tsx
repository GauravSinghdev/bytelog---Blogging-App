'use client';
import { motion, Variants } from "framer-motion"

export default function FloatingComp() {
  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  }

  return (
    <>
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 blur-xl"
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-pink-400 to-orange-500 rounded-full opacity-20 blur-xl"
        style={{ animationDelay: "2s" }}
      />
      <motion.div
        variants={floatingVariants}
        animate="animate"
        className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 blur-xl"
        style={{ animationDelay: "4s" }}
      />
    </>
  )
}
