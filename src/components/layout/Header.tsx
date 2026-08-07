"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Leaf } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { 
      name: "Profil Desa", 
      dropdown: true,
      items: [
        { name: "Profil & Sejarah", path: "/profil" },
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
        { name: "Berita & Agenda", path: "/berita" },
        { name: "Galeri", path: "/galeri" },
      ]
    },
    { name: "Pengaduan", path: "/pengaduan" },
  ];

  const isHome = pathname === "/";
  const isWhiteText = isHome && !scrolled && !mobileMenuOpen;

  return (
    <header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-surface-variant/50 py-3" 
          : "bg-transparent py-5 border-b border-transparent"
      }`}
    >
      <div className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-2 md:gap-3 text-title-md font-title-md group">
          <Leaf className={`w-8 h-8 md:w-10 md:h-10 group-hover:scale-110 transition-transform duration-300 shrink-0 ${isWhiteText ? 'text-white' : 'text-primary'}`} />
          <div className="flex flex-col">
            <span className={`font-display-lg text-2xl md:text-3xl tracking-tight leading-none ${isWhiteText ? 'text-white' : 'text-on-surface'}`}>SIDARA</span>
            <span className={`text-[9px] md:text-[11px] font-medium tracking-wide mt-1 max-w-[160px] md:max-w-[300px] leading-tight md:leading-none ${isWhiteText ? 'text-white/80' : 'text-on-surface-variant'}`}>
              Sistem Informasi Digital dan Inventarisasi Desa Sedaraja
            </span>
          </div>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-8 items-center" ref={dropdownRef}>
          {navItems.map((item) => {
            if (item.dropdown) {
              const isActive = item.items?.some(subItem => pathname.startsWith(subItem.path));
              const isOpen = openDropdown === item.name;
              
              return (
                <div key={item.name} className="relative">
                  <button 
                    onClick={() => setOpenDropdown(isOpen ? null : item.name)}
                    className={`font-label-sm text-[15px] flex items-center gap-1.5 transition-all duration-200 py-2 
                      ${isWhiteText 
                        ? (isActive ? "text-white font-semibold" : "text-white/90 hover:text-white") 
                        : (isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary")}`}
                  >
                    {item.name}
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-0 mt-3 w-56 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl shadow-surface-variant/40 border border-surface-variant/50 overflow-hidden py-2"
                      >
                        {item.items?.map(subItem => {
                          const isSubActive = pathname === subItem.path || pathname.startsWith(subItem.path + '/');
                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.path}
                              onClick={() => setOpenDropdown(null)}
                              className={`block px-5 py-2.5 font-label-sm text-[14px] transition-colors
                                ${isSubActive ? "bg-primary/5 text-primary font-semibold" : "text-on-surface-variant hover:bg-surface-variant/30 hover:text-primary"}`}
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const isActive = pathname === item.path;
            return (
              <Link 
                key={item.name} 
                href={item.path || "/"}
                className={`font-label-sm text-[15px] transition-all duration-200 py-2 relative
                  ${isWhiteText 
                    ? (isActive ? "text-white font-semibold" : "text-white/90 hover:text-white") 
                    : (isActive ? "text-primary font-semibold" : "text-on-surface-variant hover:text-primary")}`}
              >
                {item.name}
                {isActive && (
                  <motion.div layoutId="underline" className={`absolute bottom-0 left-0 w-full h-0.5 rounded-full ${isWhiteText ? 'bg-white' : 'bg-primary'}`} />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 transition-colors ${isWhiteText ? 'text-white hover:text-white/80' : 'text-on-surface-variant hover:text-primary'}`}>
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
            className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-surface-variant/50 overflow-hidden shadow-xl"
          >
             <div className="px-margin-mobile py-6 flex flex-col gap-6">
              {navItems.map((item) => (
                <motion.div 
                  key={item.name} 
                  variants={{
                    open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
                    closed: { opacity: 0, x: -20, transition: { duration: 0.2 } }
                  }}
                  className="flex flex-col gap-3"
                >
                  {item.dropdown ? (
                    <>
                      <div className="font-label-sm font-bold text-on-surface-variant uppercase tracking-wider text-xs">{item.name}</div>
                      <div className="flex flex-col gap-2 pl-4 border-l-2 border-surface-variant/50">
                        {item.items?.map(subItem => (
                          <Link
                            key={subItem.name}
                            href={subItem.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className="font-label-sm text-on-surface hover:text-primary py-2 text-[15px]"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.path || "/"}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-label-sm font-semibold text-primary py-2 text-[15px]"
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

