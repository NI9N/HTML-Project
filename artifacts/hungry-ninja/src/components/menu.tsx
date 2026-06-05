import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Plus, Check } from "lucide-react";
import { useState } from "react";
import { NorenDivider } from "./decorative";
import { useCart } from "@/context/CartContext";

import orchestraImg from "@assets/hn_orchestra_ocean.jpg";
import ninjaBombImg from "@assets/hn_ninja_bomb.jpg";
import shinobiRollsImg from "@assets/hn_shinobi_rolls.jpg";

type Lang = "en" | "zh" | "ja";
type Loc = Record<Lang, string>;

type FeaturedItem = {
  image: string;
  name: Loc;
  desc: Loc;
  price: string;
  priceNum: number;
  tag?: "popular" | "new";
};

type MenuRow = {
  name: string;
  note?: string;
  price?: string;
  priceNum?: number;
};

type MenuSectionData = {
  title: Loc;
  rows: MenuRow[];
};

const FEATURED: FeaturedItem[] = [
  {
    image: orchestraImg,
    price: "$30",
    priceNum: 30,
    tag: "popular",
    name: { en: "Orchestra of the Ocean", zh: "海洋交响盛碗", ja: "オーケストラ・オブ・ジ・オーシャン" },
    desc: {
      en: "Salmon, maguro, hamachi, ikura and shrimp over seasoned rice, finished with edible flowers from Japan.",
      zh: "三文鱼、金枪鱼、鰤鱼、三文鱼籽与鲜虾铺在调味米饭上，点缀日本进口食用花。",
      ja: "サーモン・マグロ・ハマチ・いくら・海老を酢飯に盛り、日本の食用花を添えた贅沢な一杯。",
    },
  },
  {
    image: ninjaBombImg,
    price: "$17",
    priceNum: 17,
    tag: "popular",
    name: { en: "Ninja Bomb", zh: "忍者爆弹碗", ja: "ニンジャボム" },
    desc: {
      en: "Salmon and crunchy shrimp tempura with tobiko, shredded nori, sesame and cucumber over rice.",
      zh: "三文鱼配酥脆炸虾天妇罗，加飞鱼籽、海苔丝、芝麻与黄瓜，铺在米饭上。",
      ja: "サーモンとサクサク海老天に、とびこ・刻み海苔・胡麻・胡瓜をのせた丼。",
    },
  },
  {
    image: shinobiRollsImg,
    price: "$11",
    priceNum: 11,
    tag: "new",
    name: { en: "Shinobi Rolls", zh: "忍卷拼盘", ja: "忍ロール" },
    desc: {
      en: "Uncut pinch-by-hand rolls drizzled with spicy mayo and furikake — 8 pieces, made to share.",
      zh: "手捏不切寿司卷，淋上香辣蛋黄酱与日式香松——每份 8 件，适合分享。",
      ja: "手でつまむアンカット・ロール。スパイシーマヨとふりかけ仕上げ、8ピース。",
    },
  },
];

