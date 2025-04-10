import db from "@/Database/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
const editSchema = z.object({
  content: z.string().min(1, "Comment content cannot be empty"),
});

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const postId = parseInt(params.id);

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const [posts] = await db.query(
      `SELECT * FROM comments WHERE id = ? AND is_active = 1`,
      [postId]
    );

    if ((posts as any[]).length === 0) {
      return NextResponse.json({ error: "Comments not found" }, { status: 404 });
    }

    return NextResponse.json({ post: (posts as any[])[0] }, { status: 200 });
  } catch (error) {
    console.error("Get post by ID error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const commentId = parseInt(id);

    if (isNaN(commentId)) {
      return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
    }

    const [result]: any = await db.query(
      `UPDATE comments SET is_active = 0 WHERE id = ? AND is_active = 1`,
      [commentId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Comment deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Delete comment error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const commentId = parseInt(params.id);

    if (isNaN(commentId)) {
      return NextResponse.json({ error: "Invalid comment ID" }, { status: 400 });
    }

    const body = await req.json();
    const parsed = editSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const { content } = parsed.data;

    const [result]: any = await db.query(
      `UPDATE comments SET content = ?, updated_at = NOW() WHERE id = ? AND is_active = 1`,
      [content, commentId]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Comment updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Edit comment error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
