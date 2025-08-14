"use client";

import { BookOpen, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";
import { UserBtn } from "./UserBtn";

const navArr = [
  {
    name: "All Blogs",
    link: "/blogs",
  },
  {
    name: "About",
    link: "/about",
  },
];

export default function Appbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 z-50 max-w-6xl mx-auto p-2 mt-2 w-full"
    >
      <div className=" bg-white/60 dark:bg-slate-900/30 border-2 border-white/20 dark:border-slate-700/40 rounded-xl px-6 py-3 shadow flex justify-between items-center gap-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            ByteLog
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navArr.map((item) => (
            <Link
              key={item.name}
              href={item.link}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>

          {" "}
          <UserBtn />

        </div>
    </motion.nav>
  );
}
