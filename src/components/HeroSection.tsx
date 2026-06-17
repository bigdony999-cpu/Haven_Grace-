/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, Compass } from 'lucide-react';
import { Language } from '../types';
import { dictionary } from '../data';

interface HeroSectionProps {
  language: Language;
  onOrderClick: () => void;
  onLearnMoreClick: () => void;
}

export default function HeroSection({
  language,
  onOrderClick,
  onLearnMoreClick,
}: HeroSectionProps) {
  const d = dictionary[language];

  return (
    <section className="relative px-4 md:px-16 py-12 md:py-24 max-w-7xl mx-auto overflow-hidden hero-gradient">
      
      {/* Decorative Background Bubbles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-container/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Hero Left Content Column */}
        <motion.div 
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-inverse-primary/10 px-4 py-1.5 rounded-full text-xs font-bold text-primary dark:text-inverse-primary font-body tracking-wider uppercase w-fit select-none">
            ✨ {language === 'en' ? 'Dermatologist Safe' : 'Salama kwa Mikono'}
          </div>

          <h1 className="font-headline text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-zinc-900 dark:text-zinc-50 transition-colors">
            {d.taglineLight}
            <span className="block mt-2 bg-gradient-to-r from-primary to-primary-container bg-clip-text text-transparent">
              {d.taglineBold}
            </span>
          </h1>

          <p className="font-body text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-xl leading-relaxed">
            {d.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onOrderClick}
              type="button"
              className="btn-gradient px-8 py-4 rounded-full text-white font-bold flex items-center gap-2.5 transition-all text-sm md:text-base cursor-pointer shadow-lg active:scale-95"
            >
              <span>{d.orderNow}</span>
              <ShoppingCart className="w-5 h-5" />
            </button>
            <button
              onClick={onLearnMoreClick}
              type="button"
              className="px-8 py-4 rounded-full border-2 border-zinc-300 dark:border-zinc-700 hover:border-primary dark:hover:border-inverse-primary text-zinc-700 dark:text-zinc-200 hover:text-primary dark:hover:text-inverse-primary font-bold flex items-center gap-2 transition-all text-sm md:text-base cursor-pointer hover:bg-primary/5 active:scale-95"
            >
              <span>{d.learnMore}</span>
              <Compass className="w-5 h-5 text-zinc-400 dark:text-zinc-500" />
            </button>
          </div>

          <div className="flex items-center gap-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
            <div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">99.9%</div>
              <div className="text-xs text-zinc-500">{language === 'en' ? 'Germ Protection' : 'Kinga ya Wadudu'}</div>
            </div>
            <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800"></div>
            <div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">TSh 3,000</div>
              <div className="text-xs text-zinc-500">{language === 'en' ? 'Starting Price' : 'Kuanzia TSh'}</div>
            </div>
            <div className="w-px h-8 bg-zinc-200 dark:bg-zinc-800"></div>
            <div>
              <div className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">4.9 ★</div>
              <div className="text-xs text-zinc-500">1,200+ {language === 'en' ? 'Reviews' : 'Maoni Mapya'}</div>
            </div>
          </div>
        </motion.div>

        {/* Hero Right Visual Image Column */}
        <motion.div 
          className="relative group"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
        >
          <div className="absolute -inset-4 bg-primary/10 dark:bg-inverse-primary/15 rounded-full blur-3xl opacity-60 group-hover:opacity-85 transition-opacity pointer-events-none duration-700"></div>
          
          <motion.div 
            className="relative z-10 overflow-hidden rounded-2xl border border-zinc-200/30 dark:border-zinc-800/30 shadow-2xl bg-zinc-100 dark:bg-zinc-900"
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <img 
              referrerPolicy="no-referrer"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbAb6MrDLBZA_-ousLC6OHFCdR3uRLwzZzkcWgdgiJV5gnWElvaOt9ngwm2rMmSXl-gX50r0894KIYw5ppSF2JhkxhicWM8DqPf8ZghvscFF85joLASHQ-FEbPmJz-F_hujdzsXrYvzEr3t8tybV5v3_AE2SKOUJ4M7AQaRUG3sNvDAZTCvOEnPPLe7mJeZYywwpV1559xl-NReLFpelxiQ_Df506alGbjlMaeCkHECTOHJoPjKT3f3FqJDw7oIMdhAMlW7-T20CU" 
              alt="Haven Grace Detergent Premium Bottles" 
              className="w-full h-auto drop-shadow-2xl transform transition-transform group-hover:scale-102 duration-500 py-1"
            />
            {/* Embedded Promotion Banner */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
                <div>
                  <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50 font-headline">Dar es Salaam Delivery</p>
                  <p className="text-[10px] text-zinc-500 font-body">{language === 'en' ? 'Arrives in 2-4 hours!' : 'Inafika haraka sana ndio!'}</p>
                </div>
              </div>
              <span className="text-xs font-bold bg-primary-container/10 text-primary dark:text-inverse-primary px-2 py-1 rounded-md">
                TSh 12,000 (5L)
              </span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
