"use client";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { Wallet, ShoppingCart, TrendingUp, ShoppingBag, Info, ShieldCheck } from "lucide-react";

export default function TransparansiPage() {
  const apbdesData = {
    tahun: 2026,
    pendapatan: [
      { name: "Dana Desa", amount: 1200, fill: "#10b981" }, // emerald-500
      { name: "Alokasi DD", amount: 450, fill: "#3b82f6" }, // blue-500
      { name: "PADes", amount: 150, fill: "#f59e0b" },      // amber-500
      { name: "Bantuan", amount: 200, fill: "#8b5cf6" },    // violet-500
    ],
    belanja: [
      { name: "Pembangunan", amount: 900, fill: "#10b981" },
      { name: "Pemberdayaan", amount: 450, fill: "#3b82f6" },
      { name: "Pemerintahan", amount: 400, fill: "#f59e0b" },
      { name: "Pembinaan", amount: 200, fill: "#8b5cf6" },
      { name: "Bencana", amount: 50, fill: "#f43f5e" },      // rose-500
    ]
  };

  const totalPendapatan = apbdesData.pendapatan.reduce((acc, curr) => acc + curr.amount, 0);
  const totalBelanja = apbdesData.belanja.reduce((acc, curr) => acc + curr.amount, 0);

  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(angka * 1000000); 
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/20">
          <p className="font-label-sm text-on-surface-variant font-semibold mb-1">{label}</p>
          <p className="font-title-md text-primary font-bold text-lg">
            {formatRupiah(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen">
      
      {/* Header Section */}
      <section className="pt-16 pb-12 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary shadow-sm">
            <ShieldCheck className="w-10 h-10" />
          </div>
        </motion.div>
        <h1 className="font-display-lg text-4xl md:text-5xl text-on-surface mb-4 tracking-tight">Transparansi <span className="text-primary">APBDes</span></h1>
        <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
          Keterbukaan informasi publik mengenai Anggaran Pendapatan dan Belanja Desa Sedaraja Tahun Anggaran {apbdesData.tahun}.
        </p>
      </section>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-surface-variant/30 flex flex-col items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <Wallet className="w-8 h-8" />
            </div>
            <h3 className="font-display-lg text-4xl md:text-5xl text-primary tracking-tight relative z-10">{formatRupiah(totalPendapatan)}</h3>
            <p className="font-label-sm text-[14px] text-on-surface-variant mt-3 font-semibold tracking-wider uppercase relative z-10">Total Pendapatan</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-500 border border-surface-variant/30 flex flex-col items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-rose-500/5 rounded-full blur-3xl group-hover:bg-rose-500/10 transition-colors duration-500"></div>
            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 mb-6 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="font-display-lg text-4xl md:text-5xl text-rose-500 tracking-tight relative z-10">{formatRupiah(totalBelanja)}</h3>
            <p className="font-label-sm text-[14px] text-on-surface-variant mt-3 font-semibold tracking-wider uppercase relative z-10">Total Belanja</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Pendapatan Chart */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow duration-500 border border-surface-variant/30 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-10 justify-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-display-md text-2xl text-on-surface tracking-tight">
                Rincian Pendapatan
              </h3>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apbdesData.pendapatan} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis hide domain={[0, 'dataMax + 200']} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc', radius: 8}} />
                  <Bar dataKey="amount" radius={[8, 8, 8, 8]} maxBarSize={50} animationDuration={1500}>
                    {apbdesData.pendapatan.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>

          {/* Belanja Chart */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-sm hover:shadow-lg transition-shadow duration-500 border border-surface-variant/30 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-10 justify-center">
              <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h3 className="font-display-md text-2xl text-on-surface tracking-tight">
                Rincian Belanja
              </h3>
            </div>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apbdesData.belanja} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis hide domain={[0, 'dataMax + 200']} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc', radius: 8}} />
                  <Bar dataKey="amount" radius={[8, 8, 8, 8]} maxBarSize={50} animationDuration={1500}>
                    {apbdesData.belanja.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.section>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 bg-blue-50/50 border border-blue-100 rounded-[2rem] p-8 flex items-start gap-5 text-blue-900 shadow-sm"
        >
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 shrink-0">
            <Info className="w-6 h-6" />
          </div>
          <p className="font-body-lg leading-relaxed pt-2">
            Data APBDes di atas merupakan ringkasan eksekutif dari dokumen penjabaran Anggaran Pendapatan dan Belanja Desa. Masyarakat dapat meminta dokumen rincian lengkap melalui layanan informasi di Balai Desa Sedaraja pada jam kerja.
          </p>
        </motion.div>
      </section>
    </div>
  );
}
