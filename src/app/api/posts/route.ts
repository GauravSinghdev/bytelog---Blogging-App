import { authOptions } from "@/lib/auth";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursorParam = url.searchParams.get("cursor");
    const cursor = cursorParam || undefined;
    const pageSize = 10;

    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
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

    const data = {
      posts: posts.slice(0, pageSize),
      nextCursor,
    };

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        return NextResponse.json(
          {
            message: "Not Authorized",
          },
          { status: 401 }
        );
    }

    const { title, content } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        {
          message: "Title or Content missing!",
        },
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

    return NextResponse.json(newPost, {
      status: 201,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}
