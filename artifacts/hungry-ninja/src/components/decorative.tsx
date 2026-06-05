import React from 'react';

/**
 * SeigaihaBackground — 青海波 / Japanese fish-scale pattern
 *
 * Based on the Lea Verou CSS3 Patterns Gallery formula.
 * Circles are placed at (100% 150%) and (0% 150%) — i.e., 50% of the tile
 * height BELOW the tile bottom. This causes each ring to appear as the
 * curved rim of a fish scale near the bottom of the tile above it.
 *
 * bgColor MUST match the section background for the scale bodies to correctly
 * occlude the scale below them (creating true visual overlapping).
 */
export const SeigaihaBackground = ({
  patternId = "sg-default",
  className = "",
  scaleR = 44,
  opacity = 1,
  bgColor = "#1a1a1a",
}: {
  patternId?: string;
  className?: string;
  scaleR?: number;
  opacity?: number;
  bgColor?: string;
}) => {
  const r  = scaleR;
  const tw = r * 2;
  const th = Math.round(r * 4 / 3);

  const g1 = `rgba(212,168,67,${(0.90 * opacity).toFixed(2)})`;
  const g2 = `rgba(212,168,67,${(0.48 * opacity).toFixed(2)})`;

  const stops = [
    `${bgColor} 23%`,
    `${g1} 24%`,
    `${g1} 31%`,
    `${bgColor} 32%`,
    `${bgColor} 35%`,
    `${g2} 36%`,
    `${g2} 44%`,
    `transparent 45%`,
  ].join(', ');

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: [
          `radial-gradient(circle at 100% 150%, ${stops})`,
          `radial-gradient(circle at 0%   150%, ${stops})`,
        ].join(', '),
        backgroundSize: `${tw}px ${th}px`,
        backgroundPosition: `0 0, ${r}px 0`,
      }}
    />
  );
};

export const NorenDivider = ({ className = "" }: { className?: string }) => (
  <div className={`w-full overflow-hidden leading-none ${className}`}>
    <svg
      viewBox="0 0 1200 60"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      className="w-full h-12 md:h-16"
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <rect
          key={i}
          x={i * 60 + 5}
          y={0}
          width={50}
          height={60}
          rx={25}
          fill="#1A1A1A"
        />
      ))}
    </svg>
  </div>
);

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
  <svg
    viewBox="0 0 24 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="10" y="0" width="4" height="3" rx="1" fill="currentColor" />
    <path
      d="M5 8 Q5 3 12 3 Q19 3 19 8 L21 26 Q21 32 12 32 Q3 32 3 26 Z"
      fill="currentColor"
      opacity="0.9"
    />
    <path d="M5 14 Q12 11 19 14" stroke="white" strokeWidth="0.8" opacity="0.4" fill="none" />
    <path d="M4 20 Q12 17 20 20" stroke="white" strokeWidth="0.8" opacity="0.4" fill="none" />
    <rect x="10" y="32" width="4" height="4" rx="1" fill="currentColor" opacity="0.7" />
  </svg>
);
