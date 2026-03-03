import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import ProcessComparison from './ProcessComparison';

interface HeroProps {
  onNavigate?: (page: 'home' | 'blog' | 'testing' | 'seminar' | 'energy' | 'sitemap' | 'privacy' | 'terms' | 'contact' | 'process-comparison') => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const { t, language } = useLanguage();

  const handleNavClick = (page: 'home' | 'blog' | 'testing' | 'seminar' | 'energy' | 'sitemap' | 'privacy' | 'terms' | 'contact' | 'process-comparison', e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(page);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-slate-900 pt-24 pb-8 overflow-hidden">
      {/* Background Gradient - Subtle */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl w-full text-left md:text-center mb-4">
          {/* Badge removed as requested */}
          
          <h1 className="font-display font-black text-5xl md:text-7xl lg:text-8xl leading-tight text-white mb-4">
            {language === 'cs' ? (
              <>
                Od myšlenky k produktu. S <span className="text-tertiary">bleskovým</span> přenosem dat mezi procesy.
              </>
            ) : (
              t.hero.title
            )}
          </h1>
          
          {/* Description - Made clickable/active as requested */}
          <button 
            onClick={(e) => handleNavClick('process-comparison', e)}
            className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-4 hover:text-white transition-colors duration-300 text-left md:text-center cursor-pointer group"
          >
            {t.hero.desc}
            <span className="block mt-2 text-sm text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
              Zjistit více o digitálním vláknu →
            </span>
          </button>

          {/* Buttons removed as requested */}
        </div>

        {/* Process Comparison Animation */}
        <div className="w-full max-w-6xl mx-auto mt-0 opacity-90 scale-90 md:scale-100 origin-top">
          <ProcessComparison 
            isHero={true} 
            onProcessClick={() => {
              if (onNavigate) onNavigate('process-comparison');
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;