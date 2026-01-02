import React, { useState, useEffect, useRef } from 'react';
import { Language, Content } from './types';
import { ICONS_MAP, DR_IMAGE_URL, PARTNER_LOGOS, WORK_IMAGES } from './constants';
import { CONTENT_EN } from './content-en';
import { CONTENT_AR } from './content-ar';
import { Section } from './components/Section';
import { Testimonials } from './components/Testimonials';
import { 
  Moon, Sun, Globe, Menu, X, ArrowRight, ArrowLeft, Phone, CheckCircle, ArrowUpRight, ChevronLeft, ChevronRight, TrendingUp
} from 'lucide-react';

// Full Screen Image Modal
const ImageModal: React.FC<{ 
  src: string | null; 
  isOpen: boolean; 
  onClose: () => void; 
}> = ({ src, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen || !src) return null;

  return (
    <div 
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fade-in-up" 
      onClick={onClose}
    >
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
      >
        <X size={32} />
      </button>
      <img 
        src={src} 
        alt="Full Resolution" 
        className="max-w-full max-h-[90vh] object-contain shadow-2xl rounded-lg" 
        onClick={(e) => e.stopPropagation()} 
      />
    </div>
  );
};

// Modal Component
const AboutModal: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  content: Content['about']['modal']; 
  isRTL: boolean;
}> = ({ isOpen, onClose, content, isRTL }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity" 
        onClick={onClose}
      />
      <div 
        ref={modalRef}
        className={`relative w-full max-w-5xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row transform transition-all duration-300 animate-fade-in-up ${isRTL ? 'font-arabic' : 'font-sans'}`}
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-black/10 dark:hover:bg-white/10 backdrop-blur-sm rounded-full text-slate-500 dark:text-slate-300 transition-colors"
        >
          <X size={24} />
        </button>

        {/* Image Side */}
        <div className="md:w-1/3 bg-slate-100 dark:bg-slate-800 relative hidden md:block">
           <img 
            src={DR_IMAGE_URL} 
            alt="Dr. Mohamed Hakeem" 
            className="absolute inset-0 w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
             <div className="text-white">
                <h3 className="font-bold text-xl">{isRTL ? 'د. محمد حكيم' : 'Dr. Mohamed Hakeem'}</h3>
                <p className="opacity-80 text-sm">{isRTL ? 'طبيب ومسوق طبي' : 'Doctor & Medical Marketer'}</p>
             </div>
           </div>
        </div>

        {/* Content Side */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 md:p-12">
          
          {/* Mobile Image */}
          <div className="md:hidden flex items-center gap-4 mb-8">
             <img src={DR_IMAGE_URL} alt="Dr. Hakeem" className="w-16 h-16 rounded-full object-cover shadow-md" />
             <div>
               <h3 className="font-bold text-lg text-slate-900 dark:text-white">{isRTL ? 'د. محمد حكيم' : 'Dr. Mohamed Hakeem'}</h3>
             </div>
          </div>

          <div className="space-y-10">
            {/* Arabic Content */}
            <div dir="rtl" className="font-arabic">
               <h2 className="text-2xl font-bold text-medical-600 mb-4">{content.arabicTitle}</h2>
               <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 whitespace-pre-line leading-loose text-lg">
                 {content.arabicText}
               </div>
            </div>
            
            <div className="w-full h-px bg-slate-200 dark:bg-slate-700" />

            {/* English Content */}
            <div dir="ltr" className="font-sans">
               <h2 className="text-2xl font-bold text-medical-600 mb-4">{content.englishTitle}</h2>
               <div className="prose dark:prose-invert text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed text-lg">
                 {content.englishText}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const WorkSlider = ({ items, isRTL, onImageClick }: { items: string[]; isRTL: boolean; onImageClick: (src: string) => void }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // Get the width of the first card + gap (24px = 1.5rem gap-6)
      const firstCard = current.children[0] as HTMLElement;
      const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 400; 
      
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="relative group px-12 md:px-16">
      
      {/* Left Navigation Arrow */}
      <button 
        onClick={() => scroll(isRTL ? 'right' : 'left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-medical-600 hover:text-white dark:hover:bg-medical-600 transition-all ${isRTL ? 'hidden md:block' : ''}`}
        aria-label="Scroll Left"
      >
        <ChevronLeft size={24} />
      </button>

      <div 
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 items-start"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {items.map((item, index) => (
          <div 
            key={index} 
            className="flex-none w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-center"
          >
             {/* Updated to auto height to fit original dimensions, added cursor-pointer and onClick */}
             <div 
               className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:opacity-95 transition-opacity"
               onClick={() => onImageClick(item)}
             >
                 <img 
                   src={item} 
                   alt={`Project ${index + 1}`} 
                   className="w-full h-auto block"
                 />
             </div>
          </div>
        ))}
      </div>
      
      {/* Right Navigation Arrow */}
      <button 
        onClick={() => scroll(isRTL ? 'left' : 'right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-medical-600 hover:text-white dark:hover:bg-medical-600 transition-all ${isRTL ? '' : 'hidden md:block'}`}
        aria-label="Scroll Right"
      >
        <ChevronRight size={24} />
      </button>

      {/* For RTL layout flipping arrow positions visually if needed, though logic handles direction */}
       <button 
        onClick={() => scroll(isRTL ? 'left' : 'right')}
        className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-medical-600 hover:text-white dark:hover:bg-medical-600 transition-all ${isRTL ? 'hidden md:block' : 'hidden'}`}
        aria-label="Scroll Right"
      >
        <ChevronRight size={24} />
      </button>
       <button 
        onClick={() => scroll(isRTL ? 'right' : 'left')}
        className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-medical-600 hover:text-white dark:hover:bg-medical-600 transition-all ${isRTL ? 'hidden' : 'hidden'}`}
        aria-label="Scroll Left"
      >
        <ChevronLeft size={24} />
      </button>

    </div>
  );
}

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(Language.EN);
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [selectedWorkImage, setSelectedWorkImage] = useState<string | null>(null);

  const content: Content = lang === Language.EN ? CONTENT_EN : CONTENT_AR;
  const isRTL = lang === Language.AR;

  // Initial Theme & Lang Setup
  useEffect(() => {
    // Dark mode logic
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Language logic
    document.documentElement.lang = lang;
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.className = darkMode ? 'dark' : '';
    if (isRTL) document.body.classList.add('font-arabic');
    else document.body.classList.remove('font-arabic');

  }, [darkMode, lang, isRTL]);

  // Scroll Handler
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Helper
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMenuOpen(false); // Close mobile menu if open
    
    // Handle "hero" or top scroll
    if (id === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(id);
    if (element) {
      // Account for fixed header offset
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleLang = () => setLang(l => l === Language.EN ? Language.AR : Language.EN);
  const toggleTheme = () => setDarkMode(d => !d);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className={`min-h-screen overflow-x-hidden ${isRTL ? 'font-arabic' : 'font-sans'}`}>
      
      <AboutModal 
        isOpen={isAboutModalOpen} 
        onClose={() => setIsAboutModalOpen(false)} 
        content={content.about.modal}
        isRTL={isRTL}
      />

      <ImageModal 
        src={selectedWorkImage} 
        isOpen={!!selectedWorkImage} 
        onClose={() => setSelectedWorkImage(null)} 
      />

      {/* --- HEADER --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'
      }`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo - Scrolls to Top */}
          <a href="#" onClick={(e) => scrollToSection(e, '#')} className="flex items-center gap-3">
             <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-medical-500 shadow-lg shadow-medical-500/30">
                <img src={DR_IMAGE_URL} alt="Dr. Hakeem" className="w-full h-full object-cover" />
             </div>
             <div className="hidden md:block">
               <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">Dr. Mohamed Hakeem</h1>
               <span className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-wide">Medical Marketing</span>
             </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {content.nav.map(item => (
              <a 
                key={item.id} 
                href={item.href} 
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
             <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-xs font-bold text-slate-700 dark:text-slate-200">
                <Globe size={16} />
                {lang === Language.EN ? 'AR' : 'EN'}
             </button>
             <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 text-slate-800 dark:text-white">
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-2xl lg:hidden">
             {content.nav.map(item => (
              <a 
                key={item.id} 
                href={item.href} 
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-lg font-medium text-slate-800 dark:text-slate-200 py-2 border-b border-slate-100 dark:border-slate-900 last:border-0"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* --- HERO --- */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Abstract Backgrounds */}
        <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
           <div className={`absolute top-[-10%] ${isRTL ? 'left-[-10%]' : 'right-[-10%]'} w-[600px] h-[600px] bg-medical-500/10 rounded-full blur-[100px] animate-float`} />
           <div className={`absolute bottom-[-10%] ${isRTL ? 'right-[-10%]' : 'left-[-10%]'} w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] animate-float`} style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-8 ${isRTL ? 'lg:pl-12' : 'lg:pr-12'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-medical-50/50 dark:bg-medical-900/30 border border-medical-200 dark:border-medical-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-medical-500"></span>
              </span>
              <span className="text-xs font-semibold text-medical-700 dark:text-medical-300 tracking-wider uppercase">{content.hero.badge}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white leading-[1.1]">
              {content.hero.title.split(',')[0]}, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-medical-500 to-purple-500">
                {content.hero.title.split(',')[1]?.replace('.', '') || ''}
              </span>.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              {content.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#contact" onClick={(e) => scrollToSection(e, '#contact')} className="px-8 py-4 bg-medical-600 hover:bg-medical-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-medical-500/25 flex items-center justify-center gap-2 group cursor-pointer">
                {content.hero.ctaPrimary}
                <ArrowIcon size={18} className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </a>
              <a href="#work" onClick={(e) => scrollToSection(e, '#work')} className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-medical-500 dark:hover:border-medical-500 text-slate-900 dark:text-white rounded-xl font-semibold transition-all flex items-center justify-center cursor-pointer">
                {content.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center relative">
            {/* Growth Arrow Illustration */}
            <div className="relative w-96 h-96">
               <div className="absolute inset-0 bg-medical-500/10 rounded-full blur-3xl animate-pulse"></div>
               <div className="relative z-10 w-full h-full flex items-center justify-center">
                 <div className="p-8 bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-700">
                   <TrendingUp size={200} className="text-medical-500 drop-shadow-lg" strokeWidth={1.5} />
                   <div className="absolute -bottom-6 -right-6 bg-slate-900 text-white p-4 rounded-xl shadow-xl flex items-center gap-3">
                     <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                     <span className="font-bold font-mono">+140% Growth</span>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT --- */}
      <Section id="about" className="py-24 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="absolute inset-0 bg-gradient-to-tr from-medical-500 to-purple-500 rounded-3xl transform rotate-3 opacity-20 blur-lg"></div>
               {/* Use Doctor's Image Here */}
               <img 
                src={DR_IMAGE_URL} 
                alt="Dr. Mohamed Hakeem" 
                className="relative rounded-3xl shadow-2xl z-10 border border-slate-100 dark:border-slate-800 w-full object-cover aspect-[4/5]"
               />
               <div className="absolute -bottom-8 -right-8 bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl z-20 max-w-xs border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400">
                      <CheckCircle size={20} />
                    </div>
                    <span className="font-bold text-sm">Verified Success</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Trusted by top clinics across the region to deliver patient-centric marketing.
                  </p>
               </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-medical-500 font-bold tracking-wider uppercase text-sm mb-2 block">{content.about.title}</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">{content.about.heading}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                {content.about.description}
              </p>
              
              <button 
                onClick={() => setIsAboutModalOpen(true)}
                className="group flex items-center gap-2 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold hover:bg-medical-600 dark:hover:bg-medical-500 hover:text-white dark:hover:text-white transition-all shadow-lg hover:shadow-medical-500/40"
              >
                {content.about.modal.btnText}
                <ArrowIcon className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800 pt-8 mt-10">
                {content.about.stats.map((stat, idx) => (
                  <div key={idx}>
                    <h4 className="text-3xl font-black text-slate-900 dark:text-white mb-1">{stat.value}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* --- SERVICES --- */}
      <Section id="services" className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">{content.services.title}</h2>
            <p className="text-slate-600 dark:text-slate-400">{content.services.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.services.items.map((service, index) => {
              const Icon = ICONS_MAP[service.iconName];
              return (
                <div key={service.id} className="group p-8 bg-white dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-medical-500 dark:hover:border-medical-500 hover:shadow-2xl hover:shadow-medical-500/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-medical-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-500"></div>
                  
                  <div className="w-12 h-12 bg-medical-50 dark:bg-medical-900/20 rounded-xl flex items-center justify-center text-medical-600 dark:text-medical-400 mb-6 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">{service.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>
                  
                  {/* Removed Learn More Button */}
                </div>
              );
            })}
          </div>
        </div>
      </Section>

      {/* --- WORK --- */}
      <Section id="work" className="py-24 bg-white dark:bg-slate-950 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
               <h2 className="text-3xl md:text-4xl font-bold mb-2 text-slate-900 dark:text-white">{content.work.title}</h2>
               <p className="text-slate-600 dark:text-slate-400">{content.work.subtitle}</p>
            </div>
            {/* Removed filters as requested */}
          </div>

          {/* Slider with real work images */}
          <WorkSlider 
            items={WORK_IMAGES} 
            isRTL={isRTL} 
            onImageClick={(src) => setSelectedWorkImage(src)}
          />
          
        </div>
      </Section>

      {/* --- PARTNERS --- */}
      <Section className="py-16 bg-slate-50 dark:bg-slate-900 border-y border-slate-200 dark:border-slate-800 overflow-hidden">
         <div className="w-full">
            <h3 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-10 px-6">{content.partners.title}</h3>
            
            <div className="relative w-full overflow-hidden">
              <div className={`inline-flex whitespace-nowrap ${isRTL ? 'animate-scroll-rtl' : 'animate-scroll'}`}>
                {/* Loop 1 - Real Logos - Updated to white cards */}
                {PARTNER_LOGOS.map((logo, i) => (
                  <div key={`p1-${i}`} className="inline-block px-8 md:px-12">
                      <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-100">
                        <img src={logo} alt={`Partner ${i + 1}`} className="w-3/4 h-3/4 object-contain" />
                      </div>
                  </div>
                ))}
                {/* Loop 2 (Duplicate for smooth scroll) - Updated to white cards */}
                 {PARTNER_LOGOS.map((logo, i) => (
                  <div key={`p2-${i}`} className="inline-block px-8 md:px-12">
                      <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-white rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border border-slate-100">
                        <img src={logo} alt={`Partner ${i + 1}`} className="w-3/4 h-3/4 object-contain" />
                      </div>
                  </div>
                ))}
              </div>
            </div>
         </div>
      </Section>

      {/* --- TESTIMONIALS --- */}
      <Section id="testimonials" className="bg-white dark:bg-slate-950">
         <Testimonials 
            items={content.testimonials.items} 
            title={content.testimonials.title} 
            subtitle={content.testimonials.subtitle}
            isRTL={isRTL}
         />
      </Section>

      {/* --- CONTACT --- */}
      <Section id="contact" className="py-24 bg-medical-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{content.contact.title}</h2>
           <p className="text-medical-100 text-lg mb-12 max-w-2xl mx-auto">{content.contact.subtitle}</p>
           
           {/* Force LTR to keep contact buttons looking the same in Arabic */}
           <div dir="ltr" className="flex flex-col md:flex-row justify-center gap-6 mb-12">
             <a href="tel:01019396638" className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-medical-900 text-white px-8 py-4 rounded-xl transition-all duration-300 group">
                <Phone size={24} className="group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="block text-xs opacity-70 uppercase tracking-wider">{content.contact.phoneLabel}</span>
                  <span className="text-xl font-bold font-mono">010 1939 6638</span>
                </div>
             </a>
             <a href="tel:01282400616" className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white hover:text-medical-900 text-white px-8 py-4 rounded-xl transition-all duration-300 group">
                <Phone size={24} className="group-hover:scale-110 transition-transform" />
                <div className="text-left">
                  <span className="block text-xs opacity-70 uppercase tracking-wider">{content.contact.phoneLabel}</span>
                  <span className="text-xl font-bold font-mono">012 8240 0616</span>
                </div>
             </a>
           </div>

           {/* Removed Book Consultation button as requested */}
        </div>
      </Section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="container mx-auto px-6">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-700">
                    <img src={DR_IMAGE_URL} alt="Dr. Hakeem" className="w-full h-full object-cover" />
                 </div>
                 <span className="text-slate-300 font-bold">Dr. Mohamed Hakeem</span>
              </div>
              <p className="text-slate-500 text-sm">
                © {new Date().getFullYear()} Medical Marketing. All rights reserved.
              </p>
           </div>
        </div>
      </footer>

    </div>
  );
};

export default App;
