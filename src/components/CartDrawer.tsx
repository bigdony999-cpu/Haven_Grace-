/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { CartItem, Language } from '../types';
import { dictionary } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  language: Language;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  language,
}: CartDrawerProps) {
  const d = dictionary[language];

  const subtotalTsh = cartItems.reduce(
    (acc, item) => acc + item.product.priceTsh * item.quantity,
    0
  );

  const subtotalUsd = cartItems.reduce(
    (acc, item) => acc + item.product.priceUsd * item.quantity,
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-50 cursor-pointer"
          />

          {/* Right Sided Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white dark:bg-zinc-950 z-50 shadow-2xl flex flex-col border-l border-zinc-200 dark:border-zinc-850"
          >
            {/* Header */}
            <div className="p-5 border-b border-zinc-250 dark:border-zinc-800 flex justify-between items-center bg-zinc-50 dark:bg-zinc-900/40">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary dark:text-inverse-primary" />
                <h2 className="font-headline text-lg font-black text-zinc-900 dark:text-zinc-50">
                  {d.shoppingCart}
                </h2>
                <span className="bg-primary-container/20 text-primary dark:text-inverse-primary text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
                </span>
              </div>
              <button
                onClick={onClose}
                type="button"
                className="p-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-70 py-10">
                  <ShoppingBag className="w-16 h-16 text-zinc-300 dark:text-zinc-800 mb-4 stroke-[1.5]" />
                  <p className="font-body text-zinc-500 dark:text-zinc-400 font-medium">
                    {d.cartEmpty}
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex items-center gap-4 p-4 rounded-xl border border-zinc-150 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/10 hover:border-zinc-200 dark:hover:border-zinc-800 transition-colors"
                    >
                      {/* Product Mini Image */}
                      <div className="w-16 h-16 rounded-lg bg-zinc-100 dark:bg-zinc-900 overflow-hidden flex items-center justify-center p-1.5 flex-shrink-0">
                        <img
                          referrerPolicy="no-referrer"
                          src={item.product.image}
                          alt={item.product.size}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Product Name & Quantities */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-headline text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">
                          {item.product.name} ({item.product.size})
                        </h4>
                        <p className="font-body text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                          TSh {item.product.priceTsh.toLocaleString()} (~ ${item.product.priceUsd.toFixed(2)})
                        </p>
                        
                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            type="button"
                            className="w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-colors text-xs font-bold cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-body text-xs font-bold text-zinc-800 dark:text-zinc-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            type="button"
                            className="w-6 h-6 rounded bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 transition-colors text-xs font-bold cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Trash action */}
                      <div className="flex flex-col items-end gap-2">
                        <span className="font-headline text-sm font-extrabold text-primary dark:text-inverse-primary whitespace-nowrap">
                          TSh {(item.product.priceTsh * item.quantity).toLocaleString()}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          type="button"
                          className="p-1.5 rounded-lg text-zinc-350 hover:text-red-500 dark:hover:text-red-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Sticky Foot */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 space-y-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {d.subtotal}
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-black text-zinc-900 dark:text-zinc-50">
                      TSh {subtotalTsh.toLocaleString()}
                    </p>
                    <p className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">
                      (~ ${subtotalUsd.toFixed(2)})
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onCheckout}
                  className="w-full btn-gradient py-3.5 px-6 rounded-xl text-white font-bold flex items-center justify-center gap-2 text-sm shadow-md cursor-pointer active:scale-98"
                >
                  <span>{d.checkout}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
