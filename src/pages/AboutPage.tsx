import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
};

const AboutPage = () => (
  <div className="pt-28">
    {/* Hero */}
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">About URS79</p>
          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            We Are <span className="text-gradient-gold">URS79</span>
          </h1>
          <div className="divider-gold mb-8" />
        </motion.div>
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="max-w-3xl">
          <p className="text-xl text-muted-foreground leading-relaxed mb-6">
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
      </div>
    </section>

    {/* Vision & Mission */}
    <section className="section-padding bg-card">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {[
          { title: 'Our Vision', text: 'To be the world\'s most artist-forward multimedia company — where creativity, technology, and commerce converge to redefine entertainment.' },
          { title: 'Our Mission', text: 'To discover, develop, and distribute exceptional creative content across film, music, and media — providing artists and brands with the tools, platform, and reach to make a lasting cultural impact.' },
        ].map((item, i) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass-card rounded-lg p-10">
            <h3 className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">{item.title}</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </div>
    </section>

    {/* Industries */}
    <section className="section-padding">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Industries We Serve</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-12">Global <span className="text-gradient-gold">Reach</span></h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {['Film & Television', 'Music & Audio', 'Advertising', 'Digital Media', 'Live Events', 'Streaming', 'Fashion', 'Sports'].map((ind, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3} className="glass-card rounded-lg p-6 text-center">
              <span className="text-sm font-medium">{ind}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="section-padding bg-card text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <h2 className="text-4xl font-bold mb-6">Ready to <span className="text-gradient-gold">Collaborate?</span></h2>
        <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
          Work With Us <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </section>
  </div>
);

export default AboutPage;
