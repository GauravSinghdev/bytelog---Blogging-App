import ImageKit from "imagekit";
import { NextResponse, type NextRequest } from "next/server";

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
  privateKey: process.env.PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT!,
});

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
