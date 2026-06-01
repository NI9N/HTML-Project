import React from 'react';

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
