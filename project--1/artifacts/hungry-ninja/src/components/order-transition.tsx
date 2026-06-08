import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanternIcon } from "./decorative";

export function OrderTransition({ active, onFinish }: { active: boolean; onFinish: () => void }) {
  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => onFinish(), 1800);
    return () => clearTimeout(t);
  }, [active, onFinish]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1A1A1A]"
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <LanternIcon splash className="w-48 h-auto md:w-64" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="absolute bottom-20 text-[#D4A847] text-sm font-medium tracking-wider"
          >
            Preparing your order...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
