import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, ChevronUp, Instagram, Youtube, Facebook } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/artists', label: 'Artists & Music' },
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
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen ? 'glass-dark py-2 md:py-3' : 'py-4 md:py-6'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 group relative z-50">
          <img
            src={logoUrl}
            alt="URS79"
            className={`transition-all duration-500 ${scrolled ? 'h-10 sm:h-12 md:h-16' : 'h-14 sm:h-16 md:h-24 lg:h-28'}`}
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

        {/* Mobile menu toggle — 44px+ touch target */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="xl:hidden relative z-50 w-11 h-11 flex items-center justify-center rounded-md active:bg-primary/10 transition-colors"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6 text-foreground" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                <Menu className="w-6 h-6 text-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="xl:hidden fixed inset-0 top-0 bg-background/98 backdrop-blur-xl z-40"
          >
            <div className="flex flex-col justify-center items-center h-full px-8">
              <nav className="flex flex-col items-center gap-2 w-full max-w-sm">
                {navLinks.map((l, i) => (
                  <motion.div
                    key={l.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full"
                  >
                    <Link
                      to={l.path}
                      className={`flex items-center justify-center py-4 text-lg tracking-[0.2em] uppercase font-display transition-colors duration-200 active:scale-[0.98] ${
                        location.pathname === l.path
                          ? 'text-primary'
                          : 'text-foreground hover:text-primary'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-10 w-full max-w-sm"
              >
                <Link
                  to="/contact?type=production#inquiry-form"
                  className="btn-primary text-xs text-center block py-4 tracking-[0.2em] uppercase w-full"
                >
                  Start a Project
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10 flex items-center gap-4"
              >
                {socialLinks.map(({ icon: SocialIcon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
                  >
                    <SocialIcon className="w-4 h-4" />
                  </a>
                ))}
              </motion.div>
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
  <footer className="border-t border-border bg-background relative overflow-hidden">
    {/* Large logo watermark */}
    <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] opacity-[0.02] pointer-events-none overflow-hidden">
      <img src={logoUrl} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
    </div>

    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-10 py-14 md:py-28">
      {/* Top section */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-8 mb-14 md:mb-20">
        {/* Brand — full width on mobile */}
        <div className="col-span-2 sm:col-span-2 md:col-span-5 mb-4 md:mb-0">
          <img src={logoUrl} alt="URS79" className="h-12 sm:h-14 md:h-20 mb-6 md:mb-8" loading="lazy" decoding="async" />
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mb-6 md:mb-8">
            A premier multimedia production company, record label, distributor, and publishing house — 
            shaping the future of entertainment.
          </p>
          <a href="mailto:info@urs79.com" className="text-primary text-sm tracking-[0.15em] uppercase font-medium hover:underline transition-all">
            info@urs79.com
          </a>
        </div>

        {/* Navigate */}
        <div className="col-span-1 md:col-span-2 md:col-start-7">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 md:mb-6 font-semibold">Navigate</h4>
          <div className="flex flex-col gap-2.5 md:gap-3">
            {navLinks.slice(1, 5).map(l => (
              <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-0.5">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="col-span-1 md:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 md:mb-6 font-semibold">Company</h4>
          <div className="flex flex-col gap-2.5 md:gap-3">
            {navLinks.slice(5).map(l => (
              <Link key={l.path} to={l.path} className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-0.5">{l.label}</Link>
            ))}
          </div>
        </div>

        {/* Connect — full width on mobile */}
        <div className="col-span-2 sm:col-span-2 md:col-span-2">
          <h4 className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 md:mb-6 font-semibold">Connect</h4>
          <div className="flex flex-col gap-2.5 md:gap-3 mb-6">
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-0.5">Contact</Link>
            <a href="mailto:info@urs79.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 py-0.5">Email</a>
          </div>
          <div className="flex items-center gap-2.5 flex-wrap">
            {socialLinks.map(({ icon: SocialIcon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 md:w-9 md:h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-300"
              >
                <SocialIcon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="hr-gold mb-6 md:mb-8" />
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground text-center sm:text-left">
          © {new Date().getFullYear()} URS79. All rights reserved.
        </p>
        <div className="flex items-center gap-3">
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

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 left-6 z-50 w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg active:scale-95 transition-transform"
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
