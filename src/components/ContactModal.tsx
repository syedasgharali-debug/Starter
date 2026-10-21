import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations/translations';
import { X, CheckCircle2, ShieldCheck, FileCheck } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  prefilledNotes?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  prefilledNotes = '',
}) => {
  const t = translations[currentLang];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(prefilledNotes);
  const [ndaAccepted, setNdaAccepted] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to server or simulate instant submission
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#08271e]/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl p-6 sm:p-8 shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[#eef8f3] text-[#3d9970] rounded-full flex items-center justify-center mx-auto border-2 border-[#3d9970]/30 shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-[#08271e]">{t.formSuccessMsg}</h3>
            <p className="text-sm text-gray-600 max-w-md mx-auto">
              Ein Spezialist von KlarSolution wird Ihre Angaben auswerten und sich innerhalb eines Werktags bei Ihnen melden.
            </p>
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-[#08271e] text-white font-bold text-sm shadow-md hover:bg-[#123d2e] transition-colors"
            >
              Schliessen
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-[#3d9970]">
              <FileCheck className="w-4 h-4" />
              <span>{t.contactEyebrow}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#142032] mt-1 mb-2">
              {t.contactFormTitle}
            </h2>
            <p className="text-sm text-gray-600 mb-6">{t.contactFormHint}</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.labelName}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ihr Name / Firmenname"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.labelEmail}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre geschäftliche E-Mail"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  {t.labelMessage}
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Beschreiben Sie kurz Ihr monatliches Rechnungsvolumen oder besondere Anliegen..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#3d9970]"
                />
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  required
                  checked={ndaAccepted}
                  onChange={(e) => setNdaAccepted(e.target.checked)}
                  className="mt-0.5 rounded border-gray-300 text-[#3d9970] focus:ring-[#3d9970] w-4 h-4"
                />
                <span className="text-xs text-gray-600 leading-tight">
                  {t.labelNdaConsent} <ShieldCheck className="w-3.5 h-3.5 text-[#3d9970] inline ms-1" />
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#2f815f] to-[#3d9970] text-white font-extrabold text-sm shadow-md hover:from-[#245f49] hover:to-[#2f8a68] transition-all disabled:opacity-50 mt-2"
              >
                {isSubmitting ? t.formSubmitting : t.btnSubmitQuote}
              </button>

              <p className="text-[11px] text-gray-400 text-center">{t.formFooterNote}</p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
