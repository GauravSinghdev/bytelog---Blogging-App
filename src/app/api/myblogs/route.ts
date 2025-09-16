// /app/api/myblogs/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("user");
    if (!userId) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const page = parseInt(searchParams.get("page") || "1", 10); // default page 1
    const pageSize = 10;

    // Count total posts for user
    const totalCount = await prisma.post.count({
      where: { userId },
    });

    // Fetch paginated posts for user
    const posts = await prisma.post.findMany({
      where: { userId },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true },
        },
      },
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      posts,
      totalCount,
      hasMore: page * pageSize < totalCount,
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
