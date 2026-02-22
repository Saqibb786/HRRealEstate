import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadedPaths: string[] = [];

    for (const file of files) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        continue;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        continue;
      }

      // Convert to base64 for Cloudinary upload
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(base64, {
        folder: "hr-real-estate/properties",
        resource_type: "image",
        transformation: [
          { width: 1200, height: 800, crop: "limit", quality: "auto" },
        ],
      });

      uploadedPaths.push(result.secure_url);
    }

    if (uploadedPaths.length === 0) {
      return NextResponse.json(
        { error: "No valid image files found" },
        { status: 400 },
      );
    }

    return NextResponse.json({ paths: uploadedPaths }, { status: 201 });
  } catch (error) {
    console.error("Upload failed:", error);
    return NextResponse.json(
      { error: "Failed to upload images" },
      { status: 500 },
    );
  }
}
