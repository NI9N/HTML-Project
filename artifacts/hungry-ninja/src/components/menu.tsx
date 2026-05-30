import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { NorenDivider } from "./decorative";

import ninjaStarImg from "@assets/屏幕截图_2026-05-31_030815_1780170701466.png";
import seafoodSaladImg from "@assets/屏幕截图_2026-05-31_030820_1780170701466.png";
import salmonSashimiImg from "@assets/屏幕截图_2026-05-31_030842_1780170701467.png";
import tunaBowlImg from "@assets/屏幕截图_2026-05-31_030927_1780170701467.png";
import hamachiImg from "@assets/屏幕截图_2026-05-31_030912_1780170701467.png";
import assemblyImg from "@assets/屏幕截图_2026-05-31_030907_1780170701467.png";

type Category = "all" | "sushi" | "bowls" | "salads";

export function MenuSection() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const menuItems = [
    {
      id: "ninjaStar",
      category: "bowls",
      image: ninjaStarImg,
      price: "$24",
      tags: ["popular"]
    },
    {
      id: "salmonSashimi",
      category: "sushi",
      image: salmonSashimiImg,
      price: "$28",
      tags: ["new"]
    },
    {
      id: "seafoodSalad",
      category: "salads",
      image: seafoodSaladImg,
      price: "$18",
      tags: []
    },
    {
      id: "hamachi",
      category: "sushi",
      image: hamachiImg,
      price: "$32",
      tags: ["popular"]
    },
    {
      id: "tunaBowl",
      category: "bowls",
      image: tunaBowlImg,
      price: "$26",
      tags: []
    },
    {
      id: "assembly",
      category: "bowls",
      image: assemblyImg,
      name: "Assorted Sushi Bowls",
      desc: "Perfect for sharing with friends and family.",
      price: "$20+",
      tags: []
    }
  ];

  const filteredItems = activeCategory === "all" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="menu" className="bg-[#FAF8F4] relative">
      <NorenDivider className="absolute top-0 left-0 -translate-y-full" />
      
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            {t("menu.title")}
          </h2>
          <p className="text-[#1A1A1A]/70 text-lg">
            {t("menu.subtitle")}
          </p>
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
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredItems.map((menuItem) => {
            const hasTranslation = menuItem.id !== "assembly";
            const name = hasTranslation ? t(`menu.items.${menuItem.id}.name`) : menuItem.name;
            const desc = hasTranslation ? t(`menu.items.${menuItem.id}.desc`) : menuItem.desc;

            return (
              <motion.div 
                key={menuItem.id} 
                variants={item}
                className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 group"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={menuItem.image} 
                    alt={name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {menuItem.tags.map(tag => (
                      <Badge 
                        key={tag} 
                        className={`
                          ${tag === "popular" ? "bg-primary hover:bg-primary/90" : ""}
                          ${tag === "new" ? "bg-[#3D7A4F] hover:bg-[#3D7A4F]/90" : ""}
                          ${tag === "spicy" ? "bg-[#F4854A] hover:bg-[#F4854A]/90" : ""}
                          text-white font-medium px-3 py-1 text-sm
                        `}
                      >
                        {t(`menu.tags.${tag}`)}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3 gap-4">
                    <h3 className="font-serif font-bold text-xl text-[#1A1A1A] leading-tight">
                      {name}
                    </h3>
                    <span className="font-bold text-primary text-lg whitespace-nowrap">
                      {menuItem.price}
                    </span>
                  </div>
                  <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
