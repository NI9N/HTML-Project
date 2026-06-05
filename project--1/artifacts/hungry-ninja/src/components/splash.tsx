import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LanternIcon } from "./decorative";

interface SplashScreenProps {
  onFinish: () => void;
}

interface LogoAnim {
  x: number;
  y: number;
  scale: number;
}

function getNavLogoRect(): DOMRect | null {
  const el = document.querySelector<HTMLElement>('[data-logo-target="navbar"]');
  if (!el) return null;
  return el.getBoundingClientRect();
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const [exiting, setExiting] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const exitTargetRef = useRef<LogoAnim>({ x: 0, y: 0, scale: 1 });
  const [enterAnim, setEnterAnim] = useState<LogoAnim | null>(null);

  // On mount: calculate navbar logo position for the enter animation
  useEffect(() => {
    const navRect = getNavLogoRect();
    if (navRect && logoRef.current) {
      const splashRect = logoRef.current.getBoundingClientRect();
      const navCx = navRect.left + navRect.width / 2;
      const navCy = navRect.top + navRect.height / 2;
      const splashCx = splashRect.left + splashRect.width / 2;
      const splashCy = splashRect.top + splashRect.height / 2;

      setEnterAnim({
        x: navCx - splashCx,
        y: navCy - splashCy,
        scale: navRect.width / splashRect.width,
      });
    } else {
      // Fallback: no nav logo found, just show at center
      setEnterAnim({ x: 0, y: 0, scale: 1 });
    }
    setMounted(true);
  }, []);

  // Exit timer
  useEffect(() => {
    const t = setTimeout(() => {
      // Re-calculate navbar position (in case of scroll)
      const navRect = getNavLogoRect();
      if (navRect && logoRef.current) {
        const splashRect = logoRef.current.getBoundingClientRect();
        const navCx = navRect.left + navRect.width / 2;
        const navCy = navRect.top + navRect.height / 2;
        const splashCx = splashRect.left + splashRect.width / 2;
        const splashCy = splashRect.top + splashRect.height / 2;

        exitTargetRef.current = {
          x: navCx - splashCx,
          y: navCy - splashCy,
          scale: navRect.width / splashRect.width,
        };
      }
      setExiting(true);
    }, 3750);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  // Before positions are calculated, show plain black screen
  if (!mounted || !enterAnim) {
    return <div className="fixed inset-0 z-[100] bg-[#1A1A1A]" />;
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: "#1A1A1A" }}
      animate={
        exiting ? { backgroundColor: "rgba(26,26,26,0)" as string } : {}
      }
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <motion.div
        ref={logoRef}
        initial={enterAnim}
        animate={
          exiting
            ? {
                x: exitTargetRef.current.x,
                y: exitTargetRef.current.y,
                scale: exitTargetRef.current.scale,
              }
            : { x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: exiting ? 0.5 : 0.35, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (exiting) {
            setHidden(true);
            onFinish();
          }
        }}
      >
        <LanternIcon splash className="w-[32rem] h-auto" />
      </motion.div>
    </motion.div>
  );
}
