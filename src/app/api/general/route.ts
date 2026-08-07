import { readData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [demografi, transparansi, settings] = await Promise.all([
      readData<any>('demografi.json'),
      readData<any>('transparansi.json'),
      readData<any>('settings.json')
    ]);
    return NextResponse.json({ demografi, transparansi, settings });
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
