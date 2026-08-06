"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, CheckCircle2, ChevronDown, Check, Upload, Send } from "lucide-react";

export default function PengaduanPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = [
    { id: "infrastruktur", label: "Infrastruktur & Fasilitas Umum" },
    { id: "kebersihan", label: "Kebersihan & Lingkungan" },
    { id: "kamtibmas", label: "Keamanan & Ketertiban" },
    { id: "pelayanan", label: "Pelayanan Aparatur Desa" },
    { id: "lainnya", label: "Lainnya / Aspirasi Umum" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      alert("Silakan pilih kategori laporan terlebih dahulu.");
      return;
    }
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setCategory("");
    }, 4000);
  };

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen">
      
      {/* Header Section */}
      <section className="pt-16 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center rotate-3 hover:rotate-0 transition-transform duration-500 text-primary">
            <Megaphone className="w-10 h-10" />
          </div>
        </motion.div>
        <h1 className="font-display-lg text-4xl md:text-5xl text-on-surface mb-4 tracking-tight">Layanan <span className="text-primary">Pengaduan</span></h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          Sampaikan laporan, keluhan, atau aspirasi Anda. Partisipasi Anda sangat berarti bagi kemajuan Desa Sedaraja.
        </p>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-surface-variant/30 relative overflow-visible max-w-4xl mx-auto hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-500"
        >
          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 z-50 bg-white/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center rounded-[2rem]"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                  className="w-24 h-24 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-6"
                >
                  <CheckCircle2 className="w-12 h-12" />
                </motion.div>
                <h2 className="font-display-lg text-3xl text-primary mb-4 tracking-tight">Laporan Terkirim</h2>
                <p className="font-body-lg text-on-surface-variant max-w-md leading-relaxed">
                  Terima kasih, laporan Anda telah kami terima dan akan segera ditindaklanjuti oleh aparat terkait.
                  <br/>
                  <span className="inline-block mt-6 px-6 py-2 bg-primary/10 rounded-full font-bold text-primary font-label-sm">
                    Tiket: #SDR-{(Math.random() * 10000).toFixed(0)}
                  </span>
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="font-label-sm text-[14px] font-semibold text-on-surface">Nama Lengkap</label>
                <input 
                  type="text" 
                  required 
                  className="w-full px-5 py-4 bg-surface-container-low border border-surface-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg text-on-surface placeholder:text-on-surface-variant/50"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-label-sm text-[14px] font-semibold text-on-surface">Nomor Induk Kependudukan (NIK)</label>
                <input 
                  type="text" 
                  required 
                  pattern="[0-9]{16}"
                  className="w-full px-5 py-4 bg-surface-container-low border border-surface-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg text-on-surface placeholder:text-on-surface-variant/50"
                  placeholder="16 Digit NIK"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="font-label-sm text-[14px] font-semibold text-on-surface">Nomor WhatsApp / HP</label>
                <input 
                  type="tel" 
                  required 
                  className="w-full px-5 py-4 bg-surface-container-low border border-surface-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg text-on-surface placeholder:text-on-surface-variant/50"
                  placeholder="Contoh: 081234567890"
                />
              </div>
              <div className="flex flex-col gap-3 relative">
                <label className="font-label-sm text-[14px] font-semibold text-on-surface">Kategori Laporan</label>
                <div className="relative w-full">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-5 py-4 bg-surface-container-low border rounded-xl flex justify-between items-center cursor-pointer transition-all ${isDropdownOpen ? 'border-primary ring-2 ring-primary/20' : 'border-surface-variant/50 hover:border-on-surface-variant/30'}`}
                  >
                    <span className={`font-body-lg ${category ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>
                      {category ? categories.find(c => c.id === category)?.label : "Pilih Kategori..."}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-primary' : ''}`} />
                  </div>
                  
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-3 bg-white border border-surface-variant/30 rounded-xl shadow-xl z-30 overflow-hidden flex flex-col py-2"
                      >
                        {categories.map((c) => (
                          <div 
                            key={c.id}
                            onClick={() => {
                              setCategory(c.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`px-5 py-3.5 cursor-pointer transition-colors font-body-md flex items-center justify-between
                              ${category === c.id ? 'bg-primary/5 text-primary font-semibold' : 'hover:bg-surface-container-low text-on-surface'}`}
                          >
                            {c.label}
                            {category === c.id && <Check className="w-4 h-4" />}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-label-sm text-[14px] font-semibold text-on-surface">Detail Keluhan / Laporan</label>
              <textarea 
                required 
                rows={5}
                className="w-full px-5 py-4 bg-surface-container-low border border-surface-variant/50 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg text-on-surface placeholder:text-on-surface-variant/50 resize-none"
                placeholder="Deskripsikan laporan Anda secara jelas dan rinci..."
              ></textarea>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-label-sm text-[14px] font-semibold text-on-surface">Lampiran Foto (Opsional)</label>
              <label className="border-2 border-dashed border-surface-variant/50 hover:border-primary focus-within:border-primary rounded-2xl p-10 flex flex-col items-center justify-center bg-surface-container-low/50 hover:bg-primary/5 transition-all cursor-pointer group">
                <input type="file" className="hidden" accept="image/*" />
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <p className="font-title-md text-lg text-on-surface font-semibold">Klik untuk mengunggah file gambar</p>
                <p className="font-body-sm text-on-surface-variant mt-2">Mendukung format JPG, PNG (Maks 5MB)</p>
              </label>
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                type="submit"
                className="bg-primary text-white font-label-sm text-[15px] font-semibold px-8 py-4 rounded-full hover:bg-primary/90 hover:shadow-lg transition-all active:scale-95 flex items-center justify-center gap-3 w-full md:w-auto"
              >
                Kirim Laporan
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
