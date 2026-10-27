import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types';
import { translations, TranslationDictionary } from '../translations/translations';

export type Currency = 'CHF' | 'EUR' | 'USD' | 'GBP';
export type Region = 'CH' | 'EU' | 'US' | 'UK';

export interface RegionPricingConfig {
  region: Region;
  name: string;
  flag: string;
  currency: Currency;
  symbol: string;
  tierPricesMonthly: {
    CHECK: number;
    PROTECT: number;
    CONTROL: number;
  };
  tierPricesAnnual: {
    CHECK: number;
    PROTECT: number;
    CONTROL: number;
  };
  vatName: string;
  vatRatePct: number;
  avgInvoiceDefault: number;
  paymentMethods: {
    id: string;
    label: string;
    badge?: string;
  }[];
}

export const REGION_CONFIGS: Record<Region, RegionPricingConfig> = {
  CH: {
    region: 'CH',
    name: 'Schweiz / Switzerland',
    flag: '🇨🇭',
    currency: 'CHF',
    symbol: 'CHF',
    tierPricesMonthly: {
      CHECK: 49,
      PROTECT: 99,
      CONTROL: 299,
    },
    tierPricesAnnual: {
      CHECK: 41, // ~15% discount off 49
      PROTECT: 84, // ~15% discount off 99
      CONTROL: 254, // ~15% discount off 299
    },
    vatName: 'Schweizer MWST (8.1%)',
    vatRatePct: 8.1,
    avgInvoiceDefault: 1500,
    paymentMethods: [
      { id: 'twint', label: '🇨🇭 Schweizer TWINT (QR-Pay mit Sofortfreischaltung)', badge: 'Sofort' },
      { id: 'card', label: '💳 Kreditkarte (Visa, Mastercard, American Express)', badge: 'Stripe' },
      { id: 'qr_bill', label: '📄 Kauf auf Rechnung mit Schweizer QR-Rechnung (30 Tage)', badge: 'QR-Bill' },
    ],
  },
  EU: {
    region: 'EU',
    name: 'Eurozone / EU',
    flag: '🇪🇺',
    currency: 'EUR',
    symbol: '€',
    tierPricesMonthly: {
      CHECK: 49,
      PROTECT: 99,
      CONTROL: 299,
    },
    tierPricesAnnual: {
      CHECK: 41,
      PROTECT: 84,
      CONTROL: 254,
    },
    vatName: 'EU MwSt. / TVA / IVA (19.0%)',
    vatRatePct: 19.0,
    avgInvoiceDefault: 1500,
    paymentMethods: [
      { id: 'sepa', label: '🇪🇺 SEPA Lastschrift / Direct Debit', badge: 'SEPA' },
      { id: 'card', label: '💳 Credit Card (Visa, Mastercard, American Express)', badge: 'Instant' },
      { id: 'invoice', label: '📄 EU Business Invoice (30 Days Net)', badge: 'B2B' },
    ],
  },
  US: {
    region: 'US',
    name: 'United States / Global',
    flag: '🇺🇸',
    currency: 'USD',
    symbol: '$',
    tierPricesMonthly: {
      CHECK: 49,
      PROTECT: 99,
      CONTROL: 299,
    },
    tierPricesAnnual: {
      CHECK: 41,
      PROTECT: 84,
      CONTROL: 254,
    },
    vatName: 'US / Global Sales Tax (8.0%)',
    vatRatePct: 8.0,
    avgInvoiceDefault: 1500,
    paymentMethods: [
      { id: 'card', label: '💳 Credit Card (Visa, Mastercard, Amex)', badge: 'Instant' },
      { id: 'ach', label: '🏦 ACH Direct Debit / Wire Transfer', badge: 'ACH' },
      { id: 'invoice', label: '📄 Corporate Invoice (Net 30 Days)', badge: 'B2B' },
    ],
  },
  UK: {
    region: 'UK',
    name: 'United Kingdom',
    flag: '🇬🇧',
    currency: 'GBP',
    symbol: '£',
    tierPricesMonthly: {
      CHECK: 45,
      PROTECT: 89,
      CONTROL: 269,
    },
    tierPricesAnnual: {
      CHECK: 38,
      PROTECT: 75,
      CONTROL: 228,
    },
    vatName: 'UK VAT (20.0%)',
    vatRatePct: 20.0,
    avgInvoiceDefault: 1500,
    paymentMethods: [
      { id: 'card', label: '💳 Credit Card (Visa, Mastercard, Amex)', badge: 'Instant' },
      { id: 'bacs', label: '🏦 BACS Direct Debit / Faster Payments', badge: 'BACS' },
      { id: 'invoice', label: '📄 Business Invoice (30 Days Net)', badge: 'B2B' },
    ],
  },
};

