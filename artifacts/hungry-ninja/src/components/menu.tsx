import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { NorenDivider } from "./decorative";

import ninjaStarImg from "@assets/屏幕截图_2026-05-31_030815_1780170701466.png";
import seafoodSaladImg from "@assets/屏幕截图_2026-05-31_030820_1780170701466.png";
import salmonSashimiImg from "@assets/屏幕截图_2026-05-31_030842_1780170701467.png";
import tunaBowlImg from "@assets/屏幕截图_2026-05-31_030927_1780170701467.png";
import hamachiImg from "@assets/屏幕截图_2026-05-31_030912_1780170701467.png";
import assemblyImg from "@assets/屏幕截图_2026-05-31_030907_1780170701467.png";

type Category = "all" | "sushi" | "bowls" | "salads";

const ALL_ITEMS = [
  { id: "ninjaStar", category: "bowls" as const, image: ninjaStarImg, price: "$24", tags: ["popular"] as string[] },
  { id: "salmonSashimi", category: "sushi" as const, image: salmonSashimiImg, price: "$28", tags: ["new"] as string[] },
  { id: "seafoodSalad", category: "salads" as const, image: seafoodSaladImg, price: "$18", tags: [] as string[] },
  { id: "hamachi", category: "sushi" as const, image: hamachiImg, price: "$32", tags: ["popular"] as string[] },
  { id: "tunaBowl", category: "bowls" as const, image: tunaBowlImg, price: "$26", tags: [] as string[] },
  {
    id: "assembly", category: "bowls" as const, image: assemblyImg, price: "$20+", tags: [] as string[],
    name: "Assorted Sushi Bowls", desc: "Perfect for sharing with friends and family.",
  },
];

ALL_ITEMS.forEach((item) => {
  if (item.image) {
    const img = new Image();
    img.src = item.image;
  }
});

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -12, scale: 0.95, transition: { duration: 0.2 } },
};

export function MenuSection() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const visibleItems =
    activeCategory === "all"
      ? ALL_ITEMS
      : ALL_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="menu" className="bg-[#FAF8F4] relative">
      <NorenDivider className="absolute top-0 left-0 -translate-y-full" />
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-[#1A1A1A] mb-4">{t("menu.title")}</h2>
          <p className="text-[#1A1A1A]/70 text-lg">{t("menu.subtitle")}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(["all", "sushi", "bowls", "salads"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-[#1A1A1A] text-white shadow-md"
                  : "bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30"
              }`}
            >
              {t(`menu.categories.${cat}`)}
            </button>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {visibleItems.map((menuItem, index) => {
              const hasTranslation = menuItem.id !== "assembly";
              const name = hasTranslation ? t(`menu.items.${menuItem.id}.name`) : menuItem.name || "";
              const desc = hasTranslation ? t(`menu.items.${menuItem.id}.desc`) : menuItem.desc || "";
              return (
                <motion.div
                  key={menuItem.id}
                  layout
                  variants={cardVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ delay: index * 0.08 }}
                  className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]/5">
                    <img
                      src={menuItem.image}
                      alt={name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.dataset.retried !== "1") {
                          img.dataset.retried = "1";
                          const sep = menuItem.image.includes("?") ? "&" : "?";
                          img.src = `${menuItem.image}${sep}_t=${Date.now()}`;
                        }
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3 gap-4">
                      <h3 className="font-serif font-bold text-xl text-[#1A1A1A] leading-tight">{name}</h3>
                      <span className="font-bold text-primary text-lg whitespace-nowrap">{menuItem.price}</span>
                    </div>
                    <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">{desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
