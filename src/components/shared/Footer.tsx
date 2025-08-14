"use client";

import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ModeToggle } from "./ModeToggle";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 shadow border-t">
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative bottom-0 left-0 right-0 z-50 max-w-7xl mx-auto py-3"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          {/* Logo & Text */}
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              © {new Date().getFullYear()} ByteLog — All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
              <Link
                key={item}
                href="#"
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Mode Toggle */}
          <ModeToggle />
        </div>
      </motion.footer>
    </footer>
  );
}
