export const translations = {
  en: {
    nav_dashboard: '📊 Dashboard', nav_alcohol: '🧪 Alcohol', nav_engine: '🚜 Engine',
    nav_environment: '🌿 Environment AI', nav_fueloil: '⛽ Fuel/Oil', nav_soil: '🌱 Soil',
    nav_testing: '🔬 Testing', nav_water: '💧 Water Tech',
    dash_title: 'AuditDNA Complete Platform', btn_continue: 'Continue'
  },
  es: {
    nav_dashboard: '📊 Panel', nav_alcohol: '🧪 Alcohol', nav_engine: '🚜 Motor',
    nav_environment: '🌿 IA Ambiental', nav_fueloil: '⛽ Combustible', nav_soil: '🌱 Suelo',
    nav_testing: '🔬 Laboratorio', nav_water: '💧 Agua',
    dash_title: 'Plataforma AuditDNA', btn_continue: 'Continuar'
  }
};

export const unitConversions = {
  acresToHectares: (acres) => (acres * 0.404686).toFixed(2),
  fahrenheitToCelsius: (f) => ((f - 32) * 5/9).toFixed(1)
};