import React from 'react';
import { Language } from '../types';
import { translations } from '../translations/translations';

interface MarqueeBarProps {
  currentLang: Language;
}

export const MarqueeBar: React.FC<MarqueeBarProps> = ({ currentLang }) => {
  const t = translations[currentLang];

  return (
    <div className="relative z-40 w-full overflow-hidden bg-gradient-to-b from-[#163c2b] via-[#0c291d] to-[#061b13] border-b border-white/10 py-2.5 text-white shadow-inner">
      <div className="flex w-max animate-marquee space-x-12 rtl:space-x-reverse whitespace-nowrap text-xs sm:text-sm font-bold tracking-wide">
        <span className="px-6 relative">✦ {t.marquee1}</span>
        <span className="px-6 relative text-[#7bc2a3]">❖ {t.marquee2}</span>
        <span className="px-6 relative">✦ {t.marquee1}</span>
        <span className="px-6 relative text-[#7bc2a3]">❖ {t.marquee2}</span>
      </div>
    </div>
  );
};
