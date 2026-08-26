"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";

const kkmTeam = [
  { name: "Dosen Pembimbing Lapangan", image: "/images/tim-kkm/dpl-bersama.jpeg" },
  { name: "Ketua KKM", image: "/images/tim-kkm/ketua.jpeg" },
  { name: "Sekretaris", image: "/images/tim-kkm/sekertaris.jpeg" },
  { name: "Bendahara", image: "/images/tim-kkm/bendahara.jpeg" },
  { name: "Divisi Acara", image: "/images/tim-kkm/acara.jpeg" },
  { name: "Divisi Acara", image: "/images/tim-kkm/acara2.jpeg" },
  { name: "Divisi Humas", image: "/images/tim-kkm/humas.jpeg" },
  { name: "Divisi Humas", image: "/images/tim-kkm/humas2.jpeg" },
  { name: "Divisi Pubdokdek", image: "/images/tim-kkm/pubdokdek.jpeg" },
  { name: "Divisi Pubdokdek", image: "/images/tim-kkm/pubdokdek2.jpeg" },
  { name: "Divisi Pubdokdek", image: "/images/tim-kkm/pubdokdek3.jpeg" }
];

export default function KkmStrukturPage() {
  return (
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>

      {/* Main Content */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32 mt-8 flex flex-col items-center">

        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-primary tracking-tight leading-tight mb-16 uppercase text-center max-w-4xl">
          Struktur Organisasi KKM
        </h1>

        {/* Anggota KKM */}
        <div className="w-full max-w-5xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
            {kkmTeam.map((person, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-surface-variant/50 overflow-hidden group"
              >
                <div className="w-full aspect-[3/4] bg-surface-bright overflow-hidden relative">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
