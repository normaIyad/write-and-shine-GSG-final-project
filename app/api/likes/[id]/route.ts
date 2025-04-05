import db from "@/app/database/db";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const numId = parseInt(id, 10); 
    if (isNaN(numId)) {
      return NextResponse.json({
        message: "Invalid or missing ID",
        status: 400,
      });
    }
    const [data] = await db.query(`SELECT * FROM likes WHERE post_id = ?`, [numId]);
    if (!data ) {
      return NextResponse.json({
        message: "No likes found",
        status: 404,
      });
    }
    return NextResponse.json({
      data,
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({
      message: "Server Error",
      status: 500,
    });
  }
}
