import db from "@/Database/db";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
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
    const { post_id, user_id  , content} = body;

    if (!post_id || !user_id  || !content) {
      return NextResponse.json({
        message: 'Missing required fields',
        status: 400,
      });
    }
    await db.query(
      `INSERT INTO comments( post_id, user_id, content) VALUES  (?, ? ,?)`,
      [post_id, user_id , content]
    );
    return NextResponse.json({
      message: 'comment created successfully',
      status: 201,
    });
  } catch (err ) {
    return NextResponse.json({
      message: "Error" + err,
      status: 500,
    });
  }
}
export async function DELETE(req : NextRequest){
  try {
    const body = await req.json();
    const {id, post_id, user_id } = body;
    if (!post_id ||!user_id || !id)   {
      return NextResponse.json({
        message: 'Missing required fields',
        status: 400,
      });
    }
    await  db.query(`DELETE from comments WHERE id = ? AND post_id = ? AND  user_id = ? ` , [id ,  post_id, user_id])
    return NextResponse.json({
      message: 'comment removed successfully',
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error" + err,
      status: 500,
    });
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