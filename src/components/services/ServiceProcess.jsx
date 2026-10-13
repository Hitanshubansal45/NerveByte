"use client";

import { motion } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useUtils';

export default function ServiceProcess({ steps }) {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden" id="service-process">
      <div className="absolute inset-0 grid-overlay opacity-[0.1] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-primary/20 bg-primary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-primary uppercase">
            Our Methodology
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] md:text-[40px] font-semibold leading-[1.2] mb-4">
            How We Work
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-[var(--font-body)] text-sm sm:text-base">
            A structured, transparent process that delivers results at every stage.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-vibrant-teal to-primary/20" aria-hidden="true" />

          {steps.map((step, index) => (
            <ProcessStep key={step.title} step={step} index={index} total={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index, total }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex items-start gap-6 md:gap-8 ${index < total - 1 ? 'pb-12' : ''}`}
    >
      {/* Step number circle */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-background border-2 border-primary flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.2)]">
          <span className="font-[var(--font-headline)] text-lg md:text-xl font-bold text-primary">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="pt-1 md:pt-3">
        <h3 className="font-[var(--font-headline)] text-lg md:text-xl font-semibold mb-2">
          {step.title}
        </h3>
        <p className="text-on-surface-variant font-[var(--font-body)] text-sm leading-relaxed">
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}
