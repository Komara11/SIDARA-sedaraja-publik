"use client";
import { motion } from "framer-motion";
import { History, Target } from "lucide-react";

export default function ProfilPage() {
  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright">
      
      {/* Sejarah Desa Section */}
      <section className="py-24 md:py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full relative">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10 relative">
              <img 
                className="absolute inset-0 w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuClRY5ynZmEr4In1AOD69QJUU1NAxZyVN8WXGAthPUEL_-qGKmlimOxkSAif7l-EcEA4bFJ0SxggWk3Y2iUpyGLaw7ZS0tFsoNys1RikvLuDfEHGVLnwuyE1rMgnecR2K5tsOEa8MkS5ZnaJVX37VSHYrN6KfdmEVpAykYEVA_9n12IaG5V_LwYWJpFAEF7fYdyc6sKyGmz9LAGaxD4IimfaRRaRRuQnuTBgNtUZgHIypJZCmklbr8N"
                alt="Sejarah Desa"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent" />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
            
            <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-3xl shadow-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary-container/20 flex items-center justify-center text-primary">
                <History className="w-6 h-6" />
              </div>
              <div>
                <p className="font-label-sm text-on-surface-variant">Sejak Abad ke-19</p>
                <p className="font-title-md text-on-surface font-semibold">Warisan Leluhur</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 flex flex-col"
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm mb-6 w-max font-semibold">
              Jejak Sejarah
            </div>
            <h2 className="font-display-lg text-4xl md:text-5xl text-on-surface mb-8 tracking-tight leading-tight">
              Akar Budaya & <span className="text-primary">Transformasi Modern.</span>
            </h2>
            <div className="flex flex-col gap-6">
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Desa Sedaraja didirikan pada awal abad ke-19, berawal dari sebuah pemukiman kecil yang bertumpu pada sektor pertanian tradisional. Nama 'Sedaraja' mencerminkan harapan luhur para pendiri akan kemakmuran dan kehormatan yang setara dengan keluarga kerajaan.
              </p>
              <p className="font-body-lg text-on-surface-variant leading-relaxed">
                Seiring berjalannya waktu, desa ini telah bertransformasi menjadi pusat pertumbuhan agraria modern tanpa meninggalkan akar budayanya. Inovasi digital dan partisipasi aktif warga kini menjadi pilar utama pembangunan berkelanjutan di Sedaraja.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-24 md:py-32 bg-white w-full">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop flex flex-col gap-20">
          
          {/* Visi */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center max-w-4xl mx-auto"
          >
            <Target className="w-12 h-12 text-primary/30 mx-auto mb-6" />
            <h2 className="font-label-sm text-primary uppercase tracking-widest mb-6 font-semibold">Visi Utama</h2>
            <blockquote className="font-display-lg text-3xl md:text-5xl text-on-surface tracking-tight leading-snug">
              "Terwujudnya Desa Sedaraja yang <span className="text-primary relative inline-block">Mandiri, Inovatif, dan Sejahtera<div className="absolute bottom-1 left-0 w-full h-3 bg-primary/20 -z-10 rounded-sm"></div></span> melalui optimalisasi potensi lokal berbasis teknologi berkelanjutan."
            </blockquote>
          </motion.div>

          {/* Misi */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "groups", title: "Tata Kelola", desc: "Mewujudkan pemerintahan desa yang transparan, akuntabel, dan responsif terhadap kebutuhan warga." },
              { icon: "agriculture", title: "Ekonomi", desc: "Meningkatkan kemandirian ekonomi masyarakat melalui pemberdayaan UMKM dan modernisasi pertanian." },
              { icon: "school", title: "Sosial Budaya", desc: "Meningkatkan kualitas sumber daya manusia yang berpendidikan dan memelihara kerukunan antar warga." },
              { icon: "eco", title: "Lingkungan", desc: "Melestarikan lingkungan hidup dan potensi wisata alam untuk mendukung pembangunan berkelanjutan." }
            ].map((misi, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="group flex flex-col"
              >
                <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="material-symbols-outlined text-[28px] text-primary group-hover:text-white transition-colors">{misi.icon}</span>
                </div>
                <h4 className="font-title-md text-[20px] text-on-surface mb-3 tracking-tight">{misi.title}</h4>
                <p className="font-body-sm text-on-surface-variant leading-relaxed">{misi.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Struktur Kepengurusan Section */}
      <section className="py-24 md:py-32 bg-surface-container-low w-full relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3" />
        
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-2xl mx-auto mb-20"
          >
            <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm mb-4 font-semibold">
              Aparatur Desa
            </div>
            <h2 className="font-display-lg text-4xl md:text-5xl text-on-surface mb-6 tracking-tight">Struktur Kepengurusan</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Jajaran aparatur pemerintah Desa Sedaraja yang berdedikasi melayani masyarakat dengan integritas dan profesionalisme.
            </p>
          </motion.div>
          
          <div className="flex flex-col items-center">
            {/* Kepala Desa */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center z-10 relative group"
            >
              <div className="w-36 h-36 rounded-full bg-white shadow-xl flex items-center justify-center mb-6 overflow-hidden border-4 border-white group-hover:border-primary/20 transition-all duration-300">
                <span className="material-symbols-outlined text-[64px] text-surface-variant">person</span>
              </div>
              <h3 className="font-title-md text-2xl text-on-surface font-semibold mb-1">Bpk. H. Sudirman</h3>
              <p className="font-label-sm text-[15px] text-primary uppercase tracking-widest font-semibold">Kepala Desa</p>
            </motion.div>

            {/* Vertical line connecting top to horizontal line */}
            <div className="w-px h-16 bg-surface-variant/80 hidden md:block"></div>
            
            {/* Horizontal line */}
            <div className="w-full max-w-4xl h-px bg-surface-variant/80 hidden md:block relative">
               {/* Vertical lines connecting horizontal line to bottom items */}
               <div className="absolute top-0 left-[16.66%] w-px h-16 bg-surface-variant/80"></div>
               <div className="absolute top-0 left-[50%] w-px h-16 bg-surface-variant/80"></div>
               <div className="absolute top-0 left-[83.33%] w-px h-16 bg-surface-variant/80"></div>
            </div>
            
            {/* Jajaran Bawah */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 w-full max-w-4xl mt-12 md:mt-16">
              {[
                { name: "Ibu Siti Aminah", role: "Sekretaris Desa" },
                { name: "Bpk. Rahmat", role: "Kasi Pemerintahan" },
                { name: "Bpk. Agus S.", role: "Kasi Kesejahteraan" }
              ].map((person, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-28 h-28 rounded-full bg-white shadow-lg flex items-center justify-center mb-5 overflow-hidden border-4 border-white group-hover:border-primary/10 transition-all duration-300">
                    <span className="material-symbols-outlined text-[48px] text-surface-variant">person</span>
                  </div>
                  <h3 className="font-title-md text-xl text-on-surface font-semibold mb-1">{person.name}</h3>
                  <p className="font-label-sm text-[14px] text-on-surface-variant">{person.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
