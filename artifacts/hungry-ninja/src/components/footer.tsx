import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Instagram, Utensils, ShoppingBag, Car, CreditCard, Accessibility } from "lucide-react";
import { LanternIcon, SeigaihaBackground } from "./decorative";

function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M16.5 3a5.6 5.6 0 0 0 4.5 4.9v3a8.6 8.6 0 0 1-4.5-1.3v6.2a6.3 6.3 0 1 1-6.3-6.3c.3 0 .6 0 .9.1v3.1a3.3 3.3 0 1 0 2.3 3.1V3h3.1Z" />
    </svg>
  );
}

export function Footer() {
  const { t } = useTranslation();

  const MAPS_SIMPLE_URL =
    "https://maps.google.com/?q=46+Ontario+St,+Stratford,+ON+N5A+1A1";
  const PHONE_NUMBER = "+12265841630";
  const INSTAGRAM_URL = "https://www.instagram.com/hungryninjastratford/";
  const TIKTOK_URL = "https://www.tiktok.com/@hungryninja.stratford";

  return (
    <footer id="visit" className="bg-[#1A1A1A] text-white pt-24 pb-8 relative overflow-hidden">
      <SeigaihaBackground patternId="sg-footer" scaleR={44} opacity={0.35} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <LanternIcon className="w-6 h-8" />
              <span className="font-serif font-black text-2xl tracking-wider uppercase">
                HUNGRY NINJA
              </span>
            </div>
            <p className="text-white/70 mb-6 max-w-sm leading-relaxed">
              Japanese Food & Drinks. Every bowl tells a story.
            </p>
            <div className="flex gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-testid="link-instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                data-testid="link-tiktok"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <TikTokIcon size={20} />
              </a>
            </div>
          </div>

          {/* Location */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <MapPin className="text-primary" size={20} />
              {t("footer.location")}
            </h4>
            <p className="text-white/80 leading-loose whitespace-pre-line">
              {t("footer.address")}
            </p>
            <a
              href={MAPS_SIMPLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-google-maps"
              className="text-primary hover:underline mt-3 inline-block text-sm font-medium"
            >
              {t("footer.directions")} &rarr;
            </a>

            {/* Google Maps embed */}
            <div className="mt-5 rounded-lg overflow-hidden border border-white/10">
              <iframe
                title="Hungry Ninja on Google Maps"
                src="https://maps.google.com/maps?q=46+Ontario+St,+Stratford,+ON+N5A+1A1,+Canada&output=embed&z=16"
                width="100%"
                height="140"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Clock className="text-primary" size={20} />
              {t("footer.hours")}
            </h4>
            <ul className="text-white/80 space-y-2 text-sm leading-relaxed">
              <li className="font-medium text-white/90">{t("footer.hoursOpen")}</li>
              <li className="text-white/50">{t("footer.hoursClosed")}</li>
            </ul>
            <p className="text-white/40 text-xs mt-4 italic">
              {t("footer.hoursNote")}
            </p>
          </div>

          {/* Phone + Reserve */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Phone className="text-primary" size={20} />
              {t("footer.phone")}
            </h4>
            <a
              href={`tel:${PHONE_NUMBER}`}
              data-testid="link-phone"
              className="text-white/90 hover:text-primary transition-colors font-medium text-lg block mb-2"
            >
              {t("footer.phoneNumber")}
            </a>
            <p className="text-white/80 text-sm mb-6">
              {t("footer.price")}
            </p>
            <Button
              data-testid="button-reserve-footer"
              className="w-full bg-primary hover:bg-[#B02222] text-white font-bold py-6"
              onClick={() => window.location.href = `tel:${PHONE_NUMBER}`}
            >
              {t("nav.reserve")}
            </Button>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 mb-8">
          <h4 className="font-bold text-sm uppercase tracking-wider text-white/50 mb-4">
            {t("footer.goodToKnow")}
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: Utensils, label: t("footer.attrDineIn") },
              { icon: ShoppingBag, label: t("footer.attrTakeaway") },
              { icon: Car, label: t("footer.attrParking") },
              { icon: CreditCard, label: t("footer.attrCards") },
              { icon: Accessibility, label: t("footer.attrAccessible") },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white/80"
              >
                <Icon size={16} className="text-primary" />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">{t("footer.rights")}</p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
