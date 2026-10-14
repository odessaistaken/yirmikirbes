"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  size?: number; // base height in px
  logoScale?: number; // multiplier for logo image size (default 1.0)
  showText?: boolean;
}

export default function Logo({
  className = "",
  variant = "dark",
  size = 64,
  logoScale = 1.0,
}: LogoProps) {
  // Logo image dimensions: 782 x 578 (aspect ratio ~1.353)
  const imgHeight = Math.round(size * logoScale);
  const imgWidth = Math.round(imgHeight * (782 / 578));
  const logoSrc = variant === "light" ? "/logo-v2-light.png" : "/logo-v2.png";

  return (
    <div
      className={`inline-flex items-center shrink-0 select-none ${className}`}
    >
      <div
        className="relative shrink-0 transition-transform duration-200 hover:scale-105"
        style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
      >
        <Image
          src={logoSrc}
          alt="20:45 HORECA Logo"
          fill
          priority
          sizes={`${imgHeight * 2}px`}
          className="object-contain"
        />
      </div>
    </div>
  );
}

