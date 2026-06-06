import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ZoomableImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const justTouched = useRef(false);
  const [show, setShow] = useState(false);
  const originRef = useRef({ top: 0, left: 0, w: 0, h: 0 });

  const open = () => {
    if (!imgRef.current) return;
    const r = imgRef.current.getBoundingClientRect();
    if (r.width === 0) return;
    originRef.current = { top: r.top, left: r.left, w: r.width, h: r.height };
    setShow(true);
  };

  const close = () => setShow(false);

  const handleClick = () => {
    if (justTouched.current) { justTouched.current = false; return; }
    open();
  };

  const handleTouchStart = () => {
    justTouched.current = true;
    timerRef.current = setTimeout(open, 500);
  };
  const handleTouchEnd = () => clearTimeout(timerRef.current);
  const handleTouchMove = () => clearTimeout(timerRef.current);

  const { top: ot, left: ol, w: ow, h: oh } = originRef.current;

  return (
    <>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        className={className}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        draggable={false}
        style={{ cursor: "zoom-in" }}
      />
      <AnimatePresence>
        {show && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={close}
              className="fixed inset-0 z-[70]"
            />
            <motion.div
              style={{
                position: "fixed",
                top: ot,
                left: ol,
                width: ow,
                height: oh,
                overflow: "hidden",
                zIndex: 71,
              }}
              initial={{ scale: 1, x: 0, borderRadius: "0px", boxShadow: "0 0 0 rgba(0,0,0,0)" }}
              animate={{ scale: 1.5, x: 24, borderRadius: "12px", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
              exit={{ scale: 1, x: 0, borderRadius: "0px", boxShadow: "0 0 0 rgba(0,0,0,0)" }}
              transition={{ type: "spring", damping: 26, stiffness: 320, mass: 0.9 }}
              onClick={close}
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
