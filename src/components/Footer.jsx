"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';

const FOOTER_LINKS = {
  Navigation: [
    { label: 'Services', href: '/services' },
    { label: 'About Us', href: '/#about' },
    { label: 'Get in Touch', href: '/#contact' },
  ],
  'Key Services': [
    { label: 'Cloud Strategy', href: '/services/cloud-strategy-consulting' },
    { label: 'Full Stack Development', href: '/services/full-stack-development' },
    { label: 'Artificial Intelligence', href: '/services/artificial-intelligence' },
    { label: 'Cybersecurity Audits', href: '/services/cybersecurity-audits' },
    { label: 'Staff Augmentation', href: '/services/on-demand-developers' },
    { label: 'Quality Assurance', href: '/services/automated-testing-solutions' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const SOCIAL_ICONS = [
  {
    label: 'Website',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 17 10 11 4 5" />
        <line x1="12" y1="19" x2="20" y2="19" />
      </svg>
    ),
  },
];

export default function Footer() {
  const handleLinkClick = (e, href) => {
    if (href.startsWith('/#')) {
      const hash = href.substring(1);
      const element = document.querySelector(hash);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        e.preventDefault();
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-surface-container-lowest border-t border-surface-variant/10 pt-20 pb-10" id="footer">
      <div className="max-w-[1280px] mx-auto px-4 md:px-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-6">
              <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="40" height="40" rx="8" fill="url(#footer-logo-gradient)" />
                <path d="M12 28L20 12L28 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 22H25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="footer-logo-gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#14D39A" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-[var(--font-headline)] text-2xl font-bold text-primary">
                NerveByte
              </span>
            </div>
            <p className="text-on-surface-variant font-[var(--font-body)]">
              Bespoke IT & technology consultancy delivering custom software engineering and digital transformation strategies.
            </p>
          </div>

          {/* Link Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(FOOTER_LINKS).map(([category, links]) => (
              <div key={category}>
                <h6 className="font-bold text-on-surface mb-6 font-[var(--font-mono)] text-[13px] uppercase tracking-wider">
                  {category}
                </h6>
                <ul className="space-y-4 text-on-surface-variant">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') && !link.href.startsWith('/#') ? (
                        <Link
                          href={link.href}
                          className="hover:text-primary transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link.href)}
                          className="hover:text-primary transition-colors duration-200 text-sm"
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-surface-variant/10 gap-6">
          <p className="text-on-surface-variant text-sm">
            © {new Date().getFullYear()} NerveByte Infotech Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-6">
            {SOCIAL_ICONS.map((social) => (
              <motion.a
                key={social.label}
                href="#"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                className="text-on-surface-variant hover:text-primary transition-colors duration-200"
                aria-label={social.label}
                rel="noopener noreferrer"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
