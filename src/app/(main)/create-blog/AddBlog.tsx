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
  const [imageFileId, setImageFileId] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

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
          if (imageUrl && imageFileId) {
            await postData("/api/post/add-image", {
              blogId: blog.id,
              imageUrl,
              imageFileId,
            })
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
      <div className="flex flex-col gap-5 md:gap-2">
        <ImageKitUpload
          onUploadStart={() => setIsUploading(true)}
          onUploadEnd={() => setIsUploading(false)}
          onUploadSuccess={(url, fileId) => {
            setImageUrl(url);
            setImageFileId(fileId);
          }}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={mutation.isPending || isUploading}
            className="md:w-[40%] w-full"
          >
            {mutation.isPending ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}
