"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Building2, 
  Users, 
  BadgeCheck, 
  Loader2, 
  Briefcase, 
  User, 
  FileText, 
  CheckCircle2, 
  Search,
  Sparkles,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function PemerintahanPage() {
  const [aparatur, setAparatur] = useState<any[]>([]);
  const [halaman, setHalaman] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/aparatur').then(res => res.json()),
      fetch('/api/halaman').then(res => res.json())
    ])
    .then(([aparaturData, halamanData]) => {
      setAparatur(aparaturData);
      setHalaman(halamanData.pemerintahan || {});
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const kepalaDesa = aparatur.find(a => a.level === 1);
  const level2 = aparatur.filter(a => a.level === 2);
  const level3 = aparatur.filter(a => a.level === 3);
  const level4 = aparatur.filter(a => a.level === 4);



  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      
      {/* Top spacing for header */}
      <div className="pt-28 md:pt-32"></div>



      {/* Main Content Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="font-sans text-sm font-bold uppercase tracking-widest">Memuat data aparatur desa...</p>
          </div>
        ) : (
          <>
            {/* BAGAN ORGANISASI HIERARKI */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center w-full"
              >
                {/* LEVEL 1: KEPALA DESA */}
                {kepalaDesa && (
                  <div className="flex flex-col items-center w-full max-w-md mb-12">
                    <div className="inline-block text-primary border border-primary/30 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-4">
                      Pimpinan Utama
                    </div>
                    <motion.div 
                      className="bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col items-center text-center w-full relative overflow-hidden"
                    >
                      <div className="w-32 h-32 rounded bg-surface-bright border border-surface-variant/30 shadow-sm flex items-center justify-center mb-5 overflow-hidden">
                        <img src={kepalaDesa.photo || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop"} alt={kepalaDesa.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="inline-flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider mb-2">
                        <BadgeCheck className="w-4 h-4 text-primary" /> {kepalaDesa.role}
                      </div>
                      <h3 className="font-sans text-2xl md:text-3xl text-on-surface font-bold mb-1">{kepalaDesa.name}</h3>
                      {kepalaDesa.nip && (
                        <p className="font-sans text-xs text-on-surface-variant mb-4">NIP. {kepalaDesa.nip}</p>
                      )}
                      {kepalaDesa.tugas && (
                        <p className="font-sans text-sm text-on-surface-variant leading-relaxed bg-surface-bright p-4 rounded-sm border border-surface-variant/30 text-justify">
                          {kepalaDesa.tugas}
                        </p>
                      )}
                    </motion.div>

                    {/* Connecting Vertical Line */}
                    <div className="w-px h-12 bg-surface-variant/60 mt-0 hidden md:block"></div>
                  </div>
                )}

                {/* LEVEL 2: SEKRETARIS & KASI */}
                {level2.length > 0 && (
                  <div className="w-full mb-12 flex flex-col items-center relative">
                    <div className="w-full max-w-5xl h-px bg-surface-variant/60 absolute top-0 hidden md:block"></div>
                    <div className="inline-block bg-surface-bright text-on-surface-variant border border-surface-variant/40 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-8 mt-6">
                      Sekretariat & Kepala Seksi (Kasi)
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
                      {level2.map((person, i) => (
                        <motion.div
                          key={person.id || i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: i * 0.1 }}
                          className="bg-white p-6 rounded-md shadow-sm hover:shadow-md border border-surface-variant/50 flex flex-col items-center text-center transition-all duration-300"
                        >
                          <div className="w-24 h-24 rounded bg-surface-bright border border-surface-variant/30 shadow-sm flex items-center justify-center mb-4 overflow-hidden">
                            <img src={person.photo || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop"} alt={person.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-primary border border-primary/20 px-2 py-1 rounded mb-2">
                            {person.role}
                          </span>
                          <h4 className="font-sans text-lg text-on-surface font-bold mb-1">{person.name}</h4>
                          {person.nip && (
                            <p className="font-sans text-xs text-on-surface-variant mb-3">NIP. {person.nip}</p>
                          )}
                          {person.tugas && (
                            <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-3 mt-auto pt-3 border-t border-surface-variant/30 text-justify">
                              {person.tugas}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* LEVEL 3 & 4: KAUR & KADUS */}
                {(level3.length > 0 || level4.length > 0) && (
                  <div className="w-full flex flex-col items-center relative">
                    <div className="w-full max-w-6xl h-px bg-surface-variant/60 absolute top-0 hidden md:block"></div>
                    <div className="inline-block bg-surface-bright text-on-surface-variant border border-surface-variant/40 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-8 mt-6">
                      Kepala Urusan (Kaur) & Kepala Wilayah (Kadus)
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                      {[...level3, ...level4].map((person, i) => (
                        <motion.div
                          key={person.id || i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.08 }}
                          className="bg-white p-6 rounded-md shadow-sm hover:shadow-md border border-surface-variant/50 flex flex-col items-center text-center transition-all"
                        >
                          <div className="w-20 h-20 rounded bg-surface-bright border border-surface-variant/30 flex items-center justify-center mb-4 overflow-hidden">
                            <img src={person.photo || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop"} alt={person.name} className="w-full h-full object-cover" />
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant border border-surface-variant/40 px-2 py-0.5 rounded mb-2">
                            {person.role}
                          </span>
                          <h4 className="font-sans text-base text-on-surface font-bold mb-1">{person.name}</h4>
                          {person.nip && person.nip !== "-" && (
                            <p className="font-sans text-[11px] text-on-surface-variant mb-2">NIP. {person.nip}</p>
                          )}
                          {person.tugas && (
                            <p className="font-sans text-xs text-on-surface-variant leading-relaxed line-clamp-2 mt-2 text-justify">
                              {person.tugas}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>

            {/* Maklumat Pelayanan & Komitmen */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-24 bg-primary text-white p-8 md:p-14 rounded-md shadow-sm flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden border-b-4 border-primary-fixed"
            >
              <div className="max-w-2xl z-10">
                <div className="inline-flex items-center gap-2 border border-white/20 text-white px-3 py-1 rounded text-[10px] uppercase tracking-widest font-bold mb-4">
                  <CheckCircle2 className="w-4 h-4" /> {halaman?.maklumatBadge || "Maklumat Pelayanan"}
                </div>
                <h3 className="font-sans text-2xl sm:text-3xl md:text-4xl text-white font-bold mb-4 tracking-tight uppercase">
                  {halaman?.maklumatTitle || "Komitmen Pelayanan Prima Untuk Warga"}
                </h3>
                <p className="font-sans text-sm md:text-base text-white/90 leading-relaxed text-justify">
                  {halaman?.maklumatDescription || "Dengan ini kami segenap aparatur Pemerintah Desa Sedaraja menyatakan sanggup menyelenggarakan pelayanan administrasi secara jujur, transparan, dan dapat dipertanggungjawabkan."}
                </p>
              </div>

              <div className="z-10 shrink-0">
                <Link
                  href="/pengaduan"
                  className="inline-flex items-center gap-2 bg-white text-primary hover:bg-surface-bright px-8 py-4 rounded-md font-sans text-sm font-bold shadow-sm transition-all"
                >
                  <span>{halaman?.maklumatBtnText || "Sampaikan Pengaduan / Aspirasi"}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </section>
    </div>
  );
}
