import { readData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const info = await readData<any[]>('informasi-resmi.json');
    return NextResponse.json(info);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
