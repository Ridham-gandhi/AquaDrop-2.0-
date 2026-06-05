import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MetaballCanvas from '@/components/MetaballCanvas';
import Lenis from '@studio-freight/lenis';

interface HeroProps {
  lenisRef: React.RefObject<Lenis | null>;
}

export default function Hero({ lenisRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.6 });

    // Headline words
    if (headlineRef.current) {
      const words = headlineRef.current.querySelectorAll('.word');
      tl.fromTo(
        words,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7, ease: 'power3.out' },
        0
      );
    }

    // Subtitle
    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
        0.3
      );
    }

    // CTA buttons
    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: 'power3.out' },
        0.5
      );
    }

    // Trust badges
    if (badgesRef.current) {
      tl.fromTo(
        badgesRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out' },
        0.7
      );
    }

    // Product image
    if (imageRef.current) {
      tl.fromTo(
        imageRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        0.4
      );
    }

    return () => { tl.kill(); };
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -80, duration: 1.2 });
    }
  };

  return (
    <section ref={sectionRef} className="relative w-full min-h-[100dvh] overflow-hidden" id="hero">
      {/* Canvas background */}
      <MetaballCanvas />
      <div className="noise-overlay" />

      {/* Content overlay */}
      <div className="relative z-[5] flex items-center min-h-[100dvh] section-container">
        <div className="w-full max-w-[1400px] mx-auto py-24">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
            {/* Text column */}
            <div className="flex-1 lg:max-w-[55%] text-center lg:text-left">
              <h1
                ref={headlineRef}
                className="font-display-xl text-white"
                style={{ textShadow: '0 2px 40px rgba(0,0,0,0.3)' }}
              >
                <span className="word inline-block">Clean</span>{' '}
                <span className="word inline-block">water,</span>
                <br />
                <span className="word inline-block">less</span>{' '}
                <span className="word inline-block">plastic.</span>
              </h1>

              <p
                ref={subtitleRef}
                className="font-subheading text-white/80 mt-6 max-w-[480px] mx-auto lg:mx-0"
              >
                Refillable cleaning tablets that dissolve in water. Save money, space, and the planet — one bottle at a time.
              </p>

              <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 mt-10 justify-center lg:justify-start">
                <a
                  href="#products"
                  onClick={(e) => handleScrollTo(e, '#products')}
                  className="btn-primary"
                >
                  Shop Now
                </a>
                <a
                  href="#how-it-works"
                  onClick={(e) => handleScrollTo(e, '#how-it-works')}
                  className="btn-secondary"
                >
                  See How It Works
                </a>
              </div>

              <div ref={badgesRef} className="flex flex-wrap items-center justify-center lg:justify-start gap-8 mt-12">
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span className="font-small text-white/60">Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="23 4 23 10 17 10" />
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                  </svg>
                  <span className="font-small text-white/60">90-Day Returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5EEAD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                  <span className="font-small text-white/60">Made in India</span>
                </div>
              </div>
            </div>

            {/* Product image column */}
            <div ref={imageRef} className="hidden md:block lg:max-w-[45%] flex-shrink-0">
              <div className="animate-float">
                <img
                  src="/assets/hero-product-composition.jpg"
                  alt="Aquadrop cleaning tablets and bottle"
                  className="w-full max-w-[500px] rounded-[20px]"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
