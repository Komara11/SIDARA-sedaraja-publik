"use client";
import { motion } from "framer-motion";
import { Building2, Handshake, Heart, Users, Store, User, Users as UsersIcon } from "lucide-react";

export default function KelembagaanPage() {
  const lembaga = [
    {
      nama: "BPD",
      kepanjangan: "Badan Permusyawaratan Desa",
      deskripsi: "Lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa. BPD berfungsi menetapkan Peraturan Desa bersama Kepala Desa, menampung dan menyalurkan aspirasi masyarakat.",
      icon: Building2,
      ketua: "Bpk. H. Maman Abdurrahman",
      anggota: 7
    },
    {
      nama: "LPM",
      kepanjangan: "Lembaga Pemberdayaan Masyarakat",
      deskripsi: "Lembaga yang dibentuk atas prakarsa masyarakat sebagai mitra pemerintah desa dalam menampung dan mewujudkan aspirasi serta kebutuhan masyarakat di bidang pembangunan.",
      icon: Handshake,
      ketua: "Bpk. Syaepudin",
      anggota: 12
    },
    {
      nama: "PKK",
      kepanjangan: "Pemberdayaan Kesejahteraan Keluarga",
      deskripsi: "Organisasi kemasyarakatan yang memberdayakan wanita untuk turut berpartisipasi dalam pembangunan Indonesia. Berfokus pada kesejahteraan dan program kesehatan keluarga.",
      icon: Heart,
      ketua: "Ibu Hj. Nani Rohaeni",
      anggota: 25
    },
    {
      nama: "Karang Taruna",
      kepanjangan: "Karang Taruna Tunas Harapan",
      deskripsi: "Organisasi kepemudaan yang dibina untuk mengembangkan potensi generasi muda, serta menjadi penggerak kegiatan sosial, olahraga, dan kesenian di lingkungan desa.",
      icon: Users,
      ketua: "Sdr. Rian Firmansyah",
      anggota: 45
    },
    {
      nama: "BUMDes",
      kepanjangan: "Badan Usaha Milik Desa",
      deskripsi: "Lembaga usaha desa yang dikelola oleh masyarakat dan pemerintahan desa dalam upaya memperkuat perekonomian desa dan dibentuk berdasarkan kebutuhan dan potensi desa.",
      icon: Store,
      ketua: "Bpk. Usep Setiawan",
      anggota: 5
    }
  ];

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-16"></div>

      {/* Grid Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {lembaga.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 * idx, ease: "easeOut" }}
              className="bg-white p-8 lg:p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 border border-surface-variant/30 flex flex-col relative overflow-hidden group"
            >
              {/* Decorative Background Icon */}
              <div className="absolute -top-8 -right-8 p-4 opacity-[0.03] group-hover:opacity-[0.08] transition-all duration-700 group-hover:rotate-12 group-hover:scale-110 pointer-events-none">
                <item.icon className="w-48 h-48 text-primary" />
              </div>
              
              <div className="flex items-center gap-5 mb-8 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500 shrink-0">
                  <item.icon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="font-display-lg text-2xl text-on-surface tracking-tight leading-none mb-2">{item.nama}</h2>
                  <p className="font-label-sm text-[13px] text-primary font-semibold line-clamp-1">{item.kepanjangan}</p>
                </div>
              </div>
              
              <p className="font-body-lg text-on-surface-variant leading-relaxed mb-10 flex-grow relative z-10">
                {item.deskripsi}
              </p>
              
              <div className="mt-auto pt-6 border-t border-surface-variant/50 flex flex-col gap-4 relative z-10">
                <div className="flex justify-between items-center font-label-sm text-[14px]">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <User className="w-4 h-4" /> Ketua
                  </span>
                  <span className="font-bold text-on-surface">{item.ketua}</span>
                </div>
                <div className="flex justify-between items-center font-label-sm text-[14px]">
                  <span className="text-on-surface-variant flex items-center gap-2">
                    <UsersIcon className="w-4 h-4" /> Anggota Aktif
                  </span>
                  <span className="font-bold text-primary bg-primary/10 px-4 py-1.5 rounded-full">{item.anggota} Orang</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
