import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProcessComparisonProps {
  isHero?: boolean;
  onProcessClick?: () => void;
}

const ProcessComparison: React.FC<ProcessComparisonProps> = ({ isHero = false, onProcessClick }) => {
  const { t } = useLanguage();
  
  // Colors
  const colors = {
    old: '#64748b', // Slate 500 (Grey)
    new: '#FFAD00', // TechSim Amber (Yellow) - Solid and vibrant
    text: '#ffffff',
  };

  // Text color logic
  const textFillClass = isHero 
    ? "fill-white" 
    : "fill-slate-900 dark:fill-white";

  const oldProcessTextFillClass = isHero
    ? "fill-slate-500"
    : "fill-slate-500 dark:fill-slate-400";

  // New Process Button Style
  // Hero (Dark bg) -> White Rect, Dark Text
  // Normal (Light/Dark bg) -> Adaptive
  const newProcessRectClass = isHero
    ? "fill-white stroke-white" // White background for contrast in Hero
    : "fill-white/90 dark:fill-slate-900/90 stroke-orange-200 dark:stroke-orange-900/50";
  
  const newProcessTextFillClass = isHero
    ? "fill-slate-900" // Dark text on white rect
    : "fill-[#FFAD00]"; // Amber text normally

  return (
    <div className={`w-full max-w-6xl mx-auto ${isHero ? 'mt-4 mb-8 h-[220px] md:h-[320px]' : 'mt-12 mb-16 h-[300px] md:h-[400px]'} relative select-none`}>
      <svg 
        className="w-full h-full overflow-visible" 
        viewBox="0 0 1000 340" 
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          {/* Stronger Glow for the yellow line */}
          <filter id="strong-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          {/* Shadow for the button rect */}
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          </filter>
          {/* Hover Glow for Button */}
          <filter id="button-glow" x="-20%" y="-20%" width="140%" height="140%">
             <feGaussianBlur stdDeviation="2" result="blur" />
             <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- LABELS (SVG for perfect scaling) --- */}

        {/* Old Process Label - Top Center */}
        <text 
          x="500" 
          y="40" 
          textAnchor="middle" 
          className={`font-bold font-display uppercase tracking-widest text-sm md:text-base ${oldProcessTextFillClass}`}
          style={{ fontSize: '18px' }} // SVG unit size
        >
          {t.processComparison?.oldProcess || "Tradiční proces"}
        </text>

        {/* New Process Label - Bottom Center (Button Style) */}
        <g 
          transform="translate(500, 280)" 
          onClick={onProcessClick}
          className={`${onProcessClick ? 'cursor-pointer group' : ''}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (onProcessClick && (e.key === 'Enter' || e.key === ' ')) {
              onProcessClick();
            }
          }}
        >
          {/* Button Background Rect - Centered */}
          {/* Increased width to 400 to accommodate longer Czech text */}
          <rect 
            x="-200" 
            y="-30" 
            width="400" 
            height="60" 
            rx="30" 
            ry="30"
            className={`${newProcessRectClass} stroke-2 transition-colors duration-300`}
            filter="url(#shadow)"
          />
          <text 
            x="0" 
            y="10" 
            textAnchor="middle" 
            className={`font-black font-display uppercase tracking-widest ${newProcessTextFillClass} transition-colors duration-300`}
            style={{ fontSize: '20px', pointerEvents: 'none' }} // SVG unit size
          >
            {t.processComparison?.newProcess || "TechSim Digital Thread"}
          </text>
          
          {/* Micro-interaction: Thread Line appearing on hover */}
          <path 
            d="M -150 22 L 150 22" 
            stroke={isHero ? "#FFAD00" : "#FFAD00"} 
            strokeWidth="3"
            strokeLinecap="round"
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <circle r="3" fill={isHero ? "#FFAD00" : "#FFAD00"} className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <animateMotion 
               dur="1s" 
               repeatCount="indefinite"
               path="M -150 22 L 150 22"
             />
          </circle>
        </g>

        {/* Start Node Label (Myšlenka) - Left */}
        <text 
          x="50" 
          y="260" 
          textAnchor="middle" 
          className={`font-black font-display uppercase tracking-wider ${textFillClass}`}
          style={{ fontSize: '20px', textShadow: '0px 2px 4px rgba(0,0,0,0.3)' }}
        >
          Myšlenka
        </text>

        {/* End Node Label (Produkt) - Right */}
        <text 
          x="950" 
          y="260" 
          textAnchor="middle" 
          className={`font-black font-display uppercase tracking-wider ${textFillClass}`}
          style={{ fontSize: '20px', textShadow: '0px 2px 4px rgba(0,0,0,0.3)' }}
        >
          Produkt
        </text>

        {/* --- PATHS --- */}
        
        {/* TOP PATH (Outdated Process) - Arcs up and zigzags */}
        <g>
          <path
            d="M 50,200 Q 100,100 150,100 L 200,120 L 250,80 L 300,110 L 350,90 L 400,100 L 450,100 L 500,130 L 550,70 L 600,100 L 650,100 L 700,110 L 750,90 L 800,100 L 850,100 Q 900,100 950,200"
            fill="none"
            stroke={colors.old}
            strokeWidth="3"
            strokeDasharray="8, 4"
            className="opacity-30"
          />
          
          {/* Particles - Slow */}
          {[0, 1, 2].map((i) => (
            <g key={`old-particle-${i}`}>
              <circle r="6" fill={colors.old} />
              <animateMotion
                dur="12s"
                repeatCount="indefinite"
                begin={`${i * 4}s`}
                path="M 50,200 Q 100,100 150,100 L 200,120 L 250,80 L 300,110 L 350,90 L 400,100 L 450,100 L 500,130 L 550,70 L 600,100 L 650,100 L 700,110 L 750,90 L 800,100 L 850,100 Q 900,100 950,200"
                keyTimes="0; 0.1; 0.15; 0.2; 0.25; 0.3; 0.35; 0.4; 0.45; 0.5; 0.55; 0.6; 0.65; 0.7; 0.75; 0.8; 0.85; 0.9; 1"
                keyPoints="0; 0.1; 0.15; 0.2; 0.25; 0.3; 0.35; 0.4; 0.45; 0.5; 0.55; 0.6; 0.65; 0.7; 0.75; 0.8; 0.85; 0.9; 1"
                calcMode="linear"
              />
            </g>
          ))}
        </g>

        {/* BOTTOM PATH (TechSim Digital Thread) - Straight */}
        <g>
          {/* Glow Layer */}
          <path
            d="M 50,200 L 950,200"
            fill="none"
            stroke={colors.new}
            strokeWidth="20" 
            strokeLinecap="round"
            className="opacity-30"
            filter="url(#strong-glow)"
          />

          {/* Core Solid Line - THICK and VIBRANT */}
          <path
            d="M 50,200 L 950,200"
            fill="none"
            stroke={colors.new}
            strokeWidth="16" 
            strokeLinecap="round"
            className="opacity-100"
          />

          {/* Particles - Fast, Smooth */}
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={`new-particle-${i}`}>
              <circle r="8" fill="white" stroke={colors.new} strokeWidth="2" />
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                begin={`${i * 0.6}s`}
                path="M 50,200 L 950,200"
                calcMode="linear"
              />
            </g>
          ))}
        </g>

        {/* --- NODES (Shared) --- */}
        {/* Start Node */}
        <g transform="translate(50, 200)">
          <circle r="20" fill={colors.new} stroke="white" strokeWidth="4" />
          <circle r="10" fill="white" />
        </g>

        {/* End Node */}
        <g transform="translate(950, 200)">
          <circle r="20" fill={colors.new} stroke="white" strokeWidth="4" />
          <circle r="10" fill="white" />
        </g>

      </svg>
    </div>
  );
};

export default ProcessComparison;
