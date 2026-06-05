import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    name: 'Hand Wash',
    description: 'Gentle foaming hand wash tablets. Soft on skin, tough on germs.',
    price: '299',
    image: '/assets/product-hand-wash.jpg',
  },
  {
    name: 'Dish Wash',
    description: 'Powerful grease-cutting dish wash tablets. Sparkling clean, every time.',
    price: '349',
    image: '/assets/product-dish-wash.jpg',
  },
  {
    name: 'Glass Cleaner',
    description: 'Streak-free glass cleaner tablets for mirrors, windows, and shiny surfaces.',
    price: '249',
    image: '/assets/product-glass-cleaner.jpg',
  },
  {
    name: 'Refill Pack',
    description: 'A mixed pack of 12 tablets — 4 of each type. The complete home cleaning kit.',
    price: '799',
    image: '/assets/product-refill-pack.jpg',
  },
];

export default function Products() {
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
          { y: 80, opacity: 0 },
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
      id="products"
      className="w-full"
      style={{ background: '#0D9488', padding: '120px 48px' }}
    >
      <div className="section-container" style={{ maxWidth: '1400px' }}>
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-label text-teal-300 block mb-4" style={{ letterSpacing: '3px' }}>
            OUR PRODUCTS
          </span>
          <h2 className="font-heading-2 text-white mb-4">
            Cleaning that's kind to your home and the planet.
          </h2>
          <p className="font-body text-white/60">
            Choose from our range of refillable cleaning tablets.
          </p>
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8"
        >
          {products.map((product) => (
            <div
              key={product.name}
              className="glass-card p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 group"
              style={{
                border: '1px solid rgba(20, 184, 166, 0.2)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20, 184, 166, 0.5)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 16px 48px rgba(0,0,0,0.25)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20, 184, 166, 0.2)';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.15)';
              }}
            >
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-white font-bold text-[22px]">{product.name}</h3>
              <p className="text-white/60 font-body text-base mt-2 flex-1">{product.description}</p>
              <p className="text-teal-300 font-bold text-[28px] mt-4">&#x20B9;{product.price}</p>
              <button className="btn-primary w-full mt-5 text-xs py-3">
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <button className="btn-text-link">
            Explore the full range
            <svg className="arrow-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #products { padding: 64px 24px !important; }
        }
      `}</style>
    </section>
  );
}
