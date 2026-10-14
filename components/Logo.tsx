"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  size?: number; // base height in px
  logoScale?: number; // multiplier for logo image size only (default 1.0)
  showText?: boolean;
}

export default function Logo({
  className = "",
  variant = "dark",
  size = 80,
  logoScale = 1.0,
  showText = true,
}: LogoProps) {
  const imgHeight = Math.round(size * logoScale);
  const imgWidth  = Math.round(imgHeight * 0.901);
  const logoSrc   = variant === "dark" ? "/logo.png" : "/logo-light.png";

  // HORECA font size proportional to logo height
  const horecaFontSize = Math.round(imgHeight * 0.36);

  // Guaranteed horizontal gap between logo image and HORECA (min 5 px)
  const gap = Math.max(5, Math.round(imgHeight * 0.07));

  // How much to lift HORECA off the very bottom baseline (always ≥ 2 px)
  const bottomLift = Math.max(2, Math.round(imgHeight * 0.04));

  return (
    <div
      className={`inline-flex items-end select-none ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {/* ── Logo image ────────────────────────────────────────────────────── */}
      <div
        className="relative shrink-0 transition-transform duration-200 hover:scale-105"
        style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
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

      {/* ── HORECA — bottom-right of logo, never touching ─────────────────── */}
      {showText && (
        <span
          aria-hidden="true"
          style={{
            display: "block",
            fontSize: `${horecaFontSize}px`,
            fontWeight: 900,
            color: "#D4AF37",
            fontFamily: "var(--font-heading), 'Montserrat', sans-serif",
            letterSpacing: "0.04em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            userSelect: "none",
            paddingBottom: `${bottomLift}px`,
          }}
        >
          HORECA
        </span>
      )}
    </div>
  );
}
