import { NextResponse } from "next/server";
import db from "@/Database/db";

// Correctly export GET method
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await params; // Get the id from params
    const user = await db.query(`SELECT * FROM users WHERE id = ${id} LIMIT 1;`);
    if (!user.length) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user[0]); // Return user data
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

