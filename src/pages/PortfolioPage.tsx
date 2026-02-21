import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Film, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
};

const categories = ['All', 'Films', 'Music Videos', 'Commercials', 'Visual Media'];

const projects = [
  { title: 'The Last Frame', category: 'Films', year: '2025', client: 'URS79 Originals', desc: 'A gripping drama exploring the boundaries of art and obsession.' },
  { title: 'Echoes of Tomorrow', category: 'Music Videos', year: '2025', client: 'Artist: Nova', desc: 'Futuristic visual journey through sound and light.' },
  { title: 'Brand Elevation', category: 'Commercials', year: '2024', client: 'Fortune 500 Brand', desc: 'High-impact commercial campaign driving cultural conversation.' },
  { title: 'Nightfall Sessions', category: 'Visual Media', year: '2024', client: 'URS79 Studios', desc: 'Intimate live performance series captured in cinematic detail.' },
  { title: 'Urban Pulse', category: 'Music Videos', year: '2024', client: 'Artist: Kairo', desc: 'Raw, unfiltered visual storytelling in the urban landscape.' },
  { title: 'Vision Forward', category: 'Commercials', year: '2025', client: 'Tech Startup', desc: 'Minimalist tech campaign with maximum visual impact.' },
  { title: 'Solace', category: 'Films', year: '2024', client: 'Independent', desc: 'Award-winning short film about finding peace in chaos.' },
  { title: 'Neon Dreams', category: 'Music Videos', year: '2025', client: 'Artist: Lyra', desc: 'Cyberpunk-inspired visual masterpiece.' },
  { title: 'Heritage', category: 'Visual Media', year: '2025', client: 'Cultural Foundation', desc: 'Documentary series exploring cultural identity.' },
];

const PortfolioPage = () => {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active);

  return (
    <div className="pt-28">
      <section className="section-padding">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">Portfolio</p>
            <h1 className="text-5xl md:text-7xl font-black mb-8">
              Our <span className="text-gradient-gold">Productions</span>
            </h1>
            <div className="divider-gold mb-8" />
          </motion.div>

          {/* Filters */}
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="flex flex-wrap gap-3 mb-12">
            {categories.map(c => (
              <Button
                key={c}
                variant={active === c ? 'default' : 'outline'}
                onClick={() => setActive(c)}
                className={`text-xs tracking-[0.15em] uppercase ${active === c ? 'bg-primary text-primary-foreground' : 'border-border text-muted-foreground hover:text-foreground'}`}
                size="sm"
              >
                {c}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="pb-24 px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div
              key={p.title}
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.3}
              className="glass-card rounded-lg overflow-hidden group cursor-pointer"
            >
              <div className="aspect-video bg-secondary relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Film className="w-12 h-12 text-muted-foreground/20" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{p.category}</span>
                  <span className="text-xs text-muted-foreground">{p.year}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{p.desc}</p>
                <p className="text-xs text-muted-foreground/60">{p.client}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
