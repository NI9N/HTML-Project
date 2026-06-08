import { useState } from "react";
import { useLocation } from "wouter";
import { LayoutGroup } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { MenuSection } from "@/components/sections/menu";
import { SeigaihaFadeUp } from "@/components/decorative";
import { Reviews } from "@/components/sections/reviews";
import { SplashScreen } from "@/components/splash";
import { CartButton, CartPanel } from "@/components/cart";
import { OrderTransition } from "@/components/order-transition";

export default function Home() {
  const [, navigate] = useLocation();
  const [splashActive, setSplashActive] = useState(false);
  const [splashKey, setSplashKey] = useState(0);
  const [orderTransition, setOrderTransition] = useState(false);

  return (
    <LayoutGroup>
      {splashActive && (
        <SplashScreen
          key={splashKey}
          onFinish={() => {
            setSplashActive(false);
            setSplashKey((k) => k + 1);
          }}
        />
      )}
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
        <Navbar onSplashTrigger={() => setSplashActive(true)} />
        <Hero />
        <About />
        <SeigaihaFadeUp />
        <MenuSection />
        <Reviews />
        <Footer />
      </div>
      <OrderTransition
        active={orderTransition}
        onFinish={() => navigate("/order-summary")}
      />
      <CartButton />
      <CartPanel onOrderSubmit={() => setOrderTransition(true)} />
    </LayoutGroup>
  );
}
