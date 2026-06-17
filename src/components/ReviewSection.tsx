/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';
import { Language } from '../types';
import { reviews, dictionary } from '../data';

interface ReviewSectionProps {
  language: Language;
}

export default function ReviewSection({ language }: ReviewSectionProps) {
  const d = dictionary[language];

  return (
    <section className="py-20 bg-white dark:bg-zinc-950 transition-colors duration-300">
      <div className="px-4 md:px-16 max-w-7xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {d.reviewHeading}
          </h2>
          <p className="font-body text-zinc-550 dark:text-zinc-400 mt-2 max-w-md mx-auto text-sm">
            {d.reviewSub}
          </p>
          <div className="w-12 h-1 bg-primary dark:bg-inverse-primary mx-auto rounded-full mt-4"></div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reviews.map((rev, idx) => {
            const quote = language === 'en' ? rev.textEng : rev.textSwa;
            return (
              <motion.div
                key={rev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 md:p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-800/65 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  {/* Rating stars */}
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-amber-400" />
                    ))}
                  </div>

                  <p className="font-body text-sm text-zinc-700 dark:text-zinc-300 italic leading-relaxed">
                    "{quote}"
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-6 mt-6 border-t border-zinc-200/50 dark:border-zinc-800">
                  <img
                    referrerPolicy="no-referrer"
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-zinc-200 dark:border-zinc-850"
                  />
                  <div>
                    <h4 className="font-headline text-sm font-bold text-zinc-900 dark:text-zinc-100">
                      {rev.author}
                    </h4>
                    <p className="font-body text-[11px] text-zinc-400 dark:text-zinc-550">
                      {rev.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
