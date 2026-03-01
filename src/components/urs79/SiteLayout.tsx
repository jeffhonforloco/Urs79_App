import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronUp, Instagram, Youtube, Facebook } from 'lucide-react';
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
            <div className="glass-dark mx-4 mt-3 rounded p-6">
              <nav className="flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      to={l.path}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-md text-sm tracking-[0.2em] uppercase font-bold transition-colors duration-200 active:scale-[0.98] ${
                        location.pathname === l.path
                          ? 'text-primary bg-primary/10'
                          : 'text-foreground hover:text-primary hover:bg-primary/5 active:bg-primary/10'
                      }`}
                    >
                      {l.label}
                      <ArrowUpRight className={`w-4 h-4 transition-opacity ${
                        location.pathname === l.path ? 'opacity-100 text-primary' : 'opacity-0'
                      }`} />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-6 pt-5 border-t border-border">
                <Link to="/contact?type=production#inquiry-form" className="btn-primary text-[10px] text-center block py-4">
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

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.97a8.21 8.21 0 004.76 1.52V7.04a4.84 4.84 0 01-1-.35z"/></svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.88-.732 2.062-1.142 3.425-1.19.993-.036 1.93.043 2.81.228-.074-.738-.272-1.333-.59-1.772-.447-.614-1.14-.934-2.06-.95h-.069c-.725.012-1.6.246-2.145.696l-1.37-1.544c.894-.793 2.126-1.246 3.472-1.272h.098c1.544.027 2.757.585 3.601 1.66.741.94 1.155 2.2 1.233 3.742.455.167.878.374 1.266.621 1.393.885 2.373 2.205 2.835 3.819.564 1.97.377 4.326-1.47 6.133C18.558 23.18 15.907 23.98 12.186 24zm-.09-8.426c-.095 0-.19.002-.287.006-1.433.053-2.283.723-2.244 1.428.039.676.793 1.185 1.896 1.126 1.235-.068 2.669-.706 2.882-4.01-.707-.14-1.467-.21-2.247-.21v.66z"/></svg>
);

const socialLinks = [
  { icon: Instagram, href: 'https://instagram.com/urs79official', label: 'Instagram' },
  { icon: Youtube, href: 'https://youtube.com/@urs79official', label: 'YouTube' },
  { icon: TikTokIcon, href: 'https://tiktok.com/@urs79official', label: 'TikTok' },
  { icon: XIcon, href: 'https://x.com/urs79official', label: 'X' },
  { icon: Facebook, href: 'https://facebook.com/urs79official', label: 'Facebook' },
  { icon: ThreadsIcon, href: 'https://threads.net/@urs79official', label: 'Threads' },
];

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
          <div className="flex flex-col gap-3 mb-6">
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Contact</Link>
            <a href="mailto:info@urs79.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">Email</a>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {socialLinks.map(({ icon: SocialIcon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
              >
                <SocialIcon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="hr-gold mb-8" />
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
          © {new Date().getFullYear()} URS79. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: SocialIcon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-muted-foreground/40 hover:text-primary transition-colors duration-300"
            >
              <SocialIcon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
  );
};

const SiteLayout = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

      {/* Back to top - mobile only */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="md:hidden fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SiteLayout;
