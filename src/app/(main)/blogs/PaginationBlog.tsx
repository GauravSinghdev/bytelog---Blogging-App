"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import BlogComp from "./BlogComp";
import { BlogSkeleton } from "./BlogSkeleton";
import { Post } from "../../../../types/all-types";
import { usePaginBlogQuery } from "../create-blog/useCreateBlogComp";

interface PaginationBlogProps {
  query: string;
}

export default function PaginationBlog({ query }: PaginationBlogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = React.useState(pageFromUrl);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  const { data, isPending, isError, error, isFetching } = usePaginBlogQuery(
    query,
    page
  );

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}${query ? `&q=${query}` : ""}`);
  };

  const totalPages = data ? Math.ceil(data.totalCount / 10) : 0;

  // Pagination logic
  const getPaginationNumbers = () => {
    let pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (page > 3) pages.push("...");

      if (page > 1) pages.push(page - 1);
      pages.push(page);
      if (page < totalPages) pages.push(page + 1);

      if (page < totalPages - 2) pages.push("...");

      pages.push(totalPages);
    }

    // Deduplicate while keeping order
    return pages.filter((item, idx) => pages.indexOf(item) === idx);
  };

  if (isPending && isFetching) {
    return (
      <div className="grid lg:grid-cols-2 gap-4 px-2 lg:px-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Error or Blogs */}
      {isError ? (
        <div className="text-center text-red-500">
          Error: {(error as Error).message}
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-4 px-2 lg:px-0">
          {data?.posts?.length > 0 ? (
            data.posts.map((blog: Post) => (
              <BlogComp key={blog.id} blog={blog} />
            ))
          ) : (
            <p className="text-center text-gray-500">No results found.</p>
          )}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-6 mb-4 items-center justify-center flex-wrap">
          {getPaginationNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-3 py-1 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={`page-${p}`}
                onClick={() => handlePageChange(p as number)}
                className={`px-5 py-1 border rounded hover:scale-105 duration-300 cursor-pointer backdrop-blur-sm ${
                  p === page
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {p}
              </button>
            )
          )}
        </div>
      )}
    </div>
  );
}
