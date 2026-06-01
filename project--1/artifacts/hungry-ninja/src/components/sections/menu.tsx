import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { NorenDivider } from "../decorative";

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
  tag?: "popular" | "new";
};

type MenuRow = {
  name: Loc;
  note?: Loc;
  price?: string;
};

type MenuSectionData = {
  title: Loc;
  rows: MenuRow[];
};

const FEATURED: FeaturedItem[] = [
  {
    image: orchestraImg,
    price: "$30",
    tag: "popular",
    name: {
      en: "Orchestra of the Ocean",
      zh: "海洋交响盛碗",
      ja: "オーケストラ・オブ・ジ・オーシャン",
    },
    desc: {
      en: "Salmon, maguro, hamachi, ikura and shrimp over seasoned rice, finished with edible flowers from Japan.",
      zh: "三文鱼、金枪鱼、鰤鱼、三文鱼籽与鲜虾铺在调味米饭上，点缀日本进口食用花。",
      ja: "サーモン・マグロ・ハマチ・いくら・海老を酢飯に盛り、日本の食用花を添えた贅沢な一杯。",
    },
  },
  {
    image: ninjaBombImg,
    price: "$17",
    tag: "popular",
    name: {
      en: "Ninja Bomb",
      zh: "忍者爆弹碗",
      ja: "ニンジャボム",
    },
    desc: {
      en: "Salmon and crunchy shrimp tempura with tobiko, shredded nori, sesame and cucumber over rice.",
      zh: "三文鱼配酥脆炸虾天妇罗，加飞鱼籽、海苔丝、芝麻与黄瓜，铺在米饭上。",
      ja: "サーモンとサクサク海老天に、とびこ・刻み海苔・胡麻・胡瓜をのせた丼。",
    },
  },
  {
    image: shinobiRollsImg,
    price: "$11",
    tag: "new",
    name: {
      en: "Shinobi Rolls",
      zh: "忍卷拼盘",
      ja: "忍ロール",
    },
    desc: {
      en: "Uncut pinch-by-hand rolls drizzled with spicy mayo and furikake — 8 pieces, made to share.",
      zh: "手捏不切寿司卷，淋上香辣蛋黄酱与日式香松——每份 8 件，适合分享。",
      ja: "手でつまむアンカット・ロール。スパイシーマヨとふりかけ仕上げ、8ピース。",
    },
  },
];

