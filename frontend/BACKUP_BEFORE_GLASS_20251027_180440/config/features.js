// Feature flags for AuditDNA modules
// Created: 2025-10-26 22:47:40 UTC
// Author: SeabassFather

export const FEATURES = {
  // TIER 1: Micro-frontends (separate deployments)
  FINANCIAL_MODULE: true,
  REALESTATE_MODULE: true,
  AGRICULTURE_MODULE: true,
  
  // TIER 2: Lazy-loaded modules
  COMPLIANCE_MODULE: true,
  ANALYTICS_MODULE: true,
  MEXICO_OPS_MODULE: true,
  
  // TIER 3: Core pages (always loaded)
  DASHBOARD: true,
  SETTINGS: true,
  SEARCH: true,
};

export const isFeatureEnabled = (feature) => {
  return FEATURES[feature] === true;
};

export const getEnabledModules = () => {
  return Object.keys(FEATURES).filter(key => FEATURES[key]);
};

export default FEATURES;
