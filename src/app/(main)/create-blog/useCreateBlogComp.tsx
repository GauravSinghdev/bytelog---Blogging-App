import { fetchData, postData } from "@/lib/fetch-utils";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Post, PostResponse } from "../../../../types/all-types";
import { Session } from "next-auth";

const queryKey: QueryKey = ["post"];

export function useBlogQuery() {
  return useInfiniteQuery<PostResponse>({
    queryKey,
    queryFn: ({ pageParam }) =>
      fetchData<PostResponse>(
        `/api/posts?${pageParam ? `cursor=${pageParam}` : ""}`
      ),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useCreateBlogComp({ session }: { session: Session | null }) {
  console.log(session);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newBlog: { title: string; content: string }) =>
      postData("/api/posts", newBlog),

    // Handle optimistic updates
    onMutate: async (newBlogData) => {
      // Cancel any outgoing refetches to avoid them overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value for rollback in case of error
      const previousData =
        queryClient.getQueryData<
          InfiniteData<PostResponse, number | undefined>
        >(queryKey);

      const optimisticBlog: Post = {
        id: Date.now(),
        title: newBlogData.title,
        content: newBlogData.content,
        user: {
          name: session?.user?.name || "Anonymous",
          avatarUrl: session?.user?.image || "",
        },
        createdAt: new Date().toISOString(),
      };

      // Update the cache with our optimistic comment
      queryClient.setQueryData<InfiniteData<PostResponse, number | undefined>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];

          if (firstPage) {
            return {
              ...oldData,
              pages: [
                {
                  ...firstPage,
                  blogs: [optimisticBlog, ...firstPage.posts],
                },
                ...oldData.pages.slice(1),
              ],
            };
          }
        }
      );

      // Return the previous data for the onError handler
      return { previousData };
    },

    // If the mutation fails, roll back to the previous state
    onError(error, variables, context) {
      queryClient.setQueryData(queryKey, context?.previousData);
    },
  });
}