const SECTIONS: MenuSectionData[] = [
  {
    title: { en: "Protein Bowls", zh: "蛋白盖饭碗", ja: "プロテインボウル" },
    rows: [
      { name: { en: "Ninja Bomb", zh: "忍者爆弹", ja: "ニンジャボム" }, note: { en: "Salmon & shrimp tempura", zh: "三文鱼与炸虾天妇罗", ja: "サーモン＆海老天" }, price: "$17" },
      { name: { en: "Ninja Cali", zh: "忍者加州", ja: "ニンジャカリ" }, note: { en: "Maguro & crab salad", zh: "金枪鱼与蟹肉沙拉", ja: "マグロ＆カニサラダ" }, price: "$17" },
      { name: { en: "Ninja Star", zh: "忍者之星", ja: "ニンジャスター" }, note: { en: "Smoked salmon, cream cheese & shrimp tempura", zh: "烟熏三文鱼、奶油芝士与炸虾天妇罗", ja: "スモークサーモン・クリームチーズ・海老天" }, price: "$17" },
      { name: { en: "Green Ninja", zh: "青忍者", ja: "グリーンニンジャ" }, note: { en: "Tofu & seaweed salad", zh: "豆腐与海藻沙拉", ja: "豆腐＆海藻サラダ" }, price: "$16" },
      { name: { en: "Raw Salmon", zh: "生三文鱼", ja: "生サーモン" }, price: "$15" },
      { name: { en: "Maguro", zh: "金枪鱼", ja: "マグロ" }, note: { en: "Tuna", zh: "吞拿鱼", ja: "鮪" }, price: "$15" },
      { name: { en: "Unagi", zh: "鳗鱼", ja: "うなぎ" }, note: { en: "BBQ eel", zh: "蒲烧鳗", ja: "蒲焼" }, price: "$15" },
      { name: { en: "Smoked Salmon & Cream Cheese", zh: "烟熏三文鱼奶油芝士", ja: "スモークサーモン＆クリームチーズ" }, price: "$15" },
      { name: { en: "Ninj-icken", zh: "忍者唐扬鸡", ja: "ニンジキン" }, note: { en: "Karaage chicken", zh: "日式炸鸡", ja: "唐揚げ" }, price: "$15" },
      { name: { en: "Crab Salad", zh: "蟹肉沙拉", ja: "カニサラダ" }, price: "$14" },
      { name: { en: "Shrimp Tempura", zh: "炸虾天妇罗", ja: "海老天" }, price: "$14" },
      { name: { en: "Veggie Tempura", zh: "蔬菜天妇罗", ja: "野菜天" }, price: "$14" },
      { name: { en: "Tofu", zh: "豆腐", ja: "豆腐" }, price: "$14" },
    ],
  },
  {
    title: { en: "Specialty Bowls", zh: "招牌盛碗", ja: "スペシャルボウル" },
    rows: [
      { name: { en: "Orchestra of the Ocean", zh: "海洋交响盛碗", ja: "オーケストラ・オブ・ジ・オーシャン" }, price: "$30" },
      { name: { en: "Salmon, Maguro & Ikura Don", zh: "三文鱼金枪鱼鱼籽丼", ja: "サーモン・マグロ・いくら丼" }, price: "$26" },
      { name: { en: "Chashu Don", zh: "叉烧丼", ja: "チャーシュー丼" }, note: { en: "Pork belly on rice", zh: "五花肉盖饭", ja: "豚バラ丼" }, price: "$17" },
    ],
  },
  {
    title: { en: "Shinobi Rolls", zh: "忍卷", ja: "忍ロール" },
    rows: [
      { name: { en: "Teriyaki Chicken", zh: "照烧鸡卷", ja: "照り焼きチキン" }, price: "$12" },
      { name: { en: "Spicy Salmon", zh: "香辣三文鱼卷", ja: "スパイシーサーモン" }, price: "$11" },
      { name: { en: "Crunchy Shrimp Tempura", zh: "脆炸虾卷", ja: "クランチ海老天" }, price: "$11" },
      { name: { en: "Yuzu Crab", zh: "柚子蟹卷", ja: "柚子カニ" }, price: "$11" },
      { name: { en: "Maguro & Wasabi Shiso", zh: "金枪鱼山葵紫苏卷", ja: "マグロ＆わさび紫蘇" }, price: "$11" },
      { name: { en: "Cucumber & Shiso", zh: "黄瓜紫苏卷", ja: "胡瓜＆紫蘇" }, price: "$11" },
      { name: { en: "Deep Fried Marinated Tofu", zh: "炸味付豆腐卷", ja: "揚げ味付け豆腐" }, price: "$11" },
      { name: { en: "Shinobi Tray", zh: "忍卷拼盘", ja: "忍トレイ" }, note: { en: "24 pcs, house selection", zh: "24 件，主厨精选", ja: "24ピース／店主おすすめ" }, price: "$30" },
    ],
  },
  {
    title: { en: "Oshizushi", zh: "押寿司", ja: "押し寿司" },
    rows: [
      { name: { en: "Torched Salmon Oshizushi", zh: "炙烤三文鱼押寿司", ja: "炙りサーモン押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$18" },
      { name: { en: "Ebi Oshizushi", zh: "鲜虾押寿司", ja: "海老押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$18" },
      { name: { en: "Hotate Oshizushi", zh: "扇贝押寿司", ja: "帆立押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$18" },
      { name: { en: "Maguro Oshizushi", zh: "金枪鱼押寿司", ja: "鮪押し寿司" }, note: { en: "6 pcs", zh: "6 件", ja: "6貫" }, price: "$18" },
    ],
  },
  {
    title: { en: "Sashimi", zh: "刺身", ja: "刺身" },
    rows: [
      { name: { en: "Sashimi Moriawase", zh: "刺身拼盘", ja: "刺身盛り合わせ" }, price: "$35" },
      { name: { en: "Salmon Sashimi", zh: "三文鱼刺身", ja: "サーモン刺身" }, note: { en: "7 pcs", zh: "7 片", ja: "7切れ" }, price: "$16" },
      { name: { en: "Maguro Sashimi", zh: "金枪鱼刺身", ja: "マグロ刺身" }, note: { en: "7 pcs", zh: "7 片", ja: "7切れ" }, price: "$16" },
      { name: { en: "Salmon & Maguro", zh: "三文鱼金枪鱼拼", ja: "サーモン＆マグロ" }, note: { en: "7 pcs", zh: "7 片", ja: "7切れ" }, price: "$16" },
    ],
  },
  {
    title: { en: "Ramen & Noodles", zh: "拉面与面食", ja: "ラーメン＆麺" },
    rows: [
      { name: { en: "Chashu Ramen", zh: "叉烧拉面", ja: "チャーシューラーメン" }, note: { en: "Tonkotsu, black shoyu, miso or spicy miso", zh: "豚骨／黑酱油／味噌／辣味噌", ja: "豚骨・黒醤油・味噌・辛味噌" }, price: "$15" },
      { name: { en: "Veggie Ramen", zh: "蔬菜拉面", ja: "ベジラーメン" }, note: { en: "Shoyu, miso or spicy miso", zh: "酱油／味噌／辣味噌", ja: "醤油・味噌・辛味噌" }, price: "$15" },
      { name: { en: "Veggie Tempura Udon", zh: "蔬菜天妇罗乌冬", ja: "野菜天うどん" }, price: "$15" },
      { name: { en: "Yakisoba", zh: "日式炒面", ja: "焼きそば" }, note: { en: "Basic / chicken / chashu / shrimp tempura", zh: "原味／鸡肉／叉烧／炸虾", ja: "プレーン・鶏・チャーシュー・海老天" }, price: "$14" },
    ],
  },
  {
    title: { en: "Sides", zh: "小食", ja: "サイド" },
    rows: [
      { name: { en: "Crab Salad", zh: "蟹肉沙拉", ja: "カニサラダ" }, price: "$10" },
      { name: { en: "Tofu Bites", zh: "炸豆腐块", ja: "豆腐バイト" }, price: "$9" },
      { name: { en: "Inari Sushi", zh: "稻荷寿司", ja: "稲荷寿司" }, note: { en: "4 pcs", zh: "4 件", ja: "4個" }, price: "$9" },
      { name: { en: "Edamame", zh: "毛豆", ja: "枝豆" }, price: "$8" },
      { name: { en: "Seaweed Salad", zh: "海藻沙拉", ja: "海藻サラダ" }, price: "$8" },
      { name: { en: "Takoyaki", zh: "章鱼烧", ja: "たこ焼き" }, note: { en: "5 pcs", zh: "5 个", ja: "5個" }, price: "$7" },
      { name: { en: "Karaage Chicken", zh: "日式炸鸡", ja: "唐揚げ" }, note: { en: "5 pcs", zh: "5 块", ja: "5個" }, price: "$6.5" },
      { name: { en: "Miso Soup", zh: "味噌汤", ja: "味噌汁" }, price: "$6" },
      { name: { en: "House Made Oshinko", zh: "自制渍菜", ja: "自家製お新香" }, price: "$5" },
    ],
  },
  {
    title: { en: "Sweets & Drinks", zh: "甜品与饮品", ja: "スイーツ＆ドリンク" },
    rows: [
      { name: { en: "Green Tea Cheesecake", zh: "抹茶芝士蛋糕", ja: "抹茶チーズケーキ" }, note: { en: "House favourite", zh: "招牌人气", ja: "人気の一品" } },
      { name: { en: "Dango Matcha", zh: "抹茶团子", ja: "抹茶団子" }, note: { en: "1 pack", zh: "1 份", ja: "1パック" } },
      { name: { en: "Highball", zh: "海波酒", ja: "ハイボール" }, note: { en: "Japanese izakaya classic", zh: "日式居酒屋经典", ja: "居酒屋の定番" } },
    ],
  },
];

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

        {/* Signature dishes with real photos */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {FEATURED.map((item) => (
            <div
              key={item.name.en}
              className="bg-[#FFFDF7] rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 group flex flex-col"
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
                <p className="text-[#1A1A1A]/70 text-sm leading-relaxed">{item.desc[lang]}</p>
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
                {section.rows.map((row) => (
                  <li key={row.name.en} className="flex items-baseline gap-3">
                    <span className="text-[#1A1A1A] font-medium">
                      {row.name[lang]}
                      {row.note && (
                        <span className="text-[#1A1A1A]/45 font-normal text-sm"> · {row.note[lang]}</span>
                      )}
                    </span>
                    <span className="flex-1 border-b border-dotted border-[#1A1A1A]/20 translate-y-[-3px]" />
                    {row.price ? (
                      <span className="font-bold text-[#1A1A1A] whitespace-nowrap">{row.price}</span>
                    ) : (
                      <span className="font-normal text-[#1A1A1A]/45 text-sm whitespace-nowrap">{t("menu.askPrice")}</span>
                    )}
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
