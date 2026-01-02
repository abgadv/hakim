import React, { useState } from 'react';
import { Testimonial } from '../types';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

interface TestimonialsProps {
  items: Testimonial[];
  title: string;
  subtitle: string;
  isRTL: boolean;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ items, title, subtitle, isRTL }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-6 py-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white font-serif">{title}</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>
      </div>

      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-8 md:p-16 border border-slate-100 dark:border-slate-800">
        <div className="absolute top-8 left-8 text-medical-200 dark:text-slate-800">
          <Quote size={80} className="opacity-20" />
        </div>
        
        <div className="relative z-10 min-h-[200px] flex flex-col justify-center items-center text-center">
            <div key={currentIndex} className="animate-fade-in-up">
              <p className="text-xl md:text-2xl leading-relaxed font-medium text-slate-800 dark:text-slate-200 mb-8 italic">
                "{items[currentIndex].text}"
              </p>
              <div className="w-16 h-1 bg-medical-500 mx-auto mb-4 rounded-full"></div>
              <h4 className="text-lg font-bold text-medical-600 dark:text-medical-400">
                {items[currentIndex].author}
              </h4>
            </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4 mt-12">
          <button 
            onClick={isRTL ? next : prev}
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-medical-500 hover:text-white dark:hover:bg-medical-500 transition-colors"
            aria-label="Previous"
          >
            {isRTL ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          <div className="flex items-center gap-2">
            {items.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-medical-500' : 'w-2 bg-slate-300 dark:bg-slate-700'}`}
              />
            ))}
          </div>
          <button 
            onClick={isRTL ? prev : next}
            className="p-3 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-medical-500 hover:text-white dark:hover:bg-medical-500 transition-colors"
            aria-label="Next"
          >
             {isRTL ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};
