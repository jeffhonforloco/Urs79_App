import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/urs79/SectionHeader';
import aboutBg from '@/assets/about-bg.jpg';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }),
};

const AboutPage = () => (
  <div>
    {/* Hero with background */}
    <section className="relative min-h-[70vh] flex items-end overflow-hidden grain-overlay">
      <div className="absolute inset-0">
        <img src={aboutBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
      </div>
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 pb-20 pt-40 w-full">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">About URS79</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] mb-6">
            WE ARE <span className="text-gradient-gold">URS79</span>
          </h1>
          <div className="divider-gold" />
        </motion.div>
      </div>
    </section>

    {/* Story */}
    <section className="section-padding">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed mb-8">
            URS79 was founded on a singular vision: to bridge the gap between raw creative talent and global audiences. 
            We are more than a production company — we are a creative ecosystem.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            From film and music video production to recording, artist development, distribution, and publishing — 
            we provide the complete infrastructure for creators to thrive. Our work spans continents, genres, and mediums, 
            united by an unwavering commitment to excellence.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            We believe that great art deserves great infrastructure. That's why we've built a company that handles 
            every aspect of the creative pipeline — so artists can focus on what they do best: create.
          </p>
        </motion.div>

        <div className="space-y-6">
          {[
            { title: 'Our Vision', text: 'To be the world\'s most artist-forward multimedia company — where creativity, technology, and commerce converge to redefine entertainment.' },
            { title: 'Our Mission', text: 'To discover, develop, and distribute exceptional creative content across film, music, and media — providing artists and brands with the tools, platform, and reach to make a lasting cultural impact.' },
          ].map((item, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-card p-8 md:p-10">
              <h3 className="text-[10px] tracking-[0.3em] uppercase text-primary mb-4 font-semibold">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Industries */}
    <section className="section-padding bg-card grain-overlay">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <SectionHeader label="Industries We Serve" title="Global" titleAccent="Reach" align="center" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {['Film & Television', 'Music & Audio', 'Advertising', 'Digital Media', 'Live Events', 'Streaming', 'Fashion', 'Sports'].map((ind, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.6 }} className="glass-card p-6 text-center">
              <span className="text-sm font-medium tracking-wide">{ind}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <h2 className="font-display text-5xl md:text-7xl tracking-[0.02em] mb-8">
          READY TO <span className="text-gradient-gold">COLLABORATE?</span>
        </h2>
        <Link to="/contact" className="btn-primary inline-flex items-center gap-3">
          Work With Us <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  </div>
);

export default AboutPage;
