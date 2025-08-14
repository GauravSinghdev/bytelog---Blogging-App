import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InfiniteBlogScroll from "./InfiniteBlogScroll";

export default function AllBlogPage() {
  return (
      <main className="my-20 max-w-5xl mx-auto flex flex-col gap-5">
        <div className="flex justify-end">
          <Button className="w-fit mt-2 mr-2 md:mr-0 font-semibold">
            <Link href={"/create-blog"}>Create new Blog</Link>
          </Button>
        </div>
        <InfiniteBlogScroll/>

      </main>

  );
}
