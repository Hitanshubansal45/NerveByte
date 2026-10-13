"use client";

import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useUtils';

export default function ServiceOverview({ description }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-16 md:py-24 bg-surface-container-lowest relative" id="service-overview">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-primary uppercase">
            Overview
          </span>
          <p className="font-[var(--font-body)] text-base md:text-lg leading-[1.8] text-on-surface-variant">
            {description}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
