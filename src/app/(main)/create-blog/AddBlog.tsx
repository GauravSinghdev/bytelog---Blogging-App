"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBlogComp } from "./useCreateBlogComp";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AddBlog() {
  const router = useRouter();
  const { data: session } = useSession();
  const mutation = useCreateBlogComp({ session });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim() || "";
    const content = formData.get("content")?.toString().trim() || "";

    if (!session) {
      toast.error("User not logged in!");
      return;
    }
    if (!title.trim() || !content.trim()) {
      return;
    }

    mutation.mutate(
      { title, content },
      {
        onSuccess: () => {
          router.push("/blogs");
          toast.success("Comment posted successfully!");
        },
        onError: () => {
          toast.error("Failed to post comment. Please try again.");
        },
      }
    );
  };
  return (
    <>
      <form onSubmit={submitForm} className="space-y-5 px-5 backdrop-blur-sm md:mt-20">
        <Input name="title" placeholder="enter title" className="h-12" />
        <Textarea
          name="content"
          placeholder="enter content"
          className="h-40 text-3xl"
        />
        <div className=" flex justify-end">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="w-[40%]"
          >
            {mutation.isPending ? "Posting..." : "Post"}
          </Button>
        </div>
      </form>
    </>
  );
}
