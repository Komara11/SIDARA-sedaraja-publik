import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TreePine, Wheat, Store, Fish, Info, Phone, Activity, CheckCircle2, Factory } from "lucide-react";

const getIconForCategory = (category: string) => {
  if (category === "Wisata") return <TreePine className="w-5 h-5" />;
  if (category === "Pertanian") return <Wheat className="w-5 h-5" />;
  if (category === "UMKM") return <Store className="w-5 h-5" />;
  if (category === "Perikanan") return <Fish className="w-5 h-5" />;
  return <Info className="w-5 h-5" />;
};

const getPotensiData = (slug: string) => {
  const dummyPotensi = {
    "bukit-pamoroan": {
      title: "Bukit Pamoroan",
      category: "Wisata",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEnzmyY2bIrPcsXULB4NN3558EDj24ImSvxrrtM6MHxHC7JrF-QxdNJJQ4V062qQoMbD95ZD_6FWHYrwIGrWz9XBbwXf56IHN6GGgfKH70RLJebMEGXMgaAe6Rl3Kyet2clLy9QRqjZWeb9laIyFYJCEjE77mwYOId6yDXLkJxv76CRiMZ1sJCcEqQYxFSo_YAXVyjuqeGhgBeI6a5HNrGz_m_8EOmqG5vl-hbMKffxIj_6xG0uI4i",
      description: "Destinasi wisata alam unggulan dengan pemandangan pegunungan yang menakjubkan, area perkemahan yang luas, dan spot foto matahari terbit yang ikonik. Ideal untuk rekreasi keluarga dan pencinta alam yang mencari ketenangan. Kami terus mengembangkan area ini dengan menambahkan fasilitas MCK yang bersih dan jalur akses yang lebih aman bagi kendaraan roda dua maupun roda empat.",
      facilities: ["Camping Ground", "Spot Foto", "Fasilitas Toilet", "Area Kuliner"],
      contact: "BUMDes Sedaraja (0812-3456-7890)",
      metrics: [
        { label: "Pengunjung/Bulan", value: "500+" },
        { label: "Kapasitas Tenda", value: "50 Unit" },
        { label: "Spot Foto", value: "Tersedia" },
      ],
      status: "Buka"
    },
    "padi-sawah": {
      title: "Padi Sawah",
      category: "Pertanian",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEUtpJjAbhg6kkhC5rgRhXnU_7ujjec_KvHrsXqLQVJAO2hlagg5yIV88D_OJqSeGL0ZvSXs3veB77jHFC-XAdtC2QFqMoSJLmuRYU-1wqto65XeX2PRMYFUP7S5M1HIeS3nf3r1uT5rCTfZXFLUoeQyv6JiXuJ1I-td9BUa-NSW_ilzrCqQQvpUuldP848y8Z4YYXeIlYBwjInCzwWNt8utMmRQ_l9T3CrSjAMOgKKth-6PxcEsGO",
      description: "Sektor penyumbang utama perekonomian desa dengan sistem irigasi teknis yang terkelola dengan baik. Luas lahan mencapai 50 hektar dengan musim panen utama pada bulan April hingga Mei. Padi yang dihasilkan utamanya adalah varietas unggul yang tahan terhadap hama dan cuaca ekstrem.",
      facilities: ["Irigasi Teknis", "Lumbung Desa", "Koperasi Tani", "Traktor Komunal"],
      contact: "Ketua Gapoktan (0821-1122-3344)",
      metrics: [
        { label: "Luas Lahan", value: "50 Ha" },
        { label: "Produksi/Tahun", value: "300 Ton" },
        { label: "Stok Gudang", value: "45 Ton" },
      ],
      status: "Masa Panen"
    },
    "kopi-sedaraja": {
      title: "Kopi Sedaraja",
      category: "UMKM",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjd7AD5dSZ4FldI_MDuhMSMfKLISG8WHN2kzym_LZIQokz7F0o8wRiwTVGcCmIKDqUNo4RFURxq6rL5mxepfzlwXu2H1h4ZM65Oi8QedYwDFH_beSTTEcg3nBqrarRJTo6s83u_zilLvYlpHQyew7wuG8mrrfjimx3K9CkVXg6-nXEkCAgGgvzEnj4p_a17siPcoxjU5AdALPv9kWLDtL4bfDb5mHVsARfQr48f1NtID7KaAABvkRW",
      description: "Biji kopi robusta pilihan yang dipetik langsung dari kebun warga, disangrai dengan metode tradisional menghasilkan aroma khas. Produk ini telah mendapatkan izin PIRT dan dikemas menggunakan pouch modern yang menjaga kesegaran kopi.",
      facilities: ["Roasting Tradisional", "Packaging Modern", "Pesan Antar"],
      contact: "Bpk. Andi Susanto (0855-6677-8899)",
      metrics: [
        { label: "Pelaku UMKM", value: "12 Orang" },
        { label: "Produksi/Bulan", value: "200 Kg" },
        { label: "Stok Produk", value: "15 Kg" },
      ],
      status: "Tersedia"
    },
    "ikan-nila": {
      title: "Budidaya Ikan Nila",
      category: "Perikanan",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFRi5bNXm3S0FT8MGpA_eKnCVvSwTYJ9a0rNnZE-YZ5WRzWWdq4hSq8Q8ZETw43PligIe4SyIVDmW5MOox8vCaR59M94Sa2LyAbkg1kHIEuCaFVC4d6jVjL1mbVtllzJm0cI-45FjK1E4Rywb4Up76o_TdhsHAfCEQbkI2AtKNw9-cwi5nIQwdF42Aj99BF_3gW2RD-Ssy4fhk1_s4PwyVF84DZoz5SJQzPmbqfErSsjd8h49ChmBF",
      description: "Kolam air deras yang memanfaatkan aliran sungai jernih pegunungan, menghasilkan ikan konsumsi berkualitas tinggi. Terdapat sekitar 15 kolam aktif yang dikelola oleh kelompok pembudidaya ikan (Pokdakan) setempat.",
      facilities: ["Kolam Air Deras", "Benih Unggul", "Pakan Mandiri"],
      contact: "Ketua Pokdakan (0833-4455-6677)",
      metrics: [
        { label: "Jumlah Kolam", value: "15 Unit" },
        { label: "Produksi/Tahun", value: "120 Ton" },
        { label: "Stok Siap Jual", value: "5 Ton" },
      ],
      status: "Tersedia"
    },
    "jagung-manis": {
      title: "Jagung Manis",
      category: "Pertanian",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDUjI8Tg4v3XRe6CPqxu87V4sa6tG25mR3E0tY70cpjsFchdsry14z0ILYsXaLgckrRPA0C8sj6HDKBIt8_yrWAU0a59iE-VfbclOdQmWOwEzNdZig55fAwzvCHh-48FONpw6QopoWupXuHDR6qL9UoReoAHp0bP33dBpY6tdEhUIG-F-Y7JIgix9rB32ZPjvXj0ZPtJLENgDa-lfckOSSua6vY4d_FH0YaseyFj0RG4BLILFPxhvv_",
      description: "Ditanam pada area tegalan sebagai tanaman sela yang memberikan nilai ekonomi tambahan yang signifikan bagi petani. Jagung hibrida ini memiliki produktivitas tinggi dan sebagian besar dipasok untuk kebutuhan industri pakan ternak di kabupaten.",
      facilities: ["Lahan Tegalan", "Alat Pipil Jagung", "Gudang Penyimpanan"],
      contact: "Gapoktan Sedaraja (0821-1122-3344)",
      metrics: [
        { label: "Luas Lahan", value: "20 Ha" },
        { label: "Produksi/Tahun", value: "100 Ton" },
        { label: "Stok Gudang", value: "Habis" },
      ],
      status: "Masa Tanam"
    }
  };
  return dummyPotensi[slug as keyof typeof dummyPotensi] || {
    title: slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    category: "Inventori",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDEUtpJjAbhg6kkhC5rgRhXnU_7ujjec_KvHrsXqLQVJAO2hlagg5yIV88D_OJqSeGL0ZvSXs3veB77jHFC-XAdtC2QFqMoSJLmuRYU-1wqto65XeX2PRMYFUP7S5M1HIeS3nf3r1uT5rCTfZXFLUoeQyv6JiXuJ1I-td9BUa-NSW_ilzrCqQQvpUuldP848y8Z4YYXeIlYBwjInCzwWNt8utMmRQ_l9T3CrSjAMOgKKth-6PxcEsGO", 
    description: "Informasi detail mengenai potensi ini sedang dalam proses pembaruan data oleh tim redaksi desa. Kami akan segera memperbarui konten ini agar lebih informatif.",
    facilities: ["Informasi belum tersedia"],
    contact: "Admin Desa Sedaraja (Hubungi Balai Desa)",
    metrics: [],
    status: "Data Belum Tersedia"
  };
}

