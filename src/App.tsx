import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import { lenisEase } from "./lib/easings";

import NoiseOverlay from "./components/primitives/NoiseOverlay";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Clients from "./components/Clients";
import Portfolio from "./components/Portfolio";
import Services from "./components/Services";
import Tools from "./components/Tools";
import Process from "./components/Process";
import FAQ from "./components/FAQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CorporatePage from "./pages/CorporatePage";

function MainPage() {
  useEffect(() => {
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window;
    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: lenisEase,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
    });

    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--color-bg)] text-[color:var(--color-ink)] overflow-x-hidden">
      <NoiseOverlay />
      <Preloader />
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <Clients />
        <Portfolio />
        <Services />
        <Tools />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/corporate" element={<CorporatePage />} />
      </Routes>
    </BrowserRouter>
  );
}
