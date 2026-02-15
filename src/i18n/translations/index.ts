import { en } from './en';
import { sl } from './sl';
import type { TranslationKeys } from './en';

export type Locale = 'en' | 'sl';

export const translations: Record<Locale, TranslationKeys> = {
  en,
  sl,
};

// List of supported locales (add more as you create translation files)
export const supportedLocales: Locale[] = ['en', 'sl'];

// Default locale
export const defaultLocale: Locale = 'en';
