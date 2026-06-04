import React from 'react';

/**
 * SeigaihaBackground — Japanese fish-scale (青海波) pattern
 *
 * Uses CSS radial-gradient to create two rows of overlapping semicircles
 * offset by scaleR, tiling to fill any dark section.
 *
 * Geometry: each gradient circle is anchored at the BOTTOM corner of a
 * (2r × r) tile. Its ring appears as the curved rim of the fish scale at
 * the TOP of the tile, and repeats every r pixels vertically, creating
 * the classic overlapping-scale stack.
 */
export const SeigaihaBackground = ({
  patternId = "sg-default",
  className = "",
  scaleR = 44,
  opacity = 1,
}: {
  patternId?: string;   // kept for API compat, unused in CSS approach
  className?: string;
  scaleR?: number;
  opacity?: number;
}) => {
  const r = scaleR;
  const w = r * 2;

  // Circle center sits 25% BELOW the tile bottom (125% of tile height).
  // This makes the ring's arc crest at the tile's TOP edge, forming the
  // classic ∧ fish-scale arch. Two circles (left/right) mirror each other.
  const makeScale = (xPct: string): string[] => [
    // Main gold arc — the prominent rim of each fish scale
    `radial-gradient(circle at ${xPct} 125%, transparent 55%, rgba(212,168,67,0.82) 57%, rgba(212,168,67,0.82) 70%, transparent 71%)`,
    // Inner concentric ring — adds the "multi-layer scale" depth
    `radial-gradient(circle at ${xPct} 125%, transparent 40%, rgba(212,168,67,0.32) 42%, rgba(212,168,67,0.32) 52%, transparent 53%)`,
  ];

  const allGrads = [...makeScale('100%'), ...makeScale('0%')];
  const bgImage  = allGrads.join(', ');

  // 4 gradients: grads 1-2 (right circle) at x=0; grads 3-4 (left circle) at x=r
  const bgPosition = `0 0, 0 0, ${r}px 0, ${r}px 0`;

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        opacity,
        backgroundImage: bgImage,
        backgroundSize: `${w}px ${r}px`,
        backgroundPosition: bgPosition,
        backgroundRepeat: 'repeat',
      }}
    />
  );
};

export const SeigaihaPattern = ({ className = "" }: { className?: string }) => (
  <div
    className={`w-full h-16 opacity-50 ${className}`}
    style={{
      backgroundImage: `radial-gradient(circle at 100% 150%, transparent 20%, rgba(212,43,43,0.15) 21%, rgba(212,43,43,0.15) 34%, transparent 35%, transparent),
                        radial-gradient(circle at 0% 150%, transparent 20%, rgba(212,43,43,0.15) 21%, rgba(212,43,43,0.15) 34%, transparent 35%, transparent)`,
      backgroundSize: '40px 20px',
      backgroundPosition: '0 0, 20px 0'
    }}
  />
);

export const LanternIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 32" className={`text-primary ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 3C6 3 4 10 4 16C4 22 6 29 6 29H18C18 29 20 22 20 16C20 10 18 3 18 3H6Z" fill="currentColor"/>
    <path d="M9 3V29M12 3V29M15 3V29" stroke="rgba(0,0,0,0.15)" strokeWidth="1"/>
    <rect x="8" y="0" width="8" height="3" fill="#1A1A1A"/>
    <rect x="8" y="29" width="8" height="3" fill="#1A1A1A"/>
    <text x="12" y="19" fill="#1A1A1A" opacity="0.8" fontSize="10" fontWeight="bold" textAnchor="middle" style={{fontFamily: 'Noto Serif JP'}}>居</text>
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
