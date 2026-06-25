import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources } from './translations';

export type Lang = 'pt' | 'en' | 'es' | 'fr';

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
}

i18next.use(initReactI18next).init({
  resources,
  lng: (localStorage.getItem('mundodedoces_lang') as Lang) || 'pt',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
});

const LanguageContext = createContext<LanguageContextType>({
  lang: 'pt',
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(
    (localStorage.getItem('mundodedoces_lang') as Lang) || 'pt'
  );

  useEffect(() => {
    i18next.changeLanguage(lang);
    localStorage.setItem('mundodedoces_lang', lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (key: string) => i18next.t(key);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useTranslation() {
  return useContext(LanguageContext);
}
