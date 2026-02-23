import React from 'react';

interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ items, separator = '✦', className = '' }) => {
  const content = items.join(` ${separator} `) + ` ${separator} `;
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="animate-marquee inline-block">
        <span className="inline-block pr-4">{content}</span>
        <span className="inline-block pr-4">{content}</span>
      </div>
    </div>
  );
};

export default Marquee;
