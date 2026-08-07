import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TreePine, Wheat, Store, Fish, Info, Phone, Activity, CheckCircle2, Factory } from "lucide-react";
import { readData } from "@/lib/data";

const getIconForCategory = (category: string) => {
  if (category === "Wisata") return <TreePine className="w-5 h-5" />;
  if (category === "Pertanian") return <Wheat className="w-5 h-5" />;
  if (category === "UMKM") return <Store className="w-5 h-5" />;
  if (category === "Perikanan") return <Fish className="w-5 h-5" />;
  return <Info className="w-5 h-5" />;
};

const getPotensiData = async (slug: string) => {
  try {
    const allPotensi = await readData<any[]>('potensi.json');
    return allPotensi.find((p: any) => p.id === slug || p.slug === slug) || null;
  } catch (e) {
    return null;
  }
}

export default async function PotensiDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const potensi = await getPotensiData(resolvedParams.slug);

  if (!potensi) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen pt-28 md:pt-32 pb-32">
      <article className="max-w-6xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
        
        <Link href="/potensi" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-label-md font-semibold mb-8 bg-primary/5 px-4 py-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Eksplorasi Potensi
        </Link>
        
        <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 shadow-xl relative group bg-surface-container-low">
          {potensi.image ? (
            <img src={potensi.image} alt={potensi.title || potensi.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">image</span>
            </div>
          )}
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
            <h1 className="font-display-lg text-4xl md:text-6xl text-white tracking-tight leading-tight drop-shadow-lg mb-2">{potensi.title || potensi.name}</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <h2 className="font-title-lg text-2xl text-on-surface mb-4 font-semibold tracking-tight">Tentang {potensi.title || potensi.name}</h2>
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
                  {potensi.metrics.map((metric: any, idx: number) => (
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
                {(potensi.facilities || ["Informasi belum tersedia"]).map((fasilitas: string, idx: number) => (
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
                {potensi.contact || "Hubungi Admin Desa (0233-123456)"}
              </div>
            </div>
            
          </aside>
        </div>
      </article>
    </div>
  );
}
