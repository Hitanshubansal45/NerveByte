"use client";

import { useCallback } from 'react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const handleScrollTo = useCallback((e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden" id="hero">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute top-1/4 -left-32 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full opacity-20 blur-[80px] md:blur-[120px] animate-float"
          style={{ background: 'radial-gradient(circle, #2563EB 0%, transparent 70%)' }}
        />
        <div
          className="absolute bottom-1/4 -right-32 w-[250px] md:w-[400px] h-[250px] md:h-[400px] rounded-full opacity-15 blur-[60px] md:blur-[100px] animate-float-delayed"
          style={{ background: 'radial-gradient(circle, #14D39A 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] md:w-[600px] h-[350px] md:h-[600px] rounded-full opacity-10 blur-[100px] md:blur-[140px] animate-float-slow"
          style={{ background: 'radial-gradient(circle, #6366F1 0%, transparent 70%)' }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-8 md:px-16 text-center md:text-left w-full">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.span
            variants={itemVariants}
            className="inline-block px-3 sm:px-4 py-1.5 mb-4 sm:mb-6 rounded-full border border-primary/20 bg-primary/5 font-[var(--font-mono)] text-[11px] sm:text-[13px] font-medium tracking-[0.05em] text-primary"
          >
            IT & TECH CONSULTANCY
          </motion.span>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="font-[var(--font-display)] text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-bold leading-[1.1] tracking-[-0.02em] mb-6 sm:mb-8"
          >
            Powering Tech,{' '}
            <span className="text-primary relative inline-block">
              Building Futures
              <motion.span
                className="absolute -bottom-1 sm:-bottom-2 left-0 h-[3px] sm:h-1 bg-gradient-to-r from-primary to-vibrant-teal rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-[var(--font-body)] text-base sm:text-lg leading-relaxed text-on-surface-variant mb-8 sm:mb-10 max-w-2xl mx-auto md:mx-0"
          >
            NerveByte Infotech Pvt Ltd is a premium IT and technology consultancy firm headquartered in New Delhi, India. 
            We partner with businesses worldwide to engineer bespoke software solutions, design scalable architectures, and deliver high-impact digital transformation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start"
          >
            <motion.a
              href="#contact"
              onClick={(e) => handleScrollTo(e, '#contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary-container text-on-primary-container px-8 sm:px-10 py-3.5 sm:py-4 rounded font-bold text-base sm:text-lg btn-glow transition-transform inline-block text-center"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href="#services"
              onClick={(e) => handleScrollTo(e, '#services')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-outline text-on-surface px-8 sm:px-10 py-3.5 sm:py-4 rounded font-bold text-base sm:text-lg hover:bg-surface-container-highest/20 transition-colors inline-block text-center"
            >
              Explore Services
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
