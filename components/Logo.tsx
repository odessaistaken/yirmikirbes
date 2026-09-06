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

  // Extra width to reserve for the 2x enlarged HORECA text extending to the right
  const extraRightPadding = showText ? Math.round(imgHeight * 0.22) : 0;

  return (
    <div
      className={`inline-flex items-center select-none ${className}`}
      style={{ paddingRight: `${extraRightPadding}px` }}
    >
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

          {/* HORECA directly under the '45' number - 2x enlarged and crystal clear */}
          {showText && (
            <svg
              viewBox="0 0 1058 1174"
              className="absolute inset-0 w-full h-full pointer-events-none select-none overflow-visible"
              aria-hidden="true"
            >
              <text
                x="555"
                y="760"
                textAnchor="start"
                className="font-heading"
                fill="#D4AF37"
                fontWeight="900"
                fontSize="170"
                letterSpacing="1"
              >
                HORECA
              </text>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
}
