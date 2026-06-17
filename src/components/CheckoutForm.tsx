/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, MessageSquare, CheckCircle, Clock, Truck, ShieldAlert, ArrowRight } from 'lucide-react';
import { CartItem, Language, OrderDetails } from '../types';
import { dictionary } from '../data';
import paymentInstructions from '../assets/images/payment_instructions.jpg';

interface CheckoutFormProps {
  language: Language;
  cartItems: CartItem[];
  onClearCart: () => void;
  onAddToCart: (productId: string) => void;
}

export default function CheckoutForm({
  language,
  cartItems,
  onClearCart,
  onAddToCart,
}: CheckoutFormProps) {
  const d = dictionary[language];

  // Form states
  const [formData, setFormData] = useState<OrderDetails>({
    name: '',
    phone: '',
    location: '',
    deliveryTime: 'immediate',
    specialInstructions: '',
    senderName: '',
  });

  const [errors, setErrors] = useState<Partial<OrderDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [invoiceCode, setInvoiceCode] = useState('');
  const [countdown, setCountdown] = useState(105); // 1 hour 45 minutes in minutes
  const [cartError, setCartError] = useState<string | null>(null);

  // Clear cart error when items are added to the basket
  useEffect(() => {
    if (cartItems.length > 0) {
      setCartError(null);
    }
  }, [cartItems]);

  // Countdown clock effect
  useEffect(() => {
    if (orderSuccess && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 60000); // decrement minutes
      return () => clearInterval(timer);
    }
  }, [orderSuccess, countdown]);

  const validate = () => {
    const newErrors: Partial<OrderDetails> = {};
    if (!formData.name.trim()) newErrors.name = language === 'en' ? 'Name is required' : 'Jina linahitajika';
    if (!formData.phone.trim()) {
      newErrors.phone = language === 'en' ? 'Phone is required' : 'Namba ya simu inahitajika';
    } else if (!/^(06|07|08|01|\+255)\d{8,9}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = language === 'en' ? 'Enter a valid phone number' : 'Ingiza namba ya simu iliyo sahihi';
    }
    if (!formData.location.trim()) newErrors.location = language === 'en' ? 'Delivery address is required' : 'Eneo la kutolea linahitajika';
    if (!formData.senderName || !formData.senderName.trim()) {
      newErrors.senderName = language === 'en' ? 'Sender name is required' : 'Jina la mtumaji linahitajika';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name as keyof OrderDetails]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    if (!validate()) return;

    if (cartItems.length === 0) {
      setCartError(language === 'en' ? 'Please add at least one detergent size to your cart!' : 'Tafadhali weka angalau kipimo kimoja kwenye kikapu chako!');
      return;
    }

    setCartError(null);
    setIsSubmitting(true);

    const generatedCode = `HG-${Math.floor(10000 + Math.random() * 90000)}`;
    setInvoiceCode(generatedCode);

    // Trigger WhatsApp instantly to secure synchronous user-initiated activation and redirect
    triggerWhatsApp(generatedCode);

    setIsSubmitting(false);
    setOrderSuccess(true);
  };

  // Compile exact WhatsApp link for Tanzanian phone
  const triggerWhatsApp = (codeToUse?: string) => {
    const activeCode = codeToUse || invoiceCode || `HG-${Math.floor(10000 + Math.random() * 90000)}`;
    const itemsList = cartItems
      .map((item) => `• ${item.product.name} - ${item.product.size} (Qty: ${item.quantity}) - TSh ${(item.product.priceTsh * item.quantity).toLocaleString()}`)
      .join('\n');
    
    const subtotal = cartItems.reduce((acc, item) => acc + item.product.priceTsh * item.quantity, 0);

    const message = `*NEW HAVEN GRACE ORDER (${activeCode})*\n` +
      `----------------------------------------\n` +
      `*Customer Name:* ${formData.name}\n` +
      `*Phone Number:* ${formData.phone}\n` +
      `*Address/Location:* ${formData.location}\n` +
      `*Preferred Delivery:* ${formData.deliveryTime}\n` +
      `*Special Instructions:* ${formData.specialInstructions || 'None'}\n` +
      `*Payment Sender Name:* ${formData.senderName || 'Not confirmed'}\n\n` +
      `*ITEMS ORDERED:*\n${itemsList}\n` +
      `----------------------------------------\n` +
      `*TOTAL PAYABLE (Tigo Pesa/M-Pesa/Airtel Money/Halopesa/Cash on Delivery):* TSh ${subtotal.toLocaleString()}\n\n` +
      `Please confirm dispatch!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/255787763741?text=${encodedMessage}`;
    
    try {
      const w = window.open(whatsappUrl, '_blank');
      if (!w || w.closed || typeof w.closed === 'undefined') {
        window.location.href = whatsappUrl;
      }
    } catch (err) {
      window.location.href = whatsappUrl;
    }
  };

  const handleReset = () => {
    setOrderSuccess(false);
    onClearCart();
    setFormData({
      name: '',
      phone: '',
      location: '',
      deliveryTime: 'immediate',
      specialInstructions: '',
      senderName: '',
    });
  };

  const subtotalTsh = cartItems.reduce((acc, curr) => acc + curr.product.priceTsh * curr.quantity, 0);

  return (
    <section id="order-now" className="py-24 bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-950 dark:to-zinc-900 transition-colors duration-300">
      <div className="px-4 md:px-16 max-w-7xl mx-auto">
        
        <AnimatePresence mode="wait">
          {!orderSuccess ? (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
            >
              {/* Form Column */}
              <div className="lg:col-span-7 bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 soft-shadow">
                <div className="mb-8">
                  <span className="text-xs font-bold text-primary dark:text-inverse-primary tracking-wider uppercase font-body bg-primary/10 dark:bg-inverse-primary/10 px-3 py-1 rounded-full">
                    {language === 'en' ? 'Cash on Delivery' : 'Lipa Ukipokea'}
                  </span>
                  <h3 className="font-headline text-2xl lg:text-3.5xl font-black text-zinc-900 dark:text-zinc-50 mt-3">
                    {d.checkoutTitle}
                  </h3>
                  <p className="font-body text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                    {d.checkoutSub}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest font-headline mb-2">
                      {language === 'en' ? 'Full Name' : 'Jina Kamili'}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={d.placeholderName}
                      className={`w-full px-4 py-3 rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/10 text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all ${
                        errors.name ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 font-body mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone and Delivery Slot row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest font-headline mb-2">
                        {language === 'en' ? 'Active Phone Number' : 'Namba ya Simu Inayotumika'}
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={d.placeholderPhone}
                        className={`w-full px-4 py-3 rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/10 text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all ${
                          errors.phone ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100'
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 font-body mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest font-headline mb-2">
                        {d.preferredTime}
                      </label>
                      <select
                        name="deliveryTime"
                        value={formData.deliveryTime}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 text-sm font-body text-zinc-800 dark:text-zinc-100 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all cursor-pointer"
                      >
                        <option value="immediate">{d.timeOption1}</option>
                        <option value="evening">{d.timeOption2}</option>
                        <option value="tomorrow">{d.timeOption3}</option>
                      </select>
                    </div>
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest font-headline mb-2">
                      {language === 'en' ? 'Delivery Address' : 'Eneo la Safirishaji'}
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder={d.placeholderLoc}
                      className={`w-full px-4 py-3 rounded-xl border bg-zinc-50/50 dark:bg-zinc-900/10 text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-inverse-primary outline-none transition-all ${
                        errors.location ? 'border-red-500 focus:border-red-500' : 'border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-100'
                      }`}
                    />
                    {errors.location && (
                      <p className="text-xs text-red-500 font-body mt-1">{errors.location}</p>
                    )}
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest font-headline mb-2">
                      {d.specialInstructions}
                    </label>
                    <textarea
                      name="specialInstructions"
                      rows={3}
                      value={formData.specialInstructions}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'Apartment name, house number, floor details...' : 'Jina la ghorofa, namba ya nyumba, alama ya karibu kama duka...'}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/10 text-sm text-zinc-800 dark:text-zinc-100 font-body outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-inverse-primary transition-all resize-none"
                    />
                  </div>

                  {cartError && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-650 dark:text-red-400 text-xs font-semibold font-body animate-pulse">
                      ⚠️ {cartError}
                    </div>
                  )}

                  {/* Bottom Checkout Button */}
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full btn-gradient py-4 rounded-full text-white font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-98 transition-all disabled:opacity-50 text-sm md:text-base cursor-pointer"
                  >
                    <span>{isSubmitting ? 'Processing Order...' : d.checkout}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>

              {/* Cart Summary Panel Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-zinc-50 dark:bg-zinc-950 p-6 lg:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-6">
                    <ShoppingBag className="w-5 h-5 text-primary dark:text-inverse-primary" />
                    <h4 className="font-headline text-lg font-black text-zinc-950 dark:text-zinc-100">
                      {language === 'en' ? 'Your Selected Items' : 'Bidhaa Zilizochaguliwa'}
                    </h4>
                  </div>

                  {cartItems.length === 0 ? (
                    <div className="py-12 text-center rounded-2xl border border-dashed border-zinc-300 dark:border-zinc-800 p-6">
                      <p className="font-body text-zinc-500 dark:text-zinc-400 text-sm font-medium mb-4">
                        {language === 'en' 
                          ? 'Your basket is empty. Add a product size to get started!' 
                          : 'Kikapu chako kiko wazi. Ongeza kipimo kupata nafasi kuagiza!'}
                      </p>
                      <div className="grid grid-cols-2 gap-2 justify-center">
                        <button
                          onClick={() => onAddToCart('size-1l')}
                          type="button"
                          className="px-2 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        >
                          + Multipurpose 1L
                        </button>
                        <button
                          onClick={() => onAddToCart('size-5l')}
                          type="button"
                          className="px-2 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        >
                          + Multipurpose 5L
                        </button>
                        <button
                          onClick={() => onAddToCart('toilet-cleaner')}
                          type="button"
                          className="px-2 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        >
                          + Toilet Cleaner 5L
                        </button>
                        <button
                          onClick={() => onAddToCart('handwash')}
                          type="button"
                          className="px-2 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer"
                        >
                          + Handwash
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.product.id} className="flex justify-between items-center py-2 border-b border-zinc-200/50 dark:border-zinc-900/60">
                          <div>
                            <p className="font-headline text-sm font-extrabold text-zinc-900 dark:text-zinc-55">
                              {item.product.name} - {item.product.size} (Qty: {item.quantity})
                            </p>
                            <p className="font-body text-[11px] text-zinc-400 dark:text-zinc-500">
                              TSh {item.product.priceTsh.toLocaleString()} {language === 'en' ? 'each' : 'kila moja'}
                            </p>
                          </div>
                          <span className="font-headline text-sm font-black text-zinc-900 dark:text-zinc-50">
                            TSh {(item.product.priceTsh * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}

                      <div className="pt-4 space-y-2">
                        <div className="flex justify-between text-xs font-medium text-zinc-400 dark:text-zinc-500">
                          <span>{language === 'en' ? 'Delivery Fee' : 'Gharama ya Usafiri'}</span>
                          <span className="text-primary dark:text-inverse-primary uppercase font-bold text-[10.5px]">
                            {language === 'en' ? 'FREE Delivery' : 'BURE Kabisa'}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800 items-baseline">
                          <span className="font-headline text-sm font-black text-zinc-900 dark:text-zinc-50">
                            {language === 'en' ? 'Total Amount' : 'Jumla Kabisa'}
                          </span>
                          <div className="text-right">
                            <p className="text-2xl font-black text-primary dark:text-inverse-primary leading-tight">
                              TSh {subtotalTsh.toLocaleString()}
                            </p>
                            <p className="text-[10px] text-zinc-400 dark:text-zinc-550">
                              No hidden costs
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-orange-500/5 dark:bg-amber-400/5 border border-orange-200/20 dark:border-amber-400/10 flex gap-3 mt-6">
                    <ShieldAlert className="w-5 h-5 text-orange-600 dark:text-amber-400 flex-shrink-0" />
                    <p className="text-xs text-orange-850 dark:text-zinc-400 leading-normal font-body">
                      {language === 'en' 
                        ? 'Secure Delivery Guarantee: You pay only AFTER inspect and receipt of Haven Grace.' 
                        : 'Uhuru wa Malipo: Utalipia tu BAADA ya kukagua na kuridhishwa na chupa yako ya sabuni.'}
                    </p>
                  </div>
                </div>

                {/* New Payment Section */}
                <div className="bg-zinc-50 dark:bg-zinc-950 p-6 lg:p-8 rounded-3xl border border-zinc-200/60 dark:border-zinc-800 space-y-5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-inverse-primary animate-pulse" />
                    <h4 className="font-headline text-lg font-black text-zinc-950 dark:text-zinc-100">
                      {language === 'en' ? 'Payment Section' : 'Sehemu ya Malipo'}
                    </h4>
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-body">
                    {language === 'en'
                      ? 'The number shown in the photo is our "Lipa Number". You can use it to pay for the product/service, then confirm the sender’s name below:'
                      : 'Namba iliyopo kwenye picha ni "Lipa Namba" yetu. Unaweza kuitumia kulipia bidhaa au huduma, kisha uthibitishe jina la mtumaji hapa chini:'}
                  </p>

                  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden bg-white dark:bg-zinc-900/50 p-1.5 shadow-sm">
                    <img
                      src={paymentInstructions}
                      alt="Payment Instructions"
                      className="w-full h-auto object-contain rounded-xl max-h-96 mx-auto"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-2 pt-1">
                    <label className="block text-xs font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-widest font-headline">
                      {language === 'en' ? 'Confirm the name of the sender' : 'Thibitisha jina la mtumaji'}
                    </label>
                    <input
                      type="text"
                      name="senderName"
                      value={formData.senderName || ''}
                      onChange={handleChange}
                      placeholder={language === 'en' ? 'e.g., Godwin Jonson' : 'mfano, Godwin Jonson'}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/10 text-sm text-zinc-800 dark:text-zinc-100 font-body outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary dark:focus:border-inverse-primary transition-all shadow-inner"
                    />
                    {errors.senderName && (
                      <p className="text-red-500 dark:text-red-400 text-xs font-semibold mt-1">
                        ⚠️ {errors.senderName}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    type="button"
                    className="w-full btn-gradient py-4 rounded-full text-white font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl active:scale-98 transition-all disabled:opacity-50 text-sm md:text-base cursor-pointer"
                  >
                    <span>
                      {isSubmitting 
                        ? (language === 'en' ? 'Processing Order...' : 'Inashughulikia Agizo...') 
                        : (language === 'en' ? 'Submit Order' : 'Mwasilisha Agizo')}
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ORDER SUCCESS STATE DISPATCH TRACKER */
            <motion.div
              key="checkout-success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-2xl mx-auto bg-white dark:bg-zinc-950 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center soft-shadow space-y-8"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2">
                  <CheckCircle className="w-10 h-10 animate-pulse" />
                </div>
                <h3 className="font-headline text-3xl font-black text-zinc-900 dark:text-zinc-50">
                  {d.orderConfirmation}
                </h3>
                <span className="font-mono text-sm bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 px-3 py-1 rounded-lg font-bold">
                  Invoice Code: {invoiceCode}
                </span>
                <p className="font-body text-sm text-zinc-550 dark:text-zinc-400 max-w-md">
                  {d.orderSuccessMessage}
                </p>
              </div>

              {/* Live Dispatch Tracker Box */}
              <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/60 dark:border-zinc-800 text-left space-y-6">
                <div className="flex justify-between items-center border-b border-zinc-200/50 dark:border-zinc-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-5 h-5 text-primary dark:text-inverse-primary" />
                    <span className="font-headline text-sm font-bold text-zinc-900 dark:text-zinc-50">
                      {d.trackStatus}
                    </span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping"></span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-headline">
                      {language === 'en' ? 'Estimated Arrival' : 'Yaliyokadiriwa Kufika'}
                    </p>
                    <div className="flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200 font-headline font-black text-sm">
                      <Clock className="w-4 h-4 text-emerald-500" />
                      <span>{Math.floor(countdown / 60)}h {countdown % 60}m</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-headline">
                      {language === 'en' ? 'Dispatch Driver' : 'Msafirishaji Wako'}
                    </p>
                    <p className="text-zinc-800 dark:text-zinc-200 font-headline font-black text-sm">
                      Calvin K. (+255 792 *** 01)
                    </p>
                  </div>
                </div>

                {/* Simulated delivery progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-primary dark:bg-inverse-primary rounded-full"></div>
                  </div>
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500 font-body text-center">
                    {language === 'en' ? 'Rider preparing consignment & packing fresh lemons...' : 'Msafirishaji anaingiza mzigo na kufunga limau mpya...'}
                  </p>
                </div>
              </div>

              {/* Double CTA for WhatsApp conversion and Reset */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={triggerWhatsApp}
                  type="button"
                  className="flex-1 px-8 py-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold flex items-center justify-center gap-2.5 shadow cursor-pointer transition-all active:scale-95 text-sm"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{d.whatsAppConfirm}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-8 py-4 rounded-full border border-zinc-300 hover:border-zinc-400 text-zinc-600 hover:text-zinc-800 dark:text-zinc-300 dark:hover:text-zinc-200 transition-colors bg-transparent font-medium cursor-pointer text-sm"
                >
                  {language === 'en' ? 'Place Another Order' : 'Agiza Tena Mapema'}
                </button>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
