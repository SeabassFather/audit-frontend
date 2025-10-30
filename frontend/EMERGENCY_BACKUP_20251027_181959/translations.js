export const translations = {
  en: {
    nav_dashboard: 'Ã°Å¸â€œÅ  Dashboard', nav_alcohol: 'Ã°Å¸Â§Âª Alcohol', nav_engine: 'Ã°Å¸Å¡Å“ Engine',
    nav_environment: 'Ã°Å¸Å’Â¿ Environment AI', nav_fueloil: 'Ã¢â€ºÂ½ Fuel/Oil', nav_soil: 'Ã°Å¸Å’Â± Soil',
    nav_testing: 'Ã°Å¸â€Â¬ Testing', nav_water: 'Ã°Å¸â€™Â§ Water Tech',
    dash_title: 'AuditDNA Complete Platform', btn_continue: 'Continue'
  },
  es: {
    nav_dashboard: 'Ã°Å¸â€œÅ  Panel', nav_alcohol: 'Ã°Å¸Â§Âª Alcohol', nav_engine: 'Ã°Å¸Å¡Å“ Motor',
    nav_environment: 'Ã°Å¸Å’Â¿ IA Ambiental', nav_fueloil: 'Ã¢â€ºÂ½ Combustible', nav_soil: 'Ã°Å¸Å’Â± Suelo',
    nav_testing: 'Ã°Å¸â€Â¬ Laboratorio', nav_water: 'Ã°Å¸â€™Â§ Agua',
    dash_title: 'Plataforma AuditDNA', btn_continue: 'Continuar'
  }
};

export const unitConversions = {
  acresToHectares: (acres) => (acres * 0.404686).toFixed(2),
  fahrenheitToCelsius: (f) => ((f - 32) * 5/9).toFixed(1)
};