const SECTIONS: MenuSectionData[] = [
  {
    title: { en: "Appetizers", zh: "前菜", ja: "前菜" },
    rows: [
      { name: "Soup of the Day", note: "Fresh daily soup", price: "$8", priceNum: 8 },
      { name: "Miso Soup", price: "$6", priceNum: 6 },
      { name: "Inari Sushi", note: "4 pcs", price: "$10", priceNum: 10 },
      { name: "Edamame", note: "Boiled with Japanese sun-dried sea salt" },
      { name: "Seaweed Salad" },
      { name: "Tofu Salad", note: "Organic spring mix with Ninja sauce & Shiso" },
      { name: "Crab Salad", note: "Organic spring mix, cucumber, crab & Yuzu miso dressing" },
      { name: "Kaisen Salad", note: "Spring mix, salmon, maguro & crab with Ninja sauce", price: "$22", priceNum: 22 },
      { name: "Tako Yaki", note: "6 pcs — cooked octopus balls with BBQ sauce & Karashi Mayo" },
      { name: "Tako Wasabi", note: "Cooked octopus with wasabi & seaweed", price: "$6.50", priceNum: 6.5 },
      { name: "Vegetable Tempura", note: "4 pcs — shredded onion, kale & carrot patty", price: "$7", priceNum: 7 },
      { name: "Shrimp Tempura", note: "2 pcs" },
      { name: "Salmon Carpaccio", note: "Salmon sashimi, seaweed salad, ikura & baby leafs", price: "$18", priceNum: 18 },
      { name: "Albacore Tuna Tataki", note: "Seared with Japanese herbs & house vinaigrette" },
      { name: "Braised Mackerel with Sweet Miso", note: "Wild caught, Koji-miso braised. Served with rice", price: "$15", priceNum: 15 },
      { name: "Onsen Tamago", note: "Soft egg", price: "$3", priceNum: 3 },
    ],
  },
  {
    title: { en: "Sashimi", zh: "刺身", ja: "刺身" },
    rows: [
      { name: "Salmon Sashimi", note: "7 pcs", price: "$17", priceNum: 17 },
      { name: "Salmon & Tuna", note: "4 pcs salmon, 3 pcs tuna" },
      { name: "Yellowfin Tuna Sashimi", note: "7 pcs" },
      { name: "Sashimi Moriawase", note: "Salmon, tuna & daily fresh cuts", price: "$37", priceNum: 37 },
    ],
  },
  {
    title: { en: "Sushi Bowls", zh: "寿司丼", ja: "寿司ボウル" },
    rows: [
      { name: "Salmon Bowl", price: "$16", priceNum: 16 },
      { name: "Tuna Bowl" },
      { name: "Ninja Bomb Bowl", note: "Salmon & shrimp tempura" },
      { name: "Ninja Cali Bowl", note: "Crab salad & tuna" },
      { name: "Ninja Star Bowl", note: "Smoked salmon, cream cheese & shrimp tempura" },
      { name: "Unagi Bowl", note: "BBQ eel" },
      { name: "Smoked Salmon & Cream Cheese Bowl" },
      { name: "Crab Salad Bowl" },
      { name: "Shrimp Tempura Bowl" },
      { name: "Vegetable Tempura Bowl" },
      { name: "Green Ninja Bowl", note: "Tofu & seaweed salad" },
      { name: "Chicken Karaage Bowl" },
    ],
  },
  {
    title: { en: "Specialty Bowls", zh: "招牌丼", ja: "スペシャルボウル" },
    rows: [
      { name: "Tempura Donburi", note: "3 pc shrimp tempura, 3 pc veggie tempura on rice", price: "$20", priceNum: 20 },
      { name: "Salmon, Maguro & Ikura Don", price: "$26", priceNum: 26 },
      { name: "Gyudon", note: "Authentic sliced beef with onion & pickled ginger", price: "$19", priceNum: 19 },
      { name: "Kaisen Don", note: "Salmon, yellowfin tuna, bluefin tuna, scallop & daily special", price: "$32", priceNum: 32 },
      { name: "Salmon Lover Don", note: "Salmon sashimi & Ikura on sushi rice" },
      { name: "Bluefin Tuna Don", note: "6 pcs Akami sashimi & Negitoro on rice" },
      { name: "Negitoro Don", note: "Nakaochi mixed with Japanese green onion" },
      { name: "Chashu Don", note: "House braised pork belly on rice" },
    ],
  },
  {
    title: { en: "Ramen & Noodles", zh: "拉面与面食", ja: "ラーメン＆麺" },
    rows: [
      { name: "Ramen (1 pc Chashu)", note: "Choose: Tonkotsu, Miso, Spicy Miso or Black Shoyu" },
      { name: "Ramen (4 pc Chashu)", note: "Choose: Tonkotsu, Miso, Spicy Miso or Black Shoyu" },
      { name: "Veggie Ramen", note: "Choose: Black Shoyu, Miso or Spicy Miso" },
      { name: "Classic Yakisoba", note: "Noodle with Japanese BBQ sauce & chicken (no broth)" },
    ],
  },
  {
    title: { en: "Udon", zh: "乌冬面", ja: "うどん" },
    rows: [
      { name: "Basic Udon", note: "Marinated tofu protein", price: "$13", priceNum: 13 },
      { name: "Shrimp Tempura Udon" },
      { name: "Vegetable Tempura Udon" },
      { name: "Beef Udon", note: "Thin sliced beef with onion" },
      { name: "Chicken Curry Udon", note: "Authentic Japanese curry on udon" },
      { name: "Uni Carbonara Udon", note: "Hokkaido Uni, Ikura, soft egg & Shiso" },
    ],
  },
  {
    title: { en: "Shinobi Rolls", zh: "忍卷 (8 件)", ja: "忍ロール (8貫)" },
    rows: [
      { name: "Cucumber & Shiso", note: "8 pcs", price: "$11", priceNum: 11 },
      { name: "Marinated Tofu, Cucumber & Avocado", note: "8 pcs", price: "$12", priceNum: 12 },
      { name: "Avocado Salmon", note: "8 pcs", price: "$12.50", priceNum: 12.5 },
      { name: "Veggie Tempura & Avocado", note: "8 pcs" },
      { name: "Maguro & Shiso", note: "8 pcs" },
      { name: "Chicken Karaage Roll", note: "8 pcs" },
      { name: "Dynamite Roll", note: "Shrimp tempura, avocado, cucumber" },
      { name: "California Roll", note: "Crab salad, avocado, cucumber, tobiko" },
      { name: "Rainbow Roll", note: "Cucumber, shrimp tempura, crab topped with salmon & maguro sashimi" },
      { name: "Bluefin Tuna Toro Taku Roll", note: "Toro & Akami with Takuan, green onion, Shiso, cucumber" },
      { name: "Negitoro Roll", note: "Bluefin Tuna Toro & Akami, 8 pcs" },
    ],
  },
  {
    title: { en: "Premium Rolls", zh: "特选卷 (8 件)", ja: "プレミアムロール (8貫)" },
    rows: [
      { name: "Ninja Bomb Roll", note: "Cucumber, avocado, shrimp tempura topped with salmon sashimi" },
      { name: "Ninja Cali Roll", note: "Cucumber, maguro, crab topped with maguro sashimi" },
      { name: "Ninja Star Roll", note: "Cucumber, cream cheese, shrimp tempura topped with smoked salmon" },
      { name: "3 Premium Rolls", note: "One of each Ninja Bomb, Ninja Cali, Ninja Star", price: "$48", priceNum: 48 },
    ],
  },
  {
    title: { en: "Pressed Sushi", zh: "押寿司 (6 件)", ja: "押し寿司 (6貫)" },
    rows: [
      { name: "Torched Salmon Oshizushi", note: "6 pcs", price: "$19.50", priceNum: 19.5 },
      { name: "Torched Scallop Oshizushi", note: "6 pcs" },
      { name: "Ebi with Yuzu Sauce Oshizushi", note: "6 pcs" },
      { name: "Maguro Oshizushi", note: "6 pcs" },
      { name: "Unagi & Sansho Pepper Oshizushi", note: "6 pcs" },
    ],
  },
  {
    title: { en: "Party Trays", zh: "聚会拼盘", ja: "パーティートレイ" },
    rows: [
      { name: "House Selected Shinobi Tray", note: "24 pcs — Cucumber & Shiso, Salmon, Yuzu Crab", price: "$30", priceNum: 30 },
      { name: "House Selected Shinobi Tray", note: "48 pcs — Cucumber & Shiso, Salmon, Maguro, Shrimp, Yuzu Crab, Chicken", price: "$60", priceNum: 60 },
      { name: "Popular Tray", note: "24 pcs — Avocado Salmon, Dynamite, Maguro & Shiso", price: "$35", priceNum: 35 },
      { name: "Popular Tray", note: "48 pcs — Avocado Salmon, Dynamite, Maguro, California, Ninja Bomb, Chicken", price: "$72", priceNum: 72 },
      { name: "Veggie 24pcs Tray", note: "Cucumber & Shiso, Marinated Tofu, Veggie Tempura", price: "$33", priceNum: 33 },
    ],
  },
  {
    title: { en: "Party Platters", zh: "大型拼盘", ja: "パーティープラッター" },
    rows: [
      { name: "Aburi Sushi Platter", note: "42 pcs — Wagyu beef sushi, torched salmon, Unagi, dynamite & more. 3h notice", price: "$100", priceNum: 100 },
      { name: "Pressed Sushi Platter", note: "48 pcs — 6 kinds: torched salmon, salmon, maguro, ebi, unagi, scallop", price: "$95", priceNum: 95 },
    ],
  },
];

