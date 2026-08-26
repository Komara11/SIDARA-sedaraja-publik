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
  const [halaman, setHalaman] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/potensi').then(res => res.json()),
      fetch('/api/halaman').then(res => res.json())
    ]).then(([inventory, halamanData]) => {
      setInventoryData(inventory);
      setHalaman(halamanData.potensi || {});
    });
  }, []);

  const filteredData = inventoryData.filter(item => {
    const matchesFilter = activeFilter === "Semua" || item.category === activeFilter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen pb-32">
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>

      {/* Search Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full mb-12 mt-8">
          {/* Search and Filter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-3xl mx-auto flex flex-col gap-6"
          >
            <div className="relative w-full shadow-sm rounded-md group border border-surface-variant/50">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5 group-focus-within:text-primary transition-colors" />
              <Input 
                className="w-full bg-surface-bright border-none rounded-md py-4 pl-12 pr-4 font-sans text-sm text-on-surface placeholder:text-on-surface-variant/50 focus-visible:ring-2 focus-visible:ring-primary/20 transition-all" 
                placeholder="Cari data inventori, potensi, atau produk UMKM..." 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* Filter Chips */}
            <div className="flex overflow-x-auto md:flex-wrap items-center md:justify-center gap-2 pb-2 snap-x hide-scrollbar">
              {filters.map((filter) => (
                <button 
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded text-[11px] font-bold uppercase tracking-widest transition-all duration-300 border ${
                    activeFilter === filter 
                      ? "bg-primary text-white border-primary shadow-sm" 
                      : "bg-white border-surface-variant/40 text-on-surface-variant hover:border-primary/50 hover:text-primary"
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
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredData.map((item, i) => (
              <motion.article 
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full overflow-hidden border border-surface-variant/50"
              >
                <div className="h-48 sm:h-52 relative overflow-hidden bg-surface-bright border-b border-surface-variant/30">
                  <img 
                    className="object-cover w-full h-full" 
                    src={item.image}
                    alt={item.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 text-on-surface px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {item.category}
                  </div>
                  
                  {/* Status Badge */}
                  <div className={`absolute top-4 right-4 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm ${
                    item.status === 'Tersedia' || item.status === 'Buka' || item.status === 'Masa Panen' 
                      ? 'bg-green-100 text-green-800' 
                      : item.status === 'Masa Tanam'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </div>

                  <h2 className="absolute bottom-4 left-4 font-sans font-bold text-xl text-white tracking-tight leading-tight pr-4">
                    {item.name}
                  </h2>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="font-sans text-sm text-on-surface-variant line-clamp-2 mb-6 leading-relaxed text-justify">
                    {item.description}
                  </p>

                  {/* Dashboard Metrics Grid */}
                  <div className="grid grid-cols-3 gap-4 mt-auto mb-6 pt-4 border-t border-surface-variant/30">
                    {item.metrics.map((metric: any, idx: number) => (
                      <div key={idx} className="flex flex-col">
                        <span className="font-sans text-[10px] text-on-surface-variant mb-1 uppercase tracking-widest font-bold">{metric.label}</span>
                        <span className="font-sans text-sm text-on-surface font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>

                  <Link href={`/potensi/${item.id}`} className="w-full bg-surface-bright border border-surface-variant/40 text-primary font-sans text-xs uppercase tracking-widest font-bold py-3 rounded hover:bg-primary hover:text-white transition-all flex justify-center items-center gap-2 group/btn">
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
              className="col-span-full py-20 text-center flex flex-col items-center justify-center bg-white border border-surface-variant/50 rounded-md"
            >
              <div className="w-16 h-16 rounded border border-surface-variant/30 bg-surface-bright flex items-center justify-center mb-4 text-on-surface-variant">
                <Search className="w-8 h-8 opacity-50" />
              </div>
              <p className="font-sans font-bold text-lg text-on-surface mb-2 uppercase tracking-widest">Data Tidak Ditemukan</p>
              <p className="font-sans text-sm text-on-surface-variant">Coba ubah kata kunci atau filter pencarian Anda.</p>
            </motion.div>
          )}
        </motion.div>
      </section>
    </div>
  );
}
