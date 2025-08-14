import { notFound } from "next/navigation";
import { getBlogById } from "@/lib/fetch-utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function BlogPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params; // ✅ no await

  const blog = await getBlogById(id);

  if (!blog) {
    notFound();
  }

  const userName = blog.user?.name ?? "Unknown";
  const avatarUrl = blog.user?.avatarUrl ?? undefined;

  const initials = (() => {
    const names = userName.split(" ");
    return names.length >= 2
      ? names[0][0] + names[1][0]
      : names[0].slice(0, 2);
  })();

  return (
    <main className="my-20 max-w-5xl mx-auto flex flex-col gap-5">
      <div className="flex flex-col gap-2 mt-20 lg:mt-40 border p-5 divide-y-2 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{blog.title}</h1>
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
        <div className="mt-4">{blog.content}</div>
      </div>
    </main>
  );
}
