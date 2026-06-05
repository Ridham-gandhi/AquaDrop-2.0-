import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: 1, title: 'Drop', desc: 'Place one cleaning tablet into your refillable bottle.' },
  { num: 2, title: 'Fill', desc: 'Add 500ml of warm tap water to the bottle.' },
  { num: 3, title: 'Dissolve', desc: 'Wait 15-20 minutes for the tablet to fully dissolve.' },
  { num: 4, title: 'Clean', desc: 'Start cleaning! Your solution is ready to use.' },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<HTMLDivElement>(null);

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

      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0 },
          {
            scaleX: 1, duration: 1.2, ease: 'power2.inOut',
            scrollTrigger: { trigger: nodesRef.current, start: 'top 70%' },
          }
        );
      }

      if (nodesRef.current) {
        const circles = nodesRef.current.querySelectorAll('.step-circle');
        const texts = nodesRef.current.querySelectorAll('.step-text');

        gsap.fromTo(
          circles,
          { scale: 0, opacity: 0 },
          {
            scale: 1, opacity: 1, stagger: 0.2, duration: 0.6, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: nodesRef.current, start: 'top 70%' },
          }
        );

        gsap.fromTo(
          texts,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.2, duration: 0.6, ease: 'power3.out', delay: 0.3,
            scrollTrigger: { trigger: nodesRef.current, start: 'top 70%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="w-full"
      style={{ background: '#F1F5F9', padding: '120px 48px' }}
    >
      <div className="section-container" style={{ maxWidth: '1400px' }}>
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="font-label text-teal-500 block mb-4">HOW IT WORKS</span>
          <h2 className="font-heading-2 text-slate-900 mb-4">
            Four simple steps to a cleaner home.
          </h2>
          <p className="font-body text-slate-400">
            No mess, no fuss. Just drop, fill, and clean.
          </p>
        </div>

        {/* Timeline */}
        <div ref={nodesRef} className="relative">
          {/* Desktop horizontal connector */}
          <div
            ref={lineRef}
            className="hidden lg:block absolute top-[31px] left-[12.5%] right-[12.5%] h-[2px] origin-left"
            style={{ background: 'rgba(20, 184, 166, 0.3)', zIndex: 0 }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-[1]">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <div
                  className="step-circle w-16 h-16 rounded-full bg-white flex items-center justify-center"
                  style={{ border: '3px solid #0EA5E9' }}
                >
                  <span className="text-sky-500 font-bold text-2xl">{step.num}</span>
                </div>
                <div className="step-text mt-6">
                  <h3 className="text-slate-900 font-bold text-[22px]">{step.title}</h3>
                  <p className="text-slate-400 font-body text-base mt-2 max-w-[240px] mx-auto">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #how-it-works { padding: 64px 24px !important; }
        }
      `}</style>
    </section>
  );
}
