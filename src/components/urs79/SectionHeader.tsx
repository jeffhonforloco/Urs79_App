import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  label: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: 'left' | 'center';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ label, title, titleAccent, description, align = 'left' }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
    className={align === 'center' ? 'text-center' : ''}
  >
    <p className="text-[10px] tracking-[0.4em] uppercase text-primary mb-4 font-semibold">{label}</p>
    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-6">
      {title}
      {titleAccent && (
        <>
          <br />
          <span className="text-gradient-gold">{titleAccent}</span>
        </>
      )}
    </h2>
    {description && (
      <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mt-6 mx-auto">{description}</p>
    )}
  </motion.div>
);

export default SectionHeader;
