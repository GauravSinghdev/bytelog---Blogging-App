'use client';

import React, { useState } from "react";
import SearchComp from "./SearchComp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PaginationBlog from "./PaginationBlog";
import FloatAdd from "./FloatAdd";

export default function AllBlogComp() {
  const [query, setQuery] = useState<string>("");

  return (
    <div className="flex relative flex-col gap-5">
      <FloatAdd />
      <div className="flex items-center justify-end mt-10 mx-1 gap-2">
        <SearchComp query={query} setQuery={setQuery} />
        <Link href="/create-blog" className="hidden md:inline">
          <Button className="w-fit mr-3 md:mr-0 font-semibold">
            Create new Blog
          </Button>
        </Link>
      </div>
      <PaginationBlog query={query} />
    </div>
  );
}
