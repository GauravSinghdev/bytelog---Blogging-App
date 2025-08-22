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
import { X } from "lucide-react"; // icon for close button

export default function AddBlog() {
  const router = useRouter();
  const { data: session } = useSession();
  const mutation = useCreateBlogComp({ session });

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageFileId, setImageFileId] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
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
      <div className="flex flex-col">
        <ImageKitUpload
          disabled={!!imageUrl}
          onUploadStart={() => setIsUploading(true)}
          onUploadEnd={() => setIsUploading(false)}
          onUploadSuccess={(url, fileId, fileName) => {
            setImageUrl(url);
            setImageFileId(fileId);
            setImageName(fileName);
          }}
        />

        {/* Show uploaded image name + close btn */}
        {imageUrl && (
          <div className="flex items-center gap-3">
            <span className="truncate max-w-[200px] text-sm">{imageName}</span>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="border"
              onClick={async () => {
                try {
                  const res = await fetch("api/delete-image", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fileId: imageFileId }),
                  });

                  if (!res.ok) {
                    toast.error("Failed to delete image.");
                    return;
                  }

                  toast.success("Image deleted.");
                  setImageUrl("");
                  setImageFileId("");
                  setImageName("");
                } catch (err) {
                  console.error(err);
                  toast.error("Something went wrong while deleting.");
                }
              }}
            >
              <X className="w-4 h-4 text-red-500" />
            </Button>
          </div>
        )}

        <div className="flex justify-end mt-1">
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
