import React, { useState } from 'react';
import { RBACGuard } from '../../components/dashboard/RBACGuard';
import { Language } from '../../types';
import { KeyRound, Terminal, Shield, CheckCircle2, Copy, RefreshCw } from 'lucide-react';

export const SsoApiPage: React.FC<{ currentLang?: Language }> = () => {
  const [apiKey, setApiKey] = useState('klar_live_sk_8f993a0021bc4229a101e4');
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerateKey = () => {
    const newKey = `klar_live_sk_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 10)}`;
    setApiKey(newKey);
    showToast('Neuer API-Schlüssel erfolgreich generiert!');
  };

  return (
    <RBACGuard pageTitle="SSO, APIs & CLI-Setup">
      <div className="space-y-6 animate-fadeIn text-slate-900">
        {toast && (
          <div className="fixed top-20 right-6 z-50 bg-[#08271e] text-white px-5 py-3 rounded-2xl shadow-2xl border border-[#3d9970] flex items-center gap-3 text-xs font-bold animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-[#3d9970]" />
            <span>{toast}</span>
          </div>
        )}

        <div className="border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-serif font-bold text-[#142032]">SSO, REST APIs & CLI Integration</h1>
          <p className="text-xs text-gray-500 mt-1">
            Konfiguration von Enterprise Single Sign-On, RESTful API Tokens & Command-Line Interfaces
          </p>
        </div>

        {/* API Key Box */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-bold text-sm text-[#142032] flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-[#3d9970]" />
              <span>Production API Secret Key</span>
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
              Aktiv (Full Scope)
            </span>
          </div>

          <div className="flex items-center gap-3 bg-slate-900 p-3.5 rounded-xl font-mono text-xs text-emerald-400">
            <span className="flex-1 truncate">{apiKey}</span>
            <button
              type="button"
              onClick={handleCopyKey}
              className="px-3 py-1.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              {copied ? 'Kopiert' : 'Kopieren'}
            </button>
            <button
              type="button"
              onClick={handleRegenerateKey}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Neu generieren</span>
            </button>
          </div>
        </div>

        {/* CLI Instruction Box */}
        <div className="bg-black text-white p-6 rounded-2xl border border-neutral-900 shadow-sm space-y-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-emerald-400 font-bold border-b border-neutral-800 pb-2">
            <Terminal className="w-4 h-4 text-emerald-400" />
            <span>KlarSolution CLI Setup (SDK v3.0)</span>
          </div>
          <pre className="text-slate-300 leading-relaxed overflow-x-auto">
            {`# 1. Install KlarSolution CLI globally
npm install -g @klarsolution/cli

# 2. Authenticate CLI using token
klarsolution login --key ${apiKey}

# 3. Trigger batch 3-Way Matching audit on local directory
klarsolution audit --input ./invoices --po-context ./orders.json`}
          </pre>
        </div>
      </div>
    </RBACGuard>
  );
};
