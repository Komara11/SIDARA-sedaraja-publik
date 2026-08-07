"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const heroImages = [
  "/images/hero/hero_village_1_1786099765765.png",
  "/images/hero/hero_village_2_1786099820551.png",
  "/images/hero/hero_village_3_1786099842051.png"
];

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [generalData, setGeneralData] = useState<any>(null);
  const [berita, setBerita] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 10000);
    
    Promise.all([
      fetch('/api/general').then(r => r.json()),
      fetch('/api/berita').then(r => r.json())
    ]).then(([gen, ber]) => {
      setGeneralData(gen);
      setBerita(ber.slice(0, 5));
    });
    
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/60" />
        </div>
        
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 w-full flex flex-col items-center text-center mt-12 md:mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col items-center w-full max-w-5xl lg:max-w-6xl"
          >
            <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 leading-[1.15] tracking-tight drop-shadow-xl w-full">
              {generalData?.settings?.motto ? (
                <>
                  <span className="text-emerald-400">{generalData.settings.motto.split(' ')[0]}</span>{' '}
                  {generalData.settings.motto.split(' ').slice(1).join(' ')}
                </>
              ) : (
                <>Membangun <span className="text-emerald-400">Sedaraja</span> Melalui Ekosistem Digital.</>
              )}
            </h1>
            <p className="font-sans text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 max-w-3xl leading-relaxed drop-shadow-md px-4">
              Platform terpadu untuk transparansi, pengelolaan potensi lokal, dan pelayanan desa yang berorientasi pada kemajuan berkelanjutan.
            </p>

            {/* Logos Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="mt-8 flex flex-row items-center bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 shadow-2xl overflow-visible max-w-[90vw] md:max-w-none mx-auto overflow-x-auto hide-scrollbar"
            >
              {/* Kolaborasi Text */}
              <div className="flex flex-col items-start pl-4 md:pl-6 pr-3 md:pr-8 border-r border-white/20 shrink-0">
                <span className="font-sans text-[8px] md:text-xs font-bold tracking-[0.2em] md:tracking-[0.25em] text-emerald-400 uppercase mb-0.5 md:mb-1">
                  Kolaborasi
                </span>
                <span className="font-sans text-[11px] md:text-base font-semibold text-white tracking-wide leading-tight">
                  Ekosistem Digital
                </span>
              </div>
              
              {/* Logos */}
              <div className="flex items-center gap-2 md:gap-5 px-3 md:px-6 py-1 md:py-1 shrink-0">
                {/* Logo Kampus */}
                <div className="relative group w-9 h-9 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] p-1.5 md:p-2.5 hover:scale-110 transition-transform cursor-pointer">
                  <img src="/images/logo_kampus.png" alt="Logo Kampus" className="w-full h-full object-contain" />
                  <div className="absolute -top-12 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-50">
                    INSTBUNAS
                  </div>
                </div>
                
                <span className="text-white/50 text-sm md:text-xl font-light">+</span>
                
                {/* Logo Desa (Tengah) */}
                <div className="relative group w-9 h-9 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] p-1.5 md:p-2.5 hover:scale-110 transition-transform cursor-pointer text-primary">
                  <span className="material-symbols-outlined text-[18px] md:text-[32px]">shield</span>
                  <div className="absolute -top-12 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-50">
                    Desa Sedaraja
                  </div>
                </div>

                <span className="text-white/50 text-sm md:text-xl font-light">+</span>
                
                {/* Logo KKN */}
                <div className="relative group w-9 h-9 md:w-14 md:h-14 rounded-full bg-white flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.3)] p-1 md:p-2 hover:scale-110 transition-transform cursor-pointer">
                  <img src="/images/logo_kkn.png" alt="Logo KKN" className="w-full h-full object-contain scale-95" />
                  <div className="absolute -top-12 bg-black/90 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl z-50">
                    Kuliah Kerja Nyata (KKN)
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Floating Stats */}
      <section className="relative px-margin-mobile md:px-margin-desktop w-full pt-16 md:pt-24 pb-12 z-20 bg-surface-bright">
        <div className="max-w-container-max mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  ease: "easeOut",
                  staggerChildren: 0.15,
                  delayChildren: 0.2
                }
              }
            }}
            className="bg-white rounded-[2rem] shadow-2xl shadow-black/5 border border-surface-variant/50 p-6 sm:p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
          >
            {[
              { icon: "group", count: "3.2k+", label: "Total Penduduk" },
              { icon: "landscape", count: "450", label: "Luas Wilayah (Ha)" },
              { icon: "agriculture", count: "12", label: "Kelompok Tani" },
              { icon: "tour", count: "5", label: "Destinasi Wisata" },
            ].map((stat, i) => (
              <motion.div 
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <h3 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl text-on-surface tracking-tight mb-2">
                  {i === 0 ? generalData?.demografi?.total || stat.count :
                   i === 1 ? "450" :
                   i === 2 ? "12" :
                   i === 3 ? "5" : stat.count}
                </h3>
                <p className="font-sans text-xs sm:text-sm font-medium text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Profil Singkat */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop w-full relative bg-surface-bright">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-full md:w-1/2 relative"
            >
              <div className="relative">
                <div className="aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden shadow-2xl shadow-surface-variant relative z-10 border-8 border-white">
                  <img 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFCRVYrpmLXh11AFdsG1r9ap0bPwseYAoj4WgwKYrD9m3TtDfITcPmvr5Edkv7h6UAzH9iM8Ft4F35_5LBTjIswAqYZkXx292XLkHYmTFUdGFxo_Ufic9b661ekTGKLYI-rQJuFuTIHRJ4SXkI6GDbCv3ZXPXZOouH1bN3Zs8eVeILkWF_l33JU6OowoYreSM7aUDe06zrcqKTkeNOxu42YVBqjb7HkqVcLOoSbLVM03BdnirSXlvc"
                    alt="Profil Desa"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                </div>
                
                {/* Floating Card */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="absolute -bottom-6 -left-4 md:-left-8 z-20 bg-white/90 backdrop-blur-xl p-5 md:p-6 rounded-3xl shadow-xl shadow-black/5 border border-white/60 flex items-center gap-4 md:gap-5"
                >
                  <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center text-primary shadow-inner">
                    <span className="material-symbols-outlined text-[24px] md:text-[28px]">verified</span>
                  </div>
                  <div>
                    <p className="font-sans text-base md:text-lg font-bold text-on-surface leading-tight">Desa Digital</p>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant font-medium mt-1">Terintegrasi & Transparan</p>
                  </div>
                </motion.div>

                {/* Decorative blob */}
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
                <div className="absolute -top-10 -left-10 w-48 h-48 bg-tertiary/20 rounded-full blur-3xl -z-10" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
              className="w-full md:w-1/2 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-[2px] bg-primary rounded-full"></span>
                <span className="font-sans text-sm font-bold text-primary uppercase tracking-widest">Profil Desa</span>
              </div>
              
              <h2 className="font-sans font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-on-surface mb-6 tracking-tight leading-[1.15]">
                Harmoni Tradisi & <br/>
                <span className="text-primary relative inline-block mt-2">
                  Inovasi Digital.
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 rounded-full"></span>
                </span>
              </h2>
              
              <p className="font-sans text-base sm:text-lg md:text-xl text-on-surface-variant mb-8 sm:mb-10 leading-relaxed">
                Desa Sedaraja berkomitmen memberikan pelayanan prima bagi seluruh warga dengan mendigitalisasi inventarisasi dan pengelolaan potensi desa, dari pertanian hingga demografi, untuk kemajuan bersama.
              </p>
              
              {/* Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-4 mb-10">
                {[
                  { icon: "public", text: "Pelayanan Terpadu" },
                  { icon: "nature_people", text: "Potensi Lokal" },
                  { icon: "analytics", text: "Data Transparan" },
                  { icon: "groups", text: "Komunitas Maju" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group cursor-default">
                    <div className="w-10 h-10 rounded-xl bg-surface-container-low group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center text-on-surface-variant group-hover:text-primary">
                      <span className="material-symbols-outlined text-[20px] transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
                    </div>
                    <span className="font-sans text-sm md:text-base font-semibold text-on-surface group-hover:text-primary transition-colors duration-300">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/profil" className="group relative inline-flex items-center justify-center gap-3 bg-on-surface text-surface px-8 py-4 rounded-full font-sans font-semibold text-sm transition-all duration-300 hover:bg-primary hover:text-white shadow-lg shadow-black/5 hover:shadow-primary/30 overflow-hidden w-max">
                <span className="relative z-10">Kenali Kami Lebih Dekat</span>
                <span className="material-symbols-outlined text-[20px] relative z-10 group-hover:translate-x-1 transition-transform">east</span>
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
              <h2 className="font-display-lg text-3xl sm:text-4xl md:text-display-lg text-on-surface mb-4 tracking-tight">Kabar <span className="text-primary">Desa.</span></h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Pembaruan terkini seputar kegiatan, pembangunan, dan perkembangan di Desa Sedaraja.</p>
            </div>
            <Link href="/berita" className="text-primary bg-primary/5 hover:bg-primary/10 px-6 py-3 rounded-full font-title-md text-[15px] flex items-center gap-2 transition-all w-max whitespace-nowrap">
              Lihat Semua Berita
            </Link>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Featured News (Left) */}
            {berita.length > 0 && (
              <motion.article 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="lg:col-span-7 group cursor-pointer"
              >
                <Link href={`/berita/${berita[0].slug || berita[0].id}`}>
                  <div className="rounded-[2rem] overflow-hidden mb-6 aspect-[4/3] md:aspect-[16/10] relative">
                    {berita[0].image ? (
                      <img src={berita[0].image} alt={berita[0].title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                        <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">image</span>
                      </div>
                    )}
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur text-primary px-4 py-1.5 rounded-full font-label-sm text-[13px] shadow-sm">
                      {berita[0].category}
                    </div>
                  </div>
                  <span className="font-label-sm text-on-surface-variant block mb-3">
                    {new Date(berita[0].date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <h3 className="font-display-lg text-2xl md:text-4xl text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight leading-snug">{berita[0].title}</h3>
                  <p className="font-body-md text-on-surface-variant line-clamp-2 leading-relaxed">{berita[0].snippet || berita[0].content}</p>
                </Link>
              </motion.article>
            )}

            {/* List News (Right) */}
            <div className="lg:col-span-5 flex flex-col justify-center gap-8 lg:gap-12">
              {berita.slice(1).map((news, i) => (
                <motion.article 
                  key={news.slug || i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className="group cursor-pointer"
                >
                  <Link href={`/berita/${news.slug || news.id}`} className="flex gap-6 items-center w-full">
                    <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden shrink-0 relative">
                      {news.image ? (
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      ) : (
                        <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                          <span className="material-symbols-outlined text-4xl text-on-surface-variant/30">image</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col py-2">
                      <span className="text-primary font-label-sm text-[12px] uppercase tracking-wider mb-2 block font-semibold">{news.category} &bull; {new Date(news.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                      <h3 className="font-title-md text-[18px] md:text-[20px] text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-3">{news.title}</h3>
                    </div>
                  </Link>
                </motion.article>
              ))}
              
              {berita.length <= 1 && (
                <div className="flex flex-col items-center justify-center h-full opacity-50 py-10">
                  <span className="material-symbols-outlined text-4xl mb-2">article</span>
                  <p>Belum ada berita lainnya</p>
                </div>
              )}
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
              <h2 className="font-sans font-bold text-3xl sm:text-4xl text-on-surface mb-4 tracking-tight">Kunjungi Kami.</h2>
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
                    <p className="font-sans text-sm md:text-base text-on-surface-variant leading-relaxed">
                      {generalData?.settings?.alamat || "Jl. Raya Sedaraja No. 1, Kec. Cingambul, Kabupaten Majalengka, Jawa Barat"}
                    </p>
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
