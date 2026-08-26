"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [hData, setHData] = useState<any>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetch('/api/halaman').then(r => r.json()).then(d => setHData(d)).catch(() => {});
  }, []);

  const hdr = hData?.header || {};
  const brandName = hdr.brandName || "SIDARA";
  const brandSubtitle = hdr.brandSubtitle || "Sistem Informasi Digital dan Inventarisasi Desa Sedaraja";
  const logoPath = hdr.logoPath || "/images/logo_desa.png";

  const isHome = pathname === "/";
  const isTransparent = isHome && !isScrolled && !mobileMenuOpen;

  const headerBgClass = isTransparent 
    ? "bg-gradient-to-b from-black/60 to-transparent border-transparent" 
    : "bg-primary border-b border-primary-fixed/50 shadow-md";

  const textTitleClass = "text-white";
  const textSubtitleClass = "text-white/80";
  const menuIconClass = "text-white hover:text-white/80";

  const navItems = [
    { name: "Home", path: "/" },
    { 
      name: "Profil Desa", 
      dropdown: true,
      items: [
        { name: "Profil & Sejarah", path: "/profil" },
        { name: "Struktur Kepengurusan", path: "/pemerintahan" },
        { name: "Kelembagaan", path: "/kelembagaan" },
      ]
    },
    { 
      name: "Data & Potensi", 
      dropdown: true,
      items: [
        { name: "Demografi", path: "/demografi" },
        { name: "Transparansi", path: "/transparansi" },
        { name: "Potensi Desa", path: "/potensi" },
      ]
    },
    { 
      name: "Publikasi", 
      dropdown: true,
      items: [
        { name: "Berita Desa", path: "/berita" },
        { name: "Agenda Kegiatan", path: "/agenda" },
        { name: "Informasi Resmi", path: "/informasi-resmi" },
        { name: "Galeri", path: "/galeri" },
      ]
    },
    { 
      name: "Tim KKM", 
      dropdown: true,
      items: [
        { name: "Tentang KKM", path: "/tim-kkm" },
        { name: "Struktur Organisasi", path: "/tim-kkm/struktur" },
      ]
    },
    { name: "Buat Surat", path: "/layanan-surat" },
    { name: "Pengaduan", path: "/pengaduan" },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 py-3 ${headerBgClass}`}>
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-3 text-title-md font-title-md group">
          <img 
            src={logoPath}
            alt={`Logo ${brandName}`}
            className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:scale-105 transition-transform duration-300 shrink-0" 
          />
          <div className="flex flex-col transition-colors duration-300 justify-center">
            <span className={`font-sans text-lg md:text-xl font-extrabold tracking-tight leading-none uppercase ${textTitleClass}`}>{brandName}</span>
            <span className={`font-sans text-[9px] md:text-[10px] font-bold tracking-widest mt-1.5 max-w-[200px] md:max-w-[300px] leading-snug uppercase ${textSubtitleClass}`}>
              {brandSubtitle}
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-4 xl:gap-8 items-center h-12" ref={dropdownRef}>
          {navItems.map((item) => {
            if (item.dropdown) {
              const isActive = item.items?.some(subItem => pathname.startsWith(subItem.path));
              
              const itemColor = isActive 
                ? "text-white font-extrabold"
                : "text-white/90 hover:text-white";

              return (
                <div 
                  key={item.name} 
                  className="relative h-full flex items-center group"
                >
                  <button 
                    className={`font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-300 h-full ${itemColor}`}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                  
                  <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="w-56 bg-primary border border-white/20 shadow-md py-2 rounded flex flex-col">
                      {item.items?.map(subItem => {
                        const isSubActive = pathname === subItem.path || pathname.startsWith(subItem.path + '/');
                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.path}
                            className={`block px-5 py-2.5 font-sans text-xs font-bold uppercase tracking-widest transition-colors ${
                              isSubActive ? "text-white bg-white/10 border-l-2 border-white" : "text-white/70 hover:bg-white/5 hover:text-white border-l-2 border-transparent"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = pathname === item.path;
            const itemColor = isActive 
              ? "text-white font-extrabold"
              : "text-white/90 hover:text-white";

            return (
              <Link 
                key={item.name} 
                href={item.path || "/"}
                className={`font-sans font-bold text-xs uppercase tracking-wider transition-colors duration-300 h-full flex items-center relative ${itemColor}`}
              >
                {item.name}
                {isActive && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className={`p-2 transition-colors duration-300 ${menuIconClass}`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              open: { height: "auto", opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1, duration: 0.3, ease: "easeInOut" } },
              closed: { height: 0, opacity: 0, transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.05, staggerDirection: -1 } }
            }}
            className="lg:hidden bg-primary border-t border-white/20 shadow-md overflow-hidden"
          >
            <div className="px-margin-mobile py-4 flex flex-col gap-1">
              {navItems.map((item) => {
                const isDropdownOpen = openMobileDropdown === item.name;
                const isSubActive = item.dropdown && item.items?.some(sub => pathname.startsWith(sub.path));

                return (
                  <motion.div 
                    key={item.name} 
                    variants={{
                      open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
                      closed: { opacity: 0, x: -20, transition: { duration: 0.2 } }
                    }}
                    className="flex flex-col border-b border-white/10 last:border-b-0 py-1"
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setOpenMobileDropdown(isDropdownOpen ? null : item.name)}
                          className="flex items-center justify-between w-full font-sans font-bold text-on-surface py-3 text-xs uppercase tracking-widest text-left group"
                        >
                          <span className={isSubActive ? "text-white font-extrabold" : "text-white/90"}>
                            {item.name}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-white/70 transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-white" : ""}`} />
                        </button>
                        
                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pl-4 border-l-2 border-white/20 my-2 pb-2">
                                {item.items?.map(subItem => {
                                  const isCurrent = pathname === subItem.path;
                                  return (
                                    <Link
                                      key={subItem.name}
                                      href={subItem.path}
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setOpenMobileDropdown(null);
                                      }}
                                      className={`font-sans py-2.5 px-3 rounded text-xs uppercase tracking-widest font-bold transition-colors ${
                                        isCurrent 
                                          ? "text-white bg-white/10" 
                                          : "text-white/70 hover:text-white hover:bg-white/5"
                                      }`}
                                    >
                                      {subItem.name}
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.path || "/"}
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setOpenMobileDropdown(null);
                        }}
                        className={`font-sans font-bold py-3 text-xs uppercase tracking-widest ${
                          pathname === item.path ? "text-white font-extrabold" : "text-white/90 hover:text-white"
                        }`}
                      >
                        {item.name}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
