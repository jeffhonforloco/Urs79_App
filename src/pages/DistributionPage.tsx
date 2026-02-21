import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Shield, BarChart3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
};

const DistributionPage = () => (
  <div className="pt-28">
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Distribution & Publishing</p>
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            Global <span className="text-gradient-gold">Distribution</span>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Get your music heard worldwide. URS79 distributes to 200+ platforms globally, with full publishing 
            and rights management services.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Features */}
    <section className="pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Globe, title: '200+ Platforms', desc: 'Spotify, Apple Music, Amazon, YouTube Music, Tidal, Deezer, and every major platform worldwide.' },
          { icon: Shield, title: 'Rights Protection', desc: 'Full publishing administration, sync licensing, and royalty collection from all global PROs.' },
          { icon: BarChart3, title: 'Real-Time Analytics', desc: 'Comprehensive dashboards showing streams, revenue, audience demographics, and playlist placements.' },
        ].map((f, i) => {
          const Icon = f.icon;
          return (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-card rounded-lg p-10">
              <Icon className="w-10 h-10 text-primary mb-6" />
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>

    {/* How It Works */}
    <section className="section-padding bg-card">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
          <h2 className="text-3xl font-bold">How to <span className="text-gradient-gold">Get Started</span></h2>
        </motion.div>
        <div className="space-y-6">
          {[
            { step: '01', title: 'Submit Your Music', desc: 'Send us your tracks, album art, and metadata through our submission form.' },
            { step: '02', title: 'Review & Approval', desc: 'Our team reviews your submission for quality and catalog fit.' },
            { step: '03', title: 'Distribution Setup', desc: 'We prepare your release for all platforms with optimized metadata.' },
            { step: '04', title: 'Global Release', desc: 'Your music goes live worldwide with full promotional support.' },
          ].map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3} className="glass-card rounded-lg p-8 flex items-start gap-8">
              <span className="text-4xl font-black text-gradient-gold">{s.step}</span>
              <div>
                <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                <p className="text-muted-foreground">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Submit Your Music <ArrowRight className="w-4 h-4" /></Link>
        </div>
      </div>
    </section>
  </div>
);

export default DistributionPage;
