"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { User, Users as UsersIcon } from "lucide-react";
export default function KelembagaanPage() {
  const [lembaga, setLembaga] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/kelembagaan')
      .then(res => res.json())
      .then(data => setLembaga(data));
  }, []);

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>

      {/* Grid Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {lembaga.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * idx, ease: "easeOut" }}
              className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 border border-surface-variant/30 flex flex-col relative overflow-hidden group"
            >
              {/* Decorative Background Icon */}
              <div className="absolute -top-8 -right-8 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 pointer-events-none">
                <span className="material-symbols-outlined text-[150px] text-primary">{item.icon}</span>
              </div>
              
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500 shrink-0">
                  <span className="material-symbols-outlined text-[32px]">{item.icon}</span>
                </div>
                <div>
                  <h2 className="font-display-lg text-2xl text-on-surface tracking-tight leading-none mb-2">{item.name}</h2>
                  <p className="font-label-sm text-[13px] text-primary font-semibold line-clamp-1">{item.name}</p>
                </div>
              </div>
              
              <p className="font-body-lg text-on-surface-variant leading-relaxed mb-10 flex-grow relative z-10">
                {item.desc}
              </p>
              
              <div className="mt-auto pt-6 border-t border-surface-variant/50 flex flex-col gap-4 relative z-10">
                <div className="flex justify-between items-center font-label-sm text-[14px]">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <User className="w-4 h-4" /> Ketua
                  </span>
                  <span className="font-bold text-on-surface">{item.ketua}</span>
                </div>
                <div className="flex justify-between items-center font-label-sm text-[14px]">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <UsersIcon className="w-4 h-4" /> Anggota Aktif
                  </span>
                  <span className="font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full">{item.anggota} Orang</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
