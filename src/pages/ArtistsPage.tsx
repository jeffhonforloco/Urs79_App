import React from 'react';
import { motion } from 'framer-motion';
import { Users, Disc3, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeader from '@/components/urs79/SectionHeader';
import ScrollReveal, { ScrollRevealGroup, ScrollRevealItem } from '@/components/urs79/ScrollReveal';

const ArtistsPage = () => (
  <div>
    {/* Hero */}
    <section className="relative pt-44 md:pt-52 pb-24 md:pb-28 px-6 md:px-10 grain-overlay">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal direction="up" blur>
          <p className="section-label mb-5">Record Label</p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-[0.02em] leading-[0.85] mb-8">
            ARTISTS <span className="text-gradient-gold">& MUSIC</span>
          </h1>
          <div className="divider-gold mb-10" />
          <p className="body-lg max-w-2xl">
            Meet the visionary artists who call URS79 home. We sign, develop, and release music from the most exciting voices in contemporary culture.
          </p>
        </ScrollReveal>
      </div>
    </section>

    {/* Artist Roster */}
    <section className="section-padding">
      <div className="max-w-[1400px] mx-auto">
        <ScrollReveal direction="up" blur>
          <SectionHeader label="Our Roster" title="The" titleAccent="Artists" />
        </ScrollReveal>
        <ScrollRevealGroup stagger={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-20">
          {[1, 2, 3].map((_, i) => (
            <ScrollRevealItem key={i} direction="up" scale blur>
              <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                <div className="aspect-[3/4] bg-secondary flex items-center justify-center relative">
                  <Users className="w-14 h-14 text-muted-foreground/8" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                    <span className="section-label opacity-50">Artist</span>
                    <h3 className="text-2xl md:text-3xl font-bold mt-2 text-foreground/30">Coming Soon</h3>
                    <p className="body-md mt-2 opacity-40">Artist announcements pending</p>
                  </div>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>

    {/* Releases */}
    <section className="section-padding bg-card grain-overlay">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal direction="up" blur>
          <SectionHeader label="Releases" title="Latest" titleAccent="Music" />
        </ScrollReveal>
        <ScrollRevealGroup stagger={0.06} className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5 mt-20">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <ScrollRevealItem key={i} direction="up" scale blur>
              <div className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-500">
                <div className="aspect-square bg-secondary relative flex items-center justify-center">
                  <Disc3 className="w-16 h-16 text-muted-foreground/8" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                    <span className="section-label opacity-50 text-[9px]">Coming Soon</span>
                    <h3 className="text-sm md:text-base font-bold mt-1 text-foreground/30">New Release</h3>
                  </div>
                </div>
              </div>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>

    {/* Submit CTA */}
    <section className="section-padding text-center grain-overlay">
      <ScrollReveal direction="up" scale blur distance={60} className="relative z-10 max-w-4xl mx-auto">
        <h2 className="font-display text-5xl sm:text-6xl md:text-8xl tracking-[0.02em] mb-10">
          JOIN THE <span className="text-gradient-gold">URS79 ROSTER</span>
        </h2>
        <p className="body-lg mb-12 max-w-lg mx-auto">
          We're seeking visionary artists ready to take their careers to the next level. Submit your music and let's create something extraordinary.
        </p>
        <Link to="/submit" className="btn-primary inline-flex items-center gap-3">Submit Your Music <ArrowUpRight className="w-4 h-4" /></Link>
      </ScrollReveal>
    </section>
  </div>
);

export default ArtistsPage;
