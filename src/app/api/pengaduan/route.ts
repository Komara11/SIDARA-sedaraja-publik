import { readData, writeData } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pengaduan = await readData<any[]>('pengaduan.json');
    const count = pengaduan.length + 1;

    const newPengaduan = {
      id: `PG-2026-${String(count).padStart(3, '0')}`,
      name: body.name,
      phone: body.phone,
      category: body.category,
      title: body.title || body.category,
      description: body.description,
      photo: body.photo || '',
      status: 'baru',
      date: new Date().toISOString(),
      response: '',
    };

    pengaduan.unshift(newPengaduan);
    await writeData('pengaduan.json', pengaduan);

    return NextResponse.json(newPengaduan, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Gagal membuat pengaduan' }, { status: 500 });
  }
}
