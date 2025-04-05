import db from "@/Database/db";
import { NextRequest, NextResponse } from "next/server";

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
