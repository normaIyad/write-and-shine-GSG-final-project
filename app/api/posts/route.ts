import { NextResponse } from "next/server";
import db from "../../../Database/db";
import { ResultSetHeader } from "mysql2";




export async function GET() {
  try {
    // Fetch the latest 5 posts with like and comment counts
    const [posts]:any[] = await db.query(`
      SELECT 
        p.*, 
        (SELECT COUNT(*) FROM likes WHERE post_id = p.id) AS like_count,
        (SELECT COUNT(*) FROM comments WHERE post_id = p.id) AS comment_count
      FROM posts p
      ORDER BY p.created_at DESC
      LIMIT 5
    `);

    // Fetch up to 5 comments for each post
    for (const post of posts) {
      const [comments] = await db.query(
        `
        SELECT * FROM comments 
        WHERE post_id = ? 
        ORDER BY created_at DESC 
        LIMIT 5
      `,
        [post.id]
      );
      post.comments = comments;
    }

    return NextResponse.json({ data: posts }, { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
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
