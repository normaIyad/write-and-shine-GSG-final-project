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
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const commentId = parseInt(params.id);
      const body = await req.json();
      const parsed = editSchema.safeParse(body);
  
      if (!parsed.success) {
        return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
      }
  
      const { content } = parsed.data;
  
      const [result] = await db.query(
        `UPDATE comments SET content = ?, updated_at = NOW() WHERE id = ?`,
        [content, commentId]
      );
  
      return NextResponse.json({ message: "Comment updated successfully" }, { status: 200 });
    } catch (error) {
      console.error("Edit comment error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }

  export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
    try {
      const commentId = parseInt(params.id);
  
      // Soft delete: just set is_active to 0
      const [result] = await db.query(
        `UPDATE comments SET is_active = 0 WHERE id = ?`,
        [commentId]
      );
  
      return NextResponse.json({ message: "Comment deleted (soft) successfully" }, { status: 200 });
    } catch (error) {
      console.error("Delete comment error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }
  
export async function GET(req: NextRequest) {
    try {
      const { post_id } = await req.json();
  
      if (!post_id) {
        return NextResponse.json({ error: "post_id is required" }, { status: 400 });
      }
  
      const [comments] = await db.query(
        `SELECT * FROM comments WHERE post_id = ? AND is_active = 1 ORDER BY created_at DESC`,
        [post_id]
      );
  
      return NextResponse.json({ comments }, { status: 200 });
    } catch (error) {
      console.error("Get comments by post_id error:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
  }