import React from 'react';
import { AppView, Language } from '../types';
import { Globe, Building2, ShieldCheck, Layers } from 'lucide-react';

interface SuiteSwitcherProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  currentLang: Language;
}

export const SuiteSwitcher: React.FC<SuiteSwitcherProps> = ({
  currentView,
  onViewChange,
  currentLang,
}) => {
  return (
    <div className="fixed top-2.5 left-1/2 -translate-x-1/2 z-50 bg-[#08271e]/95 backdrop-blur-md text-white px-2 py-1.5 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-1.5 transition-all text-xs font-bold">
      <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 text-[#86c8aa] text-[10px] font-extrabold uppercase tracking-wider border-r border-white/20 pe-3">
        <Layers className="w-3.5 h-3.5" />
        <span>KlarSolution Suite</span>
      </span>

      {/* Mode 1: Landing Page */}
      <button
        type="button"
        onClick={() => onViewChange('landing')}
        className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
          currentView === 'landing'
            ? 'bg-[#3d9970] text-white shadow-md font-extrabold'
            : 'hover:bg-white/10 text-gray-300'
        }`}
      >
        <Globe className="w-3.5 h-3.5 text-[#86c8aa]" />
        <span>Website</span>
      </button>

      {/* Mode 2: Kundenbereich (User Area) */}
      <button
        type="button"
        onClick={() => onViewChange('kundenbereich')}
        className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
          currentView === 'kundenbereich'
            ? 'bg-[#3d9970] text-white shadow-md font-extrabold'
            : 'hover:bg-white/10 text-gray-300'
        }`}
      >
        <Building2 className="w-3.5 h-3.5 text-[#86c8aa]" />
        <span>Kundenbereich</span>
        <span className="hidden md:inline text-[10px] opacity-75">(Bauwerk Alpine)</span>
      </button>

      {/* Mode 3: Admin-Portal */}
      <button
        type="button"
        onClick={() => onViewChange('admin-portal')}
        className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
          currentView === 'admin-portal'
            ? 'bg-[#3d9970] text-white shadow-md font-extrabold'
            : 'hover:bg-white/10 text-gray-300'
        }`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[#86c8aa]" />
        <span>Admin-Portal</span>
        <span className="hidden md:inline text-[10px] opacity-75">(Revisionsleitung)</span>
      </button>
    </div>
  );
};
