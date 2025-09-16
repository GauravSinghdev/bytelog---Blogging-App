import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { Prisma } from "../../../../generated/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = parseInt(searchParams.get("page") || "0", 10);
    const q = searchParams.get("q") || "";
    const pageSize = 10;

    const searchWords = q.split(" ").filter(Boolean);

    const whereCondition: Prisma.PostWhereInput =
      searchWords.length > 0
        ? {
            AND: searchWords.map((word) => ({
              OR: [
                { title: { contains: word, mode: "insensitive" } },
                { content: { contains: word, mode: "insensitive" } },
              ],
            })),
          }
        : {};

    const totalCount = await prisma.post.count({
      where: whereCondition,
    });

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
      skip: page * pageSize,
      take: pageSize,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      posts,
      hasMore: (page + 1) * pageSize < totalCount,
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
