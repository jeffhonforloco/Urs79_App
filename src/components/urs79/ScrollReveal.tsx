import React from 'react';
import { motion, type Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: boolean;
  blur?: boolean;
  className?: string;
  once?: boolean;
  margin?: string;
  as?: keyof JSX.IntrinsicElements;
}

const getOffset = (direction: Direction, distance: number) => {
  switch (direction) {
    case 'up': return { x: 0, y: distance };
    case 'down': return { x: 0, y: -distance };
    case 'left': return { x: distance, y: 0 };
    case 'right': return { x: -distance, y: 0 };
    case 'none': return { x: 0, y: 0 };
  }
};

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  distance = 50,
  scale = false,
  blur = false,
  className = '',
  once = true,
  margin = '-80px',
  as = 'div',
}) => {
  const offset = getOffset(direction, distance);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: scale ? 0.95 : 1,
      filter: blur ? 'blur(8px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay,
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const MotionComponent = motion[as as 'div'] as typeof motion.div;

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={variants}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export default ScrollReveal;

// Stagger wrapper for child reveals
export const ScrollRevealGroup: React.FC<{
  children: React.ReactNode;
  stagger?: number;
  className?: string;
  once?: boolean;
  margin?: string;
}> = ({ children, stagger = 0.1, className = '', once = true, margin = '-80px' }) => {
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Child item for use inside ScrollRevealGroup
export const ScrollRevealItem: React.FC<{
  children: React.ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  scale?: boolean;
  blur?: boolean;
  className?: string;
}> = ({ children, direction = 'up', distance = 40, duration = 0.7, scale = false, blur = false, className = '' }) => {
  const offset = getOffset(direction, distance);

  const item: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: scale ? 0.95 : 1,
      filter: blur ? 'blur(6px)' : 'blur(0px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div variants={item} className={className}>
      {children}
    </motion.div>
  );
};
