"use client";

import logo from "../../../public/logo.png";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow border-t">
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bottom-0 left-0 right-0 z-50 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          {/* Logo & Text */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <div className="flex flex-col md:flex-row items-center gap-2">
              <Image
                src={logo}
                alt="logo"
                width={24}
                height={24}
                className="size-6"
                priority
              />
              <span className="font-semibold text-slate-700 dark:text-slate-300 flex gap-1 items-center">
                © {new Date().getFullYear()} ByteLog — Created with{" "}
                <Heart className="text-red-500 dark:text-red-400 fill-red-500 dark:fill-red-400 w-4 h-4" />
              </span>
            </div>
            <Link
              href="https://codewithkara.com"
              target="_blank"
              className="underline text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              codewithkara
            </Link>
          </div>
        </div>
      </motion.footer>
    </footer>
  );
}
