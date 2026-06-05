import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { MenuSection } from "@/components/menu";
import { Reviews } from "@/components/reviews";
import { Footer } from "@/components/footer";
import { CartButton, CartPanel } from "@/components/cart";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Reviews />
      <Footer />
      <CartButton />
      <CartPanel />
    </div>
  );
}
