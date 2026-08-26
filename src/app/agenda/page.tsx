"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Search, 
  Loader2, 
  Tag, 
  Sparkles,
  ChevronRight,
  CalendarDays
} from "lucide-react";
import Link from "next/link";

export default function AgendaPage() {
  const [agenda, setAgenda] = useState<any[]>([]);
  const [halaman, setHalaman] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("Semua");

  useEffect(() => {
    Promise.all([
      fetch('/api/agenda').then(res => res.json()),
      fetch('/api/halaman').then(res => res.json())
    ])
    .then(([agendaData, halamanData]) => {
      setAgenda(agendaData);
      setHalaman(halamanData.agenda || {});
      setLoading(false);
    })
    .catch(() => setLoading(false));
  }, []);

  const types = ["Semua", ...Array.from(new Set(agenda.map(a => a.type).filter(Boolean)))];

  const filteredAgenda = agenda.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "Semua" || item.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      
      {/* Top Header Spacing */}
      <div className="pt-28 md:pt-32"></div>



      {/* Main Agenda Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        {/* Search & Filter Bar */}
        <div className="bg-white p-6 md:p-8 rounded-md shadow-sm border border-surface-variant/50 mb-12 flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-96">
              <Search className="w-5 h-5 text-on-surface-variant absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari agenda kegiatan, tempat, atau nama acara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-surface pl-12 pr-4 py-3 rounded text-sm border border-surface-variant/60 focus:outline-none focus:border-primary transition-colors font-sans"
              />
            </div>

            {/* Total Results */}
            <div className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Menampilkan <span className="text-primary">{filteredAgenda.length}</span> dari {agenda.length} agenda
            </div>
          </div>

          {/* Type Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar pt-4 border-t border-surface-variant/30">
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant shrink-0 mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> Kategori:
            </span>
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all shrink-0 border ${
                  selectedType === type
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-surface-bright text-on-surface-variant hover:border-primary/50 hover:text-primary border-surface-variant/40"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Agenda List */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-on-surface-variant gap-3">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="font-sans text-sm font-bold uppercase tracking-widest">Memuat agenda kegiatan...</p>
          </div>
        ) : filteredAgenda.length === 0 ? (
          <div className="bg-white p-12 rounded-md border border-surface-variant/50 text-center flex flex-col items-center justify-center gap-4 shadow-sm">
            <div className="w-16 h-16 rounded border border-surface-variant/30 bg-surface-bright flex items-center justify-center text-primary mb-2">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="font-sans text-xl font-bold uppercase tracking-widest text-on-surface">Agenda Tidak Ditemukan</h3>
            <p className="font-sans text-sm text-on-surface-variant max-w-md">
              Tidak ada agenda kegiatan yang cocok dengan kata kunci atau filter kategori yang Anda pilih.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedType("Semua"); }}
              className="mt-2 text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredAgenda.map((item, i) => (
              <motion.div 
                key={item.id || i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
                className="bg-white p-6 md:p-8 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 border border-surface-variant/50 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center"
              >
                {/* Date Badge */}
                <div className="w-full md:w-36 shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center bg-surface-bright rounded border border-surface-variant/40 p-4 md:py-6 transition-colors duration-300 text-primary hover:bg-primary hover:text-white">
                  <span className="font-sans font-bold text-3xl md:text-4xl mb-0 md:mb-1">
                    {item.date}
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-widest font-bold">
                    {item.month} {item.year}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-grow flex flex-col gap-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.type && (
                      <span className="border border-primary/20 text-primary text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    )}
                    {item.status && (
                      <span className="border border-surface-variant/40 text-on-surface-variant text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded">
                        {item.status}
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans text-xl md:text-2xl text-on-surface font-bold tracking-tight leading-snug hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-sans text-sm text-on-surface-variant leading-relaxed text-justify">
                    {item.description}
                  </p>
                </div>
                
                {/* Meta Details */}
                <div className="w-full md:w-64 shrink-0 flex flex-col gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-surface-variant/30 md:border-l md:pl-8">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">{item.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <MapPin className="w-4 h-4 text-primary shrink-0" />
                    <span className="font-sans text-xs font-bold uppercase tracking-wider">{item.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
