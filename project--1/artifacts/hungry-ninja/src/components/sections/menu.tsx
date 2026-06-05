import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { NorenDivider } from "../decorative";
import type { Lang } from "@/data/menu-items.types";
import { FEATURED, SECTIONS } from "@/data/menu-items";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
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

export function MenuSection() {
  const { t, i18n } = useTranslation();
  const base = i18n.language.split("-")[0];
  const lang = (["en", "zh", "ja"].includes(base) ? base : "en") as Lang;

  return (
    <section id="menu" className="relative overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Vignette overlay */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      {/* Gold wave pattern */}
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
              className="rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(212,168,71,0.08)] hover:shadow-[0_8px_30px_rgba(212,168,71,0.2)] transition-shadow duration-300 group flex flex-col border border-[#D4A847]/10"
            >
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
                <p className="text-[#FAF8F4]/70 text-sm leading-relaxed">{item.desc[lang]}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Full menu price list */}
        <div className="text-center mb-12">
          <h3 className="font-serif font-bold text-3xl text-[#FAF8F4] mb-3">{t("menu.fullMenuTitle")}</h3>
          <p className="text-[#FAF8F4]/60">{t("menu.fullMenuSubtitle")}</p>
        </div>

        <div className="bg-[#0D0D0D]/20 backdrop-blur-md rounded-2xl p-6 md:p-10 border border-[#D4A847]/10 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
            {SECTIONS.map((section) => (
              <div key={section.title.en}>
                <h4 className="font-serif font-bold text-xl text-[#D4A847] mb-5 pb-2 border-b-2 border-[#D4A847]/30">
                  {section.title[lang]}
                </h4>
                <ul className="space-y-3">
                  {section.rows.map((row) => (
                    <li key={row.name.en} className="flex items-baseline gap-3">
                      <span className="text-[#FAF8F4] font-medium">
                        {row.name[lang]}
                        {row.note && (
                          <span className="text-[#FAF8F4]/50 font-normal text-sm"> · {row.note[lang]}</span>
                        )}
                      </span>
                      <span className="flex-1 border-b border-dotted border-[#D4A847]/40 translate-y-[-3px]" />
                      {row.price ? (
                        <span className="font-bold text-[#D4A847] whitespace-nowrap">{row.price}</span>
                      ) : (
                        <span className="font-normal text-[#FAF8F4]/50 text-sm whitespace-nowrap">{t("menu.askPrice")}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-[#FAF8F4]/40 text-sm mt-16 max-w-2xl mx-auto">
          {t("menu.disclaimer")}
        </p>
      </div>
    </section>
  );
}
