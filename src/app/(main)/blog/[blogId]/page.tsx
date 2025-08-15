import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/fetch-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cache } from "react";

const getBlog = cache(async (blogId: string) => {
  const blog = await getBlogById(blogId);
  if (!blog) notFound();
  return blog;
});

export default async function BlogPage(props: unknown) {
  
  const { blogId } = (props as { params: { blogId: string } }).params;
  const blog = await getBlog(blogId);

  const userName = blog.user?.name ?? "Unknown";
  const avatarUrl = blog.user?.avatarUrl ?? undefined;

  const initials = (() => {
    const names = userName.trim().split(/\s+/);
    return names.length >= 2 ? names[0][0] + names[1][0] : names[0].slice(0, 2);
  })();

  return (
    <main className="max-w-5xl mx-auto flex flex-col gap-5 min-h-screen items-center justify-center">
      <div className="flex flex-col gap-2 p-3 md:p-5 backdrop-blur-sm">
        <div className="flex items-center justify-end">
          
          <div className="flex items-center gap-3 text-gray-600">
            <Avatar className="w-10 h-10 border-2">
              {avatarUrl ? (
                <AvatarImage src={avatarUrl} alt={userName} />
              ) : (
                <AvatarFallback>{initials}</AvatarFallback>
              )}
            </Avatar>
            <div className="divide-y">
              <p className="font-medium">{userName}</p>
              <p className="text-sm italic">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="divide-y-2 ">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <div className="mt-4">{blog.content}</div>
        </div>
        
      </div>
    </main>
  );
}
