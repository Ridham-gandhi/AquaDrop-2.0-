import { useState, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';

interface HeaderProps {
  lenisRef: React.RefObject<Lenis | null>;
}

const navLinks = [
  { label: 'Products', href: '#products' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why Us', href: '#comparison' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
  { label: 'About', href: '#about' },
];

export default function Header({ lenisRef }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(
        headerRef.current,
        { y: '-100%' },
        { y: '0%', duration: 0.5, ease: 'cubic-bezier(0.16,1,0.3,1)', delay: 0.2 }
      );
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: -80, duration: 1.2 });
    }
  };

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 translate-y-[-100%]"
        style={{
          background: 'rgba(13, 148, 136, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(20, 184, 166, 0.3)',
          height: '64px',
        }}
      >
        <div className="section-container h-full flex items-center justify-between">
          {/* Brand */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (lenisRef.current) lenisRef.current.scrollTo('#', { duration: 1.2 });
            }}
            className="flex items-center gap-2"
          >
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <path
                d="M14 2C14 2 6 10 6 16C6 20.4183 9.58172 24 14 24C18.4183 24 22 20.4183 22 16C22 10 14 2 14 2Z"
                fill="#5EEAD4"
              />
              <path
                d="M14 7C14 7 10 12 10 16C10 18.2091 11.7909 20 14 20C16.2091 20 18 18.2091 18 16C18 12 14 7 14 7Z"
                fill="#14B8A6"
              />
            </svg>
            <span className="text-white font-bold text-lg tracking-tight">Aquadrop</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-white/80 text-sm font-medium hover:text-white hover:-translate-y-px transition-all duration-200"
                style={{ transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)' }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <a
              href="#products"
              onClick={(e) => handleNavClick(e, '#products')}
              className="btn-primary text-xs py-2.5 px-5 hidden sm:inline-flex"
            >
              Shop Now
            </a>
            {/* Cart icon */}
            <button className="relative text-white/80 hover:text-white transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-teal-300 text-teal-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </button>
            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-white/80 hover:text-white transition-colors"
              onClick={() => setMobileOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-teal-900 transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-6">
          <button onClick={() => setMobileOpen(false)} className="text-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-center gap-8 pt-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-white font-subheading hover:text-teal-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#products"
            onClick={(e) => handleNavClick(e, '#products')}
            className="btn-primary mt-4"
          >
            Shop Now
          </a>
        </nav>
      </div>
    </>
  );
}
