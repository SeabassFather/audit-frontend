class AuditDNAEnvAI {
  constructor() {
    this.water_thresholds = { pH: [6.5,8.5], EC: [0,2.5], Nitrate: [0,10], Lead: [0,0.015], Coliform: [0,0] };
    this.soil_thresholds = { pH: [6,7.5], N: [20,50], P: [20,60], K: [150,300], OrganicMatter: [2,6] };
    this.fertilizer_thresholds = { N: [15,35], P: [5,20], K: [10,25], HeavyMetals: [0,0.01] };
  }

  eco_index(water, soil, fert, env) {
    let scores = [];
    for (const [k, v] of Object.entries(water)) {
      const [low, high] = this.water_thresholds[k] || [null, null];
      if (low !== null && high !== null) scores.push(Math.max(0, Math.min(1, (high-v)/(high-low))));
    }
    for (const [k, v] of Object.entries(soil)) {
      const [low, high] = this.soil_thresholds[k] || [null, null];
      if (low !== null && high !== null) scores.push(Math.max(0, Math.min(1, (high-v)/(high-low))));
    }
    for (const [k, v] of Object.entries(fert)) {
      const [low, high] = this.fertilizer_thresholds[k] || [null, null];
      if (low !== null && high !== null) scores.push(Math.max(0, Math.min(1, (high-v)/(high-low))));
    }
    for (const [k, v] of Object.entries(env)) {
      if (['CO2','CH4','PM2.5'].includes(k)) scores.push(Math.max(0, Math.min(1, 1-v/1000)));
    }
    return scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length*100) : 0;
  }

  risk_flags(metrics, thresholds) {
    let flags = [];
    for (const [k, v] of Object.entries(metrics)) {
      const [low, high] = thresholds[k] || [null, null];
      if (low !== null && high !== null && (v < low || v > high)) flags.push(k);
    }
    return flags;
  }

  recommend_actions(water, soil, fert, env) {
    let actions = [];
    let water_flags = this.risk_flags(water, this.water_thresholds);
    let soil_flags = this.risk_flags(soil, this.soil_thresholds);
    let fert_flags = this.risk_flags(fert, this.fertilizer_thresholds);
    if (water_flags.includes('pH')) actions.push("Adjust irrigation water pH (add acid/base).");
    if (water_flags.includes('Nitrate')) actions.push("Install advanced filtration for nitrate removal.");
    if (water_flags.includes('Lead')) actions.push("Use activated carbon or ion exchange for heavy metal removal.");
    if (water_flags.includes('Coliform')) actions.push("Disinfect water (UV, chlorination).");
    if (soil_flags.includes('OrganicMatter')) actions.push("Add compost or cover crops for soil organic matter.");
    if (soil_flags.includes('N')) actions.push("Apply nitrogen fertilizers or rotate legumes.");
    if (fert_flags.includes('HeavyMetals')) actions.push("Switch to certified organic fertilizers.");
    if (env.CO2 && env.CO2 > 800) actions.push("Increase cover crops or manage tillage to reduce CO2.");
    return actions;
  }

  analyze(water, soil, fert, env) {
    return {
      EcoSustainabilityIndex: this.eco_index(water, soil, fert, env),
      RiskFlags: {
        water: this.risk_flags(water, this.water_thresholds),
        soil: this.risk_flags(soil, this.soil_thresholds),
        fertilizer: this.risk_flags(fert, this.fertilizer_thresholds),
        environment: this.risk_flags(env, {CO2:[0,800],CH4:[0,50],PM2.5:[0,35]})
      },
      RecommendedActions: this.recommend_actions(water, soil, fert, env)
    };
  }
}
module.exports = { AuditDNAEnvAI };