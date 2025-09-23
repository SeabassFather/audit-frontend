import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome to AuditDNA Hub",
      grower_portal: "Grower Portal",
      buyer_portal: "Buyer Portal",
      logistics: "Logistics Marketplace",
      calendar: "Seasonal Calendar",
      compliance: "Compliance Check",
      finance: "Finance Hub",
      admin: "Admin Dashboard",
    },
  },
  es: {
    translation: {
      welcome: "Bienvenido a AuditDNA Hub",
      grower_portal: "Portal de Productores",
      buyer_portal: "Portal de Compradores",
      logistics: "Mercado Logístico",
      calendar: "Calendario Estacional",
      compliance: "Verificación de Cumplimiento",
      finance: "Centro Financiero",
      admin: "Panel de Administración",
    },
  },
  pt: {
    translation: {
      welcome: "Bem-vindo ao AuditDNA Hub",
      grower_portal: "Portal de Produtores",
      buyer_portal: "Portal de Compradores",
      logistics: "Mercado Logístico",
      calendar: "Calendário Sazonal",
      compliance: "Verificação de Conformidade",
      finance: "Centro Financeiro",
      admin: "Painel Administrativo",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  interpolation: { escapeValue: false },
});
export default i18n;
