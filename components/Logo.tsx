"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  size?: number; // base height in px (controls text size tier)
  logoScale?: number; // multiplier for logo image size only (default 1.0)
  showText?: boolean;
}

export default function Logo({
  className = "",
  variant = "dark",
  size = 52,
  logoScale = 1.0,
  showText = true,
}: LogoProps) {
  // Proportional width based on extracted logo dimensions (~0.901 aspect ratio)
  const imgHeight = Math.round(size * logoScale);
  const width = Math.round(imgHeight * 0.901);
  const logoSrc = variant === "dark" ? "/logo.png" : "/logo-light.png";

  const fontSize = Math.max(7, Math.round(imgHeight * 0.125));

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* Logo container */}
      <div className="relative group flex items-center justify-center">
        <div
          className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
          style={{ width: `${width}px`, height: `${imgHeight}px` }}
        >
          <Image
            src={logoSrc}
            alt="20:45 Pastacılık Logo"
            fill
            priority
            sizes={`${imgHeight * 2}px`}
            className="object-contain"
          />

          {/* HORECA directly under the '45' number */}
          {showText && (
            <span
              className="absolute font-heading font-black tracking-wider text-gold uppercase pointer-events-none select-none flex items-center justify-center leading-none"
              style={{
                left: "51.5%",
                top: "54%",
                width: "47%",
                fontSize: `${fontSize}px`,
                letterSpacing: "0.12em",
              }}
            >
              HORECA
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
