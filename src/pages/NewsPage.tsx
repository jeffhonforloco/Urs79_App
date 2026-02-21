import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
};

const newsItems = [
  { date: 'Feb 15, 2026', category: 'Release', title: 'Nova Drops Highly Anticipated Album "Midnight Protocol"', excerpt: 'The electronic powerhouse delivers a 14-track masterpiece that pushes the boundaries of modern music production.' },
  { date: 'Feb 1, 2026', category: 'Production', title: 'URS79 Studios Announces New Film Division', excerpt: 'Expanding our creative capabilities with a dedicated film production wing, set to begin operations in Q2 2026.' },
  { date: 'Jan 20, 2026', category: 'Partnership', title: 'Global Distribution Deal with Major Streaming Platform', excerpt: 'URS79 secures exclusive distribution partnership, bringing our catalog to millions of new listeners worldwide.' },
  { date: 'Jan 10, 2026', category: 'Award', title: 'Kairo\'s "Urban Pulse" Video Wins Best Visual at Awards', excerpt: 'The cinematically stunning music video earns top honors at the International Music Video Awards.' },
  { date: 'Dec 15, 2025', category: 'Signing', title: 'URS79 Welcomes Three New Artists to the Roster', excerpt: 'Exciting new talent joins our growing family of creators, spanning electronic, R&B, and alternative genres.' },
  { date: 'Dec 1, 2025', category: 'Event', title: 'URS79 Presents: The Nightfall Sessions Live', excerpt: 'Our acclaimed live performance series returns with an exclusive lineup of roster artists and special guests.' },
];

const NewsPage = () => (
  <div className="pt-28">
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <p className="text-xs tracking-[0.3em] uppercase text-primary mb-4 font-medium">News & Media</p>
          <h1 className="text-5xl md:text-7xl font-black mb-8">
            Latest <span className="text-gradient-gold">Updates</span>
          </h1>
          <div className="divider-gold mb-8" />
        </motion.div>
      </div>
    </section>

    <section className="pb-24 px-6 md:px-12 lg:px-20">
      <div className="max-w-5xl mx-auto space-y-6">
        {newsItems.map((n, i) => (
          <motion.article
            key={i}
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i * 0.2}
            className="glass-card rounded-lg p-8 group cursor-pointer hover:border-primary/20 transition-all duration-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-xs tracking-[0.2em] uppercase text-primary font-medium">{n.category}</span>
              <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" /> {n.date}</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-3 group-hover:text-primary transition-colors">{n.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{n.excerpt}</p>
          </motion.article>
        ))}
      </div>
    </section>
  </div>
);

export default NewsPage;
