"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateBlogComp } from "./useCreateBlogComp";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ImageKitUpload from "./imagekit-upload";
import { useState } from "react";
import { postData } from "@/lib/fetch-utils";

export default function AddBlog() {
  const router = useRouter();
  const { data: session } = useSession();
  const mutation = useCreateBlogComp({ session });
  const [imageUrl, setImageUrl] = useState<string>("");

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const title = formData.get("title")?.toString().trim() || "";
    const content = formData.get("content")?.toString().trim() || "";

    if (!session) {
      toast.error("User not logged in!");
      return;
    }
    if (!title || !content) {
      toast.error("Title and content are required!");
      return;
    }

    mutation.mutate(
      { title, content },
      {
        onSuccess: async (blog) => {
          if (imageUrl) {
            await postData("/api/post/add-image", { blogId: blog.id, imageUrl })
              .then(() => toast.success("Blog added successfully!"))
              .catch(() => toast.error("Blog created, but image failed."));
          } else {
            toast.success("Blog added successfully!");
          }
    
          setTimeout(() => {
            router.push("/blogs");
          }, 100);
        },
      }
    );
    
  };

  return (
    <form
      onSubmit={submitForm}
      className="space-y-5 px-5 backdrop-blur-sm md:mt-20"
    >
      <Input name="title" placeholder="Enter title" className="h-12" />
      <Textarea
        name="content"
        placeholder="Enter content"
        className="h-40 text-3xl"
      />
      <ImageKitUpload onUploadSuccess={(url) => setImageUrl(url)} />

      <div className="flex justify-end">
        <Button type="submit" disabled={mutation.isPending} className="w-[40%]">
          {mutation.isPending ? "Posting..." : "Post"}
        </Button>
      </div>
    </form>
  );
}
