"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useTheme } from '../context/ThemeContext';
import { SERVICE_CATEGORIES, getServicesByCategory } from '../data/servicesData';

const NAV_LINKS = [
  { label: 'Services', href: '/services', hasDropdown: true },
  { label: 'About Us', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const sections = ['services', 'about', 'contact'];

    const observerOptions = {
      root: null,
      rootMargin: '-80px 0px -60% 0px',
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      if (isClickScrolling.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 100) {
        setActiveLink('');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleNavClick = useCallback((e, href) => {
    // Only handle hash links for smooth scroll on same page
    if (href.startsWith('/#') || href.startsWith('#')) {
      const hash = href.startsWith('/#') ? href.substring(1) : href;
      const element = document.querySelector(hash);
      if (element) {
        e.preventDefault();
        setActiveLink(hash);
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);

        isClickScrolling.current = true;
        if (clickTimeoutRef.current) clearTimeout(clickTimeoutRef.current);

        element.scrollIntoView({ behavior: 'smooth', block: 'start' });

        clickTimeoutRef.current = setTimeout(() => {
          isClickScrolling.current = false;
        }, 800);
      } else {
        setMobileMenuOpen(false);
        setServicesDropdownOpen(false);
      }
    } else {
      setMobileMenuOpen(false);
      setServicesDropdownOpen(false);
    }
  }, []);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 200);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 navbar-glass h-20 transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
        id="header"
      >
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-4 md:px-16 h-full">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="NerveByte Home">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="40" height="40" rx="8" fill="url(#logo-gradient)" />
                <path d="M12 28L20 12L28 28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 22H25" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                <defs>
                  <linearGradient id="logo-gradient" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#2563EB" />
                    <stop offset="1" stopColor="#14D39A" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <span className="font-[var(--font-headline)] text-2xl font-bold text-primary hidden md:inline">
              NerveByte
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 h-full" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <div
                key={link.href}
                className="relative h-full flex items-center"
                onMouseEnter={link.hasDropdown ? handleDropdownEnter : undefined}
                onMouseLeave={link.hasDropdown ? handleDropdownLeave : undefined}
              >
                {link.hasDropdown ? (
                  <Link
                    href={link.href}
                    className={`font-[var(--font-body)] text-base transition-colors duration-200 relative inline-flex items-center gap-1 ${
                      activeLink === link.href || servicesDropdownOpen
                        ? 'text-primary font-bold'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {link.label}
                    <motion.svg
                      animate={{ rotate: servicesDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`font-[var(--font-body)] text-base transition-colors duration-200 relative ${
                      activeLink === link.href
                        ? 'text-primary font-bold'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {link.label}
                    {activeLink === link.href && (
                      <motion.div
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                )}

                {/* Services Mega Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {servicesDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[700px] p-6 rounded-xl navbar-glass shadow-2xl border border-outline-variant/10 z-50"
                        onMouseEnter={handleDropdownEnter}
                        onMouseLeave={handleDropdownLeave}
                      >
                        <div className="grid grid-cols-2 gap-6">
                          {SERVICE_CATEGORIES.map((category) => {
                            const services = getServicesByCategory(category.id);
                            return (
                              <div key={category.id}>
                                <h3 className="font-[var(--font-headline)] text-xs font-bold uppercase tracking-wider text-primary mb-3 px-2">
                                  {category.title}
                                </h3>
                                <ul className="space-y-0.5">
                                  {services.map((service) => (
                                    <li key={service.slug}>
                                      <Link
                                        href={`/services/${service.slug}`}
                                        className="block px-2 py-1.5 rounded-lg text-sm text-on-surface-variant hover:text-primary hover:bg-primary/5 transition-all font-[var(--font-body)]"
                                        onClick={() => setServicesDropdownOpen(false)}
                                      >
                                        {service.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                        </div>
                        <div className="mt-4 pt-4 border-t border-outline-variant/10">
                          <Link
                            href="/services"
                            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline font-[var(--font-mono)] tracking-wide"
                            onClick={() => setServicesDropdownOpen(false)}
                          >
                            View All Services
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="5" y1="12" x2="19" y2="12" />
                              <polyline points="12 5 19 12 12 19" />
                            </svg>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2.5 rounded-full hover:bg-surface-container-highest/20 transition-all duration-300"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              id="theme-toggle"
            >
              <AnimatePresence mode="wait">
                <motion.svg
                  key={theme}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  {theme === 'dark' ? (
                    <>
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </>
                  ) : (
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                  )}
                </motion.svg>
              </AnimatePresence>
            </motion.button>

            {/* CTA Button (Desktop) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/#contact"
                className="hidden md:block bg-primary-container text-on-primary-container px-6 py-2.5 rounded font-semibold hover:opacity-90 transition-all btn-glow text-sm"
                onClick={(e) => handleNavClick(e, '/#contact')}
              >
                Get in Touch
              </Link>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-primary"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.g key="close" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </motion.g>
                  ) : (
                    <motion.g key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-80 z-50 bg-surface-container p-8 pt-24 md:hidden overflow-y-auto"
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col gap-4">
                {/* Services with collapsible submenu */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                    className="flex items-center justify-between w-full text-lg font-[var(--font-body)] text-on-surface-variant py-2"
                  >
                    <span>Services</span>
                    <motion.svg
                      animate={{ rotate: mobileServicesOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-4 pt-2 space-y-4">
                          {SERVICE_CATEGORIES.map((category) => {
                            const services = getServicesByCategory(category.id);
                            return (
                              <div key={category.id}>
                                <h4 className="font-[var(--font-headline)] text-xs font-bold uppercase tracking-wider text-primary mb-2">
                                  {category.title}
                                </h4>
                                <ul className="space-y-1">
                                  {services.map((service) => (
                                    <li key={service.slug}>
                                      <Link
                                        href={`/services/${service.slug}`}
                                        className="block py-1.5 text-sm text-on-surface-variant hover:text-primary transition-colors font-[var(--font-body)]"
                                        onClick={() => setMobileMenuOpen(false)}
                                      >
                                        {service.title}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            );
                          })}
                          <Link
                            href="/services"
                            className="block py-2 text-sm font-medium text-primary hover:underline"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            View All Services →
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* About Us */}
                <motion.a
                  href="/#about"
                  onClick={(e) => handleNavClick(e, '/#about')}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg font-[var(--font-body)] transition-colors text-on-surface-variant py-2"
                >
                  About Us
                </motion.a>

                {/* Contact */}
                <motion.a
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, '/#contact')}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-[var(--font-body)] transition-colors text-on-surface-variant py-2"
                >
                  Contact
                </motion.a>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    href="/#contact"
                    onClick={(e) => handleNavClick(e, '/#contact')}
                    className="mt-4 bg-primary-container text-on-primary-container px-6 py-3 rounded font-semibold text-center btn-glow block"
                  >
                    Get in Touch
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
