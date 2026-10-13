"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollReveal } from '../../hooks/useUtils';

export default function ServiceCTA() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="service-cta">
      {/* Background accents */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-[900px] mx-auto px-4 md:px-16 relative z-10 text-center"
      >
        <span className="inline-block px-3 py-1 mb-6 rounded-full border border-vibrant-teal/20 bg-vibrant-teal/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-vibrant-teal uppercase">
          Get Started
        </span>

        <h2 className="font-[var(--font-headline)] text-[28px] md:text-[40px] font-semibold leading-[1.2] mb-6">
          Ready to Transform Your Business?
        </h2>

        <p className="text-on-surface-variant max-w-xl mx-auto font-[var(--font-body)] text-sm sm:text-base mb-10 leading-relaxed">
          Let&apos;s discuss how NerveByte can help you achieve your technology goals. Schedule a free consultation with our experts.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/#contact"
            className="bg-primary-container text-on-primary-container px-10 py-4 rounded-lg font-semibold hover:opacity-90 transition-all btn-glow text-base inline-flex items-center justify-center gap-2"
          >
            Schedule Free Consultation
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href="/services"
            className="px-10 py-4 rounded-lg font-semibold border border-outline-variant/30 hover:border-primary/50 transition-all text-base text-on-surface-variant hover:text-primary inline-flex items-center justify-center"
          >
            Explore All Services
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
