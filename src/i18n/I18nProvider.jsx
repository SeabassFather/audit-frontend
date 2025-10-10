import React, { createContext, useContext, useMemo, useState } from "react";

const dict = {
  en: {
    services: "Services",
    cases: "Cases",
    admin: "Admin",
    language: "Language",
    prices: "USDA Prices",
    marketplace: "Ag Marketplace",
    compare: "Compare",
    buyer: "Buyer",
    seller: "Seller",
    generateQR: "Generate QR",
    qrHint: "Enter a URL or text to encode",
    copy: "Copy",
    download: "Download",
    start: "Start",
  },
  es: {
    services: "Servicios",
    cases: "Casos",
    admin: "Admin",
    language: "Idioma",
    prices: "Precios USDA",
    marketplace: "Mercado Agrícola",
    compare: "Comparar",
    buyer: "Comprador",
    seller: "Vendedor",
    generateQR: "Generar QR",
    qrHint: "Ingresa URL o texto",
    copy: "Copiar",
    download: "Descargar",
    start: "Iniciar",
  },
};

const I18nCtx = createContext({ lang: "en", t: (k) => k, setLang: () => {} });

export function I18nProvider({ children }) {
  const [lang, setLang] = useState("en");
  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (k) => (dict[lang] && dict[lang][k]) || k,
    }),
    [lang],
  );
  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
}

export const useI18n = () => useContext(I18nCtx);
