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
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
    className={align === 'center' ? 'text-center' : ''}
  >
    <p className="section-label mb-5">{label}</p>
    <h2 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.92] tracking-tight mb-8">
      {title}
      {titleAccent && (
        <>
          <br />
          <span className="text-gradient-gold">{titleAccent}</span>
        </>
      )}
    </h2>
    {description && (
      <p className="body-lg max-w-2xl mt-8 leading-relaxed" style={align === 'center' ? { margin: '2rem auto 0' } : {}}>
        {description}
      </p>
    )}
  </motion.div>
);

export default SectionHeader;
