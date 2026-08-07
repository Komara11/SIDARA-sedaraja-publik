import { readData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const berita = await readData<any[]>('berita.json');
    return NextResponse.json(berita.filter((b) => b.status === 'published'));
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
