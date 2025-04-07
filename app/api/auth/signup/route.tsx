import { NextRequest, NextResponse } from "next/server";
import db from "../../../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Replace with a strong secret in .env

// Validate input using Zod
const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.string()
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = signupSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const { username, email, password , role } = parsedData.data;

    // Check if user already exists
    const [existingUser] = await db.query(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if ((existingUser as any[]).length > 0) {
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const [result] = await db.query(
      "INSERT INTO users (username, email, password_hash,role, is_active,created_at, updated_at) VALUES (?, ?, ?, ? ,1, NOW(), NOW())",
      [username, email, hashedPassword , role]
    );

    const userId = (result as any).insertId;

    // Generate JWT token
    const token = jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" });

    return NextResponse.json(
      {
        message: "User registered successfully",
        userId,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
