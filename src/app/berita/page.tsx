"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Search, Calendar, User, Tag, Loader2, Newspaper, X } from "lucide-react";

export default function BeritaPage() {
  const [berita, setBerita] = useState<any[]>([]);
  const [halaman, setHalaman] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  useEffect(() => {
    Promise.all([
      fetch('/api/berita').then(res => res.json()),
      fetch('/api/halaman').then(res => res.json())
    ])
    .then(([beritaData, halamanData]) => {
      setBerita(beritaData);
      setHalaman(halamanData.berita || {});
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  // Extract unique categories
  const categories = ["Semua", ...Array.from(new Set(berita.map(b => b.category).filter(Boolean)))];

  // Filter news items based on search query and selected category
  const filteredBerita = berita.filter(news => {
    const matchesSearch = 
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (news.snippet && news.snippet.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (news.content && news.content.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (news.author && news.author.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === "Semua" || news.category === selectedCategory;
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
            {/* Search Engine Input */}
            <div className="relative w-full">
              <Search className="w-5 h-5 text-on-surface-variant absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari kata kunci berita, pengumuman, atau topik..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white pl-12 pr-10 py-3 md:py-4 rounded text-sm md:text-base border border-surface-variant/40 focus:outline-none focus:border-primary transition-colors font-sans shadow-sm"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-on-surface-variant hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
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

      {/* Newsroom Section */}
      <section className="pb-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="font-sans text-sm font-bold uppercase tracking-widest">Memuat berita desa...</p>
          </div>
        ) : filteredBerita.length === 0 ? (
          <div className="bg-white p-12 rounded-md border border-surface-variant/50 text-center flex flex-col items-center justify-center gap-4 shadow-sm">
            <div className="w-16 h-16 rounded border border-surface-variant/30 bg-surface-bright flex items-center justify-center text-primary mb-2">
              <Newspaper className="w-8 h-8" />
            </div>
            <h3 className="font-sans text-xl font-bold uppercase tracking-widest text-on-surface">Berita Tidak Ditemukan</h3>
            <p className="font-sans text-sm text-on-surface-variant max-w-md">
              Tidak ada artikel berita yang sesuai dengan kata kunci "{searchQuery}" {selectedCategory !== "Semua" ? `di kategori ${selectedCategory}` : ""}.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("Semua"); }}
              className="mt-2 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            >
              Reset Pencarian
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredBerita.map((news, i) => (
              <motion.article 
                key={news.slug || news.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: "easeOut" }}
                className="group cursor-pointer flex flex-col h-full bg-white rounded-md border border-surface-variant/50 hover:shadow-md transition-shadow duration-300"
              >
                <Link href={`/berita/${news.slug || news.id}`} className="flex flex-col h-full p-5">
                  <div className="aspect-video rounded bg-surface-bright border border-surface-variant/30 overflow-hidden mb-5 relative shrink-0">
                    {news.image ? (
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-4xl text-surface-variant">image</span>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-primary text-white px-2.5 py-1 rounded text-[9px] uppercase tracking-widest font-bold shadow-sm">
                      {news.category}
                    </div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex items-center gap-3 text-on-surface-variant text-[10px] uppercase tracking-widest font-bold mb-3 flex-wrap">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {new Date(news.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      {news.author && (
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-primary" />
                          {news.author}
                        </span>
                      )}
                    </div>

                    <h2 className="font-sans text-lg text-on-surface mb-3 group-hover:text-primary transition-colors tracking-tight leading-snug font-bold line-clamp-2">
                      {news.title}
                    </h2>
                    <p className="font-sans text-sm text-on-surface-variant line-clamp-3 mb-6 leading-relaxed text-justify">
                      {news.snippet || news.content}
                    </p>
                    <div className="mt-auto flex items-center text-primary font-sans text-xs uppercase tracking-widest gap-2 font-bold group-hover:translate-x-1 transition-transform">
                      Baca Selengkapnya <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
