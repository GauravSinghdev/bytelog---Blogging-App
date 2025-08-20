import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { blogId, imageUrl, imageFileId } = await req.json();

    if (!blogId) {
      return NextResponse.json({ error: "Blog ID required" }, { status: 400 });
    }

    if (!imageFileId || !imageUrl) {
      return NextResponse.json(
        { error: "ImageUrl or ImageFileId required" },
        { status: 400 }
      );
    }

    const updatedBlog = await prisma.post.update({
      where: { id: blogId },
      data: { imageUrl, imageFileId },
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    console.error("Error adding image to blog:", error);
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}
