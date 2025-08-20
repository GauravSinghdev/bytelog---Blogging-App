import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/fetch-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cache } from "react";
import { Metadata } from "next";
import MenuBtn from "./MenuBtn";
import Link from "next/link";
import Image from "next/image";

const getBlog = cache(async (blogId: string) => {
  const blog = await getBlogById(blogId);
  if (!blog) notFound();
  return blog;
});

export async function generateMetadata(props: unknown): Promise<Metadata> {
  const { blogId } = await (props as { params: { blogId: string } }).params;
  const blog = await getBlog(blogId);
  return {
    title: blog.title,
    description:
      blog.content?.slice(0, 150) || "Programmers' blogging and meme app",
  };
}

export default async function BlogPage(props: unknown) {
  const { blogId } = await (props as { params: { blogId: string } }).params;
  const blog = await getBlog(blogId);

  const userName = blog.user?.name ?? "Unknown";
  const avatarUrl = blog.user?.avatarUrl ?? undefined;

  const initials = (() => {
    const names = userName.trim().split(/\s+/);
    return names.length >= 2 ? names[0][0] + names[1][0] : names[0].slice(0, 2);
  })();

  return (
    <main className="max-w-5xl mx-auto flex flex-col gap-5 min-h-screen items-center mt-10">
      <div className="flex flex-col w-full gap-2 p-3 md:p-5 backdrop-blur-sm">
        <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
          <Avatar className="w-10 h-10 border-2">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} alt={userName} />
            ) : (
              <AvatarFallback>{initials}</AvatarFallback>
            )}
          </Avatar>
          <div className="divide-y">
            <Link href={`/profile/${blog?.user?.id}`} className="hover:underline"><p className="font-medium">{userName}</p></Link>
            <p className="text-sm italic">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="divide-y-2 ">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold">{blog.title}</h1>
            <MenuBtn blogId={blogId} userId={blog?.userId} />
          </div>
          <div className="mt-4">{blog.content}</div>
          {
            blog?.imageUrl && (
              <div className="my-5"><Image src={blog?.imageUrl} width={500} height={500} alt="post-image"/></div>
            )
          }
        </div>
      </div>
    </main>
  );
}
