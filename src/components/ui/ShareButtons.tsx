"use client";

import { useState, useEffect } from "react";
import { Share2, Link2, Check } from "lucide-react";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

export function ShareButtons({ title }: { title: string }) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  };

  const shareTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, "_blank");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-8 mt-12 border-t border-surface-variant/30">
      <div className="flex items-center gap-2 text-on-surface font-semibold text-lg">
        <Share2 className="w-5 h-5 text-primary" />
        <span>Bagikan Artikel</span>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <button 
          onClick={shareFacebook}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1877F2]/10 text-[#1877F2] hover:bg-[#1877F2]/20 transition-colors font-label-sm font-semibold"
        >
          <FacebookIcon className="w-4 h-4" />
          <span className="sm:hidden">Facebook</span>
        </button>
        <button 
          onClick={shareTwitter}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#1DA1F2]/10 text-[#1DA1F2] hover:bg-[#1DA1F2]/20 transition-colors font-label-sm font-semibold"
        >
          <TwitterIcon className="w-4 h-4" />
          <span className="sm:hidden">Twitter</span>
        </button>
        <button 
          onClick={handleCopy}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-variant/30 transition-colors font-label-sm font-semibold"
        >
          {copied ? <Check className="w-4 h-4 text-green-500" /> : <Link2 className="w-4 h-4" />}
          <span className="sm:hidden">{copied ? "Tersalin" : "Salin Link"}</span>
        </button>
      </div>
    </div>
  );
}
