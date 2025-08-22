import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import ImageKit from "imagekit";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursorParam = url.searchParams.get("cursor");
    const cursor = cursorParam || undefined;
    const q = url.searchParams.get("q") || "";
    const pageSize = 10;

    // Split query into words
    const searchWords = q.split(" ").filter(Boolean);

    const posts = await prisma.post.findMany({
      where: searchWords.length
        ? {
            AND: searchWords.map((word) => ({
              OR: [
                { title: { contains: word, mode: "insensitive" } },
                { content: { contains: word, mode: "insensitive" } },
              ],
            })),
          }
        : undefined, // Prisma likes `undefined` instead of {}
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      take: pageSize + 1,
      orderBy: {
        createdAt: "desc",
      },
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    return NextResponse.json({
      posts: posts.slice(0, pageSize),
      nextCursor,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title or Content missing!" },
        { status: 400 }
      );
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        userId: session.user.id,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ message: "Not Authorized" }, { status: 401 });
    }

    const { blogId } = await request.json();

    // Step 1: Fetch the post first
    const post = await prisma.post.findUnique({
      where: { id: blogId },
      select: { userId: true, imageUrl: true, imageFileId: true },
    });

    if (!post || post.userId !== session.user.id) {
      return NextResponse.json(
        { message: "Post not found or you don't have permission" },
        { status: 404 }
      );
    }

    // Step 3: Delete post from DB
    const deletedPost = await prisma.post.delete({
      where: { id: blogId },
    });

    // Step 2: Delete image from ImageKit if exists
    if (post.imageFileId) {
      try {
        await imagekit.deleteFile(post.imageFileId);
      } catch (err) {
        console.error("Failed to delete image from ImageKit:", err);
        // Not fatal → you can add retry logic here later
      }
    }    

    return NextResponse.json(
      { message: "Post deleted successfully", deletedPost },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete post" },
      { status: 500 }
    );
  }
}
