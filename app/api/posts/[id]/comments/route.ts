import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../Database/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const [comments] = await db.query(
      `SELECT * FROM comments WHERE post_id = ? AND is_active = 1 ORDER BY created_at DESC`,
      [postId]
    );

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Get comments for post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
