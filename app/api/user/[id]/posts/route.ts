import { NextRequest, NextResponse } from "next/server";
import db from "../../../../database/db"; // Adjust the path to your db file
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const userId = parseInt(id);
    console.log(id);
    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 });
    }

    const [userResult]: any = await db.query(
      `SELECT id, username, email, image, created_at FROM users WHERE id = ? LIMIT 1`,
      [userId]
    );

    if (!userResult || userResult.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const user = userResult[0];

    const [posts]: any = await db.query(
      `SELECT 
         p.id, 
         p.title, 
         p.content, 
         p.category_id, 
         p.created_at,
         (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS like_count
       FROM posts p
       WHERE p.author_id = ?
       ORDER BY p.created_at DESC`,
      [userId]
    );

    return NextResponse.json({
      user,
      posts,
    });
  } catch (error) {
    console.error("Error in /api/user/[id]/posts:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
