"use client";

import logo from "../../../public/logo.png";
import { motion } from "framer-motion";
import Link from "next/link";
import { UserBtn } from "./UserBtn";
import Image from "next/image";
import { usePathname } from "next/navigation";

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

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{ scrollbarGutter: "stable" }} // 👈 fixes layout shift
      className="relative max-w-6xl mx-auto my-2"
      >
      <div className="bg-white/60 dark:bg-slate-900/30 border-2 border-white/20 dark:border-slate-700/40 rounded-xl px-6 py-3 shadow flex justify-between items-center gap-5">

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

        {/* Desktop Menu */}
        <div className="flex items-center gap-4 sm:gap-8">
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

        <UserBtn />
      </div>
    </motion.nav>
  );
}
