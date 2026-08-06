import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";

// Dummy data fetching
const getNewsData = (slug: string) => {
  const dummyNews = {
    "panen-raya-padi-2024": {
      title: "Panen Raya Padi 2024 Berjalan Sukses",
      date: "12 Agustus 2024",
      author: "Admin Desa",
      category: "Pertanian",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEUtpJjAbhg6kkhC5rgRhXnU_7ujjec_KvHrsXqLQVJAO2hlagg5yIV88D_OJqSeGL0ZvSXs3veB77jHFC-XAdtC2QFqMoSJLmuRYU-1wqto65XeX2PRMYFUP7S5M1HIeS3nf3r1uT5rCTfZXFLUoeQyv6JiXuJ1I-td9BUa-NSW_ilzrCqQQvpUuldP848y8Z4YYXeIlYBwjInCzwWNt8utMmRQ_l9T3CrSjAMOgKKth-6PxcEsGO",
      content: "Kegiatan panen raya tahun ini menunjukkan peningkatan hasil panen yang signifikan berkat sistem irigasi baru. Berkat dukungan seluruh warga dan kelompok tani lokal, hasil gabah kering panen (GKP) meningkat sebesar 20% dibandingkan musim tanam sebelumnya. Pemerintah desa berterima kasih kepada dinas terkait yang telah membantu pengadaan pupuk bersubsidi."
    },
    "pembukaan-wisata-bukit-pamoroan": {
      title: "Peresmian Fasilitas Baru di Bukit Pamoroan",
      date: "05 Agustus 2024",
      author: "Humas Desa",
      category: "Pariwisata",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnzmyY2bIrPcsXULB4NN3558EDj24ImSvxrrtM6MHxHC7JrF-QxdNJJQ4V062qQoMbD95ZD_6FWHYrwIGrWz9XBbwXf56IHN6GGgfKH70RLJebMEGXMgaAe6Rl3Kyet2clLy9QRqjZWeb9laIyFYJCEjE77mwYOId6yDXLkJxv76CRiMZ1sJCcEqQYxFSo_YAXVyjuqeGhgBeI6a5HNrGz_m_8EOmqG5vl-hbMKffxIj_6xG0uI4i",
      content: "Kini pengunjung dapat menikmati area camping dan spot foto terbaru yang dibangun oleh BUMDes. Fasilitas baru ini mencakup area parkir yang lebih luas, toilet umum standar bersih, serta kios makanan yang diisi oleh pelaku UMKM lokal. Diharapkan fasilitas ini semakin menarik wisatawan luar kota."
    },
    "pelatihan-umkm-kopi": {
      title: "Pelatihan Kemasan Produk Kopi Sedaraja",
      date: "28 Juli 2024",
      author: "Tim Pemberdayaan",
      category: "UMKM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjd7AD5dSZ4FldI_MDuhMSMfKLISG8WHN2kzym_LZIQokz7F0o8wRiwTVGcCmIKDqUNo4RFURxq6rL5mxepfzlwXu2H1h4ZM65Oi8QedYwDFH_beSTTEcg3nBqrarRJTo6s83u_zilLvYlpHQyew7wuG8mrrfjimx3K9CkVXg6-nXEkCAgGgvzEnj4p_a17siPcoxjU5AdALPv9kWLDtL4bfDb5mHVsARfQr48f1NtID7KaAABvkRW",
      content: "Puluhan pelaku UMKM lokal mendapatkan pelatihan cara mengemas dan memasarkan produk kopi ke tingkat nasional. Acara ini diselenggarakan di Balai Desa Sedaraja bekerja sama dengan pakar branding dari Jakarta. Peserta diajarkan menggunakan kemasan eco-friendly yang tahan lama."
    }
  };
  return dummyNews[slug as keyof typeof dummyNews] || null;
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const news = getNewsData(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen pt-12 pb-32">
      <article className="max-w-4xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
        
        <Link href="/berita" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-label-md font-semibold mb-8 bg-primary/5 px-4 py-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Berita
        </Link>
        
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-[14px] font-semibold flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {news.category}
            </span>
            <span className="font-label-sm text-[14px] text-on-surface-variant font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {news.date}
            </span>
            <span className="font-label-sm text-[14px] text-on-surface-variant font-medium flex items-center gap-2 hidden sm:flex">
              <User className="w-4 h-4" />
              {news.author}
            </span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight leading-[1.1]">{news.title}</h1>
        </header>

        <div className="w-full aspect-video rounded-[2rem] overflow-hidden mb-12 shadow-lg relative group">
          <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>

        <div className="prose prose-lg md:prose-xl max-w-none text-on-surface-variant font-body-lg leading-relaxed">
          <p className="whitespace-pre-wrap">{news.content}</p>
        </div>
        
      </article>
    </div>
  );
}
