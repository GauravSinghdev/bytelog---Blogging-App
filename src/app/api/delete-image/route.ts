import { NextResponse, type NextRequest } from "next/server";
import { imagekit } from "../posts/route";

export async function POST(req: NextRequest) {
  try {
    const { fileId } = await req.json();

    await imagekit.deleteFile(fileId);

    return NextResponse.json(
      { message: "Deleted post successfully." },
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
