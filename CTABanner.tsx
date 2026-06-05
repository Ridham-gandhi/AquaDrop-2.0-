import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTABanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const guaranteeRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.3,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }

      if (guaranteeRef.current) {
        gsap.fromTo(
          guaranteeRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.4,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full text-center"
      style={{ background: '#0F766E', padding: '100px 48px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        <h2 ref={headlineRef} className="font-display-m text-white">
          Ready to make the switch?
        </h2>
        <p ref={subRef} className="font-subheading text-white/70 mt-4">
          Join thousands of Indian households already cleaning smarter. Free shipping on your first order.
        </p>
        <a
          ref={ctaRef}
          href="#products"
          className="btn-primary mt-8 inline-flex"
          style={{ padding: '16px 40px', fontSize: '16px' }}
        >
          Get Started — &#x20B9;49/Tablet
        </a>
        <p ref={guaranteeRef} className="font-small text-white/50 mt-4">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>

      <style>{`
        @media (max-width: 430px) {
          section:last-of-type a { width: 100%; }
        }
        @media (max-width: 768px) {
          section:last-of-type { padding: 64px 24px !important; }
        }
      `}</style>
    </section>
  );
}
