"use client";

import { motion } from "framer-motion";
import { Users, Code, Laptop, Heart } from "lucide-react";

export default function TimKKMPage() {
  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>

      {/* Main Content */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32 mt-8 text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded text-[10px] uppercase font-bold tracking-widest mb-6">
          <Code className="w-4 h-4" /> Pengabdian Masyarakat
        </div>

        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-primary tracking-tight leading-tight mb-8 uppercase max-w-4xl">
          Dikembangkan Oleh <br className="hidden md:block" /> <span className="text-on-surface">Tim KKM</span>
        </h1>

        <div className="flex flex-col items-center gap-3 mb-10">
          <img src="/images/logo_kampus.png" alt="Logo INSTBUNAS" className="w-16 h-16 sm:w-20 sm:h-20 object-contain" />
          <h2 className="font-sans font-bold text-base sm:text-lg text-on-surface uppercase tracking-widest text-center">
            INSTBUNAS <br className="sm:hidden" />
            <span className="text-sm font-medium text-on-surface-variant/80 sm:ml-2">(Institut Budi Utomo Nasional)</span>
          </h2>
        </div>

        <p className="font-sans text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-3xl mb-16 text-center">
          Sistem Informasi dan Data Desa (SIDARA) ini merupakan hasil karya nyata dan bentuk pengabdian masyarakat dari Tim Kuliah Kerja Mahasiswa (KKM). Kami berharap sistem digital ini dapat membantu mewujudkan tata kelola pemerintahan desa yang modern, transparan, dan berkelanjutan.
        </p>

        {/* Features/Contributions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 w-full max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded bg-surface-bright flex items-center justify-center text-primary mb-6 border border-surface-variant/30">
              <Laptop className="w-6 h-6" />
            </div>
            <h3 className="font-sans text-xl font-bold text-on-surface mb-3 uppercase tracking-tight">Digitalisasi</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Membawa administrasi dan layanan publik desa ke era digital agar lebih cepat dan mudah diakses oleh seluruh warga.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded bg-surface-bright flex items-center justify-center text-primary mb-6 border border-surface-variant/30">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-sans text-xl font-bold text-on-surface mb-3 uppercase tracking-tight">Pemberdayaan</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Melatih perangkat desa dan masyarakat setempat untuk terbiasa menggunakan teknologi informasi dalam kegiatan sehari-hari.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded bg-surface-bright flex items-center justify-center text-primary mb-6 border border-surface-variant/30">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-sans text-xl font-bold text-on-surface mb-3 uppercase tracking-tight">Pengabdian</h3>
            <p className="font-sans text-sm text-on-surface-variant leading-relaxed">
              Dedikasi penuh dari mahasiswa KKM untuk memberikan manfaat jangka panjang yang bisa terus dirasakan oleh Desa.
            </p>
          </motion.div>
        </div>

      </section>
    </div>
  );
}
