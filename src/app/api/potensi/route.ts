import { readData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await readData<any[]>('potensi.json');
    return NextResponse.json(data.filter(p => p.status !== 'Draft' && p.status !== 'draft'));
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
