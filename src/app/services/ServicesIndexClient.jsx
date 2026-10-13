"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useScrollReveal } from '../../hooks/useUtils';

export default function ServicesIndexClient({ categories }) {
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden" id="services-hero">
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
            <ol className="flex items-center gap-2 text-sm font-[var(--font-body)] text-on-surface-variant">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li className="text-outline" aria-hidden="true">/</li>
              <li className="text-primary font-medium">Services</li>
            </ol>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="inline-block px-3 py-1 mb-6 rounded-full border border-primary/20 bg-primary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-primary uppercase">
              Our Services Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-[var(--font-headline)] text-[36px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] mb-6 max-w-4xl"
          >
            <span className="text-gradient-flow">Comprehensive IT Services</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-on-surface-variant font-[var(--font-body)] text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            From strategic consulting to hands-on development — technology solutions tailored to your business goals.
          </motion.p>
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((category, catIndex) => (
        <CategorySection key={category.id} category={category} index={catIndex} />
      ))}

      {/* CTA Section */}
      <CTASection />
    </>
  );
}

function CategorySection({ category, index }) {
  const [headerRef, headerVisible] = useScrollReveal();
  const isAlt = index % 2 !== 0;

  return (
    <section
      className={`py-16 md:py-24 ${isAlt ? 'bg-surface-container-lowest' : 'bg-background'} relative overflow-hidden`}
      id={`category-${category.id}`}
    >
      <div className="absolute inset-0 grid-overlay opacity-[0.08] pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-[var(--font-headline)] text-[28px] md:text-[40px] font-semibold leading-[1.2] mb-3">
            {category.title}
          </h2>
          <p className="text-on-surface-variant font-[var(--font-body)] text-sm sm:text-base max-w-xl">
            {category.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {category.services.map((service, serviceIndex) => (
            <ServiceCard key={service.slug} service={service} index={serviceIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
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
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/services/${service.slug}`}
        className="card-glow-premium p-6 sm:p-8 block group h-full"
      >
        {/* Title */}
        <h3 className="font-[var(--font-headline)] text-lg md:text-xl font-semibold leading-tight mb-3 group-hover:text-primary transition-colors relative z-10">
          {service.title}
        </h3>

        {/* Description excerpt */}
        <p className="text-on-surface-variant font-[var(--font-body)] relative z-10 leading-relaxed text-sm mb-4 line-clamp-3">
          {service.metaDescription}
        </p>

        {/* Features preview */}
        <div className="flex flex-wrap gap-2 mb-5 relative z-10">
          {service.features.slice(0, 3).map((feature) => (
            <span
              key={feature.title}
              className="px-2 py-1 rounded-md bg-surface-container text-on-surface-variant font-[var(--font-mono)] text-[10px] tracking-wider"
            >
              {feature.title}
            </span>
          ))}
        </div>

        {/* Learn More link */}
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

function CTASection() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden" id="services-cta">
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
        <h2 className="font-[var(--font-headline)] text-[28px] md:text-[40px] font-semibold leading-[1.2] mb-6">
          Not Sure Which Service You Need?
        </h2>
        <p className="text-on-surface-variant max-w-xl mx-auto font-[var(--font-body)] text-sm sm:text-base mb-10 leading-relaxed">
          Let our experts assess your needs and recommend the right solution. Schedule a free discovery call today.
        </p>
        <Link
          href="/#contact"
          className="bg-primary-container text-on-primary-container px-10 py-4 rounded-lg font-semibold hover:opacity-90 transition-all btn-glow text-base inline-flex items-center gap-2"
        >
          Schedule Free Consultation
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </motion.div>
    </section>
  );
}
