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

/** Seigaiha pattern that fades in from bottom — used as a transition between light and dark sections */
export const SeigaihaFadeUp = ({ className = "" }: { className?: string }) => (
  <div
    className={`w-full h-32 pointer-events-none ${className}`}
    style={{
      backgroundImage: seigaihaDataURI('#C8A84D'),
      backgroundSize: '60px 30px',
      backgroundRepeat: 'repeat',
      maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, black 60%, black 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 15%, black 60%, black 100%)',
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

/** Ninja logo — loaded via <img> for cross-browser compatibility (mobile Safari/Android) */
export const LanternIcon = ({ className = "", splash = false }: { className?: string; splash?: boolean }) => (
  <img
    src={`${import.meta.env.BASE_URL}logo.svg${splash ? `?t=${Date.now()}` : ""}`}
    alt="Ninja Logo"
    className={className}
    style={{ clipPath: "inset(0 12% 12% 0)", overflow: "hidden" }}
  />
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
