import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sedaraja.id'),
  title: {
    default: "Desa Sedaraja | Website Resmi Pemerintah Desa",
    template: "%s | Desa Sedaraja"
  },
  description: "Website resmi Pemerintah Desa Sedaraja, memuat informasi publik, potensi desa, berita terkini, dan layanan administrasi masyarakat berbasis digital (SIDARA).",
  keywords: ["Desa Sedaraja", "Sedaraja", "Pemerintah Desa Sedaraja", "Profil Desa Sedaraja", "Kuningan", "Website Desa", "SIDARA"],
  authors: [{ name: "Pemerintah Desa Sedaraja" }],
  creator: "Pemerintah Desa Sedaraja",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://sedaraja.id",
    title: "Desa Sedaraja | Website Resmi",
    description: "Website resmi Pemerintah Desa Sedaraja. Akses informasi publik, berita, potensi wisata, dan layanan administrasi.",
    siteName: "Desa Sedaraja",
    images: [
      {
        url: "/images/logo_desa.png",
        width: 800,
        height: 600,
        alt: "Logo Desa Sedaraja",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Sedaraja | Website Resmi",
    description: "Website resmi Pemerintah Desa Sedaraja. Akses informasi publik, berita, dan potensi wisata.",
    images: ["/images/logo_desa.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} antialiased h-full overflow-x-hidden`}>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-surface text-on-surface overflow-x-hidden">
        <Header />
        <main className="flex-grow w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
