import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { label: 'Plastic Waste', traditional: '500g', traditionalUnit: ' per bottle', aquadrop: '5g', aquadropUnit: ' per refill' },
  { label: 'Storage Space', traditional: 'Takes', traditionalUnit: ' shelf space', aquadrop: 'Fits', aquadropUnit: ' in a drawer' },
  { label: 'Shipping Weight', traditional: '600g', traditionalUnit: ' per bottle', aquadrop: '15g', aquadropUnit: ' per refill' },
  { label: 'Cost per refill', traditional: '150-250', traditionalUnit: '', aquadrop: '49-80', aquadropUnit: '' },
];

export default function Comparison() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
          }
        );
      }

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
          }
        );
      }

      if (bannerRef.current) {
        gsap.fromTo(
          bannerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5,
            scrollTrigger: { trigger: bannerRef.current, start: 'top 85%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="comparison"
      className="w-full"
      style={{ background: '#0F172A', padding: '120px 48px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 48px' }}>
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-label text-teal-300 block mb-4">WHY SWITCH?</span>
          <h2 className="font-heading-2 text-white">The numbers speak for themselves.</h2>
        </div>

        {/* Comparison Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Traditional Card */}
          <div className="glass-card p-12">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl">Traditional Liquid Cleaners</h3>
                <p className="text-white/60 font-body text-sm">Heavy, wasteful, expensive</p>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              {metrics.map((m) => (
                <div key={m.label} className="flex justify-between items-end">
                  <span className="font-small text-white/50 uppercase">{m.label}</span>
                  <span className="text-rose-500 font-bold text-[32px] leading-none">
                    {m.traditional}{m.traditionalUnit}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Aquadrop Card */}
          <div className="glass-card p-12">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 5.8 17 2.5 17 2.5c1 2.5.5 5.5-1.5 8l-3 3c-1 1-1 3 .5 3.5" />
                  <path d="M14 16c0 3-2 5-5 5s-4-3-3-5" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl">Aquadrop Tablets</h3>
                <p className="text-white/60 font-body text-sm">Light, eco-friendly, affordable</p>
              </div>
            </div>
            <div className="mt-8 space-y-6">
              {metrics.map((m) => (
                <div key={m.label} className="flex justify-between items-end">
                  <span className="font-small text-white/50 uppercase">{m.label}</span>
                  <span className="text-emerald-500 font-bold text-[32px] leading-none">
                    {m.aquadrop}{m.aquadropUnit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Winner Banner */}
        <div
          ref={bannerRef}
          className="mt-12 mx-auto text-center rounded-2xl p-6 px-12"
          style={{ background: 'rgba(20, 184, 166, 0.2)' }}
        >
          <p className="font-subheading text-white">
            Aquadrop saves you up to &#x20B9;5,000/year and eliminates 6kg of plastic waste.
          </p>
          <p className="font-small text-white/40 mt-2">
            *Based on average Indian household using 3 cleaning products monthly.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #comparison { padding: 64px 24px !important; }
          #comparison > div { padding: 0 24px !important; }
          #comparison .glass-card { padding: 32px !important; }
        }
      `}</style>
    </section>
  );
}
