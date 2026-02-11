import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { Quote, MapPin, ChevronLeft, ChevronRight, ShieldCheck } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  id: number;
  name: string;
  country: string;
  avatar: string;
  loanType: string;
  text: string;
  rating: number;
}

const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop"
];

const COUNTRIES = ["France", "Italy", "Spain"];

const AUTO_PLAY_INTERVAL = 4000;

const TestimonialsSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const testimonials = useMemo(() => {
    const rawItems = t('testimonials_data.items', { returnObjects: true });
    const items = Array.isArray(rawItems) ? rawItems : [];
    
    return items.map((item: any, idx: number) => ({
      id: idx + 1,
      name: item.name || "Client Younited",
      text: item.text || "Service impeccable.",
      loanType: item.type || "Prêt",
      avatar: AVATARS[idx % AVATARS.length],
      country: COUNTRIES[idx % COUNTRIES.length],
      rating: 5
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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(1);
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
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(testimonials.length);
      }, 700);
    } else if (index < testimonials.length) {
      setTimeout(() => {
        setIsTransitioning(false);
        setIndex(testimonials.length * 2 - 1);
      }, 700);
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
      <div className="max-w-7xl mx-auto px-4">
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
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={next} 
              className="w-12 h-12 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all active:scale-90"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        <div className="relative">
          <div 
            ref={containerRef}
            className={`flex gap-6 ${isTransitioning ? 'transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1)' : 'transition-none'}`}
            style={{ 
              transform: `translateX(calc(-${index * itemWidth}%))`
            }}
          >
            {extendedData.map((testimonial, idx) => (
              <div 
                key={`${testimonial.id}-${idx}`} 
                className="flex-shrink-0"
                style={{ width: `calc(${itemWidth}% - 1.5rem)` }}
              >
                <div className="group h-full p-8 bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-[3rem] space-y-8 flex flex-col justify-between hover:shadow-2xl hover:shadow-brand-primary/10 hover:border-brand-primary/20 transition-all duration-500 cursor-default">
                  <div className="space-y-6">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-emerald-500/10 rounded-lg text-emerald-600">
                        <ShieldCheck size={12} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Avis vérifié</span>
                      </div>
                      <Quote size={32} className="text-brand-primary/10 group-hover:text-brand-primary/20 transition-colors" />
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium italic leading-relaxed min-h-[60px]">
                      "{testimonial.text}"
                    </p>
                  </div>

                  <div className="pt-6 border-t border-slate-200/50 dark:border-slate-800/50 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white dark:border-slate-800 shadow-sm transition-transform group-hover:scale-105 group-hover:border-brand-primary/50">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name} 
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <h4 className="font-black uppercase tracking-tight text-slate-900 dark:text-white text-sm">{testimonial.name}</h4>
                        <div className="flex items-center space-x-1.5 text-slate-400">
                          <MapPin size={10} className="text-brand-primary" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{testimonial.loanType}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;