export interface LanguageContextType {
  language: Language;
  currency: Currency;
  region: Region;
  regionConfig: RegionPricingConfig;
  t: TranslationDictionary;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  setRegion: (reg: Region) => void;
  formatMoney: (amount: number, showSymbol?: boolean) => string;
}

const STORAGE_LANG_KEY = 'klarsolution_lang';
const STORAGE_CURRENCY_KEY = 'klarsolution_currency';

// Auto-detect browser language based on navigator
const detectBrowserLanguage = (): Language => {
  try {
    const navLangs = navigator.languages || [navigator.language];
    for (const lang of navLangs) {
      const lower = lang.toLowerCase();
      if (lower.startsWith('fr')) return 'fr';
      if (lower.startsWith('it')) return 'it';
      if (lower.startsWith('de')) return 'de';
      if (lower.startsWith('en')) return 'en';
    }
  } catch (e) {
    console.warn('Geo/Locale detection fallback to DE', e);
  }
  return 'de';
};

// Map language to default currency & region
const getDefaultRegionForLang = (lang: Language): Region => {
  switch (lang) {
    case 'fr':
      return 'EU';
    case 'it':
      return 'EU';
    case 'en':
      return 'US';
    case 'de':
    default:
      return 'CH';
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial Language State
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem(STORAGE_LANG_KEY) as Language;
    if (stored && ['de', 'en', 'fr', 'it', 'ar'].includes(stored)) {
      return stored;
    }
    return detectBrowserLanguage();
  });

  // Initial Currency State
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = localStorage.getItem(STORAGE_CURRENCY_KEY) as Currency;
    if (stored && ['CHF', 'EUR', 'USD', 'GBP'].includes(stored)) {
      return stored;
    }
    const defRegion = getDefaultRegionForLang(language);
    return REGION_CONFIGS[defRegion].currency;
  });

  // Map currency to region
  const getRegionFromCurrency = (curr: Currency): Region => {
    switch (curr) {
      case 'EUR':
        return 'EU';
      case 'USD':
        return 'US';
      case 'GBP':
        return 'UK';
      case 'CHF':
      default:
        return 'CH';
    }
  };

  const region = getRegionFromCurrency(currency);
  const regionConfig = REGION_CONFIGS[region];

  const t = translations[language] || translations.de;

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem(STORAGE_LANG_KEY, newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';

    // If user hasn't explicitly set currency, align currency with new language
    const currentStoredCurrency = localStorage.getItem(STORAGE_CURRENCY_KEY);
    if (!currentStoredCurrency) {
      const newDefRegion = getDefaultRegionForLang(newLang);
      const newCurr = REGION_CONFIGS[newDefRegion].currency;
      setCurrencyState(newCurr);
    }
  };

  const setCurrency = (newCurr: Currency) => {
    setCurrencyState(newCurr);
    localStorage.setItem(STORAGE_CURRENCY_KEY, newCurr);
  };

  const setRegion = (newReg: Region) => {
    const newCurr = REGION_CONFIGS[newReg].currency;
    setCurrency(newCurr);
  };

  const formatMoney = (amount: number, showSymbol = true): string => {
    const rounded = Math.round(amount * 100) / 100;
    const formattedNum = rounded.toLocaleString(language === 'de' ? 'de-CH' : 'en-US', {
      minimumFractionDigits: rounded % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    });

    if (!showSymbol) return formattedNum;

    switch (currency) {
      case 'EUR':
        return `€${formattedNum}`;
      case 'USD':
        return `$${formattedNum}`;
      case 'GBP':
        return `£${formattedNum}`;
      case 'CHF':
      default:
        return `CHF ${formattedNum}`;
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        currency,
        region,
        regionConfig,
        t,
        setLanguage,
        setCurrency,
        setRegion,
        formatMoney,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
