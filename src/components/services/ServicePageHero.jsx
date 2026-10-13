"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServicePageHero({ title, tagline, category }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden" id="service-hero">
      {/* Background gradient */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 via-background to-background" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-vibrant-teal/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute inset-0 grid-overlay opacity-[0.15] pointer-events-none" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center gap-2 text-sm font-[var(--font-body)] text-on-surface-variant" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-outline" aria-hidden="true">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/services" className="hover:text-primary transition-colors" itemProp="item">
                <span itemProp="name">Services</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <li className="text-outline" aria-hidden="true">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span className="text-primary font-medium" itemProp="name">{title}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </motion.nav>

        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <span className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-primary uppercase">
            {category}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-[var(--font-headline)] text-[36px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] mb-6 max-w-4xl"
        >
          <span className="text-gradient-flow">{title}</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-on-surface-variant font-[var(--font-body)] text-lg md:text-xl max-w-2xl leading-relaxed"
        >
          {tagline}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4 mt-10"
        >
          <Link
            href="/#contact"
            className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-all btn-glow text-sm inline-flex items-center gap-2"
          >
            Get a Free Consultation
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>
          <Link
            href="/services"
            className="px-8 py-3 rounded-lg font-semibold border border-outline-variant/30 hover:border-primary/50 transition-all text-sm text-on-surface-variant hover:text-primary"
          >
            View All Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
