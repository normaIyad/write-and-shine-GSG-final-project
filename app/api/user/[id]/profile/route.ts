import { NextResponse } from "next/server";
import db from "@/Database/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, job_title, education, biography, username } = body;

    if (!id || !job_title || !education || !biography || !username) {
      return NextResponse.json(
        { error: "All fields (id, job_title, education, biography, username) are required" },
        { status: 400 }
      );
    }

    const [existingProfile] = await db.query(
      `SELECT * FROM user_profiles WHERE user_id = ?`,
      [id]
    );

    if (existingProfile) {
      await db.query(
        `UPDATE user_profiles 
         SET job_title = ?, education = ?, biography = ?, username = ? 
         WHERE user_id = ?`,
        [job_title, education, biography, username, id]
      );

      return NextResponse.json(
        { message: "Profile updated successfully" },
        { status: 200 }
      );
    } else {
      await db.query(
        `INSERT INTO user_profiles(user_id, job_title, education, biography, username) 
         VALUES (?, ?, ?, ?, ?)`,
        [id, job_title, education, biography, username]
      );

      return NextResponse.json(
        { message: "New user profile created" },
        { status: 201 }
      );
    }
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;

    const [user] = await db.query(
      `SELECT 
         users.id,
         users.username,
         users.email,
         users.image,
         user_profiles.job_title,
         user_profiles.education,
         user_profiles.biography
       FROM users
       LEFT JOIN user_profiles ON users.id = user_profiles.user_id
       WHERE users.id = ?`,
      [id]
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
