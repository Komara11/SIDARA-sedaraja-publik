"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, User, UserCheck, Home, Loader2, Info } from "lucide-react";

export default function DemografiPage() {
  const [stats, setStats] = useState<any>(null);
  const [halaman, setHalaman] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/demografi').then(res => res.json()),
      fetch('/api/halaman').then(res => res.json())
    ]).then(([statsData, halamanData]) => {
      setStats(statsData);
      setHalaman(halamanData.demografi || {});
    });
  }, []);

  if (!stats) {
    return (
      <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }



  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>



      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* Top Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Total Penduduk", value: stats.total, icon: Users, color: "text-primary" },
              { label: "Laki-laki", value: stats.lakiLaki, icon: User, color: "text-blue-500" },
              { label: "Perempuan", value: stats.perempuan, icon: UserCheck, color: "text-rose-500" },
              { label: "Kepala Keluarga", value: stats.kk, icon: Home, color: "text-amber-500" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white p-5 sm:p-6 md:p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col items-start relative hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded border border-surface-variant/30 bg-surface-bright flex items-center justify-center mb-6 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-3xl sm:text-4xl text-on-surface tracking-tight mb-2 relative">{stat.value.toLocaleString('id-ID')}</h3>
                <p className="font-sans text-[12px] sm:text-[14px] text-on-surface-variant font-bold uppercase tracking-wider relative">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Simplified Data Progress Bars */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
            {/* Usia */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-1 bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col"
            >
              <div className="mb-6 border-b border-surface-variant/40 pb-4">
                <h3 className="font-sans text-xl text-on-surface font-bold tracking-tight mb-1">{halaman?.chartUsiaLabel || "Kelompok Usia"}</h3>
                <p className="font-sans text-xs text-on-surface-variant">{halaman?.chartUsiaDesc || "Distribusi penduduk berdasarkan rentang umur"}</p>
              </div>
              <div className="flex flex-col gap-5">
                {stats.usia.map((item: any, i: number) => {
                  const percent = Math.round((item.value / stats.total) * 100);
                  return (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm font-bold text-on-surface-variant">{item.name}</span>
                        <span className="font-sans text-sm font-bold text-on-surface">{item.value.toLocaleString('id-ID')} Jiwa</span>
                      </div>
                      <div className="w-full bg-surface-bright rounded-full h-3.5 overflow-hidden border border-surface-variant/30 relative">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.max(percent, 2)}%`, backgroundColor: item.fill }}
                        />
                      </div>
                      <span className="text-[10px] text-right font-bold tracking-widest uppercase text-on-surface-variant/70">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Pendidikan */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="lg:col-span-1 bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col"
            >
              <div className="mb-6 border-b border-surface-variant/40 pb-4">
                <h3 className="font-sans text-xl text-on-surface font-bold tracking-tight mb-1">{halaman?.chartPendidikanLabel || "Tingkat Pendidikan"}</h3>
                <p className="font-sans text-xs text-on-surface-variant">Distribusi pendidikan terakhir warga</p>
              </div>
              <div className="flex flex-col gap-5">
                {stats.pendidikan.map((item: any, i: number) => {
                  const percent = Math.round((item.value / stats.total) * 100);
                  return (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm font-bold text-on-surface-variant">{item.name}</span>
                        <span className="font-sans text-sm font-bold text-on-surface">{item.value.toLocaleString('id-ID')} Jiwa</span>
                      </div>
                      <div className="w-full bg-surface-bright rounded-full h-3.5 overflow-hidden border border-surface-variant/30 relative">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.max(percent, 1)}%`, backgroundColor: item.fill }}
                        />
                      </div>
                      <span className="text-[10px] text-right font-bold tracking-widest uppercase text-on-surface-variant/70">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Pekerjaan */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="lg:col-span-1 bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col"
            >
              <div className="mb-6 border-b border-surface-variant/40 pb-4">
                <h3 className="font-sans text-xl text-on-surface font-bold tracking-tight mb-1">{halaman?.chartPekerjaanLabel || "Mata Pencaharian"}</h3>
                <p className="font-sans text-xs text-on-surface-variant">Profesi dan pekerjaan utama warga</p>
              </div>
              <div className="flex flex-col gap-5">
                {stats.pekerjaan.map((item: any, i: number) => {
                  // Pekerjaan total might not exactly equal total penduduk, so use the sum of pekerjaan values
                  const totalPekerjaan = stats.pekerjaan.reduce((acc: number, curr: any) => acc + curr.value, 0);
                  const percent = Math.round((item.value / totalPekerjaan) * 100);
                  return (
                    <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex justify-between items-center">
                        <span className="font-sans text-sm font-bold text-on-surface-variant">{item.name}</span>
                        <span className="font-sans text-sm font-bold text-on-surface">{item.value.toLocaleString('id-ID')} Jiwa</span>
                      </div>
                      <div className="w-full bg-surface-bright rounded-full h-3.5 overflow-hidden border border-surface-variant/30 relative">
                        <div 
                          className="h-full rounded-full transition-all duration-1000"
                          style={{ width: `${Math.max(percent, 1)}%`, backgroundColor: item.fill }}
                        />
                      </div>
                      <span className="text-[10px] text-right font-bold tracking-widest uppercase text-on-surface-variant/70">{percent}%</span>
                    </div>
                  );
                })}
              </div>
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
