"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useUtils';

const FEATURE_ICONS = [
  // Shield
  <svg key="0" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  // Zap
  <svg key="1" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  // Code
  <svg key="2" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>,
  // Cloud
  <svg key="3" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" /></svg>,
  // Target
  <svg key="4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  // Layers
  <svg key="5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
];

const COLOR_PAIRS = [
  { bg: 'bg-primary/10', bgHover: 'group-hover:bg-primary', text: 'text-primary', textHover: 'group-hover:text-white' },
  { bg: 'bg-vibrant-teal/10', bgHover: 'group-hover:bg-vibrant-teal', text: 'text-vibrant-teal', textHover: 'group-hover:text-white' },
  { bg: 'bg-tertiary/10', bgHover: 'group-hover:bg-tertiary', text: 'text-tertiary', textHover: 'group-hover:text-white' },
  { bg: 'bg-secondary/10', bgHover: 'group-hover:bg-secondary', text: 'text-secondary', textHover: 'group-hover:text-white' },
  { bg: 'bg-electric-blue/10', bgHover: 'group-hover:bg-electric-blue', text: 'text-electric-blue', textHover: 'group-hover:text-white' },
  { bg: 'bg-primary/10', bgHover: 'group-hover:bg-primary', text: 'text-primary', textHover: 'group-hover:text-white' },
];

function FeatureCard({ feature, index }) {
  const [revealRef, isVisible] = useScrollReveal();
  const cardRef = useRef(null);
  const colors = COLOR_PAIRS[index % COLOR_PAIRS.length];

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const setRefs = (element) => {
    revealRef.current = element;
    cardRef.current = element;
  };

  return (
    <motion.div
      ref={setRefs}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="card-glow-premium p-6 sm:p-8 group cursor-default"
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300 relative z-10 ${colors.bg} ${colors.bgHover}`}>
        <span className={`${colors.text} ${colors.textHover} transition-colors duration-300`}>
          {FEATURE_ICONS[index % FEATURE_ICONS.length]}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-[var(--font-headline)] text-lg md:text-xl font-semibold leading-tight mb-3 relative z-10">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-on-surface-variant font-[var(--font-body)] relative z-10 leading-relaxed text-sm">
        {feature.description}
      </p>
    </motion.div>
  );
}

export default function ServiceFeatureGrid({ features, title }) {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="service-features">
      <div className="absolute inset-0 grid-overlay opacity-[0.1] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-vibrant-teal/20 bg-vibrant-teal/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-vibrant-teal uppercase">
            Key Capabilities
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] md:text-[40px] font-semibold leading-[1.2] mb-4">
            {title || 'What We Deliver'}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={feature.title} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
