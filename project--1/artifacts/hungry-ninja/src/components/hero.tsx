import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import extImg from "@assets/ext_1780170698818.jpg";

export function Hero() {
  const { t } = useTranslation();

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-[#1A1A1A]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={extImg} 
          alt="Hungry Ninja Exterior" 
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <h1 className="font-serif font-black text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight drop-shadow-lg">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-medium drop-shadow-md">
            {t("hero.subtitle")}
          </p>
          
          <Button 
            onClick={scrollToMenu}
            size="lg"
            className="bg-primary hover:bg-[#B02222] text-white text-lg px-8 py-6 rounded-md shadow-[0_4px_20px_rgba(212,43,43,0.4)] hover:-translate-y-1 transition-all duration-300"
            data-testid="btn-hero-cta"
          >
            {t("hero.cta")}
          </Button>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
}
