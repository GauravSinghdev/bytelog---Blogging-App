import { fetchData, fetchMyData, postData } from "@/lib/fetch-utils";
import {
  InfiniteData,
  QueryKey,
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Post, PostResponse } from "../../../../types/all-types";
import { Session } from "next-auth";

const queryKey: QueryKey = ["blog"];

export function useBlogQuery(query: string) {
  return useInfiniteQuery<PostResponse>({
    queryKey: ["blog", query],
    queryFn: ({ pageParam }) =>
      fetchData<PostResponse>(
        `/api/posts?${pageParam ? `cursor=${pageParam}&` : ""}q=${encodeURIComponent(query)}`
      ),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useMyBlogQuery(userId: string) {
  return useInfiniteQuery<PostResponse>({
    queryKey: ["myblog", userId],
    queryFn: ({ pageParam }) =>
      fetchMyData<PostResponse>(
        `/api/my-posts?userId=${userId}${pageParam ? `&cursor=${pageParam}` : ""}`
      ),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}


export function useCreateBlogComp({ session }: { session: Session | null }) {
  const queryClient = useQueryClient();

  return useMutation<
    Post,
    Error, 
    { title: string; content: string }, // ✅ what you pass into .mutate
    { previousData?: InfiniteData<PostResponse, number | undefined> } // ✅ context type
  >({
    mutationFn: (newBlog) => postData<Post>("/api/posts", newBlog),

    onMutate: async (newBlogData) => {
      await queryClient.cancelQueries({ queryKey });

      const previousData =
        queryClient.getQueryData<
          InfiniteData<PostResponse, number | undefined>
        >(queryKey);

      const optimisticBlog: Post = {
        id: Date.now().toString(),
        title: newBlogData.title,
        content: newBlogData.content,
        user: {
          id: session?.user?.id || "Anonymous_Id",
          name: session?.user?.name || "Anonymous",
          avatarUrl: session?.user?.image || "",
        },
        createdAt: new Date().toISOString(),
      };

      queryClient.setQueryData<InfiniteData<PostResponse, number | undefined>>(
        queryKey,
        (oldData) => {
          const firstPage = oldData?.pages[0];
          if (!firstPage) return oldData;

          return {
            ...oldData,
            pages: [
              {
                ...firstPage,
                posts: [optimisticBlog, ...firstPage.posts], // ✅ fixed "blogs" → "posts"
              },
              ...oldData.pages.slice(1),
            ],
          };
        }
      );

      return { previousData };
    },

    onError: (error, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
  });
}
