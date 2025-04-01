import { NextResponse } from "next/server";
import db from "../../../Database/db"
export async function GET() {
   try{
    const [rows ] = await db.query(`SELECT * FROM posts`);
    return NextResponse.json(rows);
   }  catch(err){
    console.error(err);
    return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });    
}
}

export async function POST(req : NextResponse) {
    try {
        const body = await req.json();
        const { title, content, author_id, category_id, is_active, created_at, updated_at } = body;
        if (!title || !content || !author_id || !category_id || is_active === undefined || !created_at || !updated_at) {
          return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }
        const query = ` INSERT INTO posts (title, content, author_id, category_id, is_active, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?) `;
        const values = [title, content, author_id, category_id, is_active, created_at, updated_at];
        await db.query(query, values);
        return NextResponse.json({ message: "Data added successfully" }, { status: 200 });
      } catch (err) {
        console.error(err);
        return NextResponse.json({ message: 'Error inserting data' }, { status: 500 });
      } 
}


  