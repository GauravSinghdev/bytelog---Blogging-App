"use client";

import { ArrowUpRight, Copy, CircleEllipsis } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { AlertDlt } from "./AlertDlt";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface menuProp {
  blogId: string;
  userId: string;
}

export default function MenuBtn({ blogId, userId }: menuProp) {
  const session = useSession();

  console.log();
  const [openMenu, setOpenMenu] = useState(false);

  const currentBlogId = blogId;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`https://bytelog.codewithkara.com/blog/${currentBlogId}`)
      .then(() => {
        toast.success("Copied to clipboard!", {
          position: "bottom-center",
        });
        setOpenMenu(!openMenu);
        return;
      })
      .catch(() => {
        toast.error("Failed to copy!");
      });
  };

  return (
    <div className="relative">
      <button onClick={() => setOpenMenu(!openMenu)} className="cursor-pointer">
        <CircleEllipsis className="opacity-80 active:scale-125 duration-300" />
      </button>

      <div
        className={`absolute border w-40 py-1 shadow rounded-md divide-y-2 text-sm md:text-base -top-20 right-0 transition-opacity duration-500 ${
          openMenu ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <button
          className="w-full hover:bg-transparent cursor-pointer flex items-center justify-center gap-1 py-1 hover:opacity-80 hover:text-green-400"
          onClick={handleCopy}
        >
          Copy <span className="hidden md:inline">Link</span>
          <Copy className="size-4" />
        </button>
        {session?.data?.user?.id === userId ? (
          <AlertDlt currentBlogId={currentBlogId} />
        ) : (
          <Link href={`/profile/${userId}`}>
            <button className="w-full hover:bg-transparent cursor-pointer flex items-center justify-center gap-1 py-1 hover:opacity-80 hover:text-primary/90">
              Visit <span className="hidden md:inline">Profile</span>
              <ArrowUpRight className="size-4" />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
