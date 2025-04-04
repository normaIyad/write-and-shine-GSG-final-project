import { NextResponse } from "next/server";
import db from "@/Database/db";
export async function POST(res: NextResponse) {
  const data = await res.json();
  const { tag, postId } = data;
  if (!tag || !postId) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }
  const tagId = parseInt(tag);
  const postID = parseInt(postId);
  if (Number.isNaN(tagId) || Number.isNaN(postID)) {
    return NextResponse.json(
      { message: "Invalid tag or postId" },
      { status: 400 }
    );
  }
  const values = [tagId, postID];
  await db.query(`INSERT INTO post_tags (post_id, tag_id) VALUES (?,?)`, {
    values,
  });
  return NextResponse.json({ message: "Tag added to post" });
}
