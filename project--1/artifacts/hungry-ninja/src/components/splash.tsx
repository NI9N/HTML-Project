import { useEffect, useRef, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { LanternIcon } from "./decorative";

// === 音效 ===
function playDraw() {
  try {
    const a = new Audio(`${import.meta.env.BASE_URL}sounds/draw.mp3`);
    a.volume = 0.5;
    a.play();
  } catch {}
}
// ==========

interface SplashScreenProps {
  onFinish: () => void;
}

function getNavLogoRect(): DOMRect | null {
  const el = document.querySelector<HTMLElement>('[data-logo-target="navbar"]');
  if (!el) return null;
  return el.getBoundingClientRect();
}

/** Wait for an <img> element to finish loading (or fail) */
function waitForImg(el: HTMLImageElement): Promise<void> {
  if (el.complete) return Promise.resolve();
  return new Promise((r) => { el.onload = () => r(); el.onerror = () => r(); });
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  const controls = useAnimationControls();
  const logoRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [bgVisible, setBgVisible] = useState(false);
  const [flashRed, setFlashRed] = useState(false);
  const [glowVisible, setGlowVisible] = useState(false);
  const [ringActive, setRingActive] = useState(false);
  const [slashFlash, setSlashFlash] = useState(false);
  const [slashLine, setSlashLine] = useState(false);
  const [hidden, setHidden] = useState(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    requestAnimationFrame(async () => {
      if (!logoRef.current) return;

      // Wait for the logo <img> to finish loading so dimensions are correct
      const logoImg = logoRef.current.querySelector<HTMLImageElement>('img');
      if (logoImg) await waitForImg(logoImg);

      if (!mountedRef.current) return;

      const rect = logoRef.current.getBoundingClientRect();
      const navRect = getNavLogoRect();

      if (!navRect) {
        setBgVisible(true);
        controls.set({ x: 0, y: 0, scale: 1, opacity: 0 });
        await new Promise((r) => setTimeout(r, 500));
        setHidden(true);
        onFinish();
        return;
      }

      const scale = navRect.width / rect.width;
      const x = (navRect.left + navRect.width / 2) - (rect.left + rect.width / 2);
      const y = (navRect.top + navRect.height / 2) - (rect.top + rect.height / 2);

      // Place at navbar (explicit opacity for framer-motion controls)
      controls.set({ x, y, scale, rotate: 0, opacity: 0 });
      setBgVisible(true);

      // Wait for bg to fade in
      await new Promise((r) => setTimeout(r, 80));

      if (!mountedRef.current) return;

      // === Phase 1: Zoom-in with anticipate (蓄力弹射 + 360°旋转) ===
      await controls.start({ x: 0, y: 0, scale: 1, opacity: 1, rotate: 360 }, { duration: 0.5, ease: "anticipate" });

      if (!mountedRef.current) return;

      // === Phase 2: Impact! ===
      playDraw();
      // Red flash
      setFlashRed(true);
      setTimeout(() => { if (mountedRef.current) setFlashRed(false); }, 120);

      // Katana slash flash + streak
      setSlashFlash(true);
      setSlashLine(true);
      setTimeout(() => { if (mountedRef.current) setSlashFlash(false); }, 80);
      setTimeout(() => { if (mountedRef.current) setSlashLine(false); }, 280);

      // Shockwave ring expands
      setRingActive(true);
      setTimeout(() => { if (mountedRef.current) setRingActive(false); }, 900);

      // === Phase 3: Golden glow + dramatic pulse ===
      await new Promise((r) => setTimeout(r, 180));

      if (!mountedRef.current) return;
      setGlowVisible(true);

      // Big pulse: 1.15 → 0.95 → 1
      await controls.start({ scale: 1.15 }, { duration: 0.15, ease: "easeOut" });
      await controls.start({ scale: 0.95 }, { duration: 0.2, ease: "easeInOut" });
      await controls.start({ scale: 1 }, { duration: 0.15, ease: "easeOut" });

      // === Phase 4: Hold ===
      await new Promise((r) => setTimeout(r, 600));

      if (!mountedRef.current) return;
      setGlowVisible(false);
      await new Promise((r) => setTimeout(r, 150));

      // === Phase 5: Zoom back to navbar ===
      if (!logoRef.current) {
        setHidden(true);
        onFinish();
        return;
      }
      const endRect = logoRef.current.getBoundingClientRect();
      const endNavRect = getNavLogoRect();
      if (endNavRect) {
        const endScale = endNavRect.width / endRect.width;
        const endX = (endNavRect.left + endNavRect.width / 2) - (endRect.left + endRect.width / 2);
        const endY = (endNavRect.top + endNavRect.height / 2) - (endRect.top + endRect.height / 2);

        await controls.start({ x: endX, y: endY, scale: endScale, opacity: 0.3 }, { duration: 0.5, ease: "easeIn" });
      }
      setHidden(true);
      onFinish();
    });
  }, [controls, onFinish]);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Black backdrop */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: bgVisible ? 0.85 : 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />

      {/* Red impact flash */}
      <motion.div
        className="absolute inset-0 bg-[#6B1D1D]"
        initial={{ opacity: 0 }}
        animate={{ opacity: flashRed ? 0.4 : 0 }}
        transition={{ duration: 0.08 }}
      />

      {/* Katana slash — white camera flash */}
      <motion.div
        className="absolute inset-0 z-20 bg-white pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: slashFlash ? 0.55 : 0 }}
        transition={{ duration: 0.04 }}
      />

      {/* Katana slash — golden streak */}
      <motion.div
        className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: slashLine ? 1 : 0 }}
        transition={{ duration: 0.05 }}
      >
        <motion.div
          className="absolute h-[3px]"
          style={{
            top: "85%",
            left: "0%",
            transform: "rotate(-22deg)",
            transformOrigin: "left center",
            background: "linear-gradient(90deg, transparent 0%, rgba(255,215,0,0.6) 10%, rgba(255,255,255,1) 50%, rgba(255,215,0,0.6) 90%, transparent 100%)",
            boxShadow: "0 0 25px 8px rgba(255,215,0,0.5)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "150%" }}
          transition={{ duration: 0.13, ease: "easeOut" }}
        />
      </motion.div>

      {/* Golden glow behind logo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: glowVisible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="w-[44rem] h-[44rem] rounded-full bg-[#D4A843]/20 blur-3xl" />
      </motion.div>

      {/* Shockwave ring */}
      {ringActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            ref={ringRef}
            className="w-16 h-16 rounded-full border-[3px] border-[#D4A843]/70"
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 14, opacity: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
          />
        </div>
      )}

      {/* Logo */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <motion.div
          ref={logoRef}
          animate={controls}
          initial={{ opacity: 0 }}
        >
          <LanternIcon splash className="w-[32rem] h-auto" />
        </motion.div>
      </div>
    </div>
  );
}
