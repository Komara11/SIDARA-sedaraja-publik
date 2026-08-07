import Link from "next/link";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { readData } from "@/lib/data";

export async function Footer() {
  let settings: any = {};
  try {
    settings = await readData('settings.json');
  } catch (e) {
    // Fallback
  }

  return (
    <footer className="bg-gradient-to-b from-primary/95 to-primary text-white w-full mt-auto font-sans">
      <div className="px-margin-mobile md:px-margin-desktop pt-20 pb-12 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & About */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <Link href="/" className="text-white flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
                <Leaf className="w-8 h-8 text-primary-fixed" />
              </div>
              <span className="text-3xl font-bold tracking-tight">SIDARA</span>
            </Link>
            <p className="text-sm font-medium text-white/80 leading-relaxed">
              Sistem Informasi Digital dan Inventarisasi Potensi Desa Sedaraja. Mewujudkan tata kelola desa yang modern, transparan, dan berkelanjutan.
            </p>
            <div className="flex gap-4 mt-2">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-fixed hover:text-primary transition-colors border border-white/10">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-fixed hover:text-primary transition-colors border border-white/10">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" aria-label="Youtube" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary-fixed hover:text-primary transition-colors border border-white/10">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s-.002 3.254-.42 4.814a2.504 2.504 0 01-1.768 1.768c-1.56.419-7.812.419-7.812.419s-6.252 0-7.812-.419a2.505 2.505 0 01-1.768-1.768C2 15.254 2 12 2 12s.002-3.254.42-4.814a2.507 2.507 0 011.768-1.768C5.748 5 12 5 12 5s6.252 0 7.812.418zM9.545 15.568l5.959-3.568-5.959-3.568v7.136z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-6">
            <h3 className="font-sans text-lg text-white font-bold tracking-tight">Tautan Cepat</h3>
            <ul className="flex flex-col gap-3">
              {[
                { name: "Profil Desa", path: "/profil" },
                { name: "Potensi Desa", path: "/potensi" },
                { name: "Berita & Agenda", path: "/berita" },
                { name: "Transparansi Dana", path: "/transparansi" },
                { name: "Pengaduan Masyarakat", path: "/pengaduan" }
              ].map(link => (
                <li key={link.name}>
                  <Link href={link.path} className="font-sans text-sm font-medium text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <h3 className="font-sans text-lg text-white font-bold tracking-tight">Kontak Kami</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <p className="font-sans text-sm font-medium text-white/80 leading-relaxed">
                  {settings?.alamat || "Jl. Raya Sedaraja No. 1, Kec. Cingambul, Kabupaten Majalengka, Jawa Barat 45467"}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-sans text-sm font-medium text-white/80">{settings?.telepon || "(0233) 1234567"}</p>
                </div>
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-sans text-sm font-medium text-white/80">{settings?.email || "info@sedaraja.desa.id"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs font-medium text-white/60">
            © {new Date().getFullYear()} Pemerintah Desa Sedaraja. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="#" className="font-sans text-xs font-medium text-white/60 hover:text-white transition-colors">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link href="#" className="font-sans text-xs font-medium text-white/60 hover:text-white transition-colors">
                Syarat & Ketentuan
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
