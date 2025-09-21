import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "../../../../generated/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination (1-based index)
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // Search query
    const q = (searchParams.get("q") || "").trim();

    // Multi-word search (matches ANY word in title/content)
    const searchWords = q.split(/\s+/).filter(Boolean);

    const whereCondition: Prisma.PostWhereInput =
      searchWords.length > 0
        ? {
            OR: searchWords.flatMap((word) => [
              { title: { contains: word, mode: "insensitive" } },
              { content: { contains: word, mode: "insensitive" } },
            ]),
          }
        : {};

    // Count total for pagination
    const totalCount = await prisma.post.count({ where: whereCondition });

    // Fetch posts
    const posts = await prisma.post.findMany({
      where: whereCondition,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
      skip,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      posts,
      hasMore: page * pageSize < totalCount,
      totalCount,
    } satisfies {
      posts: typeof posts;
      hasMore: boolean;
      totalCount: number;
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
