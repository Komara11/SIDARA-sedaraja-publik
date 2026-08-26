import { readData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const halaman = await readData<any>('halaman.json');
    return NextResponse.json(halaman);
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
