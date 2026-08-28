"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  size?: number; // base height in px
  showText?: boolean;
}

export default function Logo({
  className = "",
  variant = "light",
  size = 40,
  showText = true,
}: LogoProps) {
  // Proportional width based on extracted 1058x1174 logo dimensions (~0.901 aspect ratio)
  const width = Math.round(size * 0.901);
  const logoSrc = variant === "dark" ? "/logo.png" : "/logo-light.png";

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${className}`}>
      <div
        className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
        style={{ width: `${width}px`, height: `${size}px` }}
      >
        <Image
          src={logoSrc}
          alt="20:45 Pastacılık Logo"
          fill
          priority
          sizes={`${size * 2}px`}
          className="object-contain"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span
            className={`font-heading font-black tracking-tight text-sm sm:text-base ${
              variant === "light" ? "text-white" : "text-charcoal-900"
            }`}
          >
            PASTACILIK
          </span>
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase mt-0.5">
            YKB GIDA
          </span>
        </div>
      )}
    </div>
  );
}
