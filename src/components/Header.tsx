/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sun, Moon, Languages, ShoppingCart } from 'lucide-react';
import { Language } from '../types';
import { dictionary } from '../data';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  cartCount: number;
  onOpenCart: () => void;
  view?: 'home' | 'learn-more';
  setView?: (v: 'home' | 'learn-more') => void;
}

export default function Header({
  language,
  setLanguage,
  darkMode,
  setDarkMode,
  cartCount,
  onOpenCart,
  view = 'home',
  setView,
}: HeaderProps) {
  const d = dictionary[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'sw' : 'en');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const scrollToSection = (id: string) => {
    if (view !== 'home' && setView) {
      setView('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-colors duration-300">
      <div className="flex justify-between items-center px-4 md:px-16 py-4 max-w-7xl mx-auto">
        
        {/* Logo / Brand Name */}
        <div 
          onClick={() => {
            if (view !== 'home' && setView) {
              setView('home');
            } else {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2 cursor-pointer font-headline text-2xl lg:text-3xl font-extrabold text-primary dark:text-inverse-primary tracking-tight select-none"
        >
          <span className="bg-primary/10 dark:bg-inverse-primary/10 px-2 py-0.5 rounded-lg text-primary dark:text-inverse-primary text-xl font-black">HG</span>
          <span>Haven Grace</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 font-body">
          <button 
            type="button"
            onClick={() => scrollToSection('benefits')}
            className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-inverse-primary transition-colors cursor-pointer"
          >
            {d.navBenefits}
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('how-to-use')}
            className="text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:text-primary dark:hover:text-inverse-primary transition-colors cursor-pointer"
          >
            {d.navHowToUse}
          </button>
          <button 
            type="button"
            onClick={() => scrollToSection('sizes')}
            className="text-sm font-bold text-primary dark:text-inverse-primary hover:text-primary-hover border-b-2 border-primary dark:border-inverse-primary pb-0.5 transition-colors cursor-pointer"
          >
            {d.navOrder}
          </button>
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Dark Mode Toggle */}
          <button
            type="button"
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-2.5 rounded-full text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200 relative group cursor-pointer"
          >
            {darkMode ? (
              <Sun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-5 h-5 text-primary group-hover:-rotate-12 transition-transform" />
            )}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all text-[10px] bg-zinc-800 text-white px-2 py-0.5 rounded-md shadow whitespace-nowrap">
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          {/* Language Toggle */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Toggle Language"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all cursor-pointer"
          >
            <Languages className="w-4 h-4 text-primary dark:text-inverse-primary" />
            <span className="uppercase">{language}</span>
          </button>

          {/* Premium Interactive Shopping Cart Notification */}
          <button
            type="button"
            onClick={onOpenCart}
            aria-label="Open Cart"
            className="p-2.5 rounded-full bg-primary/5 dark:bg-inverse-primary/5 text-primary dark:text-inverse-primary hover:bg-primary/10 dark:hover:bg-inverse-primary/10 relative group transition-all duration-200 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-primary-container text-white text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-bounce shadow-md">
                {cartCount}
              </span>
            )}
          </button>
          
        </div>

      </div>
    </header>
  );
}
