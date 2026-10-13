"use client";

import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useUtils';

export default function ServiceBenefits({ benefits }) {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="service-benefits">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-secondary/20 bg-secondary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-secondary uppercase">
            Business Impact
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] md:text-[40px] font-semibold leading-[1.2] mb-4">
            Why Choose NerveByte
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {benefits.map((benefit, index) => (
            <BenefitItem key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitItem({ benefit, index }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 p-5 rounded-xl bg-surface-container/50 border border-outline-variant/10 hover:border-vibrant-teal/30 transition-all duration-300 group"
    >
      {/* Checkmark */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-vibrant-teal/10 flex items-center justify-center group-hover:bg-vibrant-teal/20 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-vibrant-teal">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Text */}
      <p className="font-[var(--font-body)] text-sm md:text-base text-on-surface leading-relaxed pt-1">
        {benefit}
      </p>
    </motion.div>
  );
}
