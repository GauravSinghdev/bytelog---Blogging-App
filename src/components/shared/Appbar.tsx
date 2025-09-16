"use client";

import logo from "../../../public/logo.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserBtn } from "./UserBtn";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ scrollbarGutter: "stable" }} // 👈 fixes layout shift
      className="relative max-w-7xl mx-auto my-2"
    >
      <div className="bg-white/60 dark:bg-slate-900/30 border-2 border-white/20 dark:border-slate-700/40 rounded-xl px-3 md:px-6 py-3 shadow flex justify-between items-center gap-5">
        <div className="flex gap-2">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden relative p-2 rounded-lg"
          >
            {/* Menu Icon */}
            <Menu
              className={`h-6 w-6 absolute transition-all top-1 -right-1 duration-300 ${
                isMenuOpen ? "opacity-0 scale-90" : "opacity-100 scale-100"
              }`}
            />

            {/* X Icon */}
            <X
              className={`h-6 w-6 absolute transition-all top-1 -right-1 duration-300 ${
                isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
          </button>
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={logo}
              alt="logo"
              width={20}
              height={20}
              className="h-8 w-8"
              priority
            />
            <span className="hidden md:block text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              ByteLog
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 sm:gap-8">
          {navArr.map((item) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <Link
                key={item.name}
                href={item.link}
                className={`transition-colors font-semibold ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 underline underline-offset-4"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserBtn />
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-15 border inset-x-0 flex flex-col bg-accent mx-2 rounded divide-y-2 z-50">
          {navArr.map((item) => {
            const isActive = pathname.startsWith(item.link);
            return (
              <Link
                key={item.name}
                href={item.link}
                className={`transition-colors font-semibold p-2 ${
                  isActive
                    ? "text-blue-600 dark:text-blue-400 underline underline-offset-4"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      )}
    </motion.nav>
  );
}
