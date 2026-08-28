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
  size = 52,
  showText = true,
}: LogoProps) {
  // Proportional width based on extracted logo dimensions (~0.901 aspect ratio)
  const width = Math.round(size * 0.901);
  const logoSrc = variant === "dark" ? "/logo.png" : "/logo-light.png";

  const isLarge = size >= 48;

  return (
    <div className={`inline-flex items-center gap-3 sm:gap-3.5 select-none ${className}`}>
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
            className={`font-heading font-black tracking-tight ${
              isLarge
                ? "text-base sm:text-xl md:text-2xl"
                : "text-sm sm:text-base"
            } ${variant === "light" ? "text-white" : "text-charcoal-900"}`}
          >
            PASTACILIK
          </span>
          <span
            className={`font-bold tracking-widest text-gold uppercase mt-0.5 sm:mt-1 ${
              isLarge ? "text-[11px] sm:text-xs" : "text-[10px]"
            }`}
          >
            YKB GIDA
          </span>
        </div>
      )}
    </div>
  );
}
