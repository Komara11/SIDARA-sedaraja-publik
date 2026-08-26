import Link from "next/link";
import { Leaf, Mail, Phone, MapPin, ChevronRight } from "lucide-react";
import { readData } from "@/lib/data";

export async function Footer() {
  let settings: any = {};
  let halaman: any = {};
  try {
    settings = await readData('settings.json');
  } catch (e) {
    // Fallback
  }
  try {
    halaman = await readData('halaman.json');
  } catch (e) {
    // Fallback
  }

  const ft = halaman?.footer || {};
  const hdr = halaman?.header || {};
  const brandName = hdr.brandName || "SIDARA";
  const brandDesc = ft.brandDescription || "Sistem Informasi Digital dan Inventarisasi Potensi Desa Sedaraja. Mewujudkan tata kelola desa yang modern, transparan, dan berkelanjutan.";
  const socialMedia = ft.socialMedia || { instagram: "", facebook: "", youtube: "" };
  const copyrightText = ft.copyrightText || "Pemerintah Desa Sedaraja. All rights reserved.";
  const sinergiLabel = ft.sinergiLabel || "Sinergi Kolaborasi Digital:";
  const sinergiItems = ft.sinergiItems || [
    { name: "Pemdes Sedaraja", icon: "account_balance", logoPath: "" },
    { name: "INSTBUNAS", icon: "", logoPath: "/images/logo_kampus.png" },
    { name: "KKN Tematik", icon: "", logoPath: "/images/logo_kkn.png" }
  ];

  return (
    <footer className="bg-primary text-white w-full mt-auto font-sans">
      <div className="px-margin-mobile md:px-margin-desktop pt-20 pb-12 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group text-white">
              <img 
                src={hdr.logoPath || "/images/logo_desa.png"}
                alt={`Logo ${brandName}`}
                className="w-12 h-12 md:w-14 md:h-14 object-contain group-hover:scale-105 transition-transform duration-300 shrink-0" 
              />
              <div className="flex flex-col transition-colors duration-300 justify-center">
                <span className="font-sans text-lg md:text-xl font-extrabold tracking-tight leading-none uppercase">{brandName}</span>
                <span className="font-sans text-[9px] md:text-[10px] font-bold tracking-widest mt-1.5 max-w-[200px] md:max-w-[300px] leading-snug uppercase text-white/80">
                  {hdr.brandSubtitle || "Sistem Informasi Digital dan Inventarisasi Desa Sedaraja"}
                </span>
              </div>
            </Link>
            <p className="text-sm font-medium text-white/80 leading-relaxed text-justify mt-2">
              {brandDesc}
            </p>
            <div className="flex gap-4 mt-2">
              <a href={socialMedia.instagram || "#"} aria-label="Instagram" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-white hover:text-primary transition-colors border border-white/20">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href={socialMedia.facebook || "#"} aria-label="Facebook" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-white hover:text-primary transition-colors border border-white/20">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href={socialMedia.youtube || "#"} aria-label="Youtube" className="w-10 h-10 rounded bg-white/5 flex items-center justify-center hover:bg-white hover:text-primary transition-colors border border-white/20">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s-.002 3.254-.42 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.812.419-7.812.419s-6.252 0-7.812-.419a2.505 2.505 0 01-1.768-1.768C2 15.254 2 12 2 12s.002-3.254.42-4.814a2.507 2.507 0 011.768-1.768C5.748 5 12 5 12 5s6.252 0 7.812.418zM9.545 15.568l5.959-3.568-5.959-3.568v7.136z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6 lg:ml-8">
            <h3 className="font-sans text-base text-white font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-1 bg-white/30 rounded-full"></span> Tautan Cepat
            </h3>
            <ul className="flex flex-col gap-3.5">
              {[
                { name: "Profil Desa", path: "/profil" },
                { name: "Data Demografi", path: "/demografi" },
                { name: "Transparansi Dana", path: "/transparansi" },
                { name: "Potensi Desa", path: "/potensi" },
                { name: "Layanan Surat", path: "/layanan-surat" },
                { name: "Pengaduan", path: "/pengaduan" }
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.path} className="font-sans text-xs font-bold text-white/70 hover:text-white flex items-center gap-1 group transition-all uppercase tracking-wider">
                    <ChevronRight className="w-3 h-3 text-white/30 group-hover:text-white transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform">{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 lg:col-span-2 lg:ml-12">
            <h3 className="font-sans text-base text-white font-bold tracking-widest uppercase flex items-center gap-2">
              <span className="w-4 h-1 bg-white/30 rounded-full"></span> Kontak Kami
            </h3>
            <div className="flex flex-col gap-5">
              <div className="flex gap-4 items-center group">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                  <MapPin className="w-4 h-4 text-white/80 group-hover:text-white" />
                </div>
                <p className="font-sans text-sm font-medium text-white/70 leading-relaxed">
                  {settings?.alamat || "Jl. Raya Sedaraja No. 1, Kec. Cingambul, Kabupaten Majalengka, Jawa Barat 45467"}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href={`https://wa.me/${settings?.telepon ? settings.telepon.replace(/^0/, '62') : '6281234567890'}`} target="_blank" rel="noreferrer" className="flex gap-4 items-center group cursor-pointer">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <Phone className="w-4 h-4 text-white/80 group-hover:text-white" />
                  </div>
                  <p className="font-sans text-sm font-medium text-white/70 group-hover:text-white transition-colors">{settings?.telepon || "(0233) 1234567"}</p>
                </a>
                <div className="flex gap-4 items-center group">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    <Mail className="w-4 h-4 text-white/80 group-hover:text-white" />
                  </div>
                  <p className="font-sans text-sm font-medium text-white/70">{settings?.email || "info@sedaraja.desa.id"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sinergi Kolaborasi Banner */}
        <div className="pt-8 pb-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-widest text-white/90">
              {sinergiLabel}
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {sinergiItems.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3 bg-white/5 hover:bg-white/10 transition-colors border border-white/10 px-4 py-2.5 rounded-md text-xs font-bold text-white tracking-wider">
                {item.logoPath ? (
                  <div className="bg-white p-1 rounded-sm shrink-0 flex items-center justify-center w-8 h-8">
                    <img src={item.logoPath} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                ) : item.icon ? (
                  <div className="w-8 h-8 bg-white/10 rounded-sm flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[18px] text-white">{item.icon}</span>
                  </div>
                ) : null}
                <span className="uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex flex-col gap-2 md:gap-1.5">
            <p className="font-sans text-xs font-medium text-white/60 uppercase tracking-widest">
              © {new Date().getFullYear()} {copyrightText}
            </p>
            <p className="font-sans text-xs font-medium text-white/50 tracking-widest uppercase">
              Designed & Developed by <a href="https://rahesa-komara-r7o2.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors underline underline-offset-4">Komara</a> from <a href="https://www.clovercode.shop" target="_blank" rel="noopener noreferrer" className="text-white hover:text-white/80 transition-colors underline underline-offset-4">Clovercode</a>
            </p>
          </div>
          <ul className="flex gap-6">
            <li>
              <Link href="#" className="font-sans text-xs font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link href="#" className="font-sans text-xs font-medium text-white/60 hover:text-white transition-colors uppercase tracking-widest">
                Syarat & Ketentuan
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
