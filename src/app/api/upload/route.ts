import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const isImage = file.type.startsWith('image/') && file.type !== 'image/svg+xml';
    
    let finalBuffer = buffer;
    let sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    
    if (isImage) {
      try {
        finalBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();
        sanitizedName = sanitizedName.replace(/\.[^/.]+$/, "") + ".webp";
      } catch (err) {
        console.error("Failed to convert image to webp:", err);
      }
    }

    const filename = `${Date.now()}-${sanitizedName}`;
    
    // Save to data/uploads
    const uploadDir = path.join(process.cwd(), '..', 'data', 'uploads');
    
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, finalBuffer);

    // Return the URL that will be used to access this file
    return NextResponse.json({ url: `/api/uploads/${filename}` });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
