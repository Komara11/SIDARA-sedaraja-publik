"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Users as UsersIcon, Building2 } from "lucide-react";

export default function KelembagaanPage() {
  const [lembaga, setLembaga] = useState<any[]>([]);
  const [halaman, setHalaman] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/kelembagaan').then(res => res.json()),
      fetch('/api/halaman').then(res => res.json())
    ]).then(([lembagaData, halamanData]) => {
      setLembaga(lembagaData);
      setHalaman(halamanData.kelembagaan || {});
    });
  }, []);

  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>



      {/* Grid Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lembaga.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * idx, ease: "easeOut" }}
              className="bg-white p-8 rounded-md shadow-sm hover:shadow-md transition-shadow border border-surface-variant/50 flex flex-col relative"
            >
              
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded border border-surface-variant/30 flex items-center justify-center text-primary shrink-0 bg-surface-bright">
                  <span className="material-symbols-outlined text-[28px]">{item.icon}</span>
                </div>
                <div>
                  <h2 className="font-sans font-bold text-xl text-on-surface tracking-tight leading-none mb-1">{item.name}</h2>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-primary font-bold line-clamp-1">{item.name}</p>
                </div>
              </div>
              
              <p className="font-sans text-sm text-on-surface-variant leading-relaxed mb-8 flex-grow text-justify">
                {item.desc}
              </p>
              
              <div className="mt-auto pt-5 border-t border-surface-variant/40 flex flex-col gap-3">
                <div className="flex justify-between items-center font-sans text-xs">
                  <span className="text-on-surface-variant flex items-center gap-1.5 font-semibold">
                    <User className="w-4 h-4 text-primary" /> Ketua
                  </span>
                  <span className="font-bold text-on-surface uppercase">{item.ketua}</span>
                </div>
                <div className="flex justify-between items-center font-sans text-xs">
                  <span className="text-on-surface-variant flex items-center gap-1.5 font-semibold">
                    <UsersIcon className="w-4 h-4 text-primary" /> Anggota Aktif
                  </span>
                  <span className="font-bold text-primary border border-primary/20 px-2 py-0.5 rounded">{item.anggota} Orang</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
