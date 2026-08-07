"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Calendar, MapPin, Clock } from "lucide-react";

export default function BeritaPage() {
  const [berita, setBerita] = useState<any[]>([]);
  const [agenda, setAgenda] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch('/api/berita').then(res => res.json()),
      fetch('/api/agenda').then(res => res.json())
    ]).then(([b, a]) => {
      setBerita(b);
      setAgenda(a);
    });
  }, []);

  const featuredNews = berita[0];
  const secondaryNews = berita.slice(1);

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright">
      
      {/* Header Spacing */}
      <div className="pt-16"></div>

      {/* Newsroom Section */}
      <section className="py-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Featured News (Left, larger span) */}
          {featuredNews && (
            <motion.article 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="lg:col-span-7 flex flex-col group cursor-pointer"
            >
              <Link href={`/berita/${featuredNews.slug || featuredNews.id}`} className="flex flex-col h-full">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden mb-6 relative shadow-md">
                  {featuredNews.image ? (
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  ) : (
                    <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">image</span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1.5 rounded-full font-label-sm text-[13px] shadow-sm">
                    {featuredNews.category}
                  </div>
                </div>
                <div className="flex flex-col flex-grow">
                  <span className="font-label-sm text-on-surface-variant mb-3">
                    {new Date(featuredNews.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </span>
                  <h2 className="font-display-lg text-2xl sm:text-3xl md:text-4xl text-on-surface mb-4 group-hover:text-primary transition-colors tracking-tight leading-tight">
                    {featuredNews.title}
                  </h2>
                  <p className="font-body-lg text-on-surface-variant line-clamp-3 mb-6">
                    {featuredNews.snippet || featuredNews.content}
                  </p>
                  <div className="mt-auto flex items-center text-primary font-label-sm gap-2 font-semibold">
                    Baca Selengkapnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.article>
          )}

          {/* Secondary News List (Right) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="font-title-md text-xl text-on-surface border-b border-surface-variant/50 pb-4 tracking-tight font-semibold">
              Berita Lainnya
            </h3>
            <div className="flex flex-col gap-6">
              {secondaryNews.map((news, i) => (
                <motion.article 
                  key={news.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  className="group cursor-pointer"
                >
                  <Link href={`/berita/${news.slug}`} className="flex gap-5">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 shadow-sm">
                      <img 
                        src={news.image} 
                        alt={news.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-label-sm text-primary text-[12px] font-semibold">{news.category}</span>
                        <span className="w-1 h-1 rounded-full bg-surface-variant/80"></span>
                        <span className="font-label-sm text-on-surface-variant text-[12px]">
                          {new Date(news.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                        </span>
                      </div>
                      <h4 className="font-title-md text-lg text-on-surface line-clamp-2 group-hover:text-primary transition-colors leading-snug font-semibold">
                        {news.title}
                      </h4>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
          
        </div>
      </section>

      {/* Agenda Section */}
      <section className="py-24 bg-surface-container-low w-full mt-12 border-t border-surface-variant/30">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl text-on-surface mb-3 tracking-tight">Agenda Kegiatan</h2>
              <p className="font-body-lg text-on-surface-variant">Jadwal acara dan kegiatan resmi desa yang akan datang.</p>
            </div>
            <button className="flex items-center gap-2 font-label-sm text-primary hover:text-primary-fixed transition-colors font-semibold">
              Lihat Semua Agenda <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {agenda.map((agenda, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                className="bg-white p-6 md:p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow border border-surface-variant/30 flex flex-col md:flex-row gap-6 md:gap-8 items-start md:items-center group"
              >
                {/* Date Block */}
                <div className="w-full md:w-32 shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center bg-primary/5 rounded-2xl p-4 md:py-6 border border-primary/10 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span className="font-display-lg text-3xl md:text-4xl text-primary group-hover:text-white mb-0 md:mb-1">
                    {agenda.date}
                  </span>
                  <span className="font-label-sm text-primary/80 group-hover:text-white/80 uppercase tracking-widest">
                    {agenda.month}
                  </span>
                </div>
                
                {/* Content */}
                <div className="flex-grow flex flex-col gap-3">
                  <h3 className="font-title-md text-xl md:text-2xl text-on-surface font-semibold tracking-tight leading-snug">{agenda.title}</h3>
                  <p className="font-body-md text-on-surface-variant line-clamp-2 md:line-clamp-none">{agenda.description}</p>
                </div>
                
                {/* Meta */}
                <div className="w-full md:w-64 shrink-0 flex flex-col gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-surface-variant/30 md:border-l md:pl-8">
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Clock className="w-5 h-5 text-primary/70" />
                    <span className="font-label-sm text-[14px]">{agenda.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <MapPin className="w-5 h-5 text-primary/70" />
                    <span className="font-label-sm text-[14px]">{agenda.location}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
