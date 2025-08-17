import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import React from "react";
import {
  differenceInSeconds,
  differenceInMinutes,
  differenceInHours,
} from "date-fns";
import { Post } from "../../../../types/all-types";
import { ArrowBigRight } from "lucide-react";

interface BlogCompProps {
  blog: Post;
}

export default function BlogComp({ blog }: BlogCompProps) {
  const createdAt = new Date(blog.createdAt);
  const now = new Date();

  let timeDisplay = "";

  const diffSeconds = differenceInSeconds(now, createdAt);
  const diffMinutes = differenceInMinutes(now, createdAt);
  const diffHours = differenceInHours(now, createdAt);

  if (diffSeconds < 60) {
    timeDisplay = `Just now`;
  } else if (diffMinutes < 60) {
    timeDisplay = `${diffMinutes} min ago`;
  } else if (diffHours < 24) {
    timeDisplay = `${diffHours} hr${diffHours > 1 ? "s" : ""} ago`;
  } else {
    timeDisplay = createdAt.toLocaleString();
  }

  const userName = blog.user?.name ?? "Unknown";
  const avatarUrl = blog.user?.avatarUrl ?? undefined;

  const initials = (() => {
    const names = userName.split(" ");
    if (names.length >= 2) {
      return names[0][0] + names[1][0];
    } else {
      return names[0].slice(0, 2);
    }
  })();

  return (
    <div className="col-span-1 border w-full rounded p-2 flex flex-col gap-2 backdrop-blur-sm">
      <div className="flex items-start gap-3 w-full py-1 border-b shadow-xs">
        <Avatar className="cursor-pointer border-2 w-10 h-10">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={userName} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col">
            <h2 className="font-medium underline underline-offset-2 decoration-gray-500">
              {userName}
            </h2>
            <span className="text-xs italic text-gray-600 dark:text-gray-400">
              {timeDisplay}
            </span>
          </div>
          <div className="hover:text-primary hover:scale-110  duration-300 ">
            
            <Link href={`/blog/${blog.id}`} className="flex gap-1 items-center">
            <span className="italic text-sm">{`${Math.ceil(blog.content.length/200)} min read`}</span>
              <ArrowBigRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full">
        <h1 className="text-2xl font-semibold line-clamp-2">{blog.title}</h1>
        <p className="text-lg line-clamp-2">{blog.content}</p>
      </div>
    </div>
  );
}