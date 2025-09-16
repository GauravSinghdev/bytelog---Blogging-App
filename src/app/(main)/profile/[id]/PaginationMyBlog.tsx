"use client";

import React, { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { BlogSkeleton } from "../../blogs/BlogSkeleton";
import BlogComp from "../../blogs/BlogComp";
import { usePaginMyBlogQuery } from "../../create-blog/useCreateBlogComp";
import { Post } from "../../../../../types/all-types";

interface PaginationBlogProps {
  userId: string;
}

export default function PaginationBlog({ userId }: PaginationBlogProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = React.useState(pageFromUrl);

  useEffect(() => {
    setPage(pageFromUrl);
  }, [pageFromUrl]);

  const { data, isPending, isError, error, isFetching } = usePaginMyBlogQuery(
    userId,
    page
  );

  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  const totalPages = data ? Math.ceil(data.totalCount / 10) : 0;

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

      {/* Numbered Pagination Controls (only valid pages) */}
      {totalPages > 1 && (
        <div className="flex gap-2 mt-6 mb-4 items-center justify-center flex-wrap">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1; // 1-based
            return (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-3 py-1 border rounded hover:scale-105 duration-300 cursor-pointer  backdrop-blur-sm ${
                  pageNum === page
                    ? "bg-primary text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