export default async function PotensiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const potensi = getPotensiData(resolvedParams.slug);

  if (!potensi) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen pt-12 pb-32">
      <article className="max-w-6xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
        
        <Link href="/potensi" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-label-md font-semibold mb-8 bg-primary/5 px-4 py-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Eksplorasi Potensi
        </Link>
        
        <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 shadow-xl relative group">
          <img src={potensi.image} alt={potensi.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
          
          <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full font-label-sm text-[14px] font-semibold flex items-center gap-2 shadow-lg">
            {getIconForCategory(potensi.category)}
            {potensi.category}
          </div>
          
          <div className={`absolute top-6 right-6 backdrop-blur-md px-5 py-2 rounded-full font-label-sm text-[14px] font-bold shadow-lg border ${
            potensi.status === 'Tersedia' || potensi.status === 'Buka' || potensi.status === 'Masa Panen' 
              ? 'bg-emerald-500/80 border-emerald-400 text-white' 
              : potensi.status === 'Masa Tanam'
              ? 'bg-amber-500/80 border-amber-400 text-white'
              : 'bg-rose-500/80 border-rose-400 text-white'
          }`}>
            {potensi.status}
          </div>

          <div className="absolute bottom-8 left-8 right-8">
            <h1 className="font-display-lg text-4xl md:text-6xl text-white tracking-tight leading-tight drop-shadow-lg mb-2">{potensi.title}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <h2 className="font-title-lg text-2xl text-on-surface mb-4 font-semibold tracking-tight">Tentang {potensi.title}</h2>
              <p className="font-body-lg text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                {potensi.description}
              </p>
            </div>

            {/* Metrics Dashboard */}
            {potensi.metrics && potensi.metrics.length > 0 && (
              <div className="bg-white border border-surface-variant/30 rounded-[2rem] p-8 md:p-10 shadow-sm">
                <h3 className="font-title-lg text-xl text-primary mb-6 flex items-center gap-3 font-semibold">
                  <Activity className="w-6 h-6" />
                  Data & Statistik
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {potensi.metrics.map((metric, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center p-6 text-center bg-surface-container-low rounded-2xl shadow-inner border border-surface-variant/20">
                      <span className="font-label-sm text-[12px] text-on-surface-variant mb-3 uppercase tracking-wider font-semibold">{metric.label}</span>
                      <span className="font-display-md text-3xl text-primary tracking-tight">{metric.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <aside className="lg:col-span-1 flex flex-col gap-8">
            
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-surface-variant/30">
              <h3 className="font-title-lg text-xl text-primary mb-6 flex items-center gap-3 font-semibold">
                <Factory className="w-6 h-6" />
                Fasilitas & Layanan
              </h3>
              <ul className="flex flex-col gap-4">
                {potensi.facilities.map((fasilitas, idx) => (
                  <li key={idx} className="flex items-start gap-3 font-body-lg text-on-surface-variant">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="font-medium">{fasilitas}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-primary p-8 rounded-[2rem] shadow-lg text-white relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-colors duration-500"></div>
              <h3 className="font-title-lg text-xl mb-4 flex items-center gap-3 font-semibold relative z-10">
                <Phone className="w-6 h-6" />
                Informasi Kontak
              </h3>
              <p className="font-body-md mb-6 text-white/80 leading-relaxed relative z-10">
                Tertarik untuk mengetahui lebih lanjut atau menjalin kerja sama? Silakan hubungi pengelola terkait.
              </p>
              <div className="bg-white/20 backdrop-blur-md p-4 rounded-xl font-label-md flex items-center gap-3 font-bold break-all relative z-10 border border-white/30">
                {potensi.contact}
              </div>
            </div>
            
          </aside>
        </div>
      </article>
    </div>
  );
}
