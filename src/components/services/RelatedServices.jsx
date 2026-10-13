"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollReveal } from '../../hooks/useUtils';

export default function RelatedServices({ services }) {
  const [headerRef, headerVisible] = useScrollReveal();

  if (!services || services.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden" id="related-services">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-primary/20 bg-primary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-primary uppercase">
            Explore More
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] md:text-[40px] font-semibold leading-[1.2]">
            Related Services
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <RelatedServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedServiceCard({ service, index }) {
  const [revealRef, isVisible] = useScrollReveal();
  const cardRef = useRef(null);

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
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="card-glow-premium p-6 block group h-full"
      >
        <h3 className="font-[var(--font-headline)] text-base md:text-lg font-semibold mb-3 group-hover:text-primary transition-colors relative z-10">
          {service.title}
        </h3>
        <p className="text-on-surface-variant font-[var(--font-body)] text-sm leading-relaxed relative z-10 line-clamp-3 mb-4">
          {service.description}
        </p>
        <span className="inline-flex items-center gap-1 text-primary font-[var(--font-mono)] text-xs font-medium tracking-wider uppercase relative z-10 group-hover:gap-2 transition-all">
          Learn More
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </Link>
    </motion.div>
  );
}
