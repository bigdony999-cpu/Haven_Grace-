/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { faqs, dictionary } from '../data';

interface FAQSectionProps {
  language: Language;
}

export default function FAQSection({ language }: FAQSectionProps) {
  const d = dictionary[language];
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 bg-zinc-50 dark:bg-zinc-900/40 transition-colors duration-300">
      <div className="px-4 md:px-16 max-w-4xl mx-auto">
        
        {/* Title */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 bg-primary/10 dark:bg-inverse-primary/10 rounded-2xl text-primary dark:text-inverse-primary mb-4">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="font-headline text-3xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight">
            {d.faqTitle}
          </h2>
          <p className="font-body text-sm text-zinc-550 dark:text-zinc-400 mt-2">
            {d.faqSubtitle}
          </p>
        </div>

        {/* Collapsible Accordion Grid */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            const question = language === 'en' ? faq.questionEng : faq.questionSwa;
            const answer = language === 'en' ? faq.answerEng : faq.answerSwa;

            return (
              <div 
                key={idx}
                className="rounded-2xl border border-zinc-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center gap-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/60 transition-colors"
                >
                  <span className="font-headline text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {question}
                  </span>
                  <ChevronDown className={`w-5 h-5 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 font-body text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-900/40">
                        {answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
