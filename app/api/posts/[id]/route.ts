import { NextRequest, NextResponse } from "next/server";
import db from "../../../../Database/db"; // Adjust the path to your db file
import { z } from "zod";
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
      `SELECT * FROM posts WHERE id = ? AND is_active = 1`,
      [postId]
    );

    if ((posts as any[]).length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
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

// Define a schema to validate the body
const editPostSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  content: z.string().min(1, "Content is required").optional(),
  category_id: z.number().optional(),
});

export async function PATCH(
  req: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } =await context.params;
    const postId = parseInt(id);
    const body = await req.json();

    if (isNaN(postId)) {
      return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
    }

    const parsed = editPostSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.format() },
        { status: 400 }
      );
    }

    const updates = parsed.data;
    const fields: string[] = [];
    const values: any[] = [];

    for (const key in updates) {
      fields.push(`${key} = ?`);
      values.push((updates as any)[key]);
    }

    if (fields.length === 0) {
      return NextResponse.json(
        { error: "No fields to update" },
        { status: 400 }
      );
    }

    values.push(postId);

    const query = `
      UPDATE posts 
      SET ${fields.join(", ")}, updated_at = NOW() 
      WHERE id = ? AND is_active = 1
    `;

    await db.query(query, values);

    return NextResponse.json(
      { message: "Post updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Edit post error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const postId = params.id;

    if (!postId) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    // Delete related likes and comments first (optional but recommended)
    await db.query(`DELETE FROM likes WHERE post_id = ?`, [postId]);
    await db.query(`DELETE FROM comments WHERE post_id = ?`, [postId]);

    // Then delete the post itself
    const [result]: any = await db.query(`DELETE FROM posts WHERE id = ?`, [postId]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error deleting post:", err);
    return NextResponse.json(
      { message: "Error deleting post" },
      { status: 500 }
    );
  }
}