import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { SeigaihaPattern } from "../decorative";
import int1 from "@assets/int1_1780170704785.jpg";
import int2 from "@assets/int2_1780170704785.jpg";

export function About() {
  const { t } = useTranslation();
  const [showSecond, setShowSecond] = useState(false);

  const badges = [
    { key: "badge1", color: "#D42B2B" },
    { key: "badge2", color: "#3D7A4F" },
    { key: "badge3", color: "#6B4226" },
  ];

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
              {/* Mobile: tap to toggle between two photos */}
              <div
                className="aspect-[4/5] rounded-xl overflow-hidden shadow-2xl cursor-pointer md:cursor-default relative md:hidden"
                onClick={() => setShowSecond(s => !s)}
              >
                <img
                  src={showSecond ? int2 : int1}
                  alt="Hungry Ninja Interior"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
                  {showSecond ? "← 返回" : "切换图片"}
                </div>
              </div>
              {/* Desktop: both photos overlapping */}
              <div className="hidden md:block">
                <div className="aspect-square lg:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl">
                  <img src={int1} alt="Hungry Ninja Interior Lanterns" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-2/3 aspect-square rounded-xl overflow-hidden shadow-2xl border-4 border-background">
                  <img src={int2} alt="Hungry Ninja Table Setup" className="w-full h-full object-cover" />
                </div>
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
            <div className="w-16 h-1 bg-primary rounded-full" />

            <div className="space-y-5 text-[#1A1A1A]/80 leading-relaxed">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p className="text-primary font-semibold">{t("about.p3")}</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {badges.map(({ key, color }) => (
                <span
                  key={key}
                  data-testid={`badge-about-${key}`}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold text-white"
                  style={{ backgroundColor: color }}
                >
                  {t(`about.${key}`)}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
