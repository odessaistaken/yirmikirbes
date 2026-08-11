"use client";

import React from "react";

interface LogoProps {
  className?: string;
  variant?: "dark" | "light" | "gold";
  size?: number; // base height in px
  showText?: boolean;
}

export default function Logo({
  className = "",
  variant = "dark",
  size = 38,
  showText = true,
}: LogoProps) {
  const glyphColor = variant === "light" ? "#FFFFFF" : variant === "gold" ? "#F59E0B" : "#1C1917";
  const accentColor = variant === "gold" ? "#FCD34D" : "#C8232B";

  // Calculate width proportional to 500:560 ratio
  const width = Math.round((size * 500) / 560);

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        width={width}
        height={size}
        viewBox="0 0 500 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200"
      >
        {/* Top vertical red line accent above 0 */}
        <rect x="127" y="15" width="10" height="60" rx="3" fill={accentColor} />

        {/* Bottom double vertical red line accent below 0 */}
        <rect x="120" y="475" width="9" height="75" rx="3" fill={accentColor} />
        <rect x="135" y="475" width="9" height="75" rx="3" fill={accentColor} />

        {/* Underline horizontal red line accent below colon/4 */}
        <rect x="260" y="275" width="105" height="11" rx="3" fill={accentColor} />

        {/* Main 20:45 Glyphs */}
        <g fill={glyphColor}>
          {/* Number "2" */}
          <path d="M 20 80 H 125 V 230 H 60 V 330 H 125 V 440 H 20 V 375 H 85 V 390 H 85 V 330 H 20 Z" />
          
          {/* Number "0" */}
          <path fillRule="evenodd" clipRule="evenodd" d="M 145 80 H 250 V 440 H 145 Z M 180 135 H 215 V 385 H 180 Z" />

          {/* Colon ":" */}
          <circle cx="268" cy="155" r="9" />
          <circle cx="268" cy="205" r="9" />

          {/* Number "4" */}
          <path d="M 280 100 H 318 V 190 H 350 V 100 H 388 V 250 H 350 V 225 H 280 V 100 Z M 318 132 V 190 H 350 V 132 Z" />

          {/* Number "5" */}
          <path d="M 395 100 H 480 V 145 H 435 V 175 H 480 V 250 H 395 V 205 H 442 V 205 V 175 H 395 Z" />
        </g>
      </svg>
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`font-heading font-black tracking-tight text-sm sm:text-base ${variant === "light" ? "text-white" : "text-charcoal-900"}`}>
            PASTACILIK
          </span>
          <span className="text-2xs font-semibold tracking-widest text-gold uppercase mt-0.5">
            YKB GIDA
          </span>
        </div>
      )}
    </div>
  );
}
