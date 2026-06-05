export default function Footer() {
  return (
    <footer className="w-full" style={{ background: '#0D9488', padding: '80px 48px 32px' }}>
      <div className="section-container" style={{ maxWidth: '1400px' }}>
        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 2C14 2 6 10 6 16C6 20.4183 9.58172 24 14 24C18.4183 24 22 20.4183 22 16C22 10 14 2 14 2Z" fill="#5EEAD4" />
                <path d="M14 7C14 7 10 12 10 16C10 18.2091 11.7909 20 14 20C16.2091 20 18 18.2091 18 16C18 12 14 7 14 7Z" fill="#14B8A6" />
              </svg>
              <span className="text-white font-bold text-lg tracking-tight">Aquadrop</span>
            </div>
            <p className="text-white/50 font-small">&copy; 2025 Aquadrop. All rights reserved.</p>
          </div>

          {/* Products Column */}
          <div>
            <h4 className="font-label text-teal-300 mb-6">Products</h4>
            <ul className="space-y-3">
              {['Hand Wash', 'Dish Wash', 'Glass Cleaner', 'All-Purpose'].map((item) => (
                <li key={item}>
                  <a href="#products" className="text-white/70 hover:text-white transition-colors font-body text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-label text-teal-300 mb-6">Company</h4>
            <ul className="space-y-3">
              {['About Us', 'Sustainability', 'Blog', 'Careers'].map((item) => (
                <li key={item}>
                  <a href="#about" className="text-white/70 hover:text-white transition-colors font-body text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-label text-teal-300 mb-6">Support</h4>
            <ul className="space-y-3">
              {['FAQ', 'Shipping', 'Returns', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#faq" className="text-white/70 hover:text-white transition-colors font-body text-base">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 pt-8"
          style={{ borderTop: '1px solid rgba(20, 184, 166, 0.3)' }}
        >
          <p className="text-white/50 font-small">Made with care for the planet</p>
          <div className="flex items-center gap-5">
            {/* Instagram */}
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
            {/* Twitter/X */}
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
