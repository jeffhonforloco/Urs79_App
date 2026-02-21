import React from 'react';
import { motion } from 'framer-motion';
import { Film, Tv, Palette, Music, Users, Globe, BookOpen, Disc3, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
};

const allServices = [
  { icon: Film, title: 'Film Production', desc: 'From concept to final cut, we produce feature films, documentaries, and short films with cinematic mastery.', forWho: 'Filmmakers, studios, production partners', deliverables: 'Full production pipeline, post-production, color grading, sound design' },
  { icon: Tv, title: 'Music Video Production', desc: 'Visual storytelling that transforms songs into immersive cinematic experiences.', forWho: 'Recording artists, labels, managers', deliverables: 'Creative direction, filming, editing, VFX, delivery' },
  { icon: Palette, title: 'Commercial Production', desc: 'High-impact commercial and branded content that captures attention and drives results.', forWho: 'Brands, agencies, corporate clients', deliverables: 'Concept, production, post, multi-platform delivery' },
  { icon: Music, title: 'Recording & Music Production', desc: 'World-class recording, mixing, and mastering in state-of-the-art studio environments.', forWho: 'Artists, songwriters, producers', deliverables: 'Recording sessions, mixing, mastering, production' },
  { icon: Users, title: 'Artist Development', desc: 'Comprehensive artist development programs that transform raw talent into global acts.', forWho: 'Emerging artists, independent musicians', deliverables: 'Branding, image consulting, release strategy, career planning' },
  { icon: Globe, title: 'Distribution Services', desc: 'Global digital and physical distribution across 200+ platforms worldwide.', forWho: 'Artists, labels, distributors', deliverables: 'Platform delivery, metadata management, analytics, royalty tracking' },
  { icon: BookOpen, title: 'Publishing & Rights Management', desc: 'Full-service music publishing including sync licensing, royalty collection, and catalog administration.', forWho: 'Songwriters, composers, publishers', deliverables: 'Rights registration, royalty collection, sync placement, administration' },
  { icon: Disc3, title: 'Creative Multimedia Solutions', desc: 'Branding, design, and multimedia content creation for artists and brands.', forWho: 'Artists, brands, creative agencies', deliverables: 'Visual identity, social content, websites, merch design' },
];

const ServicesPage = () => (
  <div className="pt-28">
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Our Services</p>
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            Full-Spectrum<br /><span className="text-gradient-gold">Creative Power</span>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            From the first spark of an idea to global distribution — URS79 provides the complete creative 
            infrastructure for artists, brands, and visionaries.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto space-y-8">
        {allServices.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}
              className="glass-card rounded-lg p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              <div>
                <Icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-primary mb-3 font-medium">Deliverables</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.deliverables}</p>
              </div>
              <div>
                <h4 className="text-xs tracking-[0.2em] uppercase text-primary mb-3 font-medium">Who It's For</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{s.forWho}</p>
                <Link to="/contact" className="text-primary text-sm tracking-[0.15em] uppercase font-medium inline-flex items-center gap-2 hover:brightness-110 transition-all">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  </div>
);

export default ServicesPage;
