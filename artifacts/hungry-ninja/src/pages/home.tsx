import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { MenuSection } from "@/components/menu";
import { Reviews } from "@/components/reviews";
import { Reservation } from "@/components/reservation";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Reviews />
      <Reservation />
      <Footer />
    </div>
  );
}
