import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../database/cloudinary";
import db from "../../../../Database/db";
import { writeFile } from "fs/promises";
import path from "path";

// To parse multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("user_id");
     console.log("ufile", file);
    if (!file || !userId) {
      return NextResponse.json({ error: "Image and user_id are required" }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save temp file
    const tempFilePath = `/tmp/${Date.now()}-${file.name}`;
    await writeFile(tempFilePath, buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(tempFilePath, {
      folder: "user-profile-images",
    });

    // Update user's image_url in DB
    await db.query(
      `UPDATE users SET image = ? WHERE id = ?`,
      [result.secure_url, userId]
    );

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
