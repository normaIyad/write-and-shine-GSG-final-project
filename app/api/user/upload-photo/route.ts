import { NextRequest, NextResponse } from "next/server";
import cloudinary from "../../../database/cloudinary";
import db from "../../../../Database/db";
import { Readable } from 'stream';

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

    if (!file || !userId) {
      return NextResponse.json({ error: "Image and user_id are required" }, { status: 400 });
    }

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a readable stream from the buffer
    const readableStream = Readable.from(buffer);

    // Upload to Cloudinary directly from the buffer stream
    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "user-profile-images",
        },
        (error, uploadResult) => {
          if (error) {
            reject(error); // Reject with the error if it occurs
          } else {
            resolve(uploadResult); // Resolve with the upload result
          }
        }
      );

      // Pipe the buffer stream to Cloudinary
      readableStream.pipe(uploadStream);
    });

    // Update user's image_url in the database
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
