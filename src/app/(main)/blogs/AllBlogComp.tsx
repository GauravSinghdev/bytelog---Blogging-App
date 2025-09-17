'use client';

import React, { useState } from "react";
import SearchComp from "./SearchComp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PaginationBlog from "./PaginationBlog";

export default function AllBlogComp() {
  const [query, setQuery] = useState("");
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-end mt-10 mx-1 gap-2">
        <SearchComp query={query} setQuery={setQuery} />
        <Link href={"/create-blog"}>
          <Button className="w-fit mr-3 md:mr-0 font-semibold">
            Create <span className="hidden md:inline">new Blog</span>
          </Button>
        </Link>
      </div>
      {/* <InfiniteBlogScroll query={query} /> */}
      <PaginationBlog query={query} />
    </div>
  );
}
