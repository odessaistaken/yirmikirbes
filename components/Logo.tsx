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

  const isLarge = size >= 48;

  return (
    <div className={`inline-flex flex-col select-none ${className}`}>
      {/* Logo container */}
      <div className="relative group flex flex-col items-start">
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
        </div>

        {/* HORECA directly under the '45' (which sits on the right 50% of the logo) */}
        {showText && (
          <div
            className="w-full flex justify-end pr-1 mt-0.5"
            style={{ width: `${width}px` }}
          >
            <span
              className={`font-heading font-black tracking-widest text-gold uppercase text-right leading-none ${
                isLarge ? "text-[11px] sm:text-xs" : "text-[9px] sm:text-[10px]"
              }`}
              style={{ letterSpacing: "0.22em" }}
            >
              HORECA
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