function AddButton({ name, price, priceNum }: { name: string; price?: string; priceNum?: number }) {
  const { addItem, setIsOpen } = useCart();
  const [flash, setFlash] = useState(false);

  const handleAdd = () => {
    addItem({
      id: name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name,
      price: price ?? "TBD",
      priceNum: priceNum ?? 0,
    });
    setFlash(true);
    setTimeout(() => setFlash(false), 800);
    setIsOpen(true);
  };

  return (
    <button
      onClick={handleAdd}
      className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
        flash
          ? "bg-green-500 text-white scale-110"
          : "bg-[#1A1A1A] text-white hover:bg-[#D42B2B] hover:scale-110"
      }`}
      aria-label={`Add ${name}`}
    >
      {flash ? <Check size={13} strokeWidth={3} /> : <Plus size={13} strokeWidth={3} />}
    </button>
  );
}

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function MenuSection() {
  const { t, i18n } = useTranslation();
  const base = i18n.language.split("-")[0];
  const lang = (["en", "zh", "ja"].includes(base) ? base : "en") as Lang;

  return (
    <section id="menu" className="bg-[#FAF8F4] relative">
      <NorenDivider className="absolute top-0 left-0 -translate-y-full" />
      <div className="container mx-auto px-4 md:px-6 py-24">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-[#1A1A1A] mb-4">{t("menu.title")}</h2>
          <p className="text-[#1A1A1A]/70 text-lg">{t("menu.subtitle")}</p>
        </div>

        {/* Featured dishes */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {FEATURED.map((item) => (
            <div
              key={item.name.en}
              className="bg-white rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1A1A1A]/5">
                <img
                  src={item.image}
                  alt={item.name[lang]}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.tag && (
                  <span className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {t(`menu.tags.${item.tag}`)}
                  </span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-3 gap-4">
                  <h3 className="font-serif font-bold text-xl text-[#1A1A1A] leading-tight">{item.name[lang]}</h3>
                  <span className="font-bold text-primary text-lg whitespace-nowrap">{item.price}</span>
                </div>
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed flex-1">{item.desc[lang]}</p>
                <div className="mt-4 flex justify-end">
                  <AddButton name={item.name.en} price={item.price} priceNum={item.priceNum} />
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Full menu price list */}
        <div className="text-center mb-12">
          <h3 className="font-serif font-bold text-3xl text-[#1A1A1A] mb-3">{t("menu.fullMenuTitle")}</h3>
          <p className="text-[#1A1A1A]/60">{t("menu.fullMenuSubtitle")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl mx-auto">
          {SECTIONS.map((section) => (
            <div key={section.title.en}>
              <h4 className="font-serif font-bold text-xl text-primary mb-5 pb-2 border-b-2 border-primary/20">
                {section.title[lang]}
              </h4>
              <ul className="space-y-3">
                {section.rows.map((row, i) => (
                  <li key={`${row.name}-${i}`} className="flex items-center gap-2">
                    <div className="flex-1 min-w-0 flex items-baseline gap-2">
                      <span className="text-[#1A1A1A] font-medium text-sm shrink-0">{row.name}</span>
                      {row.note && (
                        <span className="text-[#1A1A1A]/45 font-normal text-xs truncate"> · {row.note}</span>
                      )}
                      <span className="flex-1 border-b border-dotted border-[#1A1A1A]/20 translate-y-[-3px] min-w-[8px]" />
                      {row.price ? (
                        <span className="font-bold text-[#1A1A1A] text-sm whitespace-nowrap shrink-0">{row.price}</span>
                      ) : (
                        <span className="font-normal text-[#1A1A1A]/40 text-xs whitespace-nowrap shrink-0">{t("menu.askPrice")}</span>
                      )}
                    </div>
                    <AddButton name={row.name} price={row.price} priceNum={row.priceNum} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-center text-[#1A1A1A]/40 text-sm mt-16 max-w-2xl mx-auto">
          {t("menu.disclaimer")}
        </p>
      </div>
    </section>
  );
}
