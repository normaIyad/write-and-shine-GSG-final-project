import { NextResponse } from "next/server";
import db from "@/Database/db";


// Correctly export GET method
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; // Get the id from params
    const [user] = await db.query(`
      SELECT 
        u.id, 
        u.username, 
        u.email, 
        u.role, 
        u.image, 
        u.created_at, 
        (SELECT COUNT(*) FROM posts WHERE author_id = u.id) AS post_count,
        (SELECT COUNT(*) FROM comments WHERE user_id = u.id) AS comment_count,
        (SELECT COUNT(*) FROM likes WHERE user_id = u.id) AS like_count
      FROM users u
      WHERE u.id = ?
    `, [id]);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
     return NextResponse.json( user ); 
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}