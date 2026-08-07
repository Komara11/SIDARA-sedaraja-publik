import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { readData } from "@/lib/data";
import { ShareButtons } from "@/components/ui/ShareButtons";

const getNewsData = async (slug: string) => {
  try {
    const allNews = await readData<any[]>('berita.json');
    return allNews.find((n: any) => n.slug === slug || n.id === slug) || null;
  } catch (e) {
    return null;
  }
}

export default async function BeritaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const news = await getNewsData(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  return (
    <div className="flex flex-col flex-grow w-full bg-surface-bright min-h-screen pt-28 md:pt-32 pb-32">
      <article className="max-w-4xl w-full mx-auto px-margin-mobile md:px-margin-desktop">
        
        <Link href="/berita" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-label-md font-semibold mb-8 bg-primary/5 px-4 py-2 rounded-full">
          <ArrowLeft className="w-5 h-5" />
          Kembali ke Berita
        </Link>
        
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-[14px] font-semibold flex items-center gap-2">
              <Tag className="w-4 h-4" />
              {news.category}
            </span>
            <span className="font-label-sm text-[14px] text-on-surface-variant font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(news.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="font-label-sm text-[14px] text-on-surface-variant font-medium flex items-center gap-2 hidden sm:flex">
              <User className="w-4 h-4" />
              {news.author}
            </span>
          </div>
          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight leading-[1.1]">{news.title}</h1>
        </header>

        <div className="w-full h-[250px] md:h-[400px] rounded-[2rem] overflow-hidden mb-12 shadow-lg relative group bg-surface-container-low">
          {news.image ? (
            <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">image</span>
            </div>
          )}
          <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>

        <div className="prose prose-lg md:prose-xl max-w-none text-on-surface-variant font-body-lg leading-relaxed">
          <p className="whitespace-pre-wrap">{news.content}</p>
        </div>
        
        <ShareButtons title={news.title} />
        
      </article>
    </div>
  );
}
