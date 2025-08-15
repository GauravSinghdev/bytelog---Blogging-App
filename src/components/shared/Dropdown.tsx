"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NameProp {
  name: string;
  avatarUrl: string;
  id: string;
}

export function DropdownMenuCheckboxes({ name, avatarUrl, id }: NameProp) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer border-2">
          <AvatarImage src={avatarUrl} alt={name.split(" ")[0]} />
          <AvatarFallback>
            {name.split(" ")[0][0] + name.split(" ")[0][1]}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-fit p-2 border-2 cursor-pointer">
        <DropdownMenuLabel>
          Logged in as <span className="text-primary">@{name}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <Link href={`/profile/${id}`}>
          <DropdownMenuItem>
            <User />
            <span>Profile</span>
          </DropdownMenuItem>
        </Link>
        <Link href={`/create-blog`}>
          <DropdownMenuItem>
            <User />
            <span>Create Blog</span>
          </DropdownMenuItem>
        </Link>
        {/* <Link href={`blogs/${id}`}>
          <DropdownMenuItem>
            <NotebookPen />
            <span>My Blogs</span>
          </DropdownMenuItem>
        </Link> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setTimeout(() => {
              signOut({ redirect: true, callbackUrl: "/login" });
              toast.success("You are logged out.");
            }, 1000);
          }}
          className="hover:text-red-500 cursor-pointer"
        >
          <LogOut />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
