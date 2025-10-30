import React, { createContext, useContext, useState } from 'react';
import { translations, unitConversions } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const changeLanguage = (lang) => setLanguage(lang);
  const t = (key) => translations[language][key] || key;
  
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t, unitConversions }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}