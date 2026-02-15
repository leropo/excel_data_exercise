import { en } from './en';
import { es } from './es';
import type { TranslationKeys } from './en';

export type Locale = 'en' | 'es';

export const translations: Record<Locale, TranslationKeys> = {
  en,
  es,
};

// List of supported locales (add more as you create translation files)
export const supportedLocales: Locale[] = ['en', 'es'];

// Default locale
export const defaultLocale: Locale = 'en';
