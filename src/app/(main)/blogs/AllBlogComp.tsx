'use client';

import React, { useState, useEffect } from "react";
import SearchComp from "./SearchComp";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PaginationBlog from "./PaginationBlog";
import { useSearchParams, useRouter } from "next/navigation";
import FloatAdd from "./FloatAdd";

export default function AllBlogComp() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize query from URL
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  // Sync query change with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (query) {
      params.set("q", query);
      params.set("page", "1"); // reset to page 1 on new search
    } else {
      params.delete("q");
      if (!params.get("page")) {
        params.set("page", "1");
      }
    }

    router.replace(`?${params.toString()}`);
  }, [query, router]);

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
