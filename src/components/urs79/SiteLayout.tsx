import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/services', label: 'Services' },
  { path: '/portfolio', label: 'Portfolio' },
  { path: '/music', label: 'Music' },
  { path: '/distribution', label: 'Distribution' },
  { path: '/artists', label: 'Artists' },
  { path: '/news', label: 'News' },
  { path: '/shop', label: 'Shop' },
  { path: '/contact', label: 'Contact' },
];

const SiteNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { settings } = useSiteSettings();
  const logoUrl = settings.logo_url || '/images/urs79-logo-color.webp';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? 'glass-dark py-3' : 'py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 flex items-center justify-between">
        {/* Logo - VERY pronounced */}
        <Link to="/" className="flex items-center gap-4 group">
          <img
            src={logoUrl}
            alt="URS79"
            className={`transition-all duration-700 ${scrolled ? 'h-14 md:h-16' : 'h-20 md:h-24 lg:h-28'}`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden xl:flex items-center gap-10">
          {navLinks.filter(l => l.path !== '/').map(l => (
            <Link
              key={l.path}
              to={l.path}
              className={`text-[11px] tracking-[0.25em] uppercase transition-all duration-300 relative group font-bold ${
                location.pathname === l.path
                  ? 'text-primary'
                  : 'text-foreground hover:text-primary'
              }`}
            >
              {l.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-500 ${
                location.pathname === l.path ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </Link>
          ))}
        </nav>

        <div className="hidden xl:block">
          <Link to="/contact" className="btn-primary text-[10px] inline-flex items-center gap-2">
            Start a Project <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className="xl:hidden text-foreground p-2">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="xl:hidden overflow-hidden"
          >
            <div className="glass-dark mx-4 mt-3 rounded p-8">
              <nav className="flex flex-col gap-5">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={l.path}
                      className={`text-sm tracking-[0.2em] uppercase font-bold flex items-center justify-between ${
                        location.pathname === l.path ? 'text-primary' : 'text-foreground'
                      }`}
                    >
                      {l.label}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-8 pt-6 border-t border-border">
                <Link to="/contact" className="btn-primary text-[10px] text-center block">
                  Start a Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const SiteFooter = () => {
  const { settings } = useSiteSettings();
  const logoUrl = settings.logo_url || '/images/urs79-logo-color.webp';
  return (
  <footer className="border-t border-border bg-background relative">
    {/* Large logo watermark */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.02] pointer-events-none overflow-hidden">
      <img src={logoUrl} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
    </div>

    <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-20 md:py-28">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20">
        <div className="md:col-span-5">
          <img src={logoUrl} alt="URS79" className="h-16 md:h-20 mb-8" loading="lazy" decoding="async" />
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-8">
            A premier multimedia production company, record label, distributor, and publishing house — 
            shaping the future of entertainment.
          </p>
          <a href="mailto:info@urs79.com" className="text-primary text-sm tracking-[0.15em] uppercase font-medium">
            info@urs79.com
          </a>
        </div>

        <div className="md:col-span-2 md:col-start-7">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary mb-6 font-semibold">Navigate</h4>
          <div className="flex flex-col gap-3">
            {navLinks.slice(1, 5).map(l => (
              <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">{l.label}</Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary mb-6 font-semibold">Company</h4>
          <div className="flex flex-col gap-3">
            {navLinks.slice(5).map(l => (
              <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">{l.label}</Link>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary mb-6 font-semibold">Connect</h4>
          <div className="flex flex-col gap-3">
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Contact</Link>
            <a href="mailto:info@urs79.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Email</a>
          </div>
        </div>
      </div>

      <div className="hr-gold mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          © {new Date().getFullYear()} URS79. All rights reserved.
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          Sound · Vision · Culture
        </p>
      </div>
    </div>
  </footer>
  );
};

const SiteLayout = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <SiteFooter />
    </div>
  );
};

export default SiteLayout;
