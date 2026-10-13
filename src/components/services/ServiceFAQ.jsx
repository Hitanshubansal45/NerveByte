"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollReveal } from '../../hooks/useUtils';

export default function ServiceFAQ({ faqs, serviceName }) {
  const [headerRef, headerVisible] = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest relative overflow-hidden" id="service-faq">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 mb-4 rounded-full border border-tertiary/20 bg-tertiary/5 font-[var(--font-mono)] text-[11px] font-medium tracking-[0.05em] text-tertiary uppercase">
            Common Questions
          </span>
          <h2 className="font-[var(--font-headline)] text-[28px] md:text-[40px] font-semibold leading-[1.2] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto font-[var(--font-body)] text-sm sm:text-base">
            Everything you need to know about our {serviceName} service.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem key={index} faq={faq} index={index} />
          ))}
        </div>
      </div>

      {/* JSON-LD FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}

function FAQItem({ faq, index }) {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, isVisible] = useScrollReveal();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="border border-outline-variant/15 rounded-xl overflow-hidden hover:border-primary/20 transition-colors duration-300"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left group"
        aria-expanded={isOpen}
        id={`faq-button-${index}`}
        aria-controls={`faq-panel-${index}`}
      >
        <span className="font-[var(--font-headline)] text-sm md:text-base font-semibold pr-4 group-hover:text-primary transition-colors">
          {faq.question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 text-primary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-panel-${index}`}
            role="region"
            aria-labelledby={`faq-button-${index}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 border-t border-outline-variant/10 pt-4">
              <p className="text-on-surface-variant font-[var(--font-body)] text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
