import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Film, Music, Tv, Disc3, Users, Globe, BookOpen, Palette } from 'lucide-react';
import Marquee from '@/components/urs79/Marquee';
import SectionHeader from '@/components/urs79/SectionHeader';
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from '@/components/urs79/ScrollReveal';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import defaultHeroVideo from '@/assets/hero-video.mp4';

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] as const }
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
          <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background" />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 w-full">
          <div className="flex flex-col items-center text-center">
            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={0}
              className="section-label mb-8 md:mb-10"
            >
              Multimedia · Record Label · Distribution
            </motion.p>

            <motion.h1
              initial="hidden" animate="visible" variants={fadeUp} custom={1}
              className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.9] tracking-[0.04em] mb-8 md:mb-10"
            >
              <span className="text-gradient-white">CREATING</span>
              <br />
              <span className="text-gradient-gold">SOUND. VISION.</span>
              <br />
              <span className="text-gradient-white">CULTURE.</span>
            </motion.h1>

            <motion.p
              initial="hidden" animate="visible" variants={fadeUp} custom={2}
              className="text-muted-foreground text-xs sm:text-sm md:text-base tracking-[0.2em] uppercase max-w-xl mb-14"
            >
              Production · Record Label · Distribution · Publishing
            </motion.p>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-5">
              <Link to="/contact?type=production#inquiry-form" className="btn-primary inline-flex items-center gap-3">
                Start a Project <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link to="/services" className="btn-secondary inline-flex items-center gap-3">
                Our Services
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
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
      <div className="py-7 border-y border-border bg-card/50">
        <Marquee
          items={['Film Production', 'Music Videos', 'Commercials', 'Recording', 'Artist Development', 'Distribution', 'Publishing', 'Creative Services']}
          className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground font-medium"
        />
      </div>

      {/* ─── ABOUT ─── */}
      <section className="section-padding overflow-hidden">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 lg:gap-28 items-start">
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="left" blur distance={60} duration={1.1}>
              <SectionHeader label="About URS79" title="Where Creativity" titleAccent="Meets Industry" />
              <div className="divider-gold mt-10 mb-10" />
              <p className="text-xl md:text-2xl lg:text-3xl text-foreground font-light leading-[1.4] mb-8">
                URS79 was founded on a singular vision: to bridge the gap between raw creative talent and global audiences.
              </p>
              <p className="body-lg mb-12">
                From film and music video production to recording, artist development, distribution, and publishing — 
                we provide the complete infrastructure for creators to thrive. Our work spans continents, genres, and mediums, 
                united by an unwavering commitment to excellence.
              </p>
              <Link to="/about" className="text-primary text-[11px] tracking-[0.25em] uppercase font-semibold inline-flex items-center gap-3 group">
                Discover Our Story <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px] -z-10" />
            
            <ScrollRevealGroup stagger={0.12} className="space-y-6 sm:mt-16">
              <ScrollRevealItem direction="up" blur scale>
                <div className="glass-card p-8 md:p-10 hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="section-label mb-4">Our Vision</h3>
                  <p className="body-md">
                    To be the world's most artist-forward multimedia company — where creativity, technology, and commerce converge to redefine entertainment.
                  </p>
                </div>
              </ScrollRevealItem>
              <ScrollRevealItem direction="up" blur scale>
                <div className="glass-card p-8 md:p-10 hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="section-label mb-4">Our Mission</h3>
                  <p className="body-md">
                    To discover, develop, and distribute exceptional creative content across film, music, and media — providing artists and brands with the tools to make a lasting impact.
                  </p>
                </div>
              </ScrollRevealItem>
            </ScrollRevealGroup>
            
            <ScrollRevealGroup stagger={0.12} className="space-y-6">
              {divisions.slice(0, 2).map((d, i) => (
                <ScrollRevealItem key={i} direction="up" blur scale>
                  <div className="glass-card p-8 md:p-10 hover:-translate-y-2 transition-transform duration-500 bg-secondary/30">
                    <h3 className="text-xl md:text-2xl font-display tracking-wide mb-3 text-foreground">{d.label}</h3>
                    <p className="body-md">{d.desc}</p>
                  </div>
                </ScrollRevealItem>
              ))}
            </ScrollRevealGroup>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="section-padding bg-card relative grain-overlay">
        <div className="max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal direction="up" blur>
            <SectionHeader label="What We Do" title="Full-Spectrum" titleAccent="Creative Services" align="center" />
          </ScrollReveal>

          <ScrollRevealGroup stagger={0.06} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-20">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <ScrollRevealItem key={i} direction="up" scale blur>
                  <Link
                    to="/services"
                    className="glass-card p-6 md:p-10 flex flex-col items-center text-center gap-6 group block h-full hover:bg-secondary/40 hover:-translate-y-2 transition-all duration-400"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-border flex items-center justify-center group-hover:border-primary/60 group-hover:bg-primary/10 transition-all duration-500 group-hover:scale-110">
                      <Icon className="w-6 h-6 md:w-7 md:h-7 text-primary group-hover:drop-shadow-[0_0_12px_rgba(201,160,80,0.5)]" />
                    </div>
                    <h3 className="text-xs md:text-sm font-display tracking-widest uppercase">{s.title}</h3>
                  </Link>
                </ScrollRevealItem>
              );
            })}
          </ScrollRevealGroup>

          <ScrollReveal direction="up" delay={0.3} className="text-center mt-16">
            <Link to="/services" className="text-primary text-[11px] tracking-[0.25em] uppercase font-semibold inline-flex items-center gap-3 group">
              Explore All Services <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden grain-overlay py-40 md:py-56">
        <div className="absolute inset-0 bg-card" />
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/5 blur-[180px] pointer-events-none" 
        />

        <div className="relative z-10 max-w-5xl mx-auto text-center px-6 md:px-10">
          <ScrollReveal direction="up" scale blur distance={60} duration={1.1}>
            <p className="section-label mb-8 inline-flex items-center gap-3">
              <span className="w-10 h-px bg-primary/50" /> Let's Create <span className="w-10 h-px bg-primary/50" />
            </p>
            <h2 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-[8rem] leading-none tracking-[0.02em] mb-10">
              READY TO BUILD
              <br />
              <span className="text-gradient-gold">SOMETHING EXTRAORDINARY?</span>
            </h2>
            <p className="body-lg mb-14 max-w-xl mx-auto font-light">
              Whether you're an artist, a brand, or a creator — we're here to make it happen. Join the ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center">
              <Link to="/contact?type=production#inquiry-form" className="btn-primary inline-flex items-center gap-3 group">
                Start a Project <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link to="/submit" className="btn-secondary inline-flex items-center gap-3">
                Submit Your Music
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── BOTTOM MARQUEE ─── */}
      <div className="py-7 border-t border-border bg-background">
        <Marquee
          items={['Sound', 'Vision', 'Culture', 'Film', 'Music', 'Distribution', 'Publishing', 'Art']}
          separator="✧"
          className="text-[11px] tracking-[0.4em] uppercase text-muted-foreground/30 font-display"
        />
      </div>
    </>
  );
};

export default HomePage;
