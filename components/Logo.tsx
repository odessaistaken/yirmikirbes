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

  // ── HORECA sizing ───────────────────────────────────────────────────────────
  // "biraz büyük": 42% of logo height gives a prominent, logo-proportional size
  const horecaFontSize = Math.round(imgHeight * 0.42);

  // ── Positioning ─────────────────────────────────────────────────────────────
  // "45" starts at ~46% from left edge of the logo image.
  // Placing HORECA below the image row means it can NEVER touch the red lines
  // inside the image — only the left-offset matters for visual alignment.
  const horecaLeft = Math.round(imgWidth * 0.46);

  // Vertical gap between bottom of logo image and top of HORECA (clearance)
  const gap = Math.max(1, Math.round(imgHeight * 0.02));

  return (
    <div
      className={`inline-flex flex-col select-none ${className}`}
    >
      {/* ── Logo image ──────────────────────────────────────────────────────── */}
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

      {/* ── HORECA — below "45", never touching red lines ───────────────────── */}
      {showText && (
        <span
          aria-hidden="true"
          style={{
            display: "block",
            paddingLeft: `${horecaLeft}px`,
            marginTop:   `${gap}px`,
            fontSize:    `${horecaFontSize}px`,
            fontWeight:  900,
            color:       "#D4AF37",
            fontFamily:  "var(--font-heading), 'Montserrat', sans-serif",
            letterSpacing: "0.05em",
            lineHeight:  1,
            whiteSpace:  "nowrap",
            userSelect:  "none",
          }}
        >
          HORECA
        </span>
      )}
    </div>
  );
}
