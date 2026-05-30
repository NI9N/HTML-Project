import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { LanternIcon } from "./decorative";

export function Navbar() {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLng = i18n.language === "en" ? "zh" : "en";
    i18n.changeLanguage(nextLng);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { id: "menu", label: t("nav.menu") },
    { id: "about", label: t("nav.about") },
    { id: "reviews", label: t("nav.reviews") },
    { id: "visit", label: t("nav.visit") },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#1A1A1A] shadow-md py-3" : "bg-[#1A1A1A]/95 py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => scrollTo("hero")}
          data-testid="nav-logo"
        >
          <LanternIcon className="w-6 h-8 group-hover:rotate-6 transition-transform origin-top" />
          <span className="font-serif font-black text-xl md:text-2xl text-white tracking-wider uppercase">
            HUNGRY NINJA
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-[#FAF8F4] font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary hover:after:w-full after:transition-all after:duration-300"
              data-testid={`nav-link-${link.id}`}
            >
              {link.label}
            </button>
          ))}
          
          <div className="flex items-center gap-4 border-l border-white/20 pl-4">
            <button 
              onClick={toggleLanguage}
              className="text-white/80 hover:text-white font-medium text-sm transition-colors"
              data-testid="btn-toggle-lang"
            >
              {i18n.language === "en" ? "中文" : "EN"}
            </button>
            
            <Button 
              onClick={() => scrollTo("visit")} 
              className="bg-primary hover:bg-[#B02222] text-white font-bold rounded-md px-6"
              data-testid="btn-reserve-desktop"
            >
              {t("nav.reserve")}
            </Button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="text-white/80 hover:text-white font-medium text-sm transition-colors"
            data-testid="btn-toggle-lang-mobile"
          >
            {i18n.language === "en" ? "中文" : "EN"}
          </button>
          <button 
            className="text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="btn-mobile-menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#1A1A1A] border-t border-white/10 p-4 shadow-xl flex flex-col gap-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-left text-white text-lg font-medium py-2 border-b border-white/5"
              data-testid={`nav-link-mobile-${link.id}`}
            >
              {link.label}
            </button>
          ))}
          <Button 
            onClick={() => scrollTo("visit")} 
            className="w-full bg-primary hover:bg-[#B02222] text-white font-bold rounded-md mt-2"
            data-testid="btn-reserve-mobile"
          >
            {t("nav.reserve")}
          </Button>
        </div>
      )}
    </nav>
  );
}
