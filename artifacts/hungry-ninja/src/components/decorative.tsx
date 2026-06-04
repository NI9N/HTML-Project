import React from 'react';

export const SeigaihaBackground = ({
  patternId = "sg-default",
  className = "",
  scaleR = 40,
  opacity = 1,
}: {
  patternId?: string;
  className?: string;
  scaleR?: number;
  opacity?: number;
}) => {
  const r = scaleR;
  const w = r * 2;
  const h = r;
  const r2 = Math.round(r * 0.64);
  const r3 = Math.round(r * 0.30);

  const arc = (cx: number, cy: number, radius: number) =>
    `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  const arcFill = (cx: number, cy: number, radius: number) =>
    `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy} Z`;

  return (
    <div
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id={patternId}
            x="0" y="0"
            width={w} height={h}
            patternUnits="userSpaceOnUse"
          >
            {/* ── Bottom row scale ── */}
            <path d={arcFill(r, h, r)}  fill="rgba(212,168,67,0.07)" />
            <path d={arc(r, h, r)}      fill="none" stroke="#D4A843" strokeWidth="1.4" strokeOpacity="0.65" />
            <path d={arc(r, h, r2)}     fill="none" stroke="#D4A843" strokeWidth="0.8" strokeOpacity="0.30" />
            <path d={arc(r, h, r3)}     fill="none" stroke="#D4A843" strokeWidth="0.5" strokeOpacity="0.15" />

            {/* ── Top-left scale (offset row) ── */}
            <path d={arcFill(0, 0, r)}  fill="rgba(212,168,67,0.07)" />
            <path d={arc(0, 0, r)}      fill="none" stroke="#D4A843" strokeWidth="1.4" strokeOpacity="0.65" />
            <path d={arc(0, 0, r2)}     fill="none" stroke="#D4A843" strokeWidth="0.8" strokeOpacity="0.30" />
            <path d={arc(0, 0, r3)}     fill="none" stroke="#D4A843" strokeWidth="0.5" strokeOpacity="0.15" />

            {/* ── Top-right scale (offset row) ── */}
            <path d={arcFill(w, 0, r)}  fill="rgba(212,168,67,0.07)" />
            <path d={arc(w, 0, r)}      fill="none" stroke="#D4A843" strokeWidth="1.4" strokeOpacity="0.65" />
            <path d={arc(w, 0, r2)}     fill="none" stroke="#D4A843" strokeWidth="0.8" strokeOpacity="0.30" />
            <path d={arc(w, 0, r3)}     fill="none" stroke="#D4A843" strokeWidth="0.5" strokeOpacity="0.15" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
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
