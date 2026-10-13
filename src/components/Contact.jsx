"use client";

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import DOMPurify from 'dompurify';
import { useScrollReveal, sanitizeInput, isValidEmail } from '../hooks/useUtils';

const INITIAL_FORM_STATE = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  message: '',
};

const INITIAL_ERRORS = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  message: '',
};

export default function Contact() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const [leftRef, leftVisible] = useScrollReveal();
  const [rightRef, rightVisible] = useScrollReveal();

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) return `${name === 'firstName' ? 'First' : 'Last'} name is required`;
        if (value.trim().length < 2) return 'Must be at least 2 characters';
        if (value.trim().length > 50) return 'Must be less than 50 characters';
        if (!/^[a-zA-Z\s'-]+$/.test(value.trim())) return 'Only letters, spaces, hyphens, and apostrophes allowed';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!isValidEmail(value.trim())) return 'Please enter a valid email address';
        return '';
      case 'company':
        if (!value.trim()) return 'Company name is required';
        if (value.trim().length < 2) return 'Must be at least 2 characters';
        if (value.trim().length > 100) return 'Must be less than 100 characters';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Must be at least 10 characters';
        if (value.trim().length > 1000) return 'Must be less than 1000 characters';
        return '';
      default:
        return '';
    }
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    // Sanitize input in real-time
    const sanitized = sanitizeInput(value);
    // Additional DOMPurify sanitization
    const purified = DOMPurify.sanitize(sanitized, { ALLOWED_TAGS: [] });

    setFormData((prev) => ({ ...prev, [name]: purified }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  }, [validateField]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    let hasErrors = false;
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      newErrors[key] = error;
      if (error) hasErrors = true;
    });

    setErrors(newErrors);
    if (hasErrors) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setFormData(INITIAL_FORM_STATE);
      setErrors(INITIAL_ERRORS);
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateField]);

  return (
    <section className="py-32 bg-surface-container-high relative overflow-hidden" id="contact">
      {/* Background accent */}
      <div className="absolute inset-0 bg-primary/5 pointer-events-none" aria-hidden="true" />

      <div className="max-w-[1280px] mx-auto px-4 md:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Contact Info */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -30 }}
            animate={leftVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-[var(--font-headline)] text-[32px] md:text-[48px] font-semibold leading-[1.2] mb-6">
              Connect with our consultancy team
            </h2>
            <p className="font-[var(--font-body)] text-lg leading-relaxed text-on-surface-variant mb-10">
              Discuss your technology challenges, system architecture plans, or custom software requirements. Our experts will get back to you within 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-primary/10 rounded flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Email Address</p>
                  <p className="text-on-surface-variant">consulting@nervebyte.com</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 shrink-0 bg-primary/10 rounded flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-on-surface">Headquarters</p>
                  <p className="text-on-surface-variant">New Delhi, Delhi, India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Contact Form */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, x: 30 }}
            animate={rightVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="bg-deep-navy p-8 md:p-10 rounded-xl border border-outline-variant/20 shadow-2xl"
          >
            <form onSubmit={handleSubmit} noValidate id="contact-form" autoComplete="off">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="font-[var(--font-mono)] text-[13px] font-medium tracking-[0.05em] text-on-surface-variant block">
                    First Name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="John"
                    maxLength={50}
                    required
                    autoComplete="given-name"
                    className={`w-full form-input rounded p-3 outline-none transition-all ${
                      errors.firstName ? 'border-error/80 focus:border-error' : ''
                    }`}
                    aria-invalid={!!errors.firstName}
                    aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="text-error text-xs mt-1" role="alert">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="font-[var(--font-mono)] text-[13px] font-medium tracking-[0.05em] text-on-surface-variant block">
                    Last Name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Doe"
                    maxLength={50}
                    required
                    autoComplete="family-name"
                    className={`w-full form-input rounded p-3 outline-none transition-all ${
                      errors.lastName ? 'border-error/80 focus:border-error' : ''
                    }`}
                    aria-invalid={!!errors.lastName}
                    aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="text-error text-xs mt-1" role="alert">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="email" className="font-[var(--font-mono)] text-[13px] font-medium tracking-[0.05em] text-on-surface-variant block">
                  Work Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="john@company.com"
                  maxLength={254}
                  required
                  autoComplete="email"
                  className={`w-full form-input rounded p-3 outline-none transition-all ${
                    errors.email ? 'border-error/80 focus:border-error' : ''
                  }`}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-error text-xs mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="company" className="font-[var(--font-mono)] text-[13px] font-medium tracking-[0.05em] text-on-surface-variant block">
                  Company Name
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your Company LLC"
                  maxLength={100}
                  required
                  autoComplete="organization"
                  className={`w-full form-input rounded p-3 outline-none transition-all ${
                    errors.company ? 'border-error/80 focus:border-error' : ''
                  }`}
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? 'company-error' : undefined}
                />
                {errors.company && (
                  <p id="company-error" className="text-error text-xs mt-1" role="alert">
                    {errors.company}
                  </p>
                )}
              </div>

              <div className="space-y-2 mb-6">
                <label htmlFor="message" className="font-[var(--font-mono)] text-[13px] font-medium tracking-[0.05em] text-on-surface-variant block">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="How can we help you?"
                  rows={4}
                  maxLength={1000}
                  required
                  className={`w-full form-input rounded p-3 outline-none resize-none transition-all ${
                    errors.message ? 'border-error/80 focus:border-error' : ''
                  }`}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-error text-xs mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                className={`w-full bg-primary-container text-on-primary-container py-4 rounded font-bold btn-glow transition-all ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Request'
                )}
              </motion.button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded bg-vibrant-teal/10 border border-vibrant-teal/20 text-vibrant-teal text-sm text-center"
                  role="status"
                >
                  ✓ Request submitted successfully! Our team will reach out shortly.
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 rounded bg-error/10 border border-error/20 text-error text-sm text-center"
                  role="alert"
                >
                  Something went wrong. Please try again later.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
