import db from "@/Database/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json("Invalid or missing ID", { status: 400 });
    }
    const intId = parseInt(id, 10);
    if (isNaN(intId)) {
      return NextResponse.json("Invalid ID", { status: 400 });
    }
    const data = await db.query(`SELECT * FROM comments WHERE post_id  = ?`, [intId]);
    if (!data.length) {
      return NextResponse.json("No data found", { status: 404 });
    }
    return NextResponse.json({
      data: data[0],
      status: 200,
    });
  } catch (err) {
    return NextResponse.json(`Server error: ${err}`, { status: 500 });
  }
}
