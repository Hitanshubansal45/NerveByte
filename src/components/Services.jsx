"use client";

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useUtils';

const SERVICES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M12 8v4" />
        <path d="M12 16h.01" />
      </svg>
    ),
    title: 'Tech Consultancy',
    description: 'Bespoke technology planning, robust systems architecture, and custom IT strategy designed to help your business achieve digital excellence and operational scale.',
    features: ['Strategic IT Roadmap', 'Custom Architecture Design', 'Security & Integrity'],
    iconBg: 'bg-primary/10',
    iconBgHover: 'group-hover:bg-primary',
    iconColor: 'text-primary',
    iconColorHover: 'group-hover:text-white',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19A3.5 3.5 0 0 0 21 15.5c0-2.79-2.54-4.5-5-4.5-.47 0-.89.09-1.3.27A7 7 0 0 0 2 11.5c0 3.87 3.13 7 7 7h8.5" />
      </svg>
    ),
    title: 'Cloud & Software engineering',
    description: 'Premium engineering of scalable cloud architectures, high-load transactional APIs, and custom software systems designed to optimize business operations and workflow automation.',
    features: ['Cloud Migrations & Architecture', 'Scalable APIs & Microservices', 'Workflow & System Integrations'],
    iconBg: 'bg-vibrant-teal/10',
    iconBgHover: 'group-hover:bg-vibrant-teal',
    iconColor: 'text-vibrant-teal',
    iconColorHover: 'group-hover:text-white',
  },
];

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

  // Combine refs
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
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="card-glow-premium p-8 sm:p-10 group cursor-default"
    >
      {/* Icon */}
      <div
        className={`w-12 h-12 rounded flex items-center justify-center mb-6 transition-colors duration-300 relative z-10 ${service.iconBg} ${service.iconBgHover}`}
      >
        <span className={`${service.iconColor} ${service.iconColorHover} transition-colors duration-300`}>
          {service.icon}
        </span>
      </div>

      {/* Header */}
      <h3 className="font-[var(--font-headline)] text-[24px] md:text-[28px] font-semibold leading-tight mb-4 relative z-10">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-on-surface-variant font-[var(--font-body)] mb-6 relative z-10 leading-relaxed text-sm sm:text-base">
        {service.description}
      </p>

      {/* Features */}
      <ul className="space-y-3 relative z-10 border-t border-outline-variant/10 pt-6">
        {service.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 font-[var(--font-mono)] text-[12px] sm:text-[13px] font-medium tracking-[0.05em] text-on-surface-variant"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-vibrant-teal shrink-0">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="py-32 bg-background relative overflow-hidden" id="services">
      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-[0.2] pointer-events-none" aria-hidden="true" />
      
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-primary/20 bg-primary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-primary uppercase">
            Specialized Practice Areas
          </span>
          <h2 className="font-[var(--font-headline)] text-[32px] md:text-[48px] font-semibold leading-[1.2] mb-4">
            Our Service Portfolio
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-[var(--font-body)] text-sm sm:text-base">
            Scalable technology strategies and B2B software architectures built to align with your business milestones.
          </p>
        </motion.div>

        {/* 2-column center grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
