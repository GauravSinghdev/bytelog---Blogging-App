import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { blogId, imageUrl } = await req.json();

    if (!blogId || !imageUrl) {
      return NextResponse.json(
        { error: "Blog ID and Image URL are required" },
        { status: 400 }
      );
    }

    const updatedBlog = await prisma.post.update({
      where: { id: blogId },
      data: { imageUrl },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error adding image to blog:", error);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}
