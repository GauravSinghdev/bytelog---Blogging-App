'use client';

import React, { useState, useEffect } from "react";
import SearchComp from "./SearchComp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PaginationBlog from "./PaginationBlog";
import { useSearchParams, useRouter } from "next/navigation";

export default function AllBlogComp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize query from URL
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // Sync query change with URL
  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    // Keep current page if exists, otherwise default 1
    const currentPage = searchParams.get("page") || "1";
    params.set("page", currentPage);
    router.replace(`?${params.toString()}`);
  }, [query, router, searchParams]);

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
      <PaginationBlog query={query} />
    </div>
  );
}
