import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import TestimonialCard from './testimonial/TestimonialCard';

const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&h=200&fit=crop"
];

const AUTO_PLAY_INTERVAL = 5000;

const TestimonialsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const testimonials = useMemo(() => {
    const rawItems = t('testimonials_data.items', { returnObjects: true });
    const items = Array.isArray(rawItems) ? rawItems : [];
    
    return items.map((item: any, idx: number) => ({
      id: idx + 1,
      name: item.name || "Client",
      text: item.text || "Service impeccable.",
      loanType: item.type || "Prêt",
      country: item.country || "France",
      avatar: AVATARS[idx % AVATARS.length],
    }));
  }, [t, i18n.language]);

  const extendedData = useMemo(() => {
    if (testimonials.length === 0) return [];
    return [...testimonials, ...testimonials, ...testimonials];
  }, [testimonials]);
  
  const [index, setIndex] = useState(testimonials.length);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleItems(1.2);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(3);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = useCallback(() => {
    if (testimonials.length === 0) return;
    setIndex((prev) => prev + 1);
    setIsTransitioning(true);
  }, [testimonials.length]);

  const prev = useCallback(() => {
    if (testimonials.length === 0) return;
    setIndex((prev) => prev - 1);
    setIsTransitioning(true);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length === 0) return;
    if (index >= testimonials.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(testimonials.length);
      }, 700);
      return () => clearTimeout(timer);
    } else if (index < testimonials.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(testimonials.length * 2 - 1);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [index, testimonials.length]);

  useEffect(() => {
    let timer: number;
    if (!isPaused && testimonials.length > 0) {
      timer = window.setInterval(next, AUTO_PLAY_INTERVAL);
    }
    return () => window.clearInterval(timer);
  }, [isPaused, next, testimonials.length]);

  if (testimonials.length === 0) return null;

  const itemWidth = 100 / visibleItems;

  return (
    <section 
      className="py-24 bg-white dark:bg-slate-950 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-primary/5 border border-brand-primary/10 rounded-full">
              <ShieldCheck size={14} className="text-brand-primary" />
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-primary">{t('testimonials_data.label')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-none">
              {t('testimonials_data.title')} <br />
              <span className="text-brand-primary">{t('testimonials_data.highlight')}</span>
            </h2>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={prev} 
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all active:scale-90"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next} 
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all active:scale-90"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative -mx-3">
          <div 
            className={`flex ${isTransitioning ? 'transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)' : 'transition-none'}`}
            style={{ 
              transform: `translateX(-${index * itemWidth}%)`
            }}
          >
            {extendedData.map((testimonial, idx) => (
              <TestimonialCard 
                key={`${testimonial.id}-${idx}`}
                name={testimonial.name}
                text={testimonial.text}
                loanType={testimonial.loanType}
                country={testimonial.country}
                avatar={testimonial.avatar}
                width={`${itemWidth}%`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;