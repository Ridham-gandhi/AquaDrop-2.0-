import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const subjectOptions = [
  'General Inquiry',
  'Product Question',
  'Order Support',
  'Feedback',
  'Partnership',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

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

      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
          }
        );
      }

      if (infoRef.current) {
        const cards = infoRef.current.querySelectorAll('.info-card');
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
            scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="w-full"
      style={{ background: '#FFFFFF', padding: '120px 48px' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px', padding: '0 48px' }}>
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-label text-teal-500 block mb-4">GET IN TOUCH</span>
          <h2 className="font-heading-2 text-slate-900 mb-4">We&apos;re here to help.</h2>
          <p className="font-body text-slate-400">
            Have a question, feedback, or just want to say hello? Reach out to us.
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form Column */}
          <div ref={formRef} className="flex-[3]">
            <div className="rounded-[20px] p-12" style={{ background: '#F1F5F9' }}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="font-small text-slate-600 block mb-2">Your Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="font-small text-slate-600 block mb-2">Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="font-small text-slate-600 block mb-2">How can we help?</label>
                  <select
                    className="form-input"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                  >
                    <option value="">Select a topic</option>
                    {subjectOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-small text-slate-600 block mb-2">Your Message</label>
                  <textarea
                    className="form-textarea"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary w-full mt-2">
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Info Column */}
          <div ref={infoRef} className="flex-[2] flex flex-col gap-10 justify-center">
            {/* WhatsApp Card */}
            <div className="info-card rounded-2xl p-8" style={{ background: '#F0FDFA' }}>
              <div className="w-8 h-8 text-teal-500 mb-4">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold text-lg">Chat on WhatsApp</h3>
              <p className="text-slate-500 font-body text-base mt-2">
                Get instant support on WhatsApp. We&apos;re available 9 AM-7 PM IST.
              </p>
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-4 inline-flex"
              >
                Start Chat
              </a>
            </div>

            {/* Email Card */}
            <div className="info-card rounded-2xl p-8" style={{ background: '#F1F5F9' }}>
              <div className="w-8 h-8 text-teal-500 mb-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <h3 className="text-slate-900 font-bold text-lg">Email Us</h3>
              <a href="mailto:hello@aquadrop.in" className="text-teal-500 font-body text-base mt-2 block hover:underline">
                hello@aquadrop.in
              </a>
              <p className="font-small text-slate-400 mt-2">We typically respond within 24 hours.</p>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-small text-slate-600 mb-4">Follow Us</p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-teal-500 transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact { padding: 64px 24px !important; }
          #contact > div { padding: 0 !important; }
          #contact form { padding: 32px !important; }
        }
      `}</style>
    </section>
  );
}
