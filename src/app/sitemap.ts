import { MetadataRoute } from 'next';
import { readData } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sedaraja.id';

  // Base routes
  const routes = [
    '',
    '/profil',
    '/pemerintahan',
    '/demografi',
    '/transparansi',
    '/berita',
    '/potensi',
    '/agenda',
    '/galeri',
    '/pengaduan',
    '/informasi-resmi',
    '/layanan-surat',
    '/tim-kkm'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic routes for Berita
    const berita = await readData<any[]>('berita.json').catch(() => []);
    const beritaRoutes = berita
      .filter((b) => b.status === 'published')
      .map((b) => ({
        url: `${baseUrl}/berita/${b.slug || b.id}`,
        lastModified: new Date(b.date || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));

    // Dynamic routes for Potensi
    const potensi = await readData<any[]>('potensi.json').catch(() => []);
    const potensiRoutes = potensi.map((p) => ({
      url: `${baseUrl}/potensi/${p.slug || p.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...routes, ...beritaRoutes, ...potensiRoutes];
  } catch (error) {
    return routes;
  }
}
