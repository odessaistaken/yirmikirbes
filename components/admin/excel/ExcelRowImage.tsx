"use client";

import { useState } from "react";
import { ImageIcon, Eye, ExternalLink, X } from "lucide-react";

interface ExcelRowImageProps {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg" | "full";
  className?: string;
  showZoomButton?: boolean;
}

export default function ExcelRowImage({
  src,
  alt = "Ürün görseli",
  size = "md",
  className = "",
  showZoomButton = true,
}: ExcelRowImageProps) {
  const [hasError, setHasError] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const cleanSrc = (src || "").trim();

  const sizeClasses = {
    sm: "w-10 h-10 rounded-lg",
    md: "w-14 h-14 rounded-xl",
    lg: "w-20 h-20 rounded-2xl",
    full: "w-full aspect-square rounded-2xl",
  }[size];

  if (!cleanSrc || hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-100 border border-dashed border-slate-200 text-slate-400 select-none ${sizeClasses} ${className}`}
        title="Görsel bulunamadı veya geçersiz URL"
      >
        <ImageIcon size={size === "sm" ? 16 : size === "md" ? 20 : 28} className="text-slate-300" />
        {size === "full" && (
          <span className="text-[11px] text-slate-400 mt-1 font-medium">Görsel Yok</span>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        className={`group relative overflow-hidden bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center ${sizeClasses} ${className}`}
      >
        {/* Skeleton while loading */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-slate-100 animate-pulse flex items-center justify-center">
            <ImageIcon size={16} className="text-slate-300 animate-pulse" />
          </div>
        )}

        {/* Real Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={cleanSrc}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-105 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hover overlay with zoom button */}
        {showZoomButton && isLoaded && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(true);
            }}
            title="Görseli büyüt"
            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
          >
            <div className="w-7 h-7 rounded-full bg-white/90 text-slate-800 flex items-center justify-center shadow-md transform scale-90 group-hover:scale-100 transition-transform">
              <Eye size={14} />
            </div>
          </button>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="min-w-0 pr-4">
                <p className="text-xs font-semibold text-slate-700 truncate">{alt}</p>
                <p className="text-[11px] text-slate-400 font-mono truncate">{cleanSrc}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={cleanSrc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  title="Yeni sekmede aç"
                >
                  <ExternalLink size={16} />
                </a>
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  title="Kapat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Image display */}
            <div className="relative max-h-[70vh] flex items-center justify-center overflow-auto bg-slate-50 rounded-xl p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cleanSrc}
                alt={alt}
                className="max-h-[65vh] w-auto object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
