"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Megaphone, CheckCircle2, ChevronDown, Check, Upload, Send } from "lucide-react";

export default function PengaduanPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingPhoto(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (data.url) {
        setPhotoUrl(data.url);
      } else {
        alert(data.error || 'Gagal mengupload gambar');
      }
    } catch (err) {
      alert('Gagal mengupload gambar');
    } finally {
      setIsUploadingPhoto(false);
    }
  };

  const categories = [
    { id: "infrastruktur", label: "Infrastruktur & Fasilitas Umum" },
    { id: "kebersihan", label: "Kebersihan & Lingkungan" },
    { id: "kamtibmas", label: "Keamanan & Ketertiban" },
    { id: "pelayanan", label: "Pelayanan Aparatur Desa" },
    { id: "lainnya", label: "Lainnya / Aspirasi Umum" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) {
      alert("Silakan pilih kategori laporan terlebih dahulu.");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("/api/pengaduan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, category, description, photo: photoUrl })
      });
      
      if (res.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setCategory("");
          setName("");
          setPhone("");
          setDescription("");
          setPhotoUrl("");
        }, 4000);
      } else {
        alert("Gagal mengirim laporan. Silakan coba lagi.");
      }
    } catch {
      alert("Terjadi kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>
      
      {/* Header Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full mb-16 mt-8 flex flex-col items-center text-center">
        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-primary tracking-tight leading-tight mb-6 uppercase max-w-4xl">
          Layanan Pengaduan
        </h1>
        <p className="font-sans text-lg sm:text-xl text-on-surface-variant leading-relaxed max-w-3xl mb-8">
          Sampaikan laporan, keluhan, atau aspirasi Anda. Partisipasi Anda sangat berarti bagi kemajuan Desa Sedaraja.
        </p>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-white p-8 md:p-12 rounded-md shadow-sm border border-surface-variant/30 relative overflow-visible max-w-4xl mx-auto hover:shadow-md hover:shadow-primary/5 transition-shadow duration-500"
        >
          <AnimatePresence>
            {isSubmitted && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/40 flex items-center justify-center p-4 backdrop-blur-sm"
              >
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center text-center"
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                    className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 className="w-10 h-10" />
                  </motion.div>
                  <h2 className="font-display-lg text-2xl text-on-surface mb-3 tracking-tight">Laporan Terkirim</h2>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">
                    Terima kasih, laporan Anda telah kami terima dan akan segera ditindaklanjuti oleh aparat desa.
                    <br/>
                    <span className="inline-block mt-6 px-6 py-2 bg-primary/10 rounded-full font-bold text-primary font-label-sm tracking-widest uppercase">
                      #SDR-{(Math.random() * 10000).toFixed(0)}
                    </span>
                  </p>
                </motion.div>
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
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-5 py-4 bg-surface-container-low border border-surface-variant/50 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg text-on-surface placeholder:text-on-surface-variant/50"
                  placeholder="Masukkan nama lengkap Anda"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="font-label-sm text-[14px] font-semibold text-on-surface">Nomor WhatsApp / HP</label>
                <input 
                  type="tel" 
                  required 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-4 bg-surface-container-low border border-surface-variant/50 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg text-on-surface placeholder:text-on-surface-variant/50"
                  placeholder="Contoh: 081234567890"
                />
              </div>
              <div className="flex flex-col gap-3 relative">
                <label className="font-label-sm text-[14px] font-semibold text-on-surface">Kategori Laporan</label>
                <div className="relative w-full">
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full px-5 py-4 bg-surface-container-low border rounded-md flex justify-between items-center cursor-pointer transition-all ${isDropdownOpen ? 'border-primary ring-2 ring-primary/20' : 'border-surface-variant/50 hover:border-on-surface-variant/30'}`}
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
                        className="absolute top-full left-0 right-0 mt-3 bg-white border border-surface-variant/30 rounded-md shadow-lg z-30 overflow-hidden flex flex-col py-2"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-5 py-4 bg-surface-container-low border border-surface-variant/50 rounded-md focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all font-body-lg text-on-surface placeholder:text-on-surface-variant/50 resize-none"
                placeholder="Deskripsikan laporan Anda secara jelas dan rinci..."
              ></textarea>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-label-sm text-[14px] font-semibold text-on-surface">Lampiran Foto Bukti (Opsional)</label>
              {photoUrl ? (
                <div className="relative w-full h-64 rounded-md border border-surface-variant/50 overflow-hidden bg-surface-container">
                  <img src={photoUrl} alt="Preview" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => setPhotoUrl("")} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 backdrop-blur-sm transition-colors shadow-lg">
                    <span className="font-bold text-[18px]">X</span>
                  </button>
                </div>
              ) : (
                <label className="border-2 border-dashed border-surface-variant/50 hover:border-primary focus-within:border-primary rounded-md p-10 flex flex-col items-center justify-center bg-surface-container-low/50 hover:bg-primary/5 transition-all cursor-pointer group">
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} disabled={isUploadingPhoto} />
                  <div className="w-16 h-16 bg-white rounded flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300">
                    {isUploadingPhoto ? (
                      <span className="w-6 h-6 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
                    ) : (
                      <Upload className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <p className="font-title-md text-lg text-on-surface font-semibold">
                    {isUploadingPhoto ? "Mengunggah..." : "Klik untuk mengunggah file gambar"}
                  </p>
                  <p className="font-body-sm text-on-surface-variant mt-2">Gambar akan otomatis dikonversi ke format yang ringan (WebP)</p>
                </label>
              )}
            </div>

            <div className="pt-6 flex justify-end">
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white font-label-sm text-[15px] font-semibold px-8 py-4 rounded hover:bg-primary/90 hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-3 w-full md:w-auto"
              >
                {isLoading ? "Mengirim..." : "Kirim Laporan"}
                {!isLoading && <Send className="w-4 h-4" />}
              </button>
            </div>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
