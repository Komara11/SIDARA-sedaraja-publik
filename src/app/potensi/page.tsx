"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Search, ArrowRight, Package } from "lucide-react";

export default function PotensiPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filters = ["Semua", "Pertanian", "Perikanan", "Wisata", "UMKM"];

  const inventoryData = [
    {
      id: "padi-sawah",
      name: "Padi Sawah",
      category: "Pertanian",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEUtpJjAbhg6kkhC5rgRhXnU_7ujjec_KvHrsXqLQVJAO2hlagg5yIV88D_OJqSeGL0ZvSXs3veB77jHFC-XAdtC2QFqMoSJLmuRYU-1wqto65XeX2PRMYFUP7S5M1HIeS3nf3r1uT5rCTfZXFLUoeQyv6JiXuJ1I-td9BUa-NSW_ilzrCqQQvpUuldP848y8Z4YYXeIlYBwjInCzwWNt8utMmRQ_l9T3CrSjAMOgKKth-6PxcEsGO",
      metrics: [
        { label: "Luas Lahan", value: "50 Ha" },
        { label: "Produksi", value: "300 Ton" },
        { label: "Stok Gudang", value: "45 Ton" },
      ],
      status: "Masa Panen",
      description: "Komoditas utama penyumbang perekonomian desa dengan sistem irigasi teknis yang terkelola dengan baik."
    },
    {
      id: "ikan-nila",
      name: "Budidaya Ikan Nila",
      category: "Perikanan",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFRi5bNXm3S0FT8MGpA_eKnCVvSwTYJ9a0rNnZE-YZ5WRzWWdq4hSq8Q8ZETw43PligIe4SyIVDmW5MOox8vCaR59M94Sa2LyAbkg1kHIEuCaFVC4d6jVjL1mbVtllzJm0cI-45FjK1E4Rywb4Up76o_TdhsHAfCEQbkI2AtKNw9-cwi5nIQwdF42Aj99BF_3gW2RD-Ssy4fhk1_s4PwyVF84DZoz5SJQzPmbqfErSsjd8h49ChmBF",
      metrics: [
        { label: "Jumlah Kolam", value: "15 Unit" },
        { label: "Produksi", value: "120 Ton" },
        { label: "Siap Jual", value: "5 Ton" },
      ],
      status: "Tersedia",
      description: "Kolam air deras yang memanfaatkan aliran sungai jernih pegunungan, menghasilkan ikan konsumsi berkualitas tinggi."
    },
    {
      id: "kopi-sedaraja",
      name: "Kopi Sedaraja",
      category: "UMKM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjd7AD5dSZ4FldI_MDuhMSMfKLISG8WHN2kzym_LZIQokz7F0o8wRiwTVGcCmIKDqUNo4RFURxq6rL5mxepfzlwXu2H1h4ZM65Oi8QedYwDFH_beSTTEcg3nBqrarRJTo6s83u_zilLvYlpHQyew7wuG8mrrfjimx3K9CkVXg6-nXEkCAgGgvzEnj4p_a17siPcoxjU5AdALPv9kWLDtL4bfDb5mHVsARfQr48f1NtID7KaAABvkRW",
      metrics: [
        { label: "Pelaku UMKM", value: "12 Orang" },
        { label: "Produksi/Bln", value: "200 Kg" },
        { label: "Stok Produk", value: "15 Kg" },
      ],
      status: "Tersedia",
      description: "Biji kopi robusta pilihan yang dipetik langsung dari kebun warga, disangrai dengan metode tradisional."
    },
    {
      id: "jagung-manis",
      name: "Jagung Manis",
      category: "Pertanian",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUjI8Tg4v3XRe6CPqxu87V4sa6tG25mR3E0tY70cpjsFchdsry14z0ILYsXaLgckrRPA0C8sj6HDKBIt8_yrWAU0a59iE-VfbclOdQmWOwEzNdZig55fAwzvCHh-48FONpw6QopoWupXuHDR6qL9UoReoAHp0bP33dBpY6tdEhUIG-F-Y7JIgix9rB32ZPjvXj0ZPtJLENgDa-lfckOSSua6vY4d_FH0YaseyFj0RG4BLILFPxhvv_",
      metrics: [
        { label: "Luas Lahan", value: "20 Ha" },
        { label: "Produksi", value: "100 Ton" },
        { label: "Stok Gudang", value: "Habis" },
      ],
      status: "Masa Tanam",
      description: "Ditanam pada area tegalan sebagai tanaman sela yang memberikan nilai ekonomi tambahan yang signifikan."
    },
    {
      id: "bukit-pamoroan",
      name: "Bukit Pamoroan",
      category: "Wisata",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnzmyY2bIrPcsXULB4NN3558EDj24ImSvxrrtM6MHxHC7JrF-QxdNJJQ4V062qQoMbD95ZD_6FWHYrwIGrWz9XBbwXf56IHN6GGgfKH70RLJebMEGXMgaAe6Rl3Kyet2clLy9QRqjZWeb9laIyFYJCEjE77mwYOId6yDXLkJxv76CRiMZ1sJCcEqQYxFSo_YAXVyjuqeGhgBeI6a5HNrGz_m_8EOmqG5vl-hbMKffxIj_6xG0uI4i",
      metrics: [
        { label: "Pengunjung", value: "500+/bln" },
        { label: "Kapasitas", value: "50 Tenda" },
        { label: "Spot Foto", value: "Tersedia" },
      ],
      status: "Buka",
      description: "Destinasi wisata alam unggulan dengan pemandangan pegunungan yang menakjubkan dan area perkemahan yang luas."
    }
  ];

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
        <h1 className="font-display-lg text-4xl md:text-5xl text-on-surface mb-4 tracking-tight">Katalog <span className="text-primary">Potensi Desa</span></h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
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
          <div className="flex flex-wrap justify-center gap-3">
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
                <div className="h-64 relative overflow-hidden">
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
