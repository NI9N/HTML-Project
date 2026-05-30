import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SeigaihaPattern } from "./decorative";
import int1 from "@assets/int1_1780170704785.jpg";
import int2 from "@assets/int2_1780170704785.jpg";

export function About() {
  const { t } = useTranslation();

  return (
    <section id="about" className="py-24 bg-background relative">
      <SeigaihaPattern className="absolute top-0 left-0 -translate-y-full" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="flex-1 w-full"
          >
            <div className="relative">
              <div className="aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src={int1} 
                  alt="Hungry Ninja Interior Lanterns" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-background hidden md:block">
                <img 
                  src={int2} 
                  alt="Hungry Ninja Table Setup" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 space-y-6 mt-12 lg:mt-0"
          >
            <h2 className="font-serif font-bold text-4xl md:text-5xl text-[#1A1A1A]">
              {t("about.title")}
            </h2>
            <div className="w-16 h-1 bg-primary rounded-full"></div>
            
            <div className="space-y-6 text-lg text-[#1A1A1A]/80 font-medium">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p className="text-primary font-bold">{t("about.p3")}</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
