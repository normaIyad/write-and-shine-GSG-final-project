import db from "@/Database/db";
import { NextResponse } from "next/server";


export async function GET(){
    try{
    const [rows] = await db.query(`SELECT * FROM tags `) ;
    return NextResponse.json(rows);
    }
    catch(err){
        console.error(err);
        return { message: 'Error fetching data', status: 500 };
    }
}
export async function POST(res : NextResponse){
    try{
    const body = await res.json();
    const { tag } = body;
    if (!tag) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }
    await db.query(
        `INSERT INTO tags (title) VALUES (?)`,
        [tag]
    );
    return NextResponse.json({ message: 'Tag created successfully' });
    }
    catch(err){
        console.error(err);
        return { message: 'Error creating tag', status: 500 };
    }
}