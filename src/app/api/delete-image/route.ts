import type { NextRequest } from "next/server";
import { imagekit } from "../posts/route";



export async function POST(req: NextRequest) {
  try {
    const { fileId } = await req.json();

    await imagekit.deleteFile(fileId);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: "Server error", details: error.message }),
      { status: 500 }
    );
  }
}
