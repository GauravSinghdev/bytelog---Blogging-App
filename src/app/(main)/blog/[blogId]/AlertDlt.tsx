"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteBlog } from "@/lib/fetch-utils";
import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface AlertDltProps {
  currentBlogId: string;
}

export function AlertDlt({ currentBlogId }: AlertDltProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await deleteBlog("/api/posts", currentBlogId);
      if (res) {
        toast.success("Blog deleted successfully");
        setTimeout(() => {
          router.push("/blogs"); 
        }, 500);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="w-full hover:bg-transparent cursor-pointer flex items-center justify-center gap-1 py-1 hover:opacity-80 hover:text-red-400">
          Delete Blog
          <Trash className="size-4" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your blog
            and remove data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-500 hover:font-semibold"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
