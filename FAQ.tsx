import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    q: 'How long does a tablet take to dissolve?',
    a: 'Most tablets dissolve fully in 15-20 minutes with warm tap water. Cold water may take up to 30 minutes. We recommend using water at room temperature or slightly warm for best results.',
  },
  {
    q: 'Are the cleaning solutions safe for children and pets?',
    a: 'Yes! All Aquadrop formulations are non-toxic, pH-balanced, and free from harsh chemicals like ammonia, bleach, and phosphates. They\'re safe to use around children and pets once dissolved.',
  },
  {
    q: 'Can I use my own bottles, or do I need to buy yours?',
    a: 'You can absolutely use your own bottles! Any clean 500ml bottle with a pump or spray nozzle works perfectly. Our starter kit includes premium glass bottles if you prefer a matching set.',
  },
  {
    q: 'What is the shelf life of the tablets?',
    a: 'Unopened tablets last up to 24 months when stored in a cool, dry place. Once dissolved, the liquid solution should be used within 6 months for optimal performance.',
  },
  {
    q: 'How many tablets come in a refill pack?',
    a: 'Our individual product packs contain 6 tablets each (a 3-month supply for most households). The mixed Refill Pack includes 12 tablets total - 4 each of Hand Wash, Dish Wash, and Glass Cleaner.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

      if (accordionRef.current) {
        gsap.fromTo(
          accordionRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: accordionRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="w-full"
      style={{ background: '#F1F5F9', padding: '120px 48px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '800px' }}>
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-label text-teal-500 block mb-4">FAQ</span>
          <h2 className="font-heading-2 text-slate-900">Questions? We&apos;ve got answers.</h2>
        </div>

        {/* Accordion */}
        <div ref={accordionRef} className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`faq-item ${openIndex === i ? 'active' : ''}`}
            >
              <button
                className="w-full flex items-center justify-between p-6 px-8 cursor-pointer text-left"
                onClick={() => toggleItem(i)}
              >
                <span className="text-slate-900 font-semibold text-lg pr-4">{faq.q}</span>
                <svg
                  className={`faq-chevron flex-shrink-0 ${openIndex === i ? 'open' : ''}`}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
                <p className="text-slate-500 font-body text-base px-8 pb-6">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #faq { padding: 64px 24px !important; }
          #faq .faq-item button { padding: 20px 24px !important; }
          #faq .faq-item button span { font-size: 16px !important; }
          #faq .faq-answer.open p { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </section>
  );
}
