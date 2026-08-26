import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const nik = formData.get('nik') as string;
    const nama = formData.get('nama') as string;
    const jenis_surat = formData.get('jenis_surat') as string;
    
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filename = `${Date.now()}-${sanitizedName}`;
    
    // Save to data/arsip
    const uploadDir = path.join(process.cwd(), '..', 'data', 'arsip');
    
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    await fs.writeFile(filePath, buffer);

    // Save metadata to data/surat.json
    const dbPath = path.join(process.cwd(), '..', 'data', 'surat.json');
    let suratList = [];
    try {
      const data = await fs.readFile(dbPath, 'utf8');
      suratList = JSON.parse(data);
    } catch {
      // If file doesn't exist or is empty, keep empty array
    }

    const newSurat = {
      id: Date.now().toString(),
      nik,
      nama,
      jenis_surat,
      tanggal: new Date().toISOString(),
      filename: filename
    };

    suratList.push(newSurat);
    await fs.writeFile(dbPath, JSON.stringify(suratList, null, 2));

    return NextResponse.json({ success: true, id: newSurat.id });
  } catch (error) {
    console.error("Upload archive error:", error);
    return NextResponse.json({ error: "Failed to upload archive" }, { status: 500 });
  }
}
