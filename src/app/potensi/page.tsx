"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, ArrowRight, Package } from "lucide-react";

export default function PotensiPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["Semua", "Pertanian", "Perikanan", "Wisata", "UMKM"];

  const [inventoryData, setInventoryData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/potensi')
      .then(res => res.json())
      .then(data => setInventoryData(data));
  }, []);

  const filteredData = inventoryData.filter(item => {
    const matchesFilter = activeFilter === "Semua" || item.category === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen pb-32">
      {/* Header & Filters Section */}
      <section className="pt-16 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-center">
        <h1 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface mb-4 tracking-tight">Katalog <span className="text-primary">Potensi Desa</span></h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-8 sm:mb-10 text-sm sm:text-base">
          Eksplorasi komoditas unggulan, produk lokal, dan destinasi wisata yang ada di wilayah Desa Sedaraja.
        </p>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-3xl mx-auto flex flex-col gap-8"
        >
          <div className="relative w-full shadow-xl shadow-primary/5 rounded-full group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 group-focus-within:text-primary transition-colors" />
            <Input 
              className="w-full bg-white border border-surface-variant/30 rounded-full py-7 pl-14 pr-6 font-body-lg text-on-surface placeholder:text-on-surface-variant/50 focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary transition-all text-[16px]" 
              placeholder="Cari data inventori, potensi, atau produk UMKM..." 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter Chips */}
          <div className="flex overflow-x-auto md:flex-wrap items-center md:justify-center gap-2 sm:gap-3 pb-2 snap-x hide-scrollbar">
            {filters.map((filter) => (
              <button 
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2.5 rounded-full font-label-sm text-[14px] font-semibold transition-all duration-300 ${
                  activeFilter === filter 
                    ? "bg-primary text-white shadow-md shadow-primary/20" 
                    : "bg-white border border-surface-variant/40 text-on-surface-variant hover:border-primary/50 hover:text-primary"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Inventory Grid Layout */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, i) => (
              <motion.article 
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full overflow-hidden group border border-surface-variant/30"
              >
                <div className="h-56 sm:h-60 md:h-64 relative overflow-hidden">
                  <img 
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out" 
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-5 left-5 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full font-label-sm text-[13px] font-semibold">
                    {item.category}
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-5 right-5 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-full font-label-sm text-[13px] font-semibold shadow-sm ${
                    item.status === 'Tersedia' || item.status === 'Buka' || item.status === 'Masa Panen' 
                      ? 'bg-green-500/20 text-green-100 border-green-500/30' 
                      : item.status === 'Masa Tanam'
                      ? 'bg-amber-500/20 text-amber-100 border-amber-500/30'
                      : 'bg-red-500/20 text-red-100 border-red-500/30'
                  }`}>
                    {item.status}
                  </div>

                  <h2 className="absolute bottom-5 left-5 font-display-lg text-2xl md:text-3xl text-white tracking-tight leading-tight pr-5">
                    {item.name}
                  </h2>
                </div>

                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <p className="font-body-lg text-on-surface-variant line-clamp-2 mb-8 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Dashboard Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 mt-auto mb-8">
                    {item.metrics.map((metric, idx) => (
                      <div key={idx} className="flex flex-col">
                        <span className="font-label-sm text-[11px] text-on-surface-variant mb-1 uppercase tracking-wider font-semibold">{metric.label}</span>
                        <span className="font-title-md text-[15px] text-on-surface font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/potensi/${item.id}`} className="w-full bg-surface-container-low text-primary font-label-sm text-[15px] font-semibold py-4 rounded-2xl hover:bg-primary hover:text-white transition-all flex justify-center items-center gap-2 group/btn">
                    <Package className="w-4 h-4" /> Lihat Detail 
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
          
          {filteredData.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="col-span-full py-20 text-center flex flex-col items-center justify-center"
            >
              <div className="w-24 h-24 rounded-full bg-surface-container-low flex items-center justify-center mb-6 text-on-surface-variant">
                <Search className="w-10 h-10 opacity-50" />
              </div>
              <p className="font-title-md text-xl text-on-surface mb-2 font-semibold">Data Tidak Ditemukan</p>
              <p className="font-body-md text-on-surface-variant">Coba ubah kata kunci atau filter pencarian Anda.</p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
