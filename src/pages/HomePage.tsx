import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Film, Music, Tv, Disc3, Users, Globe, BookOpen, Palette } from 'lucide-react';
import Marquee from '@/components/urs79/Marquee';
import SectionHeader from '@/components/urs79/SectionHeader';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import defaultHeroVideo from '@/assets/hero-video.mp4';

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.9, ease: [0.16, 1, 0.3, 1] as const }
  }),
};

const services = [
  { icon: Film, title: 'Film Production' },
  { icon: Tv, title: 'Music Videos' },
  { icon: Palette, title: 'Commercials' },
  { icon: Music, title: 'Recording' },
  { icon: Users, title: 'Artist Development' },
  { icon: Globe, title: 'Distribution' },
  { icon: BookOpen, title: 'Publishing' },
  { icon: Disc3, title: 'Creative Services' },
];

const divisions = [
  { label: 'Production House', desc: 'Film, music video, and commercial production with cinematic excellence.' },
  { label: 'Record Label', desc: 'Artist signings, development, and releases across all genres.' },
  { label: 'Distribution', desc: 'Global digital and physical distribution to 200+ platforms.' },
  { label: 'Publishing', desc: 'Rights management, sync licensing, and royalty administration.' },
];

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const { settings } = useSiteSettings();
  const heroVideo = settings.hero_video_url || defaultHeroVideo;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden grain-overlay">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video
            src={heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full">
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-display text-5xl md:text-7xl lg:text-[8rem] leading-[0.9] tracking-[0.04em] mb-6"
            >
              <span className="text-gradient-white">CREATING</span>
              <br />
              <span className="text-gradient-gold">SOUND. VISION.</span>
              <br />
              <span className="text-gradient-white">CULTURE.</span>
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-muted-foreground text-sm md:text-base tracking-[0.15em] uppercase max-w-xl mb-12"
            >
              Multimedia Production · Record Label · Distribution · Publishing
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
                Start a Project <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to="/portfolio" className="btn-secondary inline-flex items-center gap-3">
                View Portfolio
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
          <motion.div
            animate={{ height: [16, 32, 16] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
            className="w-px bg-primary/50"
          />
        </motion.div>
      </section>

      {/* ─── MARQUEE ─── */}
      <div className="py-6 border-y border-border bg-card/50">
        <Marquee
          items={['Film Production', 'Music Videos', 'Commercials', 'Recording', 'Artist Development', 'Distribution', 'Publishing', 'Creative Services']}
          className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium"
        />
      </div>

      {/* ─── ABOUT PREVIEW ─── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <SectionHeader label="About URS79" title="Where Creativity" titleAccent="Meets Industry" />
            <div className="divider-gold mt-8 mb-8" />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-muted-foreground leading-relaxed mb-8"
            >
              URS79 stands at the intersection of artistry and commerce. We are a full-service multimedia 
              production company, record label, distribution platform, and publishing house — built to elevate 
              creators and deliver world-class content across film, music, and media.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <Link to="/about" className="text-primary text-[11px] tracking-[0.25em] uppercase font-semibold inline-flex items-center gap-3 group">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="space-y-4">
            {divisions.map((d, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="glass-card p-6 md:p-8 group cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">{d.label}</h3>
                    <p className="text-sm text-muted-foreground">{d.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-all flex-shrink-0 mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section-padding bg-card relative grain-overlay">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <SectionHeader label="What We Do" title="Full-Spectrum" titleAccent="Creative Services" align="center" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-16">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                >
                  <Link
                    to="/services"
                    className="glass-card p-6 md:p-8 flex flex-col items-center text-center gap-4 group block h-full"
                  >
                    <div className="w-14 h-14 rounded-full border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all duration-500">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-sm font-semibold tracking-wide">{s.title}</h3>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link to="/services" className="text-primary text-[11px] tracking-[0.25em] uppercase font-semibold inline-flex items-center gap-3 group">
              Explore All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── PORTFOLIO TEASER ─── */}
      <section className="section-padding">
        <div className="max-w-[1400px] mx-auto">
          <SectionHeader label="Portfolio" title="Featured" titleAccent="Productions" align="center" />

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Films', 'Music Videos', 'Commercials'].map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <Link to="/portfolio" className="block glass-card overflow-hidden group">
                  <div className="aspect-[4/3] bg-secondary relative flex items-center justify-center">
                    <Film className="w-12 h-12 text-muted-foreground/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">{cat}</span>
                      <h3 className="text-xl font-bold mt-1 group-hover:text-primary transition-colors">Coming Soon</h3>
                      <p className="text-xs text-muted-foreground mt-1">Projects in development</p>
                    </div>
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-14"
          >
            <Link to="/portfolio" className="btn-primary inline-flex items-center gap-3">
              View Full Portfolio <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden grain-overlay">
        <div className="absolute inset-0 bg-card" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[200px]" />

        <div className="relative z-10 max-w-4xl mx-auto text-center section-padding">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
          >
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-6 font-semibold">Let's Create</p>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl tracking-[0.02em] mb-6">
              READY TO BUILD
              <br />
              <span className="text-gradient-gold">SOMETHING EXTRAORDINARY?</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg mb-12 max-w-xl mx-auto">
              Whether you're an artist, a brand, or a creator — we're here to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
                Start a Project <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to="/submit" className="btn-secondary inline-flex items-center gap-3">
                Submit Your Music
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── BOTTOM MARQUEE ─── */}
      <div className="py-5 border-t border-border">
        <Marquee
          items={['Sound', 'Vision', 'Culture', 'Film', 'Music', 'Distribution', 'Publishing', 'Art']}
          separator="—"
          className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground/40 font-medium"
        />
      </div>
    </>
  );
};

export default HomePage;
