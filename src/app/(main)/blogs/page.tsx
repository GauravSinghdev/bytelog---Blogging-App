import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InfiniteBlogScroll from "./InfiniteBlogScroll";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All blogs"
}


export default function AllBlogPage() {
  return (
    <main className="max-w-5xl mx-auto flex flex-col gap-5 min-h-screen">
      <div className="flex justify-start mt-24">
        <Link href={"/create-blog"}>
          <Button className="w-fit ml-2 md:mr-0 font-semibold">
            Create new Blog
          </Button>
        </Link>
      </div>
      <InfiniteBlogScroll />
    </main>
  );
}
