import { NextRequest, NextResponse } from "next/server";
import db from "../../../Database/db";
import { z } from "zod";

// Zod schema to validate request body
const commentSchema = z.object({
  post_id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  content: z.string().min(1, "Comment cannot be empty"),
});
const editSchema = z.object({
  content: z.string().min(1, "Comment content cannot be empty"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = commentSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { post_id, user_id, content } = parsed.data;

    const [result] = await db.query(
      `INSERT INTO comments (post_id, user_id, content, is_active, created_at) VALUES (?, ?, ?, 1, NOW())`,
      [post_id, user_id, content]
    );

    return NextResponse.json(
      {
        message: "Comment posted successfully",
        commentId: (result as any).insertId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error posting comment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = parseInt(params.id);

    // Soft delete: just set is_active to 0
    const [result] = await db.query(
      `UPDATE comments SET is_active = 0 WHERE id = ?`,
      [commentId]
    );

    return NextResponse.json(
      { message: "Comment deleted (soft) successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Delete comment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const [comments] = await db.query(
      `
      SELECT 
        c.*, 
        u.id AS user_id,
        u.username AS user_name,
        u.email AS user_email,
        u.image AS user_image,
        p.id AS post_id,
        p.title AS post_title,
        p.content AS post_content
      FROM comments c
      JOIN users u ON c.user_id = u.id
      JOIN posts p ON c.post_id = p.id
      WHERE c.is_active = 1
      ORDER BY c.created_at DESC
      `
    );

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error("Get comments error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
