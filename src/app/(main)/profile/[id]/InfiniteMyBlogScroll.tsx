"use client";

import { Loader2 } from "lucide-react";
import InfiniteScrollContainer from "@/components/shared/InfiniteScrollContainer";
import { BlogSkeleton } from "../../blogs/BlogSkeleton";
import { useMyBlogQuery } from "../../create-blog/useCreateBlogComp";
import BlogComp from "../../blogs/BlogComp";

export default function InfiniteMyBlogScroll({ userId }: { userId: string }) {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useMyBlogQuery(userId);

  const blogsArr = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isPending) {
    return (
      <div className="grid grid-cols-1 gap-4 px-5 lg:px-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div>
      {isError && <div className="mb-4 text-red-500">Error loading blogs</div>}

      {!isLoading && !isError && blogsArr.length === 0 && (
        <div className="mb-4">No blogs found.</div>
      )}

      {blogsArr.length > 0 && (
        <InfiniteScrollContainer
          onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
          className="masonry px-5 lg:px-0"
        >
          {blogsArr.map((blog) => (
            <BlogComp key={blog.id} blog={blog} />
          ))}
          {isFetchingNextPage && (
            <div className="flex justify-center col-span-2">
              <Loader2 className="animate-spin text-primary" />
            </div>
          )}
        </InfiniteScrollContainer>
      )}
    </div>
  );
}
