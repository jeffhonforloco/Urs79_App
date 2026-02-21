import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/music', label: 'Music' },
  { path: '/distribution', label: 'Distribution' },
  { path: '/artists', label: 'Artists' },
  { path: '/news', label: 'News' },
  { path: '/contact', label: 'Contact' },
];

const SiteNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-dark py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/urs79-logo-color.png" alt="URS79" className="h-10 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${
                location.pathname === l.path ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link to="/contact" className="btn-primary text-xs">Start a Project</Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-foreground">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden glass-dark mt-2 mx-4 rounded-lg p-6"
          >
            <nav className="flex flex-col gap-4">
              {navLinks.map(l => (
                <Link
                  key={l.path}
                  to={l.path}
                  className={`text-sm tracking-[0.15em] uppercase ${
                    location.pathname === l.path ? 'text-primary font-semibold' : 'text-muted-foreground'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/contact" className="btn-primary text-xs text-center mt-4">Start a Project</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const SiteFooter = () => (
  <footer className="border-t border-border bg-card">
    <div className="max-w-7xl mx-auto section-padding">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div>
          <img src="/images/urs79-logo-color.png" alt="URS79" className="h-12 mb-6" />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Creating sound, vision, and culture. A premier multimedia production company, record label, and distributor.
          </p>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-primary mb-6 font-semibold">Services</h4>
          <div className="flex flex-col gap-3">
            {['Film Production', 'Music Videos', 'Recording', 'Distribution'].map(s => (
              <Link key={s} to="/services" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{s}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-primary mb-6 font-semibold">Company</h4>
          <div className="flex flex-col gap-3">
            {[['About', '/about'], ['Portfolio', '/portfolio'], ['Artists', '/artists'], ['News', '/news']].map(([l, p]) => (
              <Link key={l} to={p as string} className="text-sm text-muted-foreground hover:text-foreground transition-colors">{l}</Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs tracking-[0.2em] uppercase text-primary mb-6 font-semibold">Connect</h4>
          <div className="flex flex-col gap-3">
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact Us</Link>
            <a href="mailto:info@urs79.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors">info@urs79.com</a>
          </div>
        </div>
      </div>
      <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} URS79. All rights reserved.</p>
        <p className="text-xs text-muted-foreground">Creating Sound. Vision. Culture.</p>
      </div>
    </div>
  </footer>
);

const SiteLayout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
