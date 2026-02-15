import { useTranslation } from '../i18n/TranslationContext';
import { supportedLocales, type Locale } from '../i18n/translations';

// Language display names (you can add these to translations if needed)
const languageNames: Record<Locale, string> = {
  en: 'English',
  sl: 'Slovensko',
};

export function LanguageSwitcher() {
  const { t, locale, setLocale } = useTranslation();

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocale(event.target.value as Locale);
  };

  return (
    <div className="language-switcher">
      <label htmlFor="language-select" className="language-label">
        {t.app.language}:
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleLanguageChange}
        className="language-select"
        aria-label="Select language"
      >
        {supportedLocales.map((loc) => (
          <option key={loc} value={loc}>
            {languageNames[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
