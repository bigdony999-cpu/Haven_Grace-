/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';

interface ScrollToTopProps {
  language: Language;
}

export default function ScrollToTop({ language }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button past the threshold (approx. past the hero section)
      if (window.scrollY > 480) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const label = language === 'en' ? 'Back to top' : 'Rudi Juu';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          id="btn-scroll-to-top"
          onClick={scrollToTop}
          type="button"
          aria-label={label}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-40 flex items-center justify-center p-3.5 rounded-full bg-primary text-white border border-primary-container/20 shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/20 dark:bg-inverse-primary dark:text-zinc-950 transition-shadow group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-inverse-primary focus:ring-offset-2"
        >
          <ArrowUp className="w-5 h-5 stroke-[2.5px] transition-transform group-hover:-translate-y-1" />
          <span className="sr-only">{label}</span>
          
          {/* Subtle Hover Tooltip */}
          <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 text-[11px] font-bold bg-zinc-900/90 dark:bg-zinc-100/95 text-white dark:text-zinc-900 px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
            {label}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
