/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, Leaf } from 'lucide-react';
import { Language } from '../types';
import { dictionary } from '../data';

interface FeaturesGridProps {
  language: Language;
}

export default function FeaturesGrid({ language }: FeaturesGridProps) {
  const d = dictionary[language];

  const features = [
    {
      icon: Sparkles,
      title: d.featureCard1Title,
      text: d.featureCard1Text,
      color: 'from-emerald-500/20 to-teal-500/10'
    },
    {
      icon: Layers,
      title: d.featureCard2Title,
      text: d.featureCard2Text,
      color: 'from-emerald-500/20 to-lime-500/10'
    },
    {
      icon: Leaf,
      title: d.featureCard3Title,
      text: d.featureCard3Text,
      color: 'from-amber-500/20 to-emerald-500/10'
    }
  ];

  return (
    <section id="benefits" className="bg-zinc-50 dark:bg-zinc-900/50 py-20 relative overflow-hidden transition-colors duration-300">
      
      {/* Visual Dot Overlays */}
      <div className="absolute inset-0 bubble-pattern opacity-65 pointer-events-none"></div>

      <div className="px-4 md:px-16 max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-headline text-3xl sm:text-4xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {d.benefitsTitle}
          </h2>
          <p className="mt-4 font-body text-zinc-600 dark:text-zinc-400">
            {d.benefitsSubtitle}
          </p>
          <div className="w-16 h-1 bg-primary dark:bg-inverse-primary mx-auto rounded-full mt-6"></div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass-card p-8 rounded-2xl soft-shadow flex flex-col gap-5 text-center items-center group relative overflow-hidden"
              >
                {/* Accent Background Glow */}
                <div className={`absolute -right-20 -top-20 w-44 h-44 bg-gradient-to-br ${feat.color} rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                {/* Rounded Icon Shield */}
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary/10 dark:bg-inverse-primary/10 text-primary dark:text-inverse-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8" />
                </div>

                <h3 className="relative z-10 font-headline text-xl font-extrabold text-zinc-900 dark:text-zinc-50">
                  {feat.title}
                </h3>
                
                <p className="relative z-10 font-body text-sm text-zinc-650 dark:text-zinc-450 leading-relaxed max-w-xs">
                  {feat.text}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
