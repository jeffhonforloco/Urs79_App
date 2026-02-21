import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Film, Music, Tv, Disc3, Users, Globe, BookOpen, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: "easeOut" as const } }),
};

const services = [
  { icon: Film, title: 'Film Production', desc: 'Feature films, documentaries, and short films crafted with cinematic excellence.' },
  { icon: Tv, title: 'Music Videos', desc: 'Visual storytelling that brings music to life with stunning imagery.' },
  { icon: Palette, title: 'Commercials', desc: 'High-impact commercial content for brands that demand attention.' },
  { icon: Music, title: 'Recording', desc: 'State-of-the-art recording and production for artists and labels.' },
  { icon: Users, title: 'Artist Development', desc: 'Comprehensive artist development from concept to global recognition.' },
  { icon: Globe, title: 'Distribution', desc: 'Worldwide digital and physical distribution across all platforms.' },
  { icon: BookOpen, title: 'Publishing', desc: 'Full-service music publishing and rights management.' },
  { icon: Disc3, title: 'Creative Services', desc: 'Branding, design, and multimedia solutions for the creative industry.' },
];

const productions = [
  { title: 'The Last Frame', category: 'Film', year: '2025' },
  { title: 'Echoes of Tomorrow', category: 'Music Video', year: '2025' },
  { title: 'Brand Elevation', category: 'Commercial', year: '2024' },
  { title: 'Nightfall Sessions', category: 'Recording', year: '2024' },
  { title: 'Urban Pulse', category: 'Music Video', year: '2024' },
  { title: 'Vision Forward', category: 'Commercial', year: '2025' },
];

const HomePage = () => {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-background">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-background" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-primary/3 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-32">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p className="text-xs tracking-[0.4em] uppercase text-primary mb-8 font-medium">
              Multimedia · Record Label · Distribution · Publishing
            </p>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] mb-8"
          >
            <span className="text-foreground">Creating</span>
            <br />
            <span className="text-gradient-gold">Sound. Vision.</span>
            <br />
            <span className="text-foreground">Culture.</span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            URS79 is a premier multimedia production company, record label, distributor, and publishing house — 
            shaping the future of entertainment.
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="btn-primary px-10 py-4">
                Start a Project <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="btn-secondary px-10 py-4">
                View Portfolio
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-5 h-8 border border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Preview */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">About URS79</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Where Creativity<br />
              <span className="text-gradient-gold">Meets Industry</span>
            </h2>
            <div className="divider-gold mb-8" />
            <p className="text-muted-foreground leading-relaxed mb-6">
              URS79 stands at the intersection of artistry and commerce. We are a full-service multimedia 
              production company, record label, distribution platform, and publishing house — built to elevate 
              creators and deliver world-class content across film, music, and media.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              From concept to distribution, we provide the vision, infrastructure, and global reach that 
              artists and brands need to make an impact.
            </p>
            <Link to="/about" className="text-primary text-sm tracking-[0.15em] uppercase font-medium hover:brightness-110 transition-all inline-flex items-center gap-2">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="glass-card rounded-lg p-12 flex flex-col gap-8"
          >
            {[
              { num: '100+', label: 'Productions Completed' },
              { num: '50+', label: 'Artists & Creators' },
              { num: '25+', label: 'Countries Reached' },
              { num: '10M+', label: 'Global Streams' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-6">
                <span className="text-3xl md:text-4xl font-black text-gradient-gold min-w-[120px]">{s.num}</span>
                <span className="text-muted-foreground text-sm tracking-wide">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Full-Spectrum <span className="text-gradient-gold">Creative Services</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
                  className="glass-card rounded-lg p-8 group hover:border-primary/20 transition-all duration-500"
                >
                  <Icon className="w-8 h-8 text-primary mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-semibold mb-3">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="text-center mt-12">
            <Link to="/services" className="text-primary text-sm tracking-[0.15em] uppercase font-medium hover:brightness-110 transition-all inline-flex items-center gap-2">
              Explore All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Productions */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Our Work</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              Featured <span className="text-gradient-gold">Productions</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productions.map((p, i) => (
              <motion.div
                key={i}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.5}
              >
                <Link to="/portfolio" className="block glass-card rounded-lg overflow-hidden group">
                  <div className="aspect-video bg-secondary flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Film className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{p.category}</span>
                      <span className="text-xs text-muted-foreground">{p.year}</span>
                    </div>
                    <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{p.title}</h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={2} className="text-center mt-12">
            <Link to="/portfolio">
              <Button className="btn-primary">View Full Portfolio <ArrowRight className="ml-2 w-4 h-4" /></Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Let's Create</p>
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              Ready to Build<br />
              <span className="text-gradient-gold">Something Extraordinary?</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
              Whether you're an artist seeking a label home, a brand needing production, or a creator ready 
              for global distribution — we're here to make it happen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact"><Button className="btn-primary px-10 py-4">Start a Project</Button></Link>
              <Link to="/contact"><Button variant="outline" className="btn-secondary px-10 py-4">Submit Your Music</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
