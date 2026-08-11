"use client";

import React from "react";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "905010737113";
  const defaultMessage = encodeURIComponent(
    "Merhaba, 20:45 Pastacılık / YKB Gıda web sitenizden ulaşıyorum. Bilgi almak istiyorum."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp İletişim Hattı"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group border border-white/20"
    >
      <span className="relative flex h-6 w-6 items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
        <MessageCircle size={24} className="fill-white stroke-[#25D366] group-hover:rotate-12 transition-transform duration-300" />
      </span>
      <span className="font-semibold text-sm hidden sm:inline-block tracking-wide">
        WhatsApp&apos;tan Yazın
      </span>
    </a>
  );
}
