/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Sparkles, MessageCircle, Instagram, Flame } from 'lucide-react';
import { Language } from '../types';
import { dictionary } from '../data';

interface FooterProps {
  language: Language;
}

export default function Footer({ language }: FooterProps) {
  const d = dictionary[language];

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-200/50 dark:border-zinc-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-16 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start justify-between">
          
          {/* Identity column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-headline text-2xl font-black text-primary dark:text-inverse-primary select-none">
              <span className="bg-primary/10 dark:bg-inverse-primary/10 px-2 py-0.5 rounded-lg text-primary dark:text-inverse-primary text-lg font-black">HG</span>
              <span>Haven Grace</span>
            </div>
            <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-normal">
              {language === 'en' 
                ? 'High-performance liquid detergent manufactured with love and care for Tanzanian families. Powerful on grease, soft on skins.' 
                : 'Sabuni ya maji yenye nguvu ya kipekee iliyotengenezwa kwa upendo kwa ajili ya familia za Tanzania. Machachari dhidi ya madoa, laini mikononi.'}
            </p>
            <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500 font-body">
              {d.allRights}
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-headline text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
              {language === 'en' ? 'Quick Links' : 'Njia za Haraka'}
            </h4>
            <div className="flex flex-col gap-2.5 font-body text-sm text-zinc-600 dark:text-zinc-400">
              <a href="#benefits" className="hover:text-primary dark:hover:text-inverse-primary transition-colors">
                {d.navBenefits}
              </a>
              <a href="#sizes" className="hover:text-primary dark:hover:text-inverse-primary transition-colors">
                {d.sizesTitle}
              </a>
              <a href="#order-now" className="hover:text-primary dark:hover:text-inverse-primary transition-colors">
                {d.navOrder}
              </a>
            </div>
          </div>

          {/* Contact Details & Social Links */}
          <div className="space-y-4">
            <h4 className="font-headline text-xs font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-widest">
              {language === 'en' ? 'Contact & Social' : 'Mawasiliano na Jamii'}
            </h4>
            <div className="flex flex-col gap-2 font-body text-sm text-zinc-600 dark:text-zinc-400">
              <p>Email: <span className="text-zinc-900 dark:text-zinc-300 font-medium">support@havengrace.co.tz</span></p>
              <p>{language === 'en' ? 'Phone' : 'Simu'}: <span className="text-zinc-900 dark:text-zinc-300 font-medium">+255 787 763 741</span></p>
              <p>{language === 'en' ? 'Office' : 'Ofisi'}: <span className="text-zinc-900 dark:text-zinc-300 font-medium font-body">Dar es Salaam, Tanzania</span></p>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a
                href="https://wa.me/255787763741"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Support"
                className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-primary hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600/25 dark:hover:text-emerald-400 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/havenproducts_tz"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram Page"
                className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-primary hover:bg-gradient-to-br hover:from-pink-500 hover:to-violet-600 hover:text-white dark:hover:bg-pink-550/20 dark:hover:text-pink-400 transition-all cursor-pointer"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <div
                aria-label="Glow"
                className="w-10 h-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-primary hover:bg-primary hover:text-white dark:hover:bg-inverse-primary/10 dark:hover:text-inverse-primary transition-all cursor-pointer select-none"
              >
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
