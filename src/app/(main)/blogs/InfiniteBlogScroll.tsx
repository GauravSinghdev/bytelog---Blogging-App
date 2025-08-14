"use client";

import { Loader2 } from "lucide-react";
import InfiniteScrollContainer from "@/components/shared/InfiniteScrollContainer";
import BlogComp from "./BlogComp";
import { useBlogQuery } from "../create-blog/useCreateBlogComp";
import { BlogSkeleton } from "./BlogSkeleton";

export default function InfiniteBlogScroll() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
  } = useBlogQuery();

  const blogsArr = data?.pages.flatMap((page) => page.posts);

  if (isPending) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2  gap-4 px-5 lg:px-0">
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }

  return (
    <div>
      {isError && (
        <div className="mb-4 text-red-500">Error loading blogs</div>
      )}

      {!isLoading && !isError && blogsArr?.length === 0 && (
        <div className="mb-4">No blogs yet.</div>
      )}

      {blogsArr && blogsArr.length > 0 && (
        <InfiniteScrollContainer
          onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 px-5 lg:px-0"
        >
          {blogsArr.map((blog, indx) => (
            <BlogComp blog={blog} key={indx} />
          ))}
          {isFetchingNextPage && (
            <div className="flex justify-center col-span-2 my-4">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </InfiniteScrollContainer>
      )}
    </div>
  );
}
