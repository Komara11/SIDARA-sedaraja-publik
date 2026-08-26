"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Search, Calendar, Tag, Loader2, FileText, Download, Eye, X } from "lucide-react";

export default function InformasiResmiPage() {
  const [informasi, setInformasi] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    fetch('/api/informasi-resmi')
      .then(res => res.json())
      .then(data => {
        setInformasi(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["Semua", ...Array.from(new Set(informasi.map(b => b.category).filter(Boolean)))];

  const filteredInfo = informasi.filter(info => {
    const matchesSearch = 
      info.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (info.snippet && info.snippet.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "Semua" || info.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>

      {/* Search Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full mb-12 mt-8">
        {/* Search Engine & Filter Bar */}
          <div className="z-10 bg-surface-bright p-5 md:p-6 rounded-md shadow-sm border border-surface-variant/50 flex flex-col gap-5 w-full">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Engine Input */}
              <div className="relative w-full md:w-96">
                <Search className="w-5 h-5 text-on-surface-variant absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari surat atau dokumen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white pl-12 pr-10 py-3 rounded text-sm border border-surface-variant/40 focus:outline-none focus:border-primary transition-colors font-sans"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Total Results */}
              <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                Total: <span className="text-primary">{filteredInfo.length}</span> Dokumen
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pt-4 border-t border-surface-variant/30">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant shrink-0 mr-2 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5" /> Kategori:
              </span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 border ${
                    selectedCategory === cat
                      ? "bg-primary text-white border-primary shadow-sm"
                      : "bg-white text-on-surface-variant hover:text-primary border-surface-variant/40"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
      </section>

      {/* Document List Section */}
      <section className="pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="font-sans text-sm font-bold uppercase tracking-widest">Memuat dokumen resmi...</p>
          </div>
        ) : filteredInfo.length === 0 ? (
          <div className="bg-white p-12 rounded-md border border-surface-variant/50 text-center flex flex-col items-center justify-center gap-4 shadow-sm">
            <div className="w-16 h-16 rounded border border-surface-variant/30 bg-surface-bright flex items-center justify-center text-primary mb-2">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="font-sans text-xl font-bold uppercase tracking-widest text-on-surface">Dokumen Tidak Ditemukan</h3>
            <p className="font-sans text-sm text-on-surface-variant max-w-md">
              Tidak ada surat resmi yang sesuai dengan kata kunci "{searchQuery}" {selectedCategory !== "Semua" ? `di kategori ${selectedCategory}` : ""}.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("Semua"); }}
              className="mt-2 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredInfo.map((info, i) => (
              <motion.article 
                key={info.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
                className="flex flex-col bg-white rounded-md border border-surface-variant/50 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
              >
                <div className="p-6 md:p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-sans text-primary text-[10px] font-bold uppercase tracking-widest border border-primary/20 bg-primary/5 px-2 py-1 rounded">
                      {info.category}
                    </span>
                    <span className="font-sans text-on-surface-variant text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(info.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  
                  <h3 className="font-sans text-lg md:text-xl font-bold text-on-surface mb-4 tracking-tight leading-snug">
                    {info.title}
                  </h3>
                  
                  <p className="font-sans text-sm text-on-surface-variant mb-6 line-clamp-3 leading-relaxed flex-grow text-justify">
                    {info.snippet}
                  </p>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-surface-variant/30 mt-auto">
                    {info.pdfUrl && (
                      <a 
                        href={info.pdfUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-white hover:bg-emerald-700 font-sans font-bold text-xs uppercase tracking-widest px-4 py-3 rounded transition-colors shadow-sm"
                      >
                        <Eye className="w-4 h-4" /> Lihat Surat
                      </a>
                    )}
                    {info.pdfUrl && (
                      <a 
                        href={info.pdfUrl} 
                        download
                        className="flex items-center justify-center bg-surface-bright hover:bg-surface-variant/40 text-on-surface-variant hover:text-primary p-3 rounded transition-colors border border-surface-variant/50"
                        title="Unduh File PDF"
                      >
                        <Download className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
