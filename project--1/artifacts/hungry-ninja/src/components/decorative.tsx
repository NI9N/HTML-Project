import React from 'react';

/** Authentic Seigaiha (青海波) SVG pattern — filled fish-scale bands */
const SEIGAIHA_PATTERN_ID = 'seigaiha-pattern';

/* Build the concentric filled bands for one half-circle arch */
function seigaihaArch(left: number, right: number, baseY: number) {
  const r = (right - left) / 2;
  const cx = left + r;
  return (
    <g key={`${left}-${right}`}>
      {/* Each band is a filled path layer — width matches a specific radius */}
      {/* Outermost band */}
      <path d={`M ${cx - r},${baseY} A ${r},${r} 0 0,1 ${cx + r},${baseY} Z`}
        fill="rgba(200,168,77,0.25)" />
      {/* Second band */}
      <path d={`M ${cx - r * 0.75},${baseY} A ${r * 0.75},${r * 0.75} 0 0,1 ${cx + r * 0.75},${baseY} Z`}
        fill="rgba(200,168,77,0.50)" />
      {/* Third band */}
      <path d={`M ${cx - r * 0.5},${baseY} A ${r * 0.5},${r * 0.5} 0 0,1 ${cx + r * 0.5},${baseY} Z`}
        fill="rgba(200,168,77,0.20)" />
      {/* Center dot */}
      <path d={`M ${cx - r * 0.2},${baseY} A ${r * 0.2},${r * 0.2} 0 0,1 ${cx + r * 0.2},${baseY} Z`}
        fill="rgba(200,168,77,0.70)" />
    </g>
  );
}

export const SeigaihaSvgDefs = () => (
  <defs>
    <pattern id={SEIGAIHA_PATTERN_ID} width="100" height="50" patternUnits="userSpaceOnUse">
      {/* Row 1: two arches at y=25 */}
      {seigaihaArch(0, 50, 25)}
      {seigaihaArch(50, 100, 25)}
      {/* Row 2: one arch at y=50, offset by half-width */}
      {seigaihaArch(25, 75, 50)}
    </pattern>
  </defs>
);

export const SeigaihaPattern = ({ className = "", opacity = 0.5 }: { className?: string; opacity?: number }) => (
  <div
    className={`w-full h-16 pointer-events-none ${className}`}
    style={{ opacity }}
  >
    <svg width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full">
      <SeigaihaSvgDefs />
      <rect width="100%" height="100%" fill={`url(#${SEIGAIHA_PATTERN_ID})`} />
    </svg>
  </div>
);

/** Seigaiha pattern divider block */
export const PatternDivider = ({ className = "", height = 24 }: { className?: string; height?: number }) => (
  <div className={`relative w-full overflow-hidden ${className}`} style={{ height }}>
    <div className="absolute inset-0">
      <svg width="100%" height="100%" preserveAspectRatio="none" className="w-full h-full">
        <SeigaihaSvgDefs />
        <rect width="100%" height="100%" fill={`url(#${SEIGAIHA_PATTERN_ID})`} />
      </svg>
    </div>
  </div>
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
