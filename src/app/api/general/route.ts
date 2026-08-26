import { readData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const [demografi, transparansi, settings, potensi] = await Promise.all([
      readData<any>('demografi.json'),
      readData<any>('transparansi.json'),
      readData<any>('settings.json'),
      readData<any>('potensi.json').catch(() => [])
    ]);
    return NextResponse.json({ demografi, transparansi, settings, potensi });
  } catch {
    return NextResponse.json({}, { status: 500 });
  }
}
