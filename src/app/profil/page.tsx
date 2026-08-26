"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { History, Target, ShieldCheck, HeartHandshake, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const nilaiIcons = [HeartHandshake, ShieldCheck, Sparkles];

export default function ProfilPage() {
  const [h, setH] = useState<any>(null);
  useEffect(() => {
    fetch('/api/halaman').then(r => r.json()).then(d => setH(d)).catch(() => {});
  }, []);

  const p = h?.profil || {};
  const heroTitle = p.heroTitle || "Mengenal Desa Sedaraja";
  const heroHighlight = p.heroTitleHighlight || "Sedaraja";
  const heroDesc = p.heroDescription || "Perjalanan panjang, nilai-nilai luhur warisan leluhur, serta visi dan misi pembangunan masa depan Desa Sedaraja.";
  const sejarahImage = "https://i.pinimg.com/1200x/55/b6/64/55b6646d0b1be4bbf05aa718b458f0d4.jpg";
  const sejarahBadge = p.sejarahBadge || "Jejak Sejarah";
  const sejarahTitle = p.sejarahTitle || "Akar Budaya & Transformasi Modern.";
  const sejarahHighlight = p.sejarahTitleHighlight || "Transformasi Modern.";
  const sejarahParagraphs = p.sejarahParagraphs || [
    "Desa Sedaraja didirikan pada awal abad ke-19, berawal dari sebuah pemukiman kecil yang bertumpu pada sektor pertanian tradisional. Nama 'Sedaraja' mencerminkan harapan luhur para pendiri akan kemakmuran dan kehormatan yang setara dengan keluarga kerajaan.",
    "Seiring berjalannya waktu, desa ini telah bertransformasi menjadi pusat pertumbuhan agraria modern tanpa meninggalkan akar budayanya. Inovasi digital dan partisipasi aktif warga kini menjadi pilar utama pembangunan berkelanjutan di Sedaraja."
  ];
  const visi = p.visi || "Terwujudnya Desa Sedaraja yang Mandiri, Inovatif, dan Sejahtera melalui optimalisasi potensi lokal berbasis teknologi berkelanjutan.";
  const visiHighlight = p.visiHighlight || "Mandiri, Inovatif, dan Sejahtera";
  const misi = p.misi?.length ? p.misi : [
    { icon: "groups", title: "Tata Kelola", desc: "Mewujudkan pemerintahan desa yang transparan, akuntabel, dan responsif terhadap kebutuhan warga." },
    { icon: "agriculture", title: "Ekonomi", desc: "Meningkatkan kemandirian ekonomi masyarakat melalui pemberdayaan UMKM dan modernisasi pertanian." },
    { icon: "school", title: "Sosial Budaya", desc: "Meningkatkan kualitas sumber daya manusia yang berpendidikan dan memelihara kerukunan antar warga." },
    { icon: "eco", title: "Lingkungan", desc: "Melestarikan lingkungan hidup dan potensi wisata alam untuk mendukung pembangunan berkelanjutan." }
  ];
  const nilaiUtama = p.nilaiUtama?.length ? p.nilaiUtama : [
    { title: "Gotong Royong", desc: "Kebersamaan dan kepedulian antar sesama warga sebagai ruh utama pembangunan fisik maupun sosial di desa." },
    { title: "Integritas & Keterbukaan", desc: "Pengelolaan administrasi publik dan keuangaan desa yang jujur, terbuka, dan dapat dipertanggungjawabkan." },
    { title: "Inovasi Berkelanjutan", desc: "Memanfaatkan teknologi informasi modern untuk memudahkan pelayanan tanpa melupakan keasrian alam." }
  ];

  // Split title around highlight
  const heroTitleBefore = heroTitle.replace(heroHighlight, "").trim();

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen">
      <div className="pt-28 md:pt-32" />



      {/* Sejarah Desa Section */}
      <section className="pb-12 md:pb-20 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative">
        <div className="flex flex-col lg:flex-row gap-12 items-start bg-white p-8 md:p-12 border border-surface-variant/50 shadow-sm rounded-sm">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut" }} className="w-full lg:w-5/12 relative">
      <div className="aspect-[4/3] rounded-md overflow-hidden border border-surface-variant/40 shadow-sm relative">
        {sejarahImage ? (
          <img className="absolute inset-0 w-full h-full object-cover" src={sejarahImage} alt="Sejarah Desa Sedaraja" />
        ) : (
          <img className="absolute inset-0 w-full h-full object-cover" src="https://i.pinimg.com/1200x/55/b6/64/55b6646d0b1be4bbf05aa718b458f0d4.jpg" alt="Sejarah Desa Sedaraja" />
        )}
      </div>
            <div className="mt-4 bg-surface-bright p-4 border-l-4 border-primary">
              <div className="flex items-center gap-3 text-primary">
                <History className="w-5 h-5" />
                <p className="font-bold uppercase tracking-wider text-sm">Warisan Leluhur (Sejak Abad ke-19)</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1, ease: "easeOut", delay: 0.2 }} className="w-full lg:w-7/12 flex flex-col">
            <div className="inline-block border border-primary/30 text-primary px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4 w-max">{sejarahBadge}</div>
            <h2 className="font-sans font-bold text-3xl md:text-4xl text-on-surface mb-6 tracking-tight leading-tight">
              {sejarahTitle.replace(sejarahHighlight, "").trim()}{' '}<span className="text-primary">{sejarahHighlight}</span>
            </h2>
            <div className="flex flex-col gap-4 text-justify">
              {sejarahParagraphs.map((para: string, i: number) => (
                <p key={i} className="font-sans text-on-surface-variant leading-relaxed text-[15px]">{para}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-20 md:py-24 bg-surface-bright w-full border-y border-surface-variant/40">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1, ease: "easeOut" }} className="text-center max-w-4xl mx-auto bg-white p-10 md:p-14 border border-surface-variant/50 shadow-sm rounded-sm">
            <Target className="w-10 h-10 text-primary mx-auto mb-4" />
            <h2 className="font-sans text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-4">Visi Utama</h2>
            <blockquote className="font-sans font-bold text-2xl md:text-3xl text-on-surface tracking-tight leading-relaxed italic text-center">
              &quot;{visi.includes(visiHighlight) ? (
                <>{visi.split(visiHighlight)[0]}<span className="text-primary">{visiHighlight}</span>{visi.split(visiHighlight)[1]}</>
              ) : visi}&quot;
            </blockquote>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {misi.map((m: any, i: number) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }} className="group flex flex-col p-8 bg-white border border-surface-variant/50 rounded-sm hover:border-primary transition-colors">
                <div className="w-12 h-12 flex items-center justify-center mb-4 text-primary border border-primary/20 bg-primary/5 rounded-md">
                  <span className="material-symbols-outlined text-[24px]">{m.icon}</span>
                </div>
                <h4 className="font-sans text-lg text-on-surface mb-2 tracking-tight font-bold">{m.title}</h4>
                <p className="font-sans text-sm text-on-surface-variant leading-relaxed text-justify">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


    </div>
  );
}
