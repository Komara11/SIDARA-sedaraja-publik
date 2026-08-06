"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";

export default function BeritaPage() {
  const dummyNews = [
    {
      slug: "panen-raya-padi-2024",
      title: "Panen Raya Padi 2024 Berjalan Sukses, Tingkatkan Perekonomian Warga",
      date: "12 Agustus 2024",
      category: "Pertanian",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEUtpJjAbhg6kkhC5rgRhXnU_7ujjec_KvHrsXqLQVJAO2hlagg5yIV88D_OJqSeGL0ZvSXs3veB77jHFC-XAdtC2QFqMoSJLmuRYU-1wqto65XeX2PRMYFUP7S5M1HIeS3nf3r1uT5rCTfZXFLUoeQyv6JiXuJ1I-td9BUa-NSW_ilzrCqQQvpUuldP848y8Z4YYXeIlYBwjInCzwWNt8utMmRQ_l9T3CrSjAMOgKKth-6PxcEsGO",
      snippet: "Kegiatan panen raya tahun ini menunjukkan peningkatan hasil panen yang signifikan berkat sistem irigasi baru yang diterapkan. Hal ini diharapkan mampu mendongkrak kesejahteraan petani lokal secara berkelanjutan..."
    },
    {
      slug: "pembukaan-wisata-bukit-pamoroan",
      title: "Peresmian Fasilitas Baru di Bukit Pamoroan",
      date: "05 Agustus 2024",
      category: "Pariwisata",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnzmyY2bIrPcsXULB4NN3558EDj24ImSvxrrtM6MHxHC7JrF-QxdNJJQ4V062qQoMbD95ZD_6FWHYrwIGrWz9XBbwXf56IHN6GGgfKH70RLJebMEGXMgaAe6Rl3Kyet2clLy9QRqjZWeb9laIyFYJCEjE77mwYOId6yDXLkJxv76CRiMZ1sJCcEqQYxFSo_YAXVyjuqeGhgBeI6a5HNrGz_m_8EOmqG5vl-hbMKffxIj_6xG0uI4i",
      snippet: "Kini pengunjung dapat menikmati area camping dan spot foto terbaru yang dibangun oleh BUMDes, memberikan pengalaman wisata alam yang lebih lengkap..."
    },
    {
      slug: "pelatihan-umkm-kopi",
      title: "Pelatihan Kemasan Produk Kopi Sedaraja",
      date: "28 Juli 2024",
      category: "UMKM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjd7AD5dSZ4FldI_MDuhMSMfKLISG8WHN2kzym_LZIQokz7F0o8wRiwTVGcCmIKDqUNo4RFURxq6rL5mxepfzlwXu2H1h4ZM65Oi8QedYwDFH_beSTTEcg3nBqrarRJTo6s83u_zilLvYlpHQyew7wuG8mrrfjimx3K9CkVXg6-nXEkCAgGgvzEnj4p_a17siPcoxjU5AdALPv9kWLDtL4bfDb5mHVsARfQr48f1NtID7KaAABvkRW",
      snippet: "Puluhan pelaku UMKM lokal mendapatkan pelatihan cara mengemas dan memasarkan produk kopi ke tingkat nasional untuk bersaing di pasar digital..."
    },
    {
      slug: "kerja-bakti-agustus",
      title: "Menyambut Kemerdekaan dengan Bersih Desa",
      date: "20 Juli 2024",
      category: "Sosial",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUjI8Tg4v3XRe6CPqxu87V4sa6tG25mR3E0tY70cpjsFchdsry14z0ILYsXaLgckrRPA0C8sj6HDKBIt8_yrWAU0a59iE-VfbclOdQmWOwEzNdZig55fAwzvCHh-48FONpw6QopoWupXuHDR6qL9UoReoAHp0bP33dBpY6tdEhUIG-F-Y7JIgix9rB32ZPjvXj0ZPtJLENgDa-lfckOSSua6vY4d_FH0YaseyFj0RG4BLILFPxhvv_",
      snippet: "Seluruh warga antusias mengikuti kerja bakti membersihkan lingkungan sebagai bentuk persiapan menyambut perayaan HUT RI ke-79..."
    }
  ];

  const dummyAgenda = [
    {
      title: "Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes)",
      date: "15 Sep",
      time: "09:00 - 12:00 WIB",
      location: "Balai Desa Sedaraja",
      description: "Pembahasan rancangan pembangunan desa tahun 2027 bersama tokoh masyarakat dan jajaran aparatur."
    },
    {
      title: "Kerja Bakti Rutin Warga",
      date: "20 Sep",
      time: "07:00 - 10:00 WIB",
      location: "Area Pemakaman & Jalan Utama",
      description: "Kegiatan bersih-bersih rutin setiap bulan untuk menjaga lingkungan tetap asri, diwajibkan bagi seluruh kepala keluarga."
    },
    {
      title: "Festival Budaya Sedaraja",
      date: "10 Okt",
      time: "08:00 - Selesai",
      location: "Lapangan Sepakbola Sedaraja",
      description: "Menampilkan berbagai kesenian daerah, pameran produk UMKM lokal, dan kompetisi olahraga antar dusun."
    }
  ];

  const featuredNews = dummyNews[0];
  const secondaryNews = dummyNews.slice(1);

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright">
      
      {/* Header Spacing */}
      <div className="pt-16"></div>

      {/* Newsroom Section */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Featured News (Left, larger span) */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col group cursor-pointer"
          >
            <Link href={`/berita/${featuredNews.slug}`} className="flex flex-col h-full">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative shadow-md">
                <img 
                  src={featuredNews.image} 
                  alt={featuredNews.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                />
                <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded-full font-label-sm text-[13px] shadow-sm">
                  {featuredNews.category}
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <span className="font-label-sm text-on-surface-variant mb-3">{featuredNews.date}</span>
                <h2 className="font-display-lg text-2xl md:text-4xl text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">
                  {featuredNews.title}
                </h2>
                <p className="font-body-lg text-on-surface-variant line-clamp-3 mb-6">
                  {featuredNews.snippet}
                </p>
                <div className="mt-auto flex items-center text-primary font-label-sm gap-2 font-semibold">
                  Baca Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </motion.article>

          {/* Secondary News List (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="font-title-md text-xl text-on-surface border-b border-surface-variant/50 pb-4 tracking-tight font-semibold">
              Berita Lainnya
            </h3>
            <div className="flex flex-col gap-6">
              {secondaryNews.map((news, i) => (
                <motion.article 
                  key={news.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="group cursor-pointer"
                >
                  <Link href={`/berita/${news.slug}`} className="flex gap-5">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-label-sm text-primary text-[12px] font-semibold">{news.category}</span>
                        <span className="w-1 h-1 rounded-full bg-surface-variant/80"></span>
                        <span className="font-label-sm text-on-surface-variant text-[12px]">{news.date}</span>
                      </div>
                      <h4 className="font-title-md text-lg text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug font-semibold">
                        {news.title}
                      </h4>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* Agenda Section */}
      <section className="py-24 bg-surface-container-low w-full mt-12 border-t border-surface-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="font-display-lg text-3xl md:text-4xl text-on-surface mb-3 tracking-tight">Agenda Kegiatan</h2>
              <p className="font-body-lg text-on-surface-variant">Jadwal acara dan kegiatan resmi desa yang akan datang.</p>
            </div>
            <button className="flex items-center gap-2 font-label-sm text-primary hover:text-primary-fixed transition-colors font-semibold">
              Lihat Semua Agenda <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {dummyAgenda.map((agenda, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-surface-variant/30 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center group"
              >
                {/* Date Block */}
                <div className="w-full md:w-32 shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center bg-primary/5 rounded-2xl p-4 md:py-6 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="font-display-lg text-3xl md:text-4xl text-primary group-hover:text-white mb-0 md:mb-1">{agenda.date.split(" ")[0]}</span>
                  <span className="font-label-sm text-primary/80 group-hover:text-white/80 uppercase tracking-widest">{agenda.date.split(" ")[1]}</span>
                </div>
                
                {/* Content */}
                <div className="flex-grow flex flex-col gap-3">
                  <h3 className="font-title-md text-xl md:text-2xl text-on-surface font-semibold tracking-tight leading-snug">{agenda.title}</h3>
                  <p className="font-body-md text-on-surface-variant line-clamp-2 md:line-clamp-none">{agenda.description}</p>
                </div>
                
                {/* Meta */}
                <div className="w-full md:w-64 shrink-0 flex flex-col gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-surface-variant/30 md:border-l md:pl-8">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Clock className="w-5 h-5 text-primary/70" />
                    <span className="font-label-sm text-[14px]">{agenda.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <MapPin className="w-5 h-5 text-primary/70" />
                    <span className="font-label-sm text-[14px]">{agenda.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
