import { readData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await readData<any[]>('agenda.json');
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}
