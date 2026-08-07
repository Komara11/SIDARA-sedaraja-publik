"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell, PieChart, Pie, Legend } from "recharts";
import { Users, User, UserCheck, Home, Loader2 } from "lucide-react";

export default function DemografiPage() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch('/api/demografi')
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  if (!stats) {
    return (
      <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    );
  }

  const CustomTooltipBar = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-primary/5 border border-surface-variant/30">
          <p className="font-label-sm text-on-surface-variant mb-1 font-semibold">{label}</p>
          <p className="font-display-lg text-xl text-primary tracking-tight">
            {payload[0].value.toLocaleString('id-ID')} Jiwa
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomTooltipPie = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-2xl shadow-xl shadow-primary/5 border border-surface-variant/30">
          <p className="font-label-sm text-on-surface-variant mb-1 font-semibold">{payload[0].name}</p>
          <p className="font-display-lg text-xl text-primary tracking-tight">
            {payload[0].value}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen">
      
      {/* Header Spacing */}
      <div className="pt-16"></div>

      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full pb-32">
        <div className="flex flex-col gap-12 lg:gap-16">
          
          {/* Top Stats Overview */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Total Penduduk", value: stats.total, icon: Users, color: "text-primary" },
              { label: "Laki-laki", value: stats.lakiLaki, icon: User, color: "text-blue-500" },
              { label: "Perempuan", value: stats.perempuan, icon: UserCheck, color: "text-rose-500" },
              { label: "Kepala Keluarga", value: stats.kk, icon: Home, color: "text-amber-500" },
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: "easeOut" }}
                className="bg-white p-5 sm:p-6 md:p-8 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 border border-surface-variant/30 flex flex-col items-start relative overflow-hidden group"
              >
                <div className={`w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 ${stat.color}`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <h3 className="font-display-lg text-3xl sm:text-4xl text-on-surface tracking-tight mb-2 z-10 relative">{stat.value.toLocaleString('id-ID')}</h3>
                <p className="font-label-sm text-[12px] sm:text-[14px] text-on-surface-variant font-semibold z-10 relative">{stat.label}</p>
                
                {/* Decorative blur */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-surface-container-low rounded-full blur-2xl opacity-50 group-hover:bg-primary/5 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Usia (Bar Chart) */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:col-span-2 bg-white p-8 md:p-10 rounded-[2rem] shadow-sm border border-surface-variant/30 flex flex-col hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-500"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                  <h3 className="font-title-md text-2xl text-on-surface font-semibold tracking-tight">Kelompok Usia</h3>
                  <p className="font-label-sm text-on-surface-variant mt-1">Distribusi penduduk berdasarkan rentang umur</p>
                </div>
                <div className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm font-semibold text-[13px]">
                  Diperbarui 2024
                </div>
              </div>
              <div className="w-full overflow-x-auto hide-scrollbar mt-4 pb-4">
                <div className="h-[300px] min-w-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.usia} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} tickMargin={12} />
                    <YAxis tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} axisLine={false} tickLine={false} tickMargin={12} />
                    <Tooltip content={<CustomTooltipBar />} cursor={{fill: '#f8fafc'}} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]} maxBarSize={80}>
                      {stats.usia.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                </div>
              </div>
            </motion.section>

            <div className="flex flex-col gap-8">
              {/* Pendidikan (Pie Chart) */}
              <motion.section 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-surface-variant/30 flex flex-col hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-500"
              >
                <h3 className="font-title-md text-xl text-on-surface font-semibold tracking-tight mb-6">Pendidikan</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.pendidikan}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {stats.pendidikan.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity outline-none" />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltipPie />} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 500, color: '#64748b', paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.section>

              {/* Pekerjaan (Pie Chart) */}
              <motion.section 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="bg-white p-8 rounded-[2rem] shadow-sm border border-surface-variant/30 flex flex-col hover:shadow-xl hover:shadow-primary/5 transition-shadow duration-500"
              >
                <h3 className="font-title-md text-xl text-on-surface font-semibold tracking-tight mb-6">Pekerjaan</h3>
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.pekerjaan}
                        cx="50%"
                        cy="50%"
                        innerRadius={65}
                        outerRadius={85}
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                      >
                        {stats.pekerjaan.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} className="hover:opacity-80 transition-opacity outline-none" />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltipPie />} />
                      <Legend iconType="circle" wrapperStyle={{ fontSize: '13px', fontWeight: 500, color: '#64748b', paddingTop: '20px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
