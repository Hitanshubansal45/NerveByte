import { useRef, useEffect, useState, useCallback } from 'react';

/**
 * Custom hook for scroll-triggered reveal animations using IntersectionObserver.
 * Returns a ref to attach to the element and a boolean indicating visibility.
 */
export function useScrollReveal(options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -80px 0px', triggerOnce = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isVisible];
}

/**
 * Custom hook for animated counter. Counts from 0 to target value.
 */
export function useCounter(target, isVisible, duration = 2000) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    const startTime = performance.now();
    const numericTarget = parseInt(String(target).replace(/[^0-9]/g, ''), 10);

    function animate(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easedProgress * numericTarget);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [target, isVisible, duration]);

  return count;
}

/**
 * Sanitize user input to prevent XSS. Strips HTML tags and trims whitespace.
 */
export function sanitizeInput(value) {
  if (typeof value !== 'string') return '';
  // Remove HTML tags
  const stripped = value.replace(/<[^>]*>/g, '');
  // Trim and limit length
  return stripped.trim().slice(0, 1000);
}

/**
 * Validate email format
 */
export function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Debounce utility
 */
export function useDebounce(callback, delay) {
  const timeoutRef = useRef(null);

  const debouncedCallback = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedCallback;
}
