"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Maximize2, X, Images } from "lucide-react";
import { AnimatePresence } from "framer-motion";

export default function GaleriPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [gallery, setGallery] = useState<any[]>([]);
  const [halaman, setHalaman] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/galeri').then(res => res.json()),
      fetch('/api/halaman').then(res => res.json())
    ]).then(([galleryData, halamanData]) => {
      setGallery(galleryData);
      setHalaman(halamanData.galeri || {});
    });
  }, []);

  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>



      {/* Masonry-like Grid Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[250px] gap-6">
          {gallery.map((item, i) => {
            // Assign span dynamically for masonry-like look
            const spans = ["md:col-span-2 md:row-span-2", "md:col-span-1 md:row-span-1", "md:col-span-1 md:row-span-1", "md:col-span-2 md:row-span-1", "md:col-span-1 md:row-span-2", "md:col-span-2 md:row-span-1"];
            const spanClass = item.span || spans[i % spans.length];
            return (
            <motion.div 
              key={item.id || i}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              className={`relative rounded-md overflow-hidden shadow-sm border border-surface-variant/50 group cursor-pointer ${spanClass}`}
              onClick={() => setSelectedImage(item.image)}
            >
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500 z-10" />
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-surface-bright flex items-center justify-center">
                  <span className="material-symbols-outlined text-4xl text-surface-variant">image</span>
                </div>
              )}
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 text-on-surface px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                  {item.category}
                </span>
              </div>

              {/* Title & Icon Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 z-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex justify-between items-end">
                <h3 className="font-sans text-xl text-white font-bold tracking-tight leading-tight uppercase">
                  {item.title}
                </h3>
                <div className="w-8 h-8 rounded border border-white/30 bg-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          )})}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 md:top-10 md:right-10 w-10 h-10 rounded border border-white/20 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[90vh] object-contain rounded border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
