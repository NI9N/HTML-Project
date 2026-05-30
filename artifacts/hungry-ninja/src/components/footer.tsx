import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Phone, Instagram, Facebook } from "lucide-react";
import { LanternIcon } from "./decorative";

export function Footer() {
  const { t } = useTranslation();

  const GOOGLE_MAPS_URL =
    "https://www.google.com/maps/place/Hungry+Ninja/@43.3701,-80.9825,17z/data=!3m1!4b1!4m6!3m5!1s0x882f3a1f1b4b4b4b:0x0!8m2!3d43.3701!4d-80.9825!16s%2Fg%2F11c1l_9z9z";
  const MAPS_SIMPLE_URL =
    "https://maps.google.com/?q=46+Ontario+St,+Stratford,+ON+N5A+3G8";

  return (
    <footer id="visit" className="bg-[#1A1A1A] text-white pt-24 pb-8 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

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
                href="#"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook size={20} />
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
                src="https://maps.google.com/maps?q=46+Ontario+St,+Stratford,+ON+N5A+3G8,+Canada&output=embed&z=16"
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
              <li className="text-white/40">{t("footer.hoursMon")}</li>
              <li className="font-medium text-white/90">{t("footer.hoursTueSat")}</li>
              <li className="text-white/40">{t("footer.hoursSun")}</li>
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
              href="tel:+12265841630"
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
            >
              {t("nav.reserve")}
            </Button>
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
