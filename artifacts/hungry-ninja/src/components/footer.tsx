import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, DollarSign, Instagram, Facebook } from "lucide-react";
import { LanternIcon } from "./decorative";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="visit" className="bg-[#1A1A1A] text-white pt-24 pb-8 relative overflow-hidden">
      {/* Decorative background pattern */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <LanternIcon className="w-6 h-8" />
              <span className="font-serif font-black text-2xl tracking-wider uppercase">
                HUNGRY NINJA
              </span>
            </div>
            <p className="text-white/70 mb-6 max-w-sm">
              Japanese Food & Drinks. Every bowl tells a story.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Info Cols */}
          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <MapPin className="text-primary" size={20} />
              {t("footer.location")}
            </h4>
            <p className="text-white/80 leading-loose">
              {t("footer.address")}<br />
              <a href="#" className="text-primary hover:underline mt-2 inline-block text-sm">
                Get Directions
              </a>
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Clock className="text-primary" size={20} />
              {t("footer.hours")}
            </h4>
            <ul className="text-white/80 space-y-2 text-sm">
              <li>{t("footer.hoursMonThu")}</li>
              <li>{t("footer.hoursFriSat")}</li>
              <li>{t("footer.hoursSun")}</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 flex items-center gap-2">
              <DollarSign className="text-primary" size={20} />
              Info
            </h4>
            <p className="text-white/80 mb-6 text-sm">
              {t("footer.price")}
            </p>
            <Button className="w-full bg-primary hover:bg-[#B02222] text-white font-bold py-6">
              {t("nav.reserve")}
            </Button>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/50 text-sm">
            {t("footer.rights")}
          </p>
          <div className="flex gap-6 text-sm text-white/50">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
