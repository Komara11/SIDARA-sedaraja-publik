"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const heroImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDGh2hxfjWOAcnPwh0nUAeg0Nv0_wbANKlJ2QwD782wCagoM0ribQDLAxnpB0IDszvXHBKZt1cjeVk2k3q96y7QCcQRMXXR1gNZThhwVa9KbLVWKaGXd95Q6u7Tu9pRyzZvgKKrQSJqA8L719FfYj5Stfa8BJqTDNkcnNEQ26XrcQyzFBOHYeDz32GyRBAqZjy9Wx79ayBM7YPhHMYwVy4SvRuuQ7fglH-cY6AqBL5DW3ROsf8P6FQL",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnzmyY2bIrPcsXULB4NN3558EDj24ImSvxrrtM6MHxHC7JrF-QxdNJJQ4V062qQoMbD95ZD_6FWHYrwIGrWz9XBbwXf56IHN6GGgfKH70RLJebMEGXMgaAe6Rl3Kyet2clLy9QRqjZWeb9laIyFYJCEjE77mwYOId6yDXLkJxv76CRiMZ1sJCcEqQYxFSo_YAXVyjuqeGhgBeI6a5HNrGz_m_8EOmqG5vl-hbMKffxIj_6xG0uI4i",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDEUtpJjAbhg6kkhC5rgRhXnU_7ujjec_KvHrsXqLQVJAO2hlagg5yIV88D_OJqSeGL0ZvSXs3veB77jHFC-XAdtC2QFqMoSJLmuRYU-1wqto65XeX2PRMYFUP7S5M1HIeS3nf3r1uT5rCTfZXFLUoeQyv6JiXuJ1I-td9BUa-NSW_ilzrCqQQvpUuldP848y8Z4YYXeIlYBwjInCzwWNt8utMmRQ_l9T3CrSjAMOgKKth-6PxcEsGO"
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col w-full bg-surface-bright">
      {/* Hero Section */}
      <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Full Screen Image Slider */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img 
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover" 
              src={heroImages[currentImageIndex]}
              alt="Desa Sedaraja"
            />
          </AnimatePresence>
          {/* Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>
        
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full flex flex-col items-center text-center mt-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center max-w-4xl"
          >
            <div className="inline-block bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full font-sans text-sm font-medium mb-8 w-max border border-white/30 shadow-lg">
              Sistem Informasi & Data Terpadu
            </div>
            <h1 className="font-sans font-bold text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.15] tracking-tight drop-shadow-xl">
              Membangun <span className="text-emerald-400">Sedaraja</span><br />Melalui Ekosistem Digital.
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/90 mb-10 max-w-2xl leading-relaxed drop-shadow-md">
              Platform terpadu untuk transparansi, pengelolaan potensi lokal, dan pelayanan desa yang berorientasi pada kemajuan berkelanjutan.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating Stats */}
      <section className="relative px-margin-mobile md:px-margin-desktop w-full -mt-20 md:-mt-24 z-20">
        <div className="max-w-container-max mx-auto">
          <div className="bg-white rounded-[2rem] shadow-2xl shadow-black/5 border border-surface-variant/50 p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "group", count: "3.2k+", label: "Total Penduduk" },
              { icon: "landscape", count: "450", label: "Luas Wilayah (Ha)" },
              { icon: "agriculture", count: "12", label: "Kelompok Tani" },
              { icon: "tour", count: "5", label: "Destinasi Wisata" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="flex flex-col items-center md:items-start text-center md:text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <h3 className="font-sans font-bold text-4xl md:text-5xl text-on-surface tracking-tight mb-2">{stat.count}</h3>
                <p className="font-sans text-sm font-medium text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Profil Singkat */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop w-full relative">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full md:w-1/2 relative"
            >
              <div className="aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl shadow-surface-variant">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFCRVYrpmLXh11AFdsG1r9ap0bPwseYAoj4WgwKYrD9m3TtDfITcPmvr5Edkv7h6UAzH9iM8Ft4F35_5LBTjIswAqYZkXx292XLkHYmTFUdGFxo_Ufic9b661ekTGKLYI-rQJuFuTIHRJ4SXkI6GDbCv3ZXPXZOouH1bN3Zs8eVeILkWF_l33JU6OowoYreSM7aUDe06zrcqKTkeNOxu42YVBqjb7HkqVcLOoSbLVM03BdnirSXlvc"
                  alt="Profil Desa"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-container/20 rounded-full blur-3xl -z-10" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="w-full md:w-1/2 flex flex-col"
            >
              <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-6 tracking-tight leading-tight">
                Harmoni Tradisi & <br/><span className="text-primary">Inovasi Digital.</span>
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 leading-relaxed">
                Desa Sedaraja berkomitmen memberikan pelayanan prima bagi seluruh warga dengan mendigitalisasi inventarisasi dan pengelolaan potensi desa, dari pertanian hingga demografi, untuk kemajuan bersama.
              </p>
              <Link href="/profil" className="text-primary font-title-md text-[16px] flex items-center gap-3 hover:gap-4 transition-all w-max group border-b border-primary/20 pb-1 hover:border-primary">
                Kenali Kami Lebih Dekat
                <span className="material-symbols-outlined text-[18px]">east</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Berita Terbaru */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop w-full bg-white">
        <div className="max-w-container-max mx-auto flex flex-col gap-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-surface-variant/50 pb-8">
            <div className="max-w-2xl">
              <h2 className="font-display-lg text-headline-lg-mobile md:text-display-lg text-on-surface mb-4 tracking-tight">Kabar <span className="text-primary">Desa.</span></h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Pembaruan terkini seputar kegiatan, pembangunan, dan perkembangan di Desa Sedaraja.</p>
            </div>
            <Link href="/berita" className="text-primary bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-full font-title-md text-[15px] flex items-center gap-2 transition-all w-max whitespace-nowrap">
              Lihat Semua Berita
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Featured News (Left) */}
            <motion.article 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-7 group cursor-pointer"
            >
              <Link href={`/berita/panen-raya-padi-2024`}>
                <div className="rounded-[2rem] overflow-hidden mb-6 aspect-video md:aspect-[16/10] relative">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEUtpJjAbhg6kkhC5rgRhXnU_7ujjec_KvHrsXqLQVJAO2hlagg5yIV88D_OJqSeGL0ZvSXs3veB77jHFC-XAdtC2QFqMoSJLmuRYU-1wqto65XeX2PRMYFUP7S5M1HIeS3nf3r1uT5rCTfZXFLUoeQyv6JiXuJ1I-td9BUa-NSW_ilzrCqQQvpUuldP848y8Z4YYXeIlYBwjInCzwWNt8utMmRQ_l9T3CrSjAMOgKKth-6PxcEsGO" alt="Panen Raya" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-primary px-4 py-1.5 rounded-full font-label-sm text-[13px] shadow-sm">
                    Pertanian
                  </div>
                </div>
                <span className="font-label-sm text-on-surface-variant block mb-3">12 Agustus 2024</span>
                <h3 className="font-display-lg text-2xl md:text-4xl text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight leading-snug">Panen Raya Padi 2024 Berjalan Sukses dengan Peningkatan Signifikan</h3>
                <p className="font-body-md text-on-surface-variant line-clamp-2 leading-relaxed">Kegiatan panen raya tahun ini menunjukkan peningkatan hasil panen yang signifikan berkat metode irigasi baru dan semangat gotong royong warga desa.</p>
              </Link>
            </motion.article>

            {/* List News (Right) */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-8 lg:gap-12">
              {[
                {
                  slug: "pembukaan-wisata-bukit-pamoroan",
                  title: "Peresmian Fasilitas Baru di Bukit Pamoroan",
                  date: "05 Agustus 2024",
                  category: "Pariwisata",
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnzmyY2bIrPcsXULB4NN3558EDj24ImSvxrrtM6MHxHC7JrF-QxdNJJQ4V062qQoMbD95ZD_6FWHYrwIGrWz9XBbwXf56IHN6GGgfKH70RLJebMEGXMgaAe6Rl3Kyet2clLy9QRqjZWeb9laIyFYJCEjE77mwYOId6yDXLkJxv76CRiMZ1sJCcEqQYxFSo_YAXVyjuqeGhgBeI6a5HNrGz_m_8EOmqG5vl-hbMKffxIj_6xG0uI4i",
                },
                {
                  slug: "pelatihan-umkm-kopi",
                  title: "Pelatihan Kemasan Produk Kopi Bagi UMKM Lokal",
                  date: "28 Juli 2024",
                  category: "UMKM",
                  image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjd7AD5dSZ4FldI_MDuhMSMfKLISG8WHN2kzym_LZIQokz7F0o8wRiwTVGcCmIKDqUNo4RFURxq6rL5mxepfzlwXu2H1h4ZM65Oi8QedYwDFH_beSTTEcg3nBqrarRJTo6s83u_zilLvYlpHQyew7wuG8mrrfjimx3K9CkVXg6-nXEkCAgGgvzEnj4p_a17siPcoxjU5AdALPv9kWLDtL4bfDb5mHVsARfQr48f1NtID7KaAABvkRW",
                }
              ].map((news, i) => (
                <motion.article 
                  key={news.slug}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className="group cursor-pointer"
                >
                  <Link href={`/berita/${news.slug}`} className="flex gap-6 items-center w-full">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 relative">
                      <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    </div>
                    <div className="flex flex-col py-2">
                      <span className="text-primary font-label-sm text-[12px] uppercase tracking-wider mb-2 block font-semibold">{news.category} &bull; {news.date}</span>
                      <h3 className="font-title-md text-[18px] md:text-[20px] text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-3">{news.title}</h3>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Peta Lokasi */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop w-full bg-white">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            {/* Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full lg:w-1/3 flex flex-col justify-center"
            >
              <h2 className="font-sans font-bold text-3xl md:text-4xl text-on-surface mb-4 tracking-tight">Kunjungi Kami.</h2>
              <p className="font-sans text-base text-on-surface-variant mb-10 leading-relaxed">
                Kantor Kepala Desa Sedaraja terbuka untuk melayani segala kebutuhan administrasi dan informasi masyarakat.
              </p>
              
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-lg text-on-surface mb-2">Alamat</h4>
                    <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">Jl. Raya Sedaraja No. 1, Kec. Cingambul, Kabupaten Majalengka, Jawa Barat</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[24px]">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-sans font-bold text-lg text-on-surface mb-2">Jam Operasional</h4>
                    <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">Senin - Jumat: 08.00 - 15.00 WIB</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="w-full lg:w-2/3 h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/5 border border-surface-variant/30"
            >
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126748.56347862248!2d107.573117!3d-6.9034443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6398252477f%3A0x146a1f93d3e815b2!2sBandung%2C%20Bandung%20City%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Sedaraja"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
