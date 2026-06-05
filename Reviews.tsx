import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    quote: 'I was skeptical at first, but these tablets are genuinely brilliant. My kitchen has never been cleaner, and I love that I\'m not throwing away plastic bottles every month.',
    avatar: '/assets/testimonial-1.jpg',
  },
  {
    name: 'Rahul Kapoor',
    location: 'Bangalore',
    quote: 'As someone who travels often for work, Aquadrop is a game-changer. I carry a few tablets instead of bulky bottles. The glass cleaner is especially impressive — streak-free every time.',
    avatar: '/assets/testimonial-2.jpg',
  },
  {
    name: 'Ananya Patel',
    location: 'Delhi',
    quote: 'We switched our entire home to Aquadrop six months ago. The savings add up quickly, and our bathroom cabinet went from cluttered to minimal. Highly recommend the refill pack!',
    avatar: '/assets/testimonial-3.jpg',
  },
];

export default function Reviews() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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

      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { y: 60, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="w-full"
      style={{ background: '#FFFFFF', padding: '120px 48px' }}
    >
      <div className="section-container" style={{ maxWidth: '1400px' }}>
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-label text-teal-500 block mb-4">REVIEWS</span>
          <h2 className="font-heading-2 text-slate-900 mb-6">
            Loved by thousands of homes across India.
          </h2>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <div className="flex text-teal-500 text-lg">
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s}>&#9733;</span>
              ))}
            </div>
            <span className="font-body text-slate-400 ml-2">4.9 out of 5 from 2,400+ reviews</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="solid-card p-10 transition-all duration-300 hover:-translate-y-1"
              style={{ background: '#F1F5F9' }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              {/* Stars */}
              <div className="flex text-teal-500 text-base">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s}>&#9733;</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-600 font-medium text-lg mt-4 italic leading-relaxed">
                <span className="text-teal-500 text-3xl leading-none mr-1">&ldquo;</span>
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-8">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-slate-900 font-bold text-base">{t.name}</p>
                  <p className="text-slate-400 font-small">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #reviews { padding: 64px 24px !important; }
        }
      `}</style>
    </section>
  );
}
