import React from 'react';
import { motion } from 'framer-motion';
import { Users, Disc3, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/urs79/SectionHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7 } }),
};

const ArtistsPage = () => (
  <div>
    {/* Hero */}
    <section className="relative pt-40 pb-20 px-6 md:px-10 grain-overlay">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Record Label</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] mb-6">
            ARTISTS <span className="text-gradient-gold">& MUSIC</span>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            Meet the visionary artists who call URS79 home. We sign, develop, and release music from the most exciting voices in contemporary culture.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Artist Roster */}
    <section className="section-padding">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader label="Our Roster" title="The" titleAccent="Artists" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-16">
          {[1, 2, 3].map((_, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.1} className="glass-card overflow-hidden">
              <div className="aspect-[3/4] bg-secondary flex items-center justify-center relative">
                <Users className="w-14 h-14 text-muted-foreground/8" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-primary/50 font-semibold">Artist</span>
                  <h3 className="text-xl font-bold mt-1 text-foreground/30">Coming Soon</h3>
                  <p className="text-xs text-muted-foreground/40 mt-1">Artist announcements pending</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Releases */}
    <section className="section-padding bg-card grain-overlay">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader label="Releases" title="Latest" titleAccent="Music" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.08} className="glass-card overflow-hidden group">
              <div className="aspect-square bg-secondary relative flex items-center justify-center">
                <Disc3 className="w-16 h-16 text-muted-foreground/8" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-primary/50 font-semibold">Coming Soon</span>
                  <h3 className="text-sm font-semibold mt-1 text-foreground/30">New Release</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Submit CTA */}
    <section className="section-padding text-center grain-overlay">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="relative z-10">
        <h2 className="font-display text-5xl md:text-7xl tracking-[0.02em] mb-8">
          JOIN THE <span className="text-gradient-gold">URS79 ROSTER</span>
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto">
          We're seeking visionary artists ready to take their careers to the next level. Submit your music and let's create something extraordinary.
        </p>
        <Link to="/submit" className="btn-primary inline-flex items-center gap-3">Submit Your Music <ArrowUpRight className="w-4 h-4" /></Link>
      </motion.div>
    </section>
  </div>
);

export default ArtistsPage;
