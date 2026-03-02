import React from 'react';
import { motion } from 'framer-motion';
import { Film, Tv, Palette, Music, Users, Globe, BookOpen, Disc3, ArrowUpRight, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Marquee from '@/components/urs79/Marquee';
import SectionHeader from '@/components/urs79/SectionHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }),
};

const allServices = [
  { icon: Film, title: 'Film Production', desc: 'From concept to final cut — feature films, documentaries, and short films with cinematic mastery.', deliverables: 'Full production pipeline, post-production, color grading, sound design', forWho: 'Filmmakers, studios, production partners' },
  { icon: Tv, title: 'Music Video Production', desc: 'Visual storytelling that transforms songs into immersive cinematic experiences.', deliverables: 'Creative direction, filming, editing, VFX, delivery', forWho: 'Recording artists, labels, managers' },
  { icon: Palette, title: 'Commercial Production', desc: 'High-impact commercial and branded content that captures attention.', deliverables: 'Concept, production, post, multi-platform delivery', forWho: 'Brands, agencies, corporate clients' },
  { icon: Music, title: 'Recording & Music Production', desc: 'World-class recording, mixing, and mastering.', deliverables: 'Recording sessions, mixing, mastering, production', forWho: 'Artists, songwriters, producers' },
  { icon: Users, title: 'Artist Development', desc: 'Programs that transform raw talent into global acts.', deliverables: 'Branding, image consulting, release strategy, career planning', forWho: 'Emerging artists, independent musicians' },
  { icon: Globe, title: 'Global Distribution', desc: 'Digital and physical distribution across 200+ platforms worldwide.', deliverables: 'Platform delivery, metadata, analytics, royalty tracking', forWho: 'Artists, labels, distributors' },
  { icon: BookOpen, title: 'Publishing & Rights', desc: 'Full-service music publishing including sync licensing and royalty collection.', deliverables: 'Rights registration, royalty collection, sync placement', forWho: 'Songwriters, composers, publishers' },
  { icon: Disc3, title: 'Creative Multimedia', desc: 'Branding, design, and multimedia content creation.', deliverables: 'Visual identity, social content, websites, merch design', forWho: 'Artists, brands, creative agencies' },
];

const distroFeatures = [
  { icon: Globe, title: '200+ Platforms', desc: 'Spotify, Apple Music, Amazon, YouTube Music, Tidal, Deezer, and every major platform worldwide.' },
  { icon: Shield, title: 'Rights Protection', desc: 'Full publishing administration, sync licensing, and royalty collection from all global PROs.' },
  { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Comprehensive dashboards showing streams, revenue, audience demographics, and playlist placements.' },
];

const distroSteps = [
  { step: '01', title: 'Submit Your Music', desc: 'Send us your tracks, album art, and metadata through our submission form.' },
  { step: '02', title: 'Review & Approval', desc: 'Our team reviews your submission for quality and catalog fit.' },
  { step: '03', title: 'Distribution Setup', desc: 'We prepare your release for all platforms with optimized metadata.' },
  { step: '04', title: 'Global Release', desc: 'Your music goes live worldwide with full promotional support.' },
];

const ServicesPage = () => (
  <div>
    {/* Hero */}
    <section className="relative pt-40 pb-20 px-6 md:px-10 overflow-hidden grain-overlay">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Our Services</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] mb-6">
            FULL-SPECTRUM
            <br />
            <span className="text-gradient-gold">CREATIVE POWER</span>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            From the first spark of an idea to global distribution — URS79 provides the complete creative
            infrastructure for artists, brands, and visionaries.
          </p>
        </motion.div>
      </div>
    </section>

    <div className="py-5 border-y border-border">
      <Marquee items={allServices.map(s => s.title)} className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground/40 font-medium" />
    </div>

    {/* All Services */}
    <section className="py-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto space-y-4">
        {allServices.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="glass-card p-6 md:p-10 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center group"
            >
              <div className="md:col-span-1 flex items-center">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:border-primary/40 group-hover:bg-primary/5 transition-all">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-xl md:text-2xl font-bold group-hover:text-primary transition-colors">{s.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{s.desc}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary mb-2 font-semibold">Deliverables</p>
                <p className="text-xs text-muted-foreground">{s.deliverables}</p>
              </div>
              <div className="md:col-span-3">
                <p className="text-[10px] tracking-[0.2em] uppercase text-primary mb-2 font-semibold">For</p>
                <p className="text-xs text-muted-foreground">{s.forWho}</p>
              </div>
              <div className="md:col-span-1 flex justify-end">
                <Link to="/contact" className="text-muted-foreground/20 group-hover:text-primary transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>

    {/* Distribution & Publishing Section */}
    <section className="section-padding bg-card grain-overlay">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader label="Distribution & Publishing" title="Global" titleAccent="Distribution" align="center" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          {distroFeatures.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-card p-8 md:p-10">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>

    {/* How to Get Started */}
    <section className="section-padding">
      <div className="max-w-[1000px] mx-auto">
        <SectionHeader label="Process" title="How to" titleAccent="Get Started" />
        <div className="space-y-4 mt-16">
          {distroSteps.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1} className="glass-card p-6 md:p-8 flex items-start gap-6 md:gap-10">
              <span className="font-display text-4xl md:text-5xl text-gradient-gold leading-none">{s.step}</span>
              <div>
                <h3 className="text-lg font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link to="/submit" className="btn-primary inline-flex items-center gap-3">Submit Your Music <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default ServicesPage;
