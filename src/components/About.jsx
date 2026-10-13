"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../hooks/useUtils';

const CONSULTING_STEPS = [
  {
    step: 'Phase 01',
    title: 'Discovery & Audit',
    category: 'Assessment',
    description: 'We evaluate your current system bottlenecks, legacy architectures, and operational goals to establish a clear, data-driven strategy.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    step: 'Phase 02',
    title: 'Strategy & Architecture',
    category: 'Planning',
    description: 'We design scalable software blueprints, cloud infrastructure solutions, and secure integrations tailored to your business milestones.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="10" x2="6" y2="14" />
        <line x1="18" y1="10" x2="18" y2="14" />
      </svg>
    ),
  },
  {
    step: 'Phase 03',
    title: 'Engineering & Integration',
    category: 'Execution',
    description: 'Our team builds high-performance, custom software solutions and integrates them database-by-database into your existing workflows.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    step: 'Phase 04',
    title: 'Scaling & Optimization',
    category: 'Support',
    description: 'We monitor, tune, and continuously optimize your applications, ensuring peak system performance and scalable, long-term stability.',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
];

export default function About() {
  const [headerRef, headerVisible] = useScrollReveal();
  const [timelineRef] = useScrollReveal();
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="about">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 grid-overlay opacity-[0.2] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-primary/20 bg-primary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-primary uppercase">
            Our Delivery Model
          </span>
          <h2 className="font-[var(--font-headline)] text-[32px] md:text-[48px] font-semibold leading-[1.2] mb-4">
            Structured Consulting Methodology
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-[var(--font-body)] text-sm sm:text-base">
            We combine rigorous system auditing, tailored planning, and premium engineering to deliver predictable digital results.
          </p>
        </motion.div>

        {/* Origin Layout: Split details / Interactive Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Timeline Selector / View Left (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            <div className="space-y-4">
              <h3 className="font-[var(--font-headline)] text-2xl md:text-3xl font-semibold leading-tight text-on-surface">
                Engineering-First Approach
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm sm:text-base">
                NerveByte Infotech Pvt Ltd is built upon structural excellence and execution integrity. 
                Our consulting framework bridges the gap between high-level architectural design and production reliability.
              </p>
            </div>

            {/* Active Details Box */}
            <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 relative overflow-hidden shadow-lg min-h-[220px]">
              {/* Highlight accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <span className="inline-block font-[var(--font-mono)] text-xs text-primary font-bold tracking-wider uppercase">
                    {CONSULTING_STEPS[activeStep].step}
                  </span>
                  <h4 className="font-[var(--font-headline)] text-lg sm:text-xl font-bold text-on-surface leading-snug">
                    {CONSULTING_STEPS[activeStep].title}
                  </h4>
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider font-[var(--font-mono)]">
                    {CONSULTING_STEPS[activeStep].category}
                  </p>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    {CONSULTING_STEPS[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Hint message */}
            <p className="text-xs text-on-surface-variant/60 italic text-center lg:text-left select-none">
              * Click the methodology phases on the right to navigate our process.
            </p>
          </div>

          {/* Vertical Timeline Right (7 cols) */}
          <div ref={timelineRef} className="lg:col-span-7 relative pl-8 md:pl-0">
            {/* Timeline line */}
            <div className="timeline-line" />

            {/* Timeline items list */}
            <div className="space-y-12 relative">
              {CONSULTING_STEPS.map((evt, idx) => {
                const isSelected = activeStep === idx;
                
                return (
                  <div
                    key={evt.title}
                    onClick={() => setActiveStep(idx)}
                    className="timeline-item flex flex-col md:flex-row items-start md:even:flex-row-reverse gap-8 cursor-pointer relative"
                  >
                    {/* Dot in line */}
                    <div
                      className={`timeline-dot transition-all duration-300 ${
                        isSelected 
                          ? 'border-primary scale-125 bg-primary shadow-[0_0_15px_var(--color-primary)]' 
                          : 'border-outline opacity-60'
                      }`}
                    />

                    {/* Timeline card block */}
                    <div className="w-full md:w-1/2" />
                    
                    <motion.div
                      whileHover={{ y: -4 }}
                      className={`w-full md:w-[45%] p-5 rounded-lg border text-left bg-background/40 transition-all duration-300 ${
                        isSelected
                          ? 'border-primary bg-surface-container-low/75 shadow-md shadow-primary/5'
                          : 'border-outline-variant/10 hover:border-outline-variant/35'
                      }`}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-primary/10 text-primary' : 'bg-surface-container-high/40 text-on-surface-variant'
                        }`}>
                          {evt.icon}
                        </div>
                        <div>
                          <span className="font-[var(--font-mono)] text-[10px] text-on-surface-variant uppercase tracking-wider block leading-none mb-1">
                            {evt.step}
                          </span>
                          <h4 className={`text-sm sm:text-base font-bold leading-tight ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                            {evt.title}
                          </h4>
                        </div>
                      </div>
                      <p className="text-xs text-on-surface-variant line-clamp-2 mt-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
