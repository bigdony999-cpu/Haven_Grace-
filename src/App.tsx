/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import FeaturesGrid from './components/FeaturesGrid';
import ProductShowcase from './components/ProductShowcase';
import FAQSection from './components/FAQSection';
import ReviewSection from './components/ReviewSection';
import CartDrawer from './components/CartDrawer';
import CheckoutForm from './components/CheckoutForm';
import Footer from './components/Footer';
import LearnMorePage from './components/LearnMorePage';
import ScrollToTop from './components/ScrollToTop';
import { CartItem, Language, Product } from './types';
import { products } from './data';
// Product Image Imports
import haven001 from './assets/images/haven001.png';
import haven002 from './assets/images/haven002.png';
import haven003 from './assets/images/haven003.png';
import haven004 from './assets/images/haven004.png';
import haven005 from './assets/images/haven005.png';
import haven006 from './assets/images/haven006.png';
import haven007 from './assets/images/haven007.png';
import paymentInstructions from './assets/images/payment_instructions.jpg';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [view, setView] = useState<'home' | 'learn-more'>('home');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    if (saved) {
      return saved === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Sync dark mode class on html node and persist to localStorage
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems((prevItems) => {
      const existingIdx = prevItems.findIndex((it) => it.product.id === product.id);
      if (existingIdx > -1) {
        const update = [...prevItems];
        update[existingIdx].quantity += quantity;
        return update;
      } else {
        return [...prevItems, { product, quantity }];
      }
    });
  };

  const handleAddToCartById = (productId: string) => {
    const matched = products.find((p) => p.id === productId);
    if (matched) {
      handleAddToCart(matched, 1);
    }
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleCheckoutScroll = () => {
    setIsCartOpen(false);
    const el = document.getElementById('order-now');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300 antialiased selection:bg-primary-container/20 selection:text-primary dark:selection:bg-inverse-primary/20">
      
      {/* Dynamic Header navbar */}
      <Header
        language={language}
        setLanguage={setLanguage}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        view={view}
        setView={setView}
      />

      {/* Main Sections Stack */}
      <main className="pt-20">
        {view === 'learn-more' ? (
          <LearnMorePage 
            language={language} 
            onBack={() => setView('home')} 
          />
        ) : (
          <>
            {/* Hero Banner Section */}
            <HeroSection
              language={language}
              onOrderClick={() => {
                const el = document.getElementById('sizes');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onLearnMoreClick={() => setView('learn-more')}
            />

            {/* Benefits Grid */}
            <FeaturesGrid language={language} />

            {/* Catalog Showcase section */}
            <ProductShowcase
              language={language}
              onAddToCart={handleAddToCart}
            />

            {/* Review Testimonials */}
            <ReviewSection language={language} />

            {/* Accordion FAQ Guide */}
            <FAQSection language={language} />

            {/* Checkout Integration Form with Live Tracker */}
            <CheckoutForm
              language={language}
              cartItems={cartItems}
              onClearCart={handleClearCart}
              onAddToCart={handleAddToCartById}
            />
          </>
        )}
      </main>

      {/* Slide-over interactive shopping cart */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckoutScroll}
        language={language}
      />

      {/* Floating ScrollToTop Trigger */}
      <ScrollToTop language={language} />

      {/* Footer info blocks */}
      <Footer language={language} />

    </div>
  );
}
