import db from "@/Database/db"
import { NextRequest, NextResponse } from "next/server";

export async function  GET(){
  try{
    const [data] = await db.query(`SELECT * FROM categories`);
    if(!data){
        return NextResponse.json(
            {
                message: 'No data found',
                status: 404,
            }
        )
    }
    return NextResponse.json({
        data,
        status: 200,
    });
  }catch(e){
    console.error(e);
    return NextResponse.json({
        message: 'Error fetching data',
        status: 500,
    })
  }
}

// export async function POST(req:NextRequest){
//     try{
//    const query = `INSERT INTO categories( name,  created_at) VALUES (? , ?)`;
//    const {name} = await req.json();
//    if(!name){
//        return NextResponse.json({ message: 'Missing required fields', status: 400 });
//    }
//    if(name.length >= 4){
//        return NextResponse.json({ message: 'Name should not exceed 4 characters', status: 400 });
//    }
//    const [found] = await db.query(`SELECT id, name, is_active, created_at, updated_at FROM categories WHERE name LIKE ?`,
//     [`${name}%`]);
//    if(found){
//        return NextResponse.json({ message: 'Category already exists', status: 400 });
//    }
//    const createdAt = new Date();
//    const values = [name, createdAt];
//   await db.execute(query, values);
//   return NextResponse.json({ message: 'Category created successfully', status: 201 });
//     } catch (err) {
//         return NextResponse.json({ message: `Error creating category ${err}`, status: 500 });
//     }    
// }
export async function POST(req: NextRequest) {
    try {
      const query = `INSERT INTO categories (name, created_at) VALUES (?, ?)`;
      const { name } = await req.json();
  
      // Validation: Check if name is provided
      if (!name) {
        return NextResponse.json({
          message: "'name' is a mandatory field.",
          status: 400,
        });
      }
  
      // Check if category already exists
      const [found] = await db.query(
        `SELECT id, name, is_active, created_at, updated_at FROM categories WHERE name LIKE ?`,
        [`${name}%`]
      );
  
      if (found) {
        return NextResponse.json({
          message: "Category already exists.",
          status: 400,
        });
      }
  
      // Insert category into the database
      const createdAt = new Date();
      const values = [name, createdAt];
      await db.execute(query, values);
  
      // Success Response
      return NextResponse.json({
        message: "Category created successfully.",
        status: 201,
      });
    } catch (err) {
      console.error("Error creating category:", err);
  
      // Error Response
      return NextResponse.json({
        message: `Error creating category: ${err}`,
        status: 500,
      });
    }
  }


