import db from "@/Database/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { post_id, user_id } = body;

    if (!post_id || !user_id) {
      return NextResponse.json({
        message: 'Missing required fields',
        status: 400,
      });
    }
    // Attempt to insert into likes table
    await db.query(
      `INSERT INTO likes (post_id, user_id) VALUES (?, ?)`,
      [post_id, user_id]
    );

    return NextResponse.json({
      message: 'like created successfully',
      status: 201,
    });
  } catch (err ) {
;
    return NextResponse.json({
      message: "Error" + err,
      status: 500,
    });
  }
}
export async function DELETE(req : NextRequest){
  try {
    const body = await req.json();
    const { post_id, user_id } = body;
    if (!post_id ||!user_id) {
      return NextResponse.json({
        message: 'Missing required fields',
        status: 400,
      });
    }
    await  db.query(`DELETE from likes WHERE  post_id = ? AND  user_id = ? ` , [post_id, user_id])
    return NextResponse.json({
      message: 'like removed successfully',
      status: 200,
    });
  } catch (err) {
    return NextResponse.json({
      message: "Error" + err,
      status: 500,
    });
  } 
}
