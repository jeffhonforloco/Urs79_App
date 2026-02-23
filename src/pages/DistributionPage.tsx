import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, BarChart3, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/urs79/SectionHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7 } }),
};

const DistributionPage = () => (
  <div>
    <section className="relative pt-40 pb-20 px-6 md:px-10 grain-overlay">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Distribution & Publishing</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] mb-6">
            GLOBAL <span className="text-gradient-gold">DISTRIBUTION</span>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Get your music heard worldwide. URS79 distributes to 200+ platforms globally, with full publishing and rights management.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="section-padding">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Globe, title: '200+ Platforms', desc: 'Spotify, Apple Music, Amazon, YouTube Music, Tidal, Deezer, and every major platform worldwide.' },
          { icon: Shield, title: 'Rights Protection', desc: 'Full publishing administration, sync licensing, and royalty collection from all global PROs.' },
          { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Comprehensive dashboards showing streams, revenue, audience demographics, and playlist placements.' },
        ].map((f, i) => {
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
    </section>

    {/* How It Works */}
    <section className="section-padding bg-card grain-overlay">
      <div className="max-w-[1000px] mx-auto relative z-10">
        <SectionHeader label="Process" title="How to" titleAccent="Get Started" />
        <div className="space-y-4 mt-16">
          {[
            { step: '01', title: 'Submit Your Music', desc: 'Send us your tracks, album art, and metadata through our submission form.' },
            { step: '02', title: 'Review & Approval', desc: 'Our team reviews your submission for quality and catalog fit.' },
            { step: '03', title: 'Distribution Setup', desc: 'We prepare your release for all platforms with optimized metadata.' },
            { step: '04', title: 'Global Release', desc: 'Your music goes live worldwide with full promotional support.' },
          ].map((s, i) => (
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
          <Link to="/contact" className="btn-primary inline-flex items-center gap-3">Submit Your Music <ArrowUpRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DistributionPage;
