import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { NorenDivider } from "../decorative";
import { AddItemModal, type ModalItem } from "../add-item-modal";
import type { Lang, MenuAddon, MenuSectionData } from "@/data/menu-items.types";
import { FEATURED, SECTIONS } from "@/data/menu-items";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.4, delay: i * 0.05 },
  }),
};

const goldWavePattern = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="300" viewBox="0 0 500 300">
    <defs>
      <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#D4A847" stop-opacity="0.85" />
        <stop offset="50%" stop-color="#E8C35A" stop-opacity="0.65" />
        <stop offset="100%" stop-color="#D4A847" stop-opacity="0.85" />
      </linearGradient>
      <linearGradient id="g2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#C8A84D" stop-opacity="0.5" />
        <stop offset="50%" stop-color="#D4A847" stop-opacity="0.35" />
        <stop offset="100%" stop-color="#C8A84D" stop-opacity="0.5" />
      </linearGradient>
    </defs>
    <path d="M0 15 C80 15,170 55,250 55 C330 55,420 15,500 15" fill="none" stroke="url(#g1)" stroke-width="2.5" />
    <path d="M0 30 C80 30,170 70,250 70 C330 70,420 30,500 30" fill="none" stroke="url(#g2)" stroke-width="1" />
    <path d="M0 85 C80 85,170 125,250 125 C330 125,420 85,500 85" fill="none" stroke="url(#g1)" stroke-width="1.5" />
    <path d="M0 100 C80 100,170 140,250 140 C330 140,420 100,500 100" fill="none" stroke="url(#g2)" stroke-width="1" />
    <path d="M0 160 C80 160,170 200,250 200 C330 200,420 160,500 160" fill="none" stroke="url(#g1)" stroke-width="2" />
    <path d="M0 175 C80 175,170 215,250 215 C330 215,420 175,500 175" fill="none" stroke="url(#g2)" stroke-width="0.8" />
    <path d="M0 235 C80 235,170 275,250 275 C330 275,420 235,500 235" fill="none" stroke="url(#g1)" stroke-width="1.5" />
    <path d="M0 250 C80 250,170 290,250 290 C330 290,420 250,500 250" fill="none" stroke="url(#g2)" stroke-width="1" />
  </svg>`
)}")`;

