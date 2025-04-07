import { NextResponse } from "next/server";
import db from "../../database/db";

export async function GET() {
  try {
    const [postsResult]:any = await db.query(`SELECT COUNT(*) AS total_posts FROM posts`);
    const [usersResult] :any= await db.query(`SELECT COUNT(*) AS total_users FROM users`);
    const [commentsResult]:any = await db.query(`SELECT COUNT(*) AS total_comments FROM comments`);

    return NextResponse.json({
      totalPosts: postsResult[0].total_posts,
      totalUsers: usersResult[0].total_users,
      totalComments: commentsResult[0].total_comments,
    });
  } catch (err) {
    console.error("Error fetching statistics:", err);
    return NextResponse.json(
      { message: "Error fetching statistics" },
      { status: 500 }
    );
  }
}
