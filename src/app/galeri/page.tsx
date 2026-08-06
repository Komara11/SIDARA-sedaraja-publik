"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function GaleriPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const dummyGallery = [
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnzmyY2bIrPcsXULB4NN3558EDj24ImSvxrrtM6MHxHC7JrF-QxdNJJQ4V062qQoMbD95ZD_6FWHYrwIGrWz9XBbwXf56IHN6GGgfKH70RLJebMEGXMgaAe6Rl3Kyet2clLy9QRqjZWeb9laIyFYJCEjE77mwYOId6yDXLkJxv76CRiMZ1sJCcEqQYxFSo_YAXVyjuqeGhgBeI6a5HNrGz_m_8EOmqG5vl-hbMKffxIj_6xG0uI4i", alt: "Wisata Pamoroan", category: "Pariwisata", span: "md:col-span-2 md:row-span-2" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEUtpJjAbhg6kkhC5rgRhXnU_7ujjec_KvHrsXqLQVJAO2hlagg5yIV88D_OJqSeGL0ZvSXs3veB77jHFC-XAdtC2QFqMoSJLmuRYU-1wqto65XeX2PRMYFUP7S5M1HIeS3nf3r1uT5rCTfZXFLUoeQyv6JiXuJ1I-td9BUa-NSW_ilzrCqQQvpUuldP848y8Z4YYXeIlYBwjInCzwWNt8utMmRQ_l9T3CrSjAMOgKKth-6PxcEsGO", alt: "Sawah", category: "Pertanian", span: "md:col-span-1 md:row-span-1" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjd7AD5dSZ4FldI_MDuhMSMfKLISG8WHN2kzym_LZIQokz7F0o8wRiwTVGcCmIKDqUNo4RFURxq6rL5mxepfzlwXu2H1h4ZM65Oi8QedYwDFH_beSTTEcg3nBqrarRJTo6s83u_zilLvYlpHQyew7wuG8mrrfjimx3K9CkVXg6-nXEkCAgGgvzEnj4p_a17siPcoxjU5AdALPv9kWLDtL4bfDb5mHVsARfQr48f1NtID7KaAABvkRW", alt: "Kopi Sedaraja", category: "UMKM", span: "md:col-span-1 md:row-span-1" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFRi5bNXm3S0FT8MGpA_eKnCVvSwTYJ9a0rNnZE-YZ5WRzWWdq4hSq8Q8ZETw43PligIe4SyIVDmW5MOox8vCaR59M94Sa2LyAbkg1kHIEuCaFVC4d6jVjL1mbVtllzJm0cI-45FjK1E4Rywb4Up76o_TdhsHAfCEQbkI2AtKNw9-cwi5nIQwdF42Aj99BF_3gW2RD-Ssy4fhk1_s4PwyVF84DZoz5SJQzPmbqfErSsjd8h49ChmBF", alt: "Budidaya Ikan Nila", category: "Perikanan", span: "md:col-span-2 md:row-span-1" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUjI8Tg4v3XRe6CPqxu87V4sa6tG25mR3E0tY70cpjsFchdsry14z0ILYsXaLgckrRPA0C8sj6HDKBIt8_yrWAU0a59iE-VfbclOdQmWOwEzNdZig55fAwzvCHh-48FONpw6QopoWupXuHDR6qL9UoReoAHp0bP33dBpY6tdEhUIG-F-Y7JIgix9rB32ZPjvXj0ZPtJLENgDa-lfckOSSua6vY4d_FH0YaseyFj0RG4BLILFPxhvv_", alt: "Kerja Bakti Warga", category: "Sosial", span: "md:col-span-1 md:row-span-2" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFCRVYrpmLXh11AFdsG1r9ap0bPwseYAoj4WgwKYrD9m3TtDfITcPmvr5Edkv7h6UAzH9iM8Ft4F35_5LBTjIswAqYZkXx292XLkHYmTFUdGFxo_Ufic9b661ekTGKLYI-rQJuFuTIHRJ4SXkI6GDbCv3ZXPXZOouH1bN3Zs8eVeILkWF_l33JU6OowoYreSM7aUDe06zrcqKTkeNOxu42YVBqjb7HkqVcLOoSbLVM03BdnirSXlvc", alt: "Balai Desa Sedaraja", category: "Fasilitas", span: "md:col-span-2 md:row-span-1" }
  ];

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-16"></div>

      {/* Masonry-like Grid Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-6">
          {dummyGallery.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className={`relative rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl hover:shadow-primary/10 transition-all duration-500 group cursor-pointer ${item.span}`}
              onClick={() => setSelectedImage(item.src)}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10" />
              <img 
                src={item.src} 
                alt={item.alt} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Category Badge */}
              <div className="absolute top-6 left-6 z-20">
                <span className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full font-label-sm text-[13px] font-semibold tracking-wide">
                  {item.category}
                </span>
              </div>

              {/* Title & Icon Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent translate-y-4 group-hover:translate-y-0 transition-transform duration-500 flex justify-between items-end">
                <h3 className="font-title-md text-2xl text-white font-semibold tracking-tight leading-tight">
                  {item.alt}
                </h3>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 shrink-0">
                  <Maximize2 className="w-5 h-5" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors backdrop-blur-md"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
