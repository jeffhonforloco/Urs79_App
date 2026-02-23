import React from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '@/components/urs79/SectionHeader';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.7 } }),
};

const NewsPage = () => (
  <div>
    <section className="relative pt-40 pb-20 px-6 md:px-10 grain-overlay">
      <div className="absolute top-0 left-1/3 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[200px]" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">News & Media</p>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl tracking-[0.02em] mb-6">
            LATEST <span className="text-gradient-gold">UPDATES</span>
          </h1>
          <div className="divider-gold" />
        </motion.div>
      </div>
    </section>

    <section className="section-padding">
      <div className="max-w-[900px] mx-auto text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
          <div className="glass-card p-12 md:p-16">
            <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">Stay Tuned</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">News & updates are coming soon.</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're preparing exciting announcements about new projects, releases, and partnerships. Check back soon.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  </div>
);

export default NewsPage;
