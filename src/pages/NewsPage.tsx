import React from 'react';
import SectionHeader from '@/components/urs79/SectionHeader';
import ScrollReveal from '@/components/urs79/ScrollReveal';

const NewsPage = () => (
  <div>
    <section className="relative pt-44 md:pt-52 pb-24 md:pb-28 px-6 md:px-10 grain-overlay">
      <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <ScrollReveal direction="up" blur>
          <p className="section-label mb-5">News & Media</p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-[0.02em] leading-[0.85] mb-8">
            LATEST <span className="text-gradient-gold">UPDATES</span>
          </h1>
          <div className="divider-gold" />
        </ScrollReveal>
      </div>
    </section>

    <section className="section-padding">
      <div className="max-w-[900px] mx-auto text-center">
        <ScrollReveal direction="up" scale blur>
          <div className="glass-card p-14 md:p-20">
            <p className="section-label mb-6">Stay Tuned</p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">News & updates are coming soon.</h2>
            <p className="body-lg max-w-md mx-auto">
              We're preparing exciting announcements about new projects, releases, and partnerships. Check back soon.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  </div>
);

export default NewsPage;
