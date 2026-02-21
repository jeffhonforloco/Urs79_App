import React from 'react';
import { motion } from 'framer-motion';
import { Music, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
};

const artists = [
  { name: 'Nova', genre: 'Electronic / Pop', bio: 'Boundary-pushing electronic artist blending futuristic sounds with soulful vocals.' },
  { name: 'Kairo', genre: 'Hip-Hop / R&B', bio: 'Rising star redefining urban music with raw lyricism and innovative production.' },
  { name: 'Lyra', genre: 'Alternative / Indie', bio: 'Ethereal vocalist crafting atmospheric soundscapes that transcend genre.' },
  { name: 'The Collective', genre: 'Rock / Alternative', bio: 'Genre-defying ensemble pushing the boundaries of modern rock.' },
  { name: 'Zenith', genre: 'R&B / Soul', bio: 'Soulful storyteller with a voice that commands attention and emotion.' },
  { name: 'Pulse', genre: 'Electronic / Dance', bio: 'High-energy producer creating anthems for the global dancefloor.' },
];

const ArtistsPage = () => (
  <div className="pt-28">
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Our Roster</p>
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            The <span className="text-gradient-gold">Artists</span>
          </h1>
          <div className="divider-gold mb-8" />
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Meet the visionary artists and creators who call URS79 home. Each one brings a unique voice 
            and perspective to our growing global roster.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((a, i) => (
          <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3} className="glass-card rounded-lg overflow-hidden group">
            <div className="aspect-square bg-secondary flex items-center justify-center relative">
              <Music className="w-16 h-16 text-muted-foreground/15" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold">{a.name}</h3>
                <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{a.genre}</span>
              </div>
            </div>
            <div className="p-6">
              <p className="text-sm text-muted-foreground leading-relaxed">{a.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="section-padding bg-card text-center">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
        <h2 className="text-4xl font-bold mb-4">Join the <span className="text-gradient-gold">URS79 Roster</span></h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">We're seeking visionary artists ready to take their careers to the next level.</p>
        <Link to="/contact" className="btn-primary inline-flex items-center gap-2">Submit Your Music <ExternalLink className="w-4 h-4" /></Link>
      </motion.div>
    </section>
  </div>
);

export default ArtistsPage;
