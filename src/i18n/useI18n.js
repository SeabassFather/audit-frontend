import { useCallback, useMemo, useState, useEffect } from "react";

/**
 * Minimal i18n hook. Keeps lang in localStorage and listens for
 * window events: window.dispatchEvent(new CustomEvent("i18n:set",{detail:"es"}))
 */
export function useI18n() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "en");

  useEffect(() => {
    const h = (e) => {
      if (e?.detail && (e.detail === "en" || e.detail === "es")) {
        setLang(e.detail);
      }
    };
    window.addEventListener("i18n:set", h);
    return () => window.removeEventListener("i18n:set", h);
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  const dict = useMemo(
    () => ({
      en: {
        marketplace: "Ag Marketplace",
        buyer: "Buyer",
        seller: "Seller",
        compare: "Compare",
        selectBuyerSeller: "Select one buyer and one seller.",
        contactSeller: "Contact seller",
        matchScore: "Match Score",
        prices: "USDA Weekly Price Graphs",
        commodity: "Commodity",
      },
      es: {
        marketplace: "Mercado Agrícola",
        buyer: "Comprador",
        seller: "Vendedor",
        compare: "Comparar",
        selectBuyerSeller: "Seleccione un comprador y un vendedor.",
        contactSeller: "Contactar vendedor",
        matchScore: "Puntaje de coincidencia",
        prices: "Gráficas Semanales de Precios (USDA)",
        commodity: "Producto",
      },
    }),
    [],
  );

  const t = useCallback((key) => dict[lang]?.[key] ?? key, [dict, lang]);
  return { t, lang, setLang };
}
