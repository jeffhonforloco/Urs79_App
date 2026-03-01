import React from 'react';
import { motion } from 'framer-motion';
import { Disc3, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/urs79/SectionHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7 } }),
};

const MusicPage = () => (
  <div>
    <section className="relative pt-40 pb-20 px-6 md:px-10 grain-overlay">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Record Label</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] mb-6">
            THE SOUND OF <span className="text-gradient-gold">URS79</span>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">
            As a record label, we sign, develop, and release music from the most exciting voices in contemporary music.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Coming Soon Releases */}
    <section className="section-padding">
      <div className="max-w-[1400px] mx-auto">
        <SectionHeader label="Releases" title="Coming" titleAccent="Soon" />
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
    <section className="section-padding bg-card text-center grain-overlay">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="relative z-10">
        <h2 className="font-display text-5xl md:text-7xl tracking-[0.02em] mb-8">
          RELEASE WITH <span className="text-gradient-gold">URS79</span>
        </h2>
        <p className="text-muted-foreground mb-10 max-w-lg mx-auto">We're always looking for exceptional talent. Submit your music and let's create something extraordinary.</p>
        <Link to="/submit" className="btn-primary inline-flex items-center gap-3">Submit Your Music <ArrowUpRight className="w-4 h-4" /></Link>
      </motion.div>
    </section>
  </div>
);

export default MusicPage;
