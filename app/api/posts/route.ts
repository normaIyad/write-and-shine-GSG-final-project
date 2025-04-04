import { NextResponse } from "next/server";
import db from "../../../Database/db";
import { ResultSetHeader } from "mysql2";
export async function GET() {
  try {
    const [rows] = await db.query(`SELECT * FROM posts`);
    if (!rows) {
      return NextResponse.json({ message: "No data found" }, { status: 404 });
    }
    return NextResponse.json({ data: rows, status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching data" },
      { status: 500 }
    );
  }
}

export async function POST(res: NextResponse) {
  try {
    const body = await res.json();
    const {
      title,
      content,
      author_id,
      category_id,

      tags,
    } = body;
    if (
      !title ||
      !content ||
      !author_id ||
      !category_id ||
      !tags ||
      !tags.length
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const query = `INSERT INTO posts (title, content, author_id, category_id)
          VALUES (?, ?, ?, ?)`;
    const values = [
      title,
      content,
      author_id,
      category_id,
      // is_active,
      // created_at,
      // updated_at,
    ];
    const [result] = await db.execute<ResultSetHeader>(query, values);
    const postId = result.insertId;
    if (tags.length > 0) {
      const tagQuery = `INSERT INTO post_tags (post_id, tag_id) VALUES ${tags
        .map(() => "(?, ?)")
        .join(",")}`;
      const valuesForTags = tags.flatMap((tag: number) => [postId, tag]);
      await db.execute(tagQuery, valuesForTags);
      console.log("Tags added successfully");
    }
    console.log(postId);
    return NextResponse.json(
      { message: "Data added successfully", pastid: `${postId}` },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error inserting data" },
      { status: 500 }
    );
  }
}
