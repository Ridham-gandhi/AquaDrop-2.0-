import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '5,000+', label: 'annual savings' },
  { value: '25L', label: 'water transported zero times' },
  { value: '100%', label: 'biodegradable packaging' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const bigNumberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }

      if (bigNumberRef.current) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: 6,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: { trigger: visualRef.current, start: 'top 75%' },
          onUpdate: () => {
            if (bigNumberRef.current) {
              bigNumberRef.current.textContent = Math.round(obj.val).toString();
            }
          },
        });
      }

      if (visualRef.current) {
        const smallStats = visualRef.current.querySelectorAll('.small-stat');
        gsap.fromTo(
          smallStats,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: visualRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="w-full"
      style={{ background: '#0D9488', padding: '120px 48px' }}
    >
      <div className="section-container" style={{ maxWidth: '1400px' }}>
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Text Column */}
          <div ref={textRef} className="flex-1 lg:max-w-[55%]">
            <span className="font-label text-teal-300 block mb-4">OUR STORY</span>
            <h2 className="font-heading-2 text-white mb-8">
              Born from a simple idea: what if cleaning didn&apos;t cost the Earth?
            </h2>
            <div className="space-y-4">
              <p className="font-body text-white/70">
                Every year, Indian households discard over 25 million plastic cleaning bottles. Most end up in landfills, rivers, or the ocean. We knew there had to be a better way.
              </p>
              <p className="font-body text-white/70">
                Aquadrop started in a small apartment in Bangalore with one question: why are we shipping water across the country when everyone has it at home?
              </p>
              <p className="font-body text-white/70">
                Our dissolvable tablets pack the same cleaning power as leading brands — without the plastic, the weight, or the waste. Just add water, and you&apos;re ready to clean.
              </p>
            </div>
            <button className="btn-text-link mt-8 !text-white hover:!text-teal-300">
              Learn More About Us
              <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>

          {/* Visual Column */}
          <div ref={visualRef} className="flex-1 lg:max-w-[45%] text-center lg:text-left">
            <div className="mb-8">
              <span
                ref={bigNumberRef}
                className="font-display-l font-bold"
                style={{ color: '#22C55E' }}
              >
                0
              </span>
              <span className="font-display-l font-bold" style={{ color: '#22C55E' }}>KG</span>
              <p className="font-subheading text-white/60 mt-2">
                plastic waste saved per household per year
              </p>
            </div>
            <div className="flex flex-wrap gap-8 mt-12 justify-center lg:justify-start">
              {stats.map((s) => (
                <div key={s.label} className="small-stat">
                  <p className="text-teal-300 font-bold text-[28px]">{s.value}</p>
                  <p className="font-small text-white/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about { padding: 64px 24px !important; }
        }
      `}</style>
    </section>
  );
}