function cardItemId(nameEn: string): string {
  return nameEn.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

function AddBaseButton({ onClick, hasAddons }: { onClick: () => void; hasAddons?: boolean }) {
  return (
    <button
      onClick={onClick}
      className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 bg-white/10 text-[#E8C35A] border border-[#D4A847]/40 hover:bg-[#D4A847] hover:text-[#0D0D0D] hover:border-[#D4A847] active:scale-95"
      aria-label="Add item"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <line x1="5" y1="12" x2="19" y2="12" />
      </svg>
      <span>Add{hasAddons ? " ✦" : ""}</span>
    </button>
  );
}

function SectionCard({ row, lang, commonAddons, onAdd }: {
  row: MenuSectionData["rows"][number];
  lang: Lang;
  commonAddons?: MenuSectionData["commonAddons"];
  onAdd: (item: ModalItem) => void;
}) {
  const hasImage = !!row.image;
  const hasAddons = !!row.addons && row.addons.length > 0;

  return (
    <div className="flex rounded-lg overflow-hidden border border-[#D4A847]/10 bg-[#0D0D0D]/40 hover:border-[#D4A847]/30 transition-all duration-300">
      {hasImage && (
        <div className="w-24 md:w-28 shrink-0 overflow-hidden">
          <img
            src={row.image!}
            alt={row.name[lang]}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className={`flex-1 flex flex-col p-3 md:p-4 ${hasImage ? "" : "py-4"}`}>
        <div className="flex justify-between items-start gap-2">
          <span className="text-[#FAF8F4] font-medium text-sm md:text-base leading-tight">
            {row.name[lang]}
          </span>
          {row.price && (
            <span className="font-bold text-[#D4A847] text-sm md:text-base whitespace-nowrap shrink-0">{row.price}</span>
          )}
        </div>
        {row.note && (
          <span className="text-[#FAF8F4]/50 text-xs md:text-sm mt-0.5">{row.note[lang]}</span>
        )}
        {hasAddons && (
          <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 mt-1.5">
            {row.addons!.map((a) => (
              <span key={a.name.en} className="text-[#D4A847]/40 text-[10px] md:text-xs">
                +{a.name[lang]} {a.price}
              </span>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-2">
          <AddBaseButton
            hasAddons={hasAddons || !!(commonAddons?.length)}
            onClick={() => onAdd({
              itemId: cardItemId(row.name.en),
              name: row.name,
              note: row.note,
              price: row.price,
              image: row.image,
              addons: row.addons,
            })}
          />
        </div>
      </div>
    </div>
  );
}

function SectionGroup({ section, lang, onAdd }: {
  section: MenuSectionData;
  lang: Lang;
  onAdd: (item: ModalItem) => void;
}) {
  const hasHeaderImg = !!section.headerImage;

  return (
    <div className="pb-8 last:pb-0">
      {hasHeaderImg && (
        <div className="relative w-full h-32 md:h-44 rounded-xl overflow-hidden mb-5">
          <img
            src={section.headerImage}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/40 to-transparent" />
          <h4 className="absolute bottom-3 left-4 font-serif font-bold text-xl md:text-2xl text-[#FAF8F4]">
            {section.title[lang]}
          </h4>
        </div>
      )}
      {!hasHeaderImg && (
        <h4 className="font-serif font-bold text-xl text-[#D4A847] mb-4 pb-2 border-b-2 border-[#D4A847]/30">
          {section.title[lang]}
        </h4>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {section.rows.map((row, i) => (
          <motion.div
            key={row.name.en}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            variants={cardVariants}
          >
            <SectionCard
              row={row}
              lang={lang}
              commonAddons={section.commonAddons}
              onAdd={onAdd}
            />
          </motion.div>
        ))}
      </div>
      {section.commonAddons && section.commonAddons.length > 0 && (
        <div className="mt-3 text-center">
          <span className="text-[#D4A847]/30 text-xs">
            Add-ons available: {section.commonAddons.map((a) => `${a.name[lang]} ${a.price}`).join(" · ")}
          </span>
        </div>
      )}
    </div>
  );
}

function FeaturedCard({ item, lang, onAdd }: {
  item: typeof FEATURED[number];
  lang: Lang;
  onAdd: (item: ModalItem) => void;
}) {
  const { t } = useTranslation();

  return (
    <div className="rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(212,168,71,0.08)] hover:shadow-[0_8px_30px_rgba(212,168,71,0.2)] transition-shadow duration-300 group flex flex-col border border-[#D4A847]/10">
      <div className="relative aspect-[4/3] overflow-hidden">
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
      <div className="bg-[#0D0D0D]/20 backdrop-blur-md p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-3 gap-4">
          <h3 className="font-serif font-bold text-xl text-[#FAF8F4] leading-tight">{item.name[lang]}</h3>
          <span className="font-bold text-[#D4A847] text-lg whitespace-nowrap">{item.price}</span>
        </div>
        <p className="text-[#FAF8F4]/70 text-sm leading-relaxed flex-1">{item.desc[lang]}</p>
        <div className="mt-4 flex justify-end">
          <AddBaseButton
            hasAddons={false}
            onClick={() => onAdd({
              itemId: cardItemId(item.name.en),
              name: item.name,
              note: item.desc ? { en: item.desc.en, zh: item.desc.zh, ja: item.desc.ja } : undefined,
              price: item.price,
              image: item.image,
            })}
          />
        </div>
      </div>
    </div>
  );
}

export function MenuSection() {
  const { t, i18n } = useTranslation();
  const base = i18n.language.split("-")[0];
  const lang = (["en", "zh", "ja"].includes(base) ? base : "en") as Lang;
  const [modalItem, setModalItem] = useState<ModalItem | null>(null);
  const [modalCommonAddons, setModalCommonAddons] = useState<MenuSectionData["commonAddons"]>(undefined);

  return (
    <section id="menu" className="relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          backgroundImage: goldWavePattern,
          backgroundSize: '500px 300px',
          backgroundRepeat: 'repeat',
        }}
      />
      <NorenDivider className="absolute top-0 left-0 -translate-y-full" />
      <div className="container mx-auto px-4 md:px-6 py-24 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif font-bold text-4xl md:text-5xl text-[#FAF8F4] mb-4">{t("menu.title")}</h2>
          <p className="text-[#FAF8F4]/70 text-lg">{t("menu.subtitle")}</p>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {FEATURED.map((item) => (
            <FeaturedCard key={item.name.en} item={item} lang={lang} onAdd={(i) => {
              setModalItem(i);
              setModalCommonAddons(undefined);
            }} />
          ))}
        </motion.div>

        <div className="text-center mb-12">
          <h3 className="font-serif font-bold text-3xl text-[#FAF8F4] mb-3">{t("menu.fullMenuTitle")}</h3>
          <p className="text-[#FAF8F4]/60">{t("menu.fullMenuSubtitle")}</p>
        </div>

        <div className="bg-[#0D0D0D]/20 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-[#D4A847]/10 max-w-5xl mx-auto">
          {SECTIONS.map((section) => (
            <SectionGroup key={section.title.en} section={section} lang={lang} onAdd={(i) => {
              setModalItem(i);
              setModalCommonAddons(section.commonAddons);
            }} />
          ))}
        </div>

        <p className="text-center text-[#FAF8F4]/40 text-sm mt-16 max-w-2xl mx-auto">
          {t("menu.disclaimer")}
        </p>
      </div>

      <AddItemModal
        item={modalItem}
        lang={lang}
        commonAddons={modalCommonAddons}
        onClose={() => { setModalItem(null); setModalCommonAddons(undefined); }}
      />
    </section>
  );
}
