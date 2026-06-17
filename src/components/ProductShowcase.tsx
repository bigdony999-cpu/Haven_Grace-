/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Check, Tag, MessageSquare } from 'lucide-react';
import { Language, Product } from '../types';
import { products, dictionary } from '../data';

interface ProductShowcaseProps {
  language: Language;
  onAddToCart: (product: Product, quantity: number) => void;
}

export default function ProductShowcase({
  language,
  onAddToCart,
}: ProductShowcaseProps) {
  const d = dictionary[language];
  const [successId, setSuccessId] = useState<string | null>(null);

  const handleAddWithFeedback = (prod: Product) => {
    onAddToCart(prod, 1);
    setSuccessId(prod.id);
    setTimeout(() => {
      setSuccessId(null);
    }, 2000);
  };

  return (
    <section id="sizes" className="py-24 px-4 md:px-16 max-w-7xl mx-auto transition-all duration-300">
      
      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="font-headline text-3xl sm:text-4xl font-black text-primary dark:text-inverse-primary mb-4 tracking-tight">
          {d.sizesTitle}
        </h2>
        <p className="font-body text-zinc-650 dark:text-zinc-400 max-w-lg mx-auto">
          {d.sizesSubtitle}
        </p>
        <div className="w-24 h-1 bg-primary dark:bg-inverse-primary mx-auto rounded-full mt-4"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {products.map((prod) => {
          const isSuccess = successId === prod.id;
          const is5L = prod.id === 'size-5l';
          
          return (
            <motion.div
              type="Product"
              id={prod.id}
              key={prod.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col md:flex-row items-stretch gap-8 p-6 lg:p-8 rounded-3xl bg-white dark:bg-zinc-950 border border-zinc-200/60 dark:border-zinc-800/80 soft-shadow group hover:shadow-xl hover:border-primary/20 dark:hover:border-inverse-primary/20 transition-all duration-300"
            >
              {/* Product Image Column */}
              <div className="w-full md:w-1/2 overflow-hidden rounded-2xl relative bg-zinc-50 dark:bg-zinc-900/40 flex items-center justify-center">
                
                {/* Sale / Value Badge */}
                {is5L && (
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1 bg-amber-500 text-white font-headline text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{language === 'en' ? 'Saves TSh 5,500' : 'Okoa TSh 5,500'}</span>
                  </div>
                )}

                <img
                  referrerPolicy="no-referrer"
                  alt={prod.size}
                  src={`./assets/images/${prod.image}`}
                  className="w-full h-64 md:h-full min-h-[260px] object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Product Content Column */}
              <div className="w-full md:w-1/2 flex flex-col justify-between py-2">
                <div className="space-y-4">
                  {/* Category Accent */}
                  <span className={`inline-block font-body text-[10.5px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                    prod.tagType === 'primary' 
                      ? 'text-primary dark:text-inverse-primary bg-primary/10 dark:bg-inverse-primary/10' 
                      : 'text-tertiary-custom dark:text-amber-400 bg-tertiary-container-custom/15'
                  }`}>
                    {language === 'en' ? prod.tagEng : prod.tagSwa}
                  </span>

                  <div>
                    <h3 className="font-headline text-lg sm:text-xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight leading-tight">
                      {prod.name}
                    </h3>
                    <p className="font-body text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-1">
                      {prod.size}
                    </p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black text-primary dark:text-inverse-primary">
                      TSh {prod.priceTsh.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium text-zinc-400 dark:text-zinc-550">
                      (~ ${prod.priceUsd.toFixed(2)})
                    </span>
                  </div>

                  <p className="font-body text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {language === 'en' ? prod.descriptionEng : prod.descriptionSwa}
                  </p>
                </div>

                <div className="pt-6 space-y-3">
                  <button
                    onClick={() => handleAddWithFeedback(prod)}
                    type="button"
                    className={`w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2.5 transition-all text-sm cursor-pointer border ${
                      isSuccess
                        ? 'bg-emerald-600 border-emerald-600 text-white'
                        : 'bg-zinc-900 hover:bg-primary dark:bg-zinc-800 dark:hover:bg-inverse-primary/15 border-zinc-900 dark:border-zinc-800 text-white dark:hover:text-inverse-primary'
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isSuccess ? (
                        <motion.span
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" />
                          <span>{language === 'en' ? 'Added to Cart!' : 'Imewekwa!'}</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="normal"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          <span>{d.addToCart}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>

                  <button
                    onClick={() => {
                      const message = `Hello Haven Grace! I would like to order right away:\n• ${prod.name} (${prod.size}) - TSh ${prod.priceTsh.toLocaleString()}`;
                      const url = `https://wa.me/255787763741?text=${encodeURIComponent(message)}`;
                      try {
                        const w = window.open(url, '_blank');
                        if (!w || w.closed || typeof w.closed === 'undefined') {
                          window.location.href = url;
                        }
                      } catch (err) {
                        window.location.href = url;
                      }
                    }}
                    type="button"
                    className="w-full py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 text-sm cursor-pointer border border-emerald-600 dark:border-emerald-600/50 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-650 dark:text-emerald-400 hover:text-white transition-all active:scale-95 duration-200"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{language === 'en' ? 'Order on WhatsApp' : 'Agiza via WhatsApp'}</span>
                  </button>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
}
