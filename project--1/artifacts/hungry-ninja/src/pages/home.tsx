import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { MenuSection } from "@/components/sections/menu";
import { Reviews } from "@/components/sections/reviews";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Reviews />
      <Footer />
    </div>
  );
}
