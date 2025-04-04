import { NextRequest, NextResponse } from "next/server";
import db from "../../../database/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"; // Store securely in .env

// Validate input using Zod
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = loginSchema.safeParse(body);

    if (!parsedData.success) {
      console.log("schema error");

      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = parsedData.data;

    // Check if user exists
    const [users] = await db.query(
      "SELECT id, email, password_hash, username FROM users WHERE email = ?",
      [email]
    );
    const user = (users as any[])[0];
    console.log("user", user);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    console.log("isPasswordValid", isPasswordValid);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return NextResponse.json(
      {
        message: "Login successful",
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
