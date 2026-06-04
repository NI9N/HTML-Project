import React from 'react';

/**
 * Generate Seigaiha (青海波) SVG data URI with configurable stroke color.
 * Uses cubic bezier wave paths to create overlapping fish-scale arcs.
 */
function seigaihaDataURI(stroke: string): string {
  const s = encodeURIComponent(stroke);
  return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='40' viewBox='0 0 80 40'%3E%3Cg fill='none' stroke='${s}' stroke-width='1.5'%3E%3Cpath d='M0 40c0-11 9-20 20-20s20 9 20 20M40 40c0-11 9-20 20-20s20 9 20 20'/%3E%3Cpath d='M20 20c0-11 9-20 20-20s20 9 20 20M-20 20c0-11 9-20 20-20s20 9 20 20M60 20c0-11 9-20 20-20s20 9 20 20'/%3E%3Cpath d='M0 40c0-5.5 4.5-10 10-10s10 4.5 10 10M40 40c0-5.5 4.5-10 10-10s10 4.5 10 10'/%3E%3Cpath d='M20 20c0-5.5 4.5-10 10-10s10 4.5 10 10M-20 20c0-5.5 4.5-10 10-10s10 4.5 10 10M60 20c0-5.5 4.5-10 10-10s10 4.5 10 10'/%3E%3C/g%3E%3C/svg%3E")`;
}

export const SeigaihaPattern = ({ className = "", opacity = 0.6 }: { className?: string; opacity?: number }) => (
  <div
    className={`w-full h-16 pointer-events-none ${className}`}
    style={{
      backgroundImage: seigaihaDataURI('#C8A84D'),
      backgroundSize: '60px 30px',
      backgroundRepeat: 'repeat',
      opacity,
    }}
  />
);

/** Seigaiha pattern divider block */
export const PatternDivider = ({ className = "", height = 24 }: { className?: string; height?: number }) => (
  <div
    className={`w-full overflow-hidden ${className}`}
    style={{
      backgroundImage: seigaihaDataURI('rgba(255,255,255,0.5)'),
      backgroundSize: '60px 30px',
      backgroundRepeat: 'repeat',
      height,
    }}
  />
);

/** Refined Lantern with shuriken — replaces the old "居" character */
export const LanternIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 32" className={`text-primary ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Lantern body */}
    <path d="M6 3C6 3 4 10 4 16C4 22 6 29 6 29H18C18 29 20 22 20 16C20 10 18 3 18 3H6Z" fill="currentColor"/>
    <path d="M9 3V29M12 3V29M15 3V29" stroke="rgba(0,0,0,0.12)" strokeWidth="1"/>
    {/* Caps */}
    <rect x="8" y="0" width="8" height="3" fill="#1A1A1A" rx="0.5"/>
    <rect x="8" y="29" width="8" height="3" fill="#1A1A1A" rx="0.5"/>
    {/* Shuriken (ninja star) inside lantern */}
    <g transform="translate(12, 18)" fill="#1A1A1A" opacity="0.85">
      <path d="M 0,-5 L 1,-1.5 L 6,0 L 1,1.5 L 0,5 L -1,1.5 L -6,0 L -1,-1.5 Z" />
      <circle cx="0" cy="0" r="1.2" fill="#D42B2B" opacity="0.6" />
    </g>
  </svg>
);

/** Standalone ninja star icon for accent use */
export const ShurikenIcon = ({ className = "", size = 24 }: { className?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M 12,2 L 13.5,9 L 22,10.5 L 15,13 L 16.5,22 L 12,15 L 7.5,22 L 9,13 L 2,10.5 L 10.5,9 Z"
      fill="currentColor" />
    <circle cx="12" cy="12" r="2" fill="white" opacity="0.3" />
  </svg>
);

export const NorenDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full flex ${className}`}>
    {[...Array(6)].map((_, i) => (
      <div key={i} className="flex-1 h-12 bg-[#1B2A4A] border-r border-[#1A1A1A]/30 relative">
        <div className="absolute bottom-0 left-0 w-full h-4 bg-background" style={{
          clipPath: 'ellipse(50% 100% at 50% 100%)'
        }}></div>
      </div>
    ))}
  </div>
);
