"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Clock } from "lucide-react";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [generalData, setGeneralData] = useState<any>(null);
  const [berita, setBerita] = useState<any[]>([]);
  const [h, setH] = useState<any>(null);
  const [kepalaDesa, setKepalaDesa] = useState<any>(null);

  const fallbackImages = [
    "https://i.pinimg.com/1200x/35/99/86/3599860081745127e3e905ae76fa9215.jpg"
  ];
  const heroImages = generalData?.settings?.heroImages?.length > 0 ? generalData.settings.heroImages : fallbackImages;

  useEffect(() => {
    if (typeof window !== 'undefined') window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => prev + 1);
    }, 6000);
    Promise.all([
      fetch('/api/general').then(r => r.json()),
      fetch('/api/berita').then(r => r.json()),
      fetch('/api/halaman').then(r => r.json()),
      fetch('/api/aparatur').then(r => r.json()).catch(() => [])
    ]).then(([gen, ber, hal, aparatur]) => {
      setGeneralData(gen);
      setBerita(Array.isArray(ber) ? ber.slice(0, 4) : []);
      setH(hal);
      if (Array.isArray(aparatur)) {
        setKepalaDesa(aparatur.find((a: any) => a.level === 1) || null);
      }
    }).catch(() => {});
    return () => clearInterval(interval);
  }, []);

  const stats = h?.stats || [
    { icon: "group", count: "3.2k+", label: "Total Penduduk", dynamic: true },
    { icon: "landscape", count: "450", label: "Luas Wilayah (Ha)" },
    { icon: "agriculture", count: "12", label: "Kelompok Tani", dynamic: true },
    { icon: "tour", count: "5", label: "Destinasi Wisata", dynamic: true },
  ];

  const getDynamicValue = (label: string, fallback: string) => {
    if (!generalData) return fallback;
    
    if (label === "Total Penduduk" && generalData?.demografi?.total) {
      return generalData.demografi.total;
    }
    
    if (label === "Kelompok Tani" && generalData?.potensi) {
      let total = 0;
      generalData.potensi.forEach((p: any) => {
        p.metrics.forEach((m: any) => {
           if (m.label.toLowerCase().includes("poktan") || m.value.toLowerCase().includes("poktan") || 
               m.label.toLowerCase().includes("kelompok") || m.value.toLowerCase().includes("kelompok")) {
               const num = parseInt(m.value.replace(/[^0-9]/g, ''));
               if (!isNaN(num) && num > 0) total += num;
           }
        });
      });
      return total > 0 ? total : fallback;
    }
    
    if (label === "Destinasi Wisata" && generalData?.potensi) {
      const total = generalData.potensi.filter((p: any) => p.category.toLowerCase() === "wisata").length;
      return total;
    }
    
    return fallback;
  };

  return (
    <div className="flex flex-col w-full bg-surface overflow-x-hidden">
      {/* Full Width Hero Banner */}
      <section className="relative w-full h-[100svh] min-h-[600px] flex items-center bg-black overflow-hidden">
        {heroImages.map((src: string, idx: number) => (
          <div 
            key={idx} 
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex % heroImages.length ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <img 
              src={src} 
              alt="Pemandangan Desa Sedaraja" 
              className="w-full h-full object-cover opacity-60"
            />
          </div>
        ))}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20 pointer-events-none"></div>

        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-30 w-full flex flex-col items-start text-left mt-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight tracking-tight uppercase">
              Selamat Datang di Portal Resmi <br className="hidden sm:block" />
              <span className="text-emerald-400">Desa Sedaraja</span>
            </h1>
            <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed mb-8 max-w-xl mr-auto">
              Platform terpadu untuk transparansi, pengelolaan potensi lokal, dan pelayanan desa yang berorientasi pada kemajuan berkelanjutan.
            </p>
            <div className="flex flex-wrap items-center justify-start gap-4">
              <Link href="/profil" className="bg-primary hover:bg-emerald-800 text-white font-bold px-6 py-3 text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                <span>Profil Desa</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/transparansi" className="bg-transparent hover:bg-white/10 text-white border border-white/50 font-bold px-6 py-3 text-xs uppercase tracking-widest transition-colors flex items-center gap-2 hidden sm:flex">
                <span>Transparansi Dana</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Slideshow Indicators */}
        <div className="absolute bottom-8 right-8 md:bottom-12 md:right-16 flex gap-2 z-20 hidden lg:flex">
          {heroImages.map((_: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setCurrentImageIndex(idx)}
              className={`w-12 h-1 transition-all duration-300 ${idx === currentImageIndex % heroImages.length ? 'bg-primary' : 'bg-white/30 hover:bg-white/50'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Layanan Mobil Siaga Card (Desktop) */}
        <div className="absolute top-1/2 -translate-y-1/2 right-8 md:right-16 z-30 hidden lg:flex flex-col gap-4 animate-in fade-in slide-in-from-right-8 duration-1000 delay-300 fill-mode-both">
          <div className="bg-white border border-surface-variant/40 p-5 rounded-2xl shadow-2xl max-w-[280px] text-on-surface relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="flex items-center gap-3 mb-3 relative z-10">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-white">ambulance</span>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">Mobil Siaga</h3>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Siap 24 Jam</p>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant mb-5 leading-relaxed relative z-10">
              Layanan darurat medis dan transportasi bersiaga untuk warga Desa Sedaraja.
            </p>
            <a 
              href={`https://wa.me/${generalData?.settings?.telepon ? generalData.settings.telepon.replace(/^0/, '62') : '6282116421443'}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-primary hover:bg-emerald-800 text-white font-bold py-3 px-4 rounded-xl transition-colors relative z-10 shadow-lg"
            >
              <span className="material-symbols-outlined text-[20px]">call</span>
              {generalData?.settings?.telepon || "0821-1642-1443"}
            </a>
          </div>
        </div>

        {/* Layanan Mobil Siaga Floating Button (Mobile) */}
        <div className="absolute bottom-8 right-4 z-30 flex lg:hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
           <a href={`https://wa.me/${generalData?.settings?.telepon ? generalData.settings.telepon.replace(/^0/, '62') : '6282116421443'}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-primary/90 backdrop-blur-md border border-primary/50 text-white p-3 sm:px-4 sm:py-3 rounded-full shadow-2xl hover:bg-emerald-800 transition-colors">
              <span className="material-symbols-outlined animate-pulse">ambulance</span>
              <span className="font-bold text-sm pr-2">{generalData?.settings?.telepon || "0821-1642-1443"}</span>
           </a>
        </div>
      </section>

      {/* Structured Stats */}
      <section className="relative w-full z-20 bg-primary text-white border-b-4 border-primary-fixed">
        <div className="max-w-container-max mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10 border-x border-white/10">
            {stats.map((stat: any, i: number) => (
              <div key={i} className="flex flex-col items-center text-center p-8 sm:p-10 hover:bg-white/5 transition-colors">
                <span className="material-symbols-outlined text-3xl sm:text-4xl text-primary-fixed mb-4">{stat.icon}</span>
                <h3 className="font-sans font-bold text-3xl sm:text-4xl tracking-tight mb-2">
                  {stat.dynamic ? getDynamicValue(stat.label, stat.count) : stat.count}
                </h3>
                <p className="font-sans text-xs sm:text-sm font-semibold text-white/70 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Layanan & Keunggulan (Formal List) */}
      <section className="py-20 sm:py-24 px-margin-mobile md:px-margin-desktop w-full bg-surface-bright">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-surface-variant/60 pb-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Layanan & Informasi</span>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">Fokus Pelayanan Kami</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 border border-surface-variant/60 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-md mb-6 text-primary">
                <span className="material-symbols-outlined text-2xl">public</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Pelayanan Terpadu</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Kemudahan pengurusan dokumen dan surat warga secara digital, cepat, dan transparan melalui kantor administrasi desa.
              </p>
              <Link href="/pengaduan" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                Akses Layanan <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            <div className="bg-white p-8 border border-surface-variant/60 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-md mb-6 text-primary">
                <span className="material-symbols-outlined text-2xl">nature_people</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Potensi Wilayah</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Pengembangan komoditas pertanian unggulan dan destinasi keindahan wisata alam yang dikelola bersama warga.
              </p>
              <Link href="/potensi" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                Lihat Potensi <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white p-8 border border-surface-variant/60 rounded-md shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center rounded-md mb-6 text-primary">
                <span className="material-symbols-outlined text-2xl">analytics</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-3">Data Transparan</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed mb-6">
                Akses terbuka untuk laporan APBDes, statistik demografi, dan inventarisasi aset desa yang diperbarui berkala.
              </p>
              <Link href="/transparansi" className="text-primary font-bold text-sm flex items-center gap-1 hover:underline">
                Cek Data <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Berita Resmi */}
      <section className="py-20 sm:py-24 px-margin-mobile md:px-margin-desktop w-full bg-white border-t border-surface-variant/40">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-surface-variant/60 pb-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Publikasi Resmi</span>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">Kabar Desa Terbaru</h2>
            </div>
            <Link href="/berita" className="text-primary border border-primary/30 hover:bg-primary/5 px-6 py-2 rounded-md text-sm font-bold transition-colors">
              Lihat Semua Kabar
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {berita.map((news, i) => (
              <Link key={i} href={`/berita/${news.slug || news.id}`} className="group flex flex-col border border-surface-variant/60 rounded-md overflow-hidden hover:border-primary/50 transition-colors bg-white">
                <div className="aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
                  {news.image ? (
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center"><span className="material-symbols-outlined text-4xl text-on-surface-variant/30">newspaper</span></div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded">{news.category}</span>
                    <span className="text-[11px] text-on-surface-variant font-medium">{new Date(news.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                  </div>
                  <h3 className="font-bold text-on-surface mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-2">{news.title}</h3>
                  <p className="text-xs text-on-surface-variant line-clamp-2 mt-auto">{news.snippet || news.content}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lokasi & Informasi Operasional */}
      <section className="py-20 sm:py-24 px-margin-mobile md:px-margin-desktop w-full bg-surface border-t border-surface-variant/40">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-surface-variant/60 pb-6">
            <div className="max-w-2xl">
              <span className="text-primary font-bold text-xs uppercase tracking-widest block mb-2">Kantor Desa</span>
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-on-surface tracking-tight">Lokasi & Operasional</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white p-4 rounded-md border border-surface-variant/50 shadow-sm w-full h-[350px] md:h-[450px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15837.28935749712!2d108.3188548!3d-7.0863004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f43e3f4e3c399%3A0x6b74e1d17b4c6439!2sSedaraja%2C%20Kec.%20Cingambul%2C%20Kabupaten%20Majalengka%2C%20Jawa%20Barat!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '4px' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="bg-white p-8 rounded-md border border-surface-variant/60 shadow-sm flex flex-col gap-6">
                <div>
                  <h3 className="font-sans font-bold text-lg text-on-surface flex items-center gap-2 mb-3">
                    <MapPin className="w-5 h-5 text-primary" /> Alamat Kantor
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
                    Jl. Raya Sedaraja No. 1, Kec. Cingambul,<br/>
                    Kabupaten Majalengka, Jawa Barat 45467
                  </p>
                </div>
                
                <div className="h-px bg-surface-variant/40 w-full"></div>
                
                <div>
                  <h3 className="font-sans font-bold text-lg text-on-surface flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-primary" /> Jam Operasional
                  </h3>
                  <ul className="flex flex-col gap-3 font-sans text-sm text-on-surface-variant">
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Senin - Kamis</span>
                      <span className="font-bold text-on-surface">08:00 - 15:00 WIB</span>
                    </li>
                    <li className="flex justify-between items-center">
                      <span className="font-medium">Jumat</span>
                      <span className="font-bold text-on-surface">08:00 - 11:30 WIB</span>
                    </li>
                    <li className="flex justify-between items-center text-red-500/80">
                      <span className="font-medium">Sabtu - Minggu</span>
                      <span className="font-bold">Tutup / Libur</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
