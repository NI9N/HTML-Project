import { useLocation } from "wouter";
import { motion } from "framer-motion";

export default function NotFound() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center max-w-md"
      >
        <h1 className="font-serif font-black text-7xl text-[#D4A847] mb-4">404</h1>
        <p className="text-white/60 text-lg mb-8">Page not found. The ninja slipped away.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A847] text-[#0D0D0D] rounded-xl font-bold hover:bg-[#E8C35A] transition-colors"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}
