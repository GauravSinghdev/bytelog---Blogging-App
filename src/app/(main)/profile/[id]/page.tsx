import { Metadata } from "next";
import React, { cache } from "react";
import InfiniteMyBlogScroll from "./InfiniteMyBlogScroll";
import { getProfileById } from "@/lib/fetch-utils";
import redirectFn from "@/lib/redirectFn";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { notFound } from "next/navigation";

const getProfile = cache(async (id: string) => {
  const blog = await getProfileById(id);
  if (!blog) notFound();
  return blog;
});

export async function generateMetadata(props: unknown): Promise<Metadata> {
  const { id } = await (props as { params: { id: string } }).params;
  const profile = await getProfile(id);
  return {
    title: profile ? `${profile.name}'s Profile` : "User not found",
    description: profile
      ? `${profile.name}'s blogging profile with ${profile._count.posts} posts`
      : "Profile not available",
  };
}

export default async function ProfilePage(props: unknown) {
  await redirectFn();
  const { id } = await (props as { params: { id: string } }).params;
  const profile = await getProfile(id);

  const userName = profile?.name ?? "Unknown";
  const avatarUrl = profile?.avatarUrl ?? undefined;

  const initials = (() => {
    const names = userName.trim().split(/\s+/);
    return names.length >= 2 ? names[0][0] + names[1][0] : names[0].slice(0, 2);
  })();

  return (
    <main className="mt-10 max-w-6xl mx-auto flex flex-col gap-5">
      <div className="flex border relative backdrop-blur">
        <Avatar className="cursor-pointer shadow p-0.5 size-32 text-2xl">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={avatarUrl} />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col justify-between border-l-2 p-2 lg:p-0">
          <h1 className="text-xl lg:p-1 lg:px-3 font-bold">
            Username: <span className="font-normal">{profile.name}</span>
          </h1>
          <h2 className="text-lg lg:p-1 lg:px-3 font-bold">
            Email:{" "}
            <span className="font-normal italic">{profile.email ?? "N/A"}</span>
          </h2>
          <h3 className="text-lg lg:p-1 lg:px-3 font-bold">
            Total post:{" "}
            <span className="font-normal">{profile._count.posts}</span>
          </h3>
        </div>
        {/* <div className="absolute right-2 top-2">
          <Button
            variant={"outline"}
            className="border text-primary font-semibold hidden md:flex items-center"
          >
            Edit
            <Pencil className="size-5"/>
          </Button>
        </div>
        <div className="absolute right-2 top-2">
          <button className="text-primary font-semibold block md:hidden">
            <Pencil size={20} />
          </button>
        </div> */}
      </div>

      <h1 className="text-xl font-bold text-center">
        Blogs by <span className="text-2xl text-primary">{profile?.name}</span>
      </h1>
      <InfiniteMyBlogScroll userId={id} />
    </main>
  );
}
