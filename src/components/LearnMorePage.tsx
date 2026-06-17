/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Droplet, 
  Flower, 
  Building2, 
  Award, 
  CheckCircle2, 
  MessageSquare,
  Volume2
} from 'lucide-react';
import { Language } from '../types';

interface LearnMorePageProps {
  language: Language;
  onBack: () => void;
}

export default function LearnMorePage({ language, onBack }: LearnMorePageProps) {
  // Always scroll to top when mounting
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const t = {
    en: {
      backBtn: "Back to Home",
      title: "Haven Grace Liquid Soap",
      subtitle: "Experience the Power of Clean with Haven Grace.",
      introParagraph: "Haven Grace Liquid Soap is specially crafted to deliver a deep, refreshing clean while remaining gentle on your skin. Its powerful cleansing formula effectively removes dirt, grease, and unwanted odors, leaving your hands and surfaces feeling fresh, hygienic, and beautifully clean.",
      whyChooseTitle: "Why Choose Haven Grace?",
      ctaTitle: "Clean with Confidence",
      ctaParagraph: "At Haven Grace, we believe cleanliness is more than appearance—it's a lifestyle. Our liquid soap is designed to help you maintain a healthier, fresher, and more comfortable environment for your family, customers, and community.",
      tagline: "Haven Grace Liquid Soap — Powerful Cleaning. Fresh Confidence. Exceptional Care.",
      orderBtn: "Order Now via WhatsApp",
      benefit1Title: "Powerful Cleaning Performance",
      benefit1Desc: "Cuts through dirt and grime with ease for a sparkling clean result.",
      benefit2Title: "Gentle on Skin",
      benefit2Desc: "Designed to cleanse effectively without leaving hands feeling dry or irritated.",
      benefit3Title: "Fresh, Lasting Fragrance",
      benefit3Desc: "Leaves behind a pleasant scent that creates a clean and welcoming environment.",
      benefit4Title: "Multipurpose Use",
      benefit4Desc: "Perfect for homes, offices, restaurants, schools, and business environments.",
      benefit5Title: "Trusted Quality",
      benefit5Desc: "Made with supreme care to provide consistent, reliable cleaning you can count on every day."
    },
    sw: {
      backBtn: "Rudi Mwanzo",
      title: "Sabuni ya Maji ya Haven Grace",
      subtitle: "Onja Nguvu ya Usafi na Haven Grace.",
      introParagraph: "Sabuni ya maji ya Haven Grace imetengenezwa mahususi kutoa usafi wa kina na wenye kuburudisha huku ikiwa salama kwa ngozi yako. Fomula yake yenye nguvu ya kusafisha huondoa uchafu, mafuta na harufu mbaya kwa ufanisi, na kuacha mikono na nyuso zako zikiwa safi, zenye afya na usafi wa kuvutia.",
      whyChooseTitle: "Kwa Nini Uchague Haven Grace?",
      ctaTitle: "Safisha kwa Kujiamini",
      ctaParagraph: "Katika Haven Grace, tunaamini usafi ni zaidi ya mwonekano—ni mfumo wa maisha. Sabuni yetu imeundwa kukusaidia kudumisha mazingira yenye afya, safi na ya faraja kwa familia yako, wateja na jamii yako.",
      tagline: "Sabuni ya Maji ya Haven Grace — Usafi Wenye Nguvu. Kujiamini Upya. Utunzaji wa Kipekee.",
      orderBtn: "Agiza Sasa Kupitia WhatsApp",
      benefit1Title: "Uwezo Mkubwa wa Kusafisha",
      benefit1Desc: "Huondoa uchafu na kero kwa urahisi ili kupata matokeo ya kung'aa na safi kabisa.",
      benefit2Title: "Salama kwa Ngozi",
      benefit2Desc: "Imeundwa kusafisha kwa ufanisi bila kuacha mikono ikiwa mikavu au yenye mwasho.",
      benefit3Title: "Harufu Nzuri ya Kudumu",
      benefit3Desc: "Huacha harufu nzuri ya kupendeza inayotengeneza mazingira safi na yenye ukaribisho.",
      benefit4Title: "Matumi Mengi",
      benefit4Desc: "Inafaa sana kwa nyumba, maofisi, migahawa, shule, na mazingira ya biashara.",
      benefit5Title: "Ubora wa Kuaminika",
      benefit5Desc: "Imetengenezwa kwa umakini mkubwa ili kutoa usafi thabiti unaoweza kuutegemea kila siku."
    }
  }[language];

  // WhatsApp order link
  const triggerWhatsApp = () => {
    const message = language === 'en'
      ? "Hello! I saw your Learn More page and want to order Haven Grace Liquid Soap. Please share more details!"
      : "Habari! Nimesoma ukurasa wenu wa habari zaidi na ningependa kuagiza Sabuni ya Maji ya Haven Grace. Tafadhali nipe maelezo!";
    const url = `https://wa.me/255787763741?text=${encodeURIComponent(message)}`;
    try {
      const w = window.open(url, '_blank');
      if (!w || w.closed || typeof w.closed === 'undefined') {
        window.location.href = url;
      }
    } catch (err) {
      window.location.href = url;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="px-4 md:px-16 py-12 max-w-7xl mx-auto min-h-screen pt-24 font-body"
    >
      {/* Elegant Return Hook */}
      <div className="mb-8">
        <button
          onClick={onBack}
          type="button"
          className="inline-flex items-center gap-2 group text-sm font-bold text-zinc-500 hover:text-primary dark:hover:text-inverse-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1.5 transition-transform duration-200" />
          <span>{t.backBtn}</span>
        </button>
      </div>

      {/* Decorative Title Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 items-center">
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 dark:bg-inverse-primary/10 px-3.5 py-1 rounded-full text-xs font-bold text-primary dark:text-inverse-primary uppercase tracking-wider w-fit select-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>✨ Premium Quality</span>
          </div>
          
          <h1 className="font-headline text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            {t.subtitle}
          </h1>
          
          <p className="text-zinc-605 dark:text-zinc-300 text-lg leading-relaxed max-w-3xl mt-2 font-medium">
            {t.introParagraph}
          </p>
        </div>

        <div className="lg:col-span-4 bg-primary/5 dark:bg-inverse-primary/5 rounded-2xl p-6 border border-primary/10 dark:border-inverse-primary/10 flex flex-col justify-center gap-4 relative overflow-hidden h-fit">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 dark:bg-inverse-primary/10 rounded-full blur-2xl pointer-events-none"></div>
          <p className="text-sm font-subheading uppercase tracking-widest text-primary dark:text-inverse-primary font-bold">{language === 'en' ? 'Quick Info' : 'Habari Haraka'}</p>
          <div className="space-y-3">
            <div className="flex justify-between text-sm py-1 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-zinc-500">{language === 'en' ? 'Origin' : 'Asili'}</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">Tanzania 🇹🇿</span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <span className="text-zinc-500">{language === 'en' ? 'Form' : 'Hali'}</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{language === 'en' ? 'Premium Gel' : 'Maji Mazito Ya Gel'}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-zinc-500">{language === 'en' ? 'Delivery' : 'Mizigo'}</span>
              <span className="font-bold text-zinc-900 dark:text-zinc-100">{language === 'en' ? 'Instant/Same Day' : 'Siku Hiyohiyo'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section Head */}
      <div className="mb-10 text-center lg:text-left">
        <h2 className="font-headline text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
          {t.whyChooseTitle}
        </h2>
        <div className="h-1 w-20 bg-primary dark:bg-inverse-primary rounded mt-3 mx-auto lg:mx-0"></div>
      </div>

      {/* Symmetrical Bento Grid composed of PERFECT SQUARE CARDS */}
      {/* aspect-square is applied to ensure every box remains a square on screens that align them as a grid, while using flex/overflow content safety */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
        
        {/* Box 1 */}
        <motion.div 
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative aspect-square flex flex-col justify-between p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-md group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 dark:bg-rose-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
          <div className="p-4 rounded-2xl bg-rose-500/10 dark:bg-rose-500/15 text-rose-650 dark:text-rose-450 w-fit">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 font-display select-none">
              {t.benefit1Title}
            </h3>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm leading-relaxed">
              {t.benefit1Desc}
            </p>
          </div>
        </motion.div>

        {/* Box 2 */}
        <motion.div 
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative aspect-square flex flex-col justify-between p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-md group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 dark:bg-sky-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
          <div className="p-4 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 text-sky-650 dark:text-sky-450 w-fit">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 font-display select-none">
              {t.benefit2Title}
            </h3>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm leading-relaxed">
              {t.benefit2Desc}
            </p>
          </div>
        </motion.div>

        {/* Box 3 */}
        <motion.div 
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative aspect-square flex flex-col justify-between p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-md group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 dark:bg-emerald-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
          <div className="p-4 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-650 dark:text-emerald-450 w-fit">
            <Flower className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 font-display select-none">
              {t.benefit3Title}
            </h3>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm leading-relaxed">
              {t.benefit3Desc}
            </p>
          </div>
        </motion.div>

        {/* Box 4 */}
        <motion.div 
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative aspect-square flex flex-col justify-between p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-md group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
          <div className="p-4 rounded-2xl bg-purple-500/10 dark:bg-purple-500/15 text-purple-650 dark:text-purple-450 w-fit">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 font-display select-none">
              {t.benefit4Title}
            </h3>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm leading-relaxed">
              {t.benefit4Desc}
            </p>
          </div>
        </motion.div>

        {/* Box 5 */}
        <motion.div 
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative aspect-square flex flex-col justify-between p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-md group overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 dark:bg-amber-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500"></div>
          <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-600 dark:text-amber-450 w-fit">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2 font-display select-none">
              {t.benefit5Title}
            </h3>
            <p className="text-zinc-550 dark:text-zinc-400 text-sm leading-relaxed">
              {t.benefit5Desc}
            </p>
          </div>
        </motion.div>

        {/* Box 6 (Call with Confidence & WhatsApp CTA) */}
        <motion.div 
          whileHover={{ y: -6, scale: 1.01 }}
          className="relative aspect-square flex flex-col justify-between p-8 bg-gradient-to-br from-primary/5 to-primary-container/10 dark:from-zinc-900 dark:to-primary-container/5 rounded-3xl border border-primary/20 dark:border-zinc-800/80 shadow-lg group overflow-hidden cursor-pointer"
          onClick={triggerWhatsApp}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500"></div>
          
          <div className="p-4 rounded-2xl bg-emerald-600/10 text-emerald-650 dark:text-emerald-450 w-fit">
            <CheckCircle2 className="w-6 h-6 animate-pulse" />
          </div>
          
          <div>
            <h3 className="font-headline text-lg sm:text-xl font-bold text-primary dark:text-inverse-primary mb-2 font-display">
              {t.ctaTitle}
            </h3>
            <p className="text-zinc-650 dark:text-zinc-450 text-xs sm:text-sm leading-relaxed mb-4">
              {t.ctaParagraph}
            </p>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-650 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
              <span>{t.orderBtn}</span>
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
          </div>
        </motion.div>

      </div>

      {/* Ambient Footer Highlight with Large Call to Action */}
      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden border border-zinc-200/50 dark:border-zinc-800/50">
        <div className="absolute -inset-10 bg-gradient-to-tr from-primary/10 to-transparent dark:from-inverse-primary/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <h3 className="font-headline text-2xl font-black text-zinc-900 dark:text-zinc-50 mb-4 max-w-2xl mx-auto leading-snug">
          {t.tagline} 🌟
        </h3>
        
        <div className="flex flex-wrap gap-4 justify-center items-center mt-8">
          <button
            onClick={triggerWhatsApp}
            type="button"
            className="px-8 py-4 rounded-full btn-gradient text-white font-bold inline-flex items-center gap-2 text-sm sm:text-base cursor-pointer shadow-xl active:scale-95 hover:shadow-primary-container/20 transition-all duration-300"
          >
            <span>{t.orderBtn}</span>
            <MessageSquare className="w-5 h-5 animate-pulse" />
          </button>
          
          <button
            onClick={onBack}
            type="button"
            className="px-8 py-4 rounded-full border border-zinc-300 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 text-zinc-600 dark:text-zinc-300 font-bold inline-flex items-center gap-1 text-sm sm:text-base cursor-pointer transition-all duration-200"
          >
            <span>{language === 'en' ? 'Back to Store' : 'Rudi Store'}</span>
          </button>
        </div>
      </div>

    </motion.div>
  );
}
