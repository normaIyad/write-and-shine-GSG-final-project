import { NextRequest, NextResponse } from "next/server.js";
import db from "../../database/db";

export async function POST(req: NextRequest) {
    try {
      // Parse the incoming request body to get post_id and user_id
      const { post_id, user_id } = await req.json();
  
      // Ensure that both post_id and user_id are provided
      if (!post_id || !user_id) {
        return NextResponse.json(
          { message: "post_id and user_id are required" },
          { status: 400 }
        );
      }
  
      // Convert post_id and user_id to integers
      const postId = parseInt(post_id, 10);
      const userId = parseInt(user_id, 10);
  
      // Validate that post_id and user_id are valid integers
      if (isNaN(postId) || isNaN(userId)) {
        return NextResponse.json(
          { message: "Invalid post_id or user_id" },
          { status: 400 }
        );
      }
  
      // Check if the user has already liked this post
      const [existingLike]: any[] = await db.query(
        `SELECT * FROM likes WHERE post_id = ? AND user_id = ? AND is_active = 1`,
        [postId, userId]
      );
  
      if (existingLike.length > 0) {
        // If the user has already liked the post, deactivate their like (unlike)
        await db.query(
          `UPDATE likes SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE post_id = ? AND user_id = ?`,
          [postId, userId]
        );
        return NextResponse.json(
          { message: "Post unliked successfully" },
          { status: 200 }
        );
      } else {
        // If the user has not liked the post, add a new like
        await db.query(
          `INSERT INTO likes (post_id, user_id, is_active) VALUES (?, ?, 1)`,
          [postId, userId]
        );
        return NextResponse.json(
          { message: "Post liked successfully" },
          { status: 201 }
        );
      }
    } catch (err) {
      console.error("Error processing like request:", err);
      return NextResponse.json(
        { message: "Error processing like" },
        { status: 500 }
      );
    }
  }
  