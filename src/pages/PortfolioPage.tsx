import React, { useState } from 'react';
import { Film } from 'lucide-react';
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from '@/components/urs79/ScrollReveal';

const categories = ['All', 'Films', 'Music Videos', 'Commercials', 'Visual Media'];

const PortfolioPage = () => {
  const [active, setActive] = useState('All');

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 md:px-10 grain-overlay">
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[200px]" />
        <div className="max-w-[1400px] mx-auto relative z-10">
          <ScrollReveal direction="up" blur>
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Portfolio</p>
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] mb-6">
              OUR <span className="text-gradient-gold">PRODUCTIONS</span>
            </h1>
            <div className="divider-gold mb-8" />
          </ScrollReveal>

          {/* Filters */}
          <ScrollReveal direction="up" delay={0.15}>
            <div className="flex flex-wrap gap-3">
              {categories.map(c => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`text-[10px] tracking-[0.2em] uppercase px-5 py-2.5 transition-all duration-300 border ${
                    active === c
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Coming Soon Grid */}
      <section className="pb-28 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <ScrollRevealGroup stagger={0.08} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <ScrollRevealItem key={i} direction="up" scale blur>
                <div className="glass-card overflow-hidden group">
                  <div className="aspect-[4/3] bg-secondary relative flex items-center justify-center">
                    <Film className="w-10 h-10 text-muted-foreground/10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className="text-[10px] tracking-[0.3em] uppercase text-primary/60 font-semibold">Coming Soon</span>
                      <h3 className="text-lg font-bold mt-1 text-foreground/40">Project in Development</h3>
                    </div>
                  </div>
                </div>
              </ScrollRevealItem>
            ))}
          </ScrollRevealGroup>

          <ScrollReveal direction="up" delay={0.2} className="text-center mt-20">
            <p className="text-muted-foreground text-sm mb-2">Portfolio projects are being curated.</p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-semibold">Stay tuned for updates</p>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default PortfolioPage;
