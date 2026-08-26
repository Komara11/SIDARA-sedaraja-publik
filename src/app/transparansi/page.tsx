"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from "recharts";
import { Wallet, ShoppingCart, TrendingUp, ShoppingBag, Info, ShieldCheck } from "lucide-react";

export default function TransparansiPage() {
  const [apbdesData, setApbdesData] = useState<any>(null);
  const [halaman, setHalaman] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch('/api/general').then(res => res.json()),
      fetch('/api/halaman').then(res => res.json())
    ]).then(([generalData, halamanData]) => {
      setApbdesData(generalData.transparansi);
      setHalaman(halamanData.transparansi || {});
    });
  }, []);

  if (!apbdesData) {
    return (
      <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen items-center justify-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">progress_activity</span>
      </div>
    );
  }

  const totalPendapatan = apbdesData.pendapatan.reduce((acc: number, curr: any) => acc + curr.amount, 0);
  const totalBelanja = apbdesData.belanja.reduce((acc: number, curr: any) => acc + curr.amount, 0);

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
        <div className="bg-white p-4 rounded-md shadow-sm border border-surface-variant/30">
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
    <div className="flex flex-col flex-grow w-full bg-surface min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-28 md:pt-32"></div>



      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col items-start relative hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 border border-surface-variant/30 bg-surface-bright rounded flex items-center justify-center text-primary mb-6">
              <Wallet className="w-6 h-6" />
            </div>
            <p className="font-sans text-[12px] text-on-surface-variant mb-1 font-bold tracking-widest uppercase">Total Pendapatan</p>
            <h3 className="font-sans text-3xl sm:text-4xl text-primary font-bold tracking-tight">{formatRupiah(totalPendapatan)}</h3>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col items-start relative hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 border border-surface-variant/30 bg-surface-bright rounded flex items-center justify-center text-rose-500 mb-6">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <p className="font-sans text-[12px] text-on-surface-variant mb-1 font-bold tracking-widest uppercase">Total Belanja</p>
            <h3 className="font-sans text-3xl sm:text-4xl text-rose-500 font-bold tracking-tight">{formatRupiah(totalBelanja)}</h3>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Pendapatan Chart */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-surface-bright border border-surface-variant/30 rounded flex items-center justify-center text-primary">
                <TrendingUp className="w-4 h-4" />
              </div>
              <h3 className="font-sans text-xl text-on-surface font-bold tracking-tight">
                {halaman?.chartPendapatanLabel || "Rincian Pendapatan"}
              </h3>
            </div>
            <div className="w-full overflow-x-auto hide-scrollbar pb-4">
              <div className="h-[350px] min-w-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apbdesData.pendapatan} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis hide domain={[0, 'dataMax + 200']} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc', radius: 8}} />
                  <Bar dataKey="amount" radius={[2, 2, 0, 0]} maxBarSize={40} animationDuration={1500}>
                    {apbdesData.pendapatan.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.section>

          {/* Belanja Chart */}
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-white p-8 rounded-md shadow-sm border border-surface-variant/50 flex flex-col hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-surface-bright border border-surface-variant/30 rounded flex items-center justify-center text-rose-500">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-sans text-xl text-on-surface font-bold tracking-tight">
                {halaman?.chartBelanjaLabel || "Rincian Belanja"}
              </h3>
            </div>
            <div className="w-full overflow-x-auto hide-scrollbar pb-4">
              <div className="h-[350px] min-w-[500px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={apbdesData.belanja} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 13, fontWeight: 500}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis hide domain={[0, 'dataMax + 200']} />
                  <Tooltip content={<CustomTooltip />} cursor={{fill: '#f8fafc', radius: 8}} />
                  <Bar dataKey="amount" radius={[2, 2, 0, 0]} maxBarSize={40} animationDuration={1500}>
                    {apbdesData.belanja.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.section>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-12 bg-white border border-surface-variant/50 rounded-md p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-4 shadow-sm"
        >
          <div className="w-10 h-10 bg-surface-bright border border-surface-variant/30 rounded flex items-center justify-center text-primary shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <p className="font-sans text-sm text-on-surface-variant leading-relaxed pt-1">
            <span className="font-bold text-on-surface block mb-1">Catatan Transparansi Publik:</span>
            {halaman?.infoText || "Data APBDes di atas merupakan ringkasan eksekutif dari dokumen penjabaran Anggaran Pendapatan dan Belanja Desa. Masyarakat dapat meminta dokumen rincian lengkap melalui layanan informasi di Balai Desa Sedaraja pada jam kerja."}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
