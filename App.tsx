import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import Products from '@/sections/Products';
import HowItWorks from '@/sections/HowItWorks';
import Comparison from '@/sections/Comparison';
import Reviews from '@/sections/Reviews';
import FAQ from '@/sections/FAQ';
import About from '@/sections/About';
import Contact from '@/sections/Contact';
import CTABanner from '@/sections/CTABanner';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="relative">
      <Header lenisRef={lenisRef} />
      <main>
        <Hero lenisRef={lenisRef} />
        <Products />
        <HowItWorks />
        <Comparison />
        <Reviews />
        <FAQ />
        <About />
        <Contact />
        <CTABanner />
      </main>
      <Footer />
    </div>
  );
}
