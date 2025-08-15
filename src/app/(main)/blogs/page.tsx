import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InfiniteBlogScroll from "./InfiniteBlogScroll";

export default function AllBlogPage() {
  return (
    <main className="max-w-5xl mx-auto flex flex-col gap-5 min-h-screen">
      <div className="flex justify-end mt-20">
        <Link href={"/create-blog"}>
          <Button className="w-fit mt-2 mr-2 md:mr-0 font-semibold">
            Create new Blog
          </Button>
        </Link>
      </div>
      <InfiniteBlogScroll />
    </main>
  );
}
