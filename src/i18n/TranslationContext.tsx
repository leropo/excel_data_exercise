import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { translations, defaultLocale, type Locale, supportedLocales } from './translations';
import type { TranslationKeys } from './translations/en';

interface TranslationContextType {
  t: TranslationKeys;
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const STORAGE_KEY = 'app-locale';

/**
 * Detects the user's preferred language from:
 * 1. localStorage (if previously saved)
 * 2. Browser language settings
 * 3. Default locale as fallback
 */
function detectLocale(): Locale {
  // Check localStorage first
  const savedLocale = localStorage.getItem(STORAGE_KEY);
  if (savedLocale && supportedLocales.includes(savedLocale as Locale)) {
    return savedLocale as Locale;
  }

  // Try to detect from browser language
  const browserLang = navigator.language.split('-')[0]; // Get 'en' from 'en-US'
  if (supportedLocales.includes(browserLang as Locale)) {
    return browserLang as Locale;
  }

  // Fallback to default
  return defaultLocale;
}

export function TranslationProvider({ 
  children,
  locale: initialLocale 
}: { 
  children: ReactNode;
  locale?: Locale;
}) {
  const [currentLocale, setCurrentLocale] = useState<Locale>(() => {
    // Use provided locale, or detect from storage/browser
    return initialLocale || detectLocale();
  });

  // Persist locale changes to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLocale);
  }, [currentLocale]);

  const handleSetLocale = (locale: Locale) => {
    if (supportedLocales.includes(locale)) {
      setCurrentLocale(locale);
    } else {
      console.warn(`Locale "${locale}" is not supported. Supported locales: ${supportedLocales.join(', ')}`);
    }
  };

  const value: TranslationContextType = {
    t: translations[currentLocale],
    locale: currentLocale,
    setLocale: handleSetLocale,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
