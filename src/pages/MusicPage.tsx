import React from 'react';
import { motion } from 'framer-motion';
import { Disc3, Play, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
};

const releases = [
  { title: 'Midnight Protocol', artist: 'Nova', type: 'Album', year: '2025' },
  { title: 'Golden Hour', artist: 'Kairo', type: 'Single', year: '2025' },
  { title: 'Echoes', artist: 'Lyra', type: 'EP', year: '2024' },
  { title: 'Rise & Fall', artist: 'The Collective', type: 'Album', year: '2024' },
  { title: 'After Dark', artist: 'Zenith', type: 'Single', year: '2025' },
  { title: 'Chromatic', artist: 'Pulse', type: 'Album', year: '2024' },
];

const MusicPage = () => (
  <div className="pt-28">
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Record Label</p>
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            The Sound of <span className="text-gradient-gold">URS79</span>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            As a record label, we sign, develop, and release music from some of the most exciting voices 
            in contemporary music. Our catalog spans genres and geographies.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Latest Releases */}
    <section className="pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="mb-12">
          <h2 className="text-3xl font-bold">Latest <span className="text-gradient-gold">Releases</span></h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {releases.map((r, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3} className="glass-card rounded-lg overflow-hidden group cursor-pointer">
              <div className="aspect-square bg-secondary relative flex items-center justify-center">
                <Disc3 className="w-20 h-20 text-muted-foreground/15" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{r.type} · {r.year}</span>
                <h3 className="text-lg font-semibold mt-2 group-hover:text-primary transition-colors">{r.title}</h3>
                <p className="text-sm text-muted-foreground">{r.artist}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Submit CTA */}
    <section className="section-padding bg-card text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <h2 className="text-4xl font-bold mb-4">Want to Release with <span className="text-gradient-gold">URS79?</span></h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">We're always looking for exceptional talent. Submit your music and let's create something extraordinary.</p>
        <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Submit Your Music <ExternalLink className="w-4 h-4" /></Link>
      </motion.div>
    </section>
  </div>
);

export default MusicPage;
