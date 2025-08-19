"use client";

import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Github } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
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
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32"
    >
      <div className="text-center">
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center bg-blue-50 border border-blue-200 rounded-full mb-8 text-black/70 font-bold hover:scale-110 duration-300"
        >
          <Link
            href="https://github.com/GauravSinghdev/bytelog---Blogging-App"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-4 py-2"
          >
            <Github className="mr-2 h-5 w-5" />
            Star it on GitHub
          </Link>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          Share Your{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Stories
          </span>
          <br />
          With The World
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed"
        >
          Create, publish, and grow your audience with our powerful blogging
          platform. Beautiful themes, powerful editor, and built-in analytics to
          help you succeed.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href={"/create-blog"}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
            >
              Start Writing Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href={"/blogs"}>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg bg-transparent"
            >
              View Blogs
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2 dark:text-slate-300">
              10+
            </div>
            <div className="text-slate-600">Active Bloggers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2 dark:text-slate-300">
              50+
            </div>
            <div className="text-slate-600">Blogs Published</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2 dark:text-slate-300">
              100+
            </div>
            <div className="text-slate-600">Monthly Readers</div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
