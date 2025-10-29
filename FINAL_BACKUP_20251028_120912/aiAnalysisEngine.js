// ═══════════════════════════════════════════════════════════
// AI ANALYSIS RULES ENGINE
// Analyzes test results and provides intelligent recommendations
// ═══════════════════════════════════════════════════════════

export const analyzeTestResults = (testType, data, language = 'en') => {
  const analysis = {
    testType,
    timestamp: new Date().toISOString(),
    results: [],
    recommendations: [],
    overallScore: 0,
    riskLevel: 'SAFE',
    summary: ''
  };

  switch(testType) {
    case 'water':
      return analyzeWater(data, language);
    case 'soil':
      return analyzeSoil(data, language);
    case 'strawberry':
    case 'vegetables':
    case 'fruits':
      return analyzeAg(data, testType, language);
    case 'fuel':
      return analyzeFuel(data, language);
    case 'alcohol':
      return analyzeAlcohol(data, language);
    case 'engine':
      return analyzeEngine(data, language);
    default:
      return analysis;
  }
};

// ═══════════════════════════════════════════════════════════
// WATER ANALYSIS
// ═══════════════════════════════════════════════════════════
const analyzeWater = (data, language) => {
  const results = [];
  const recommendations = [];
  let riskLevel = 'SAFE';
  let score = 100;

  // pH Analysis
  if (data.pH) {
    const ph = parseFloat(data.pH);
    if (ph >= 6.5 && ph <= 8.5) {
      results.push({
        parameter: 'pH',
        value: ph,
        status: 'GOOD',
        message: language === 'es' ? 'pH dentro del rango óptimo' : 'pH within optimal range'
      });
    } else if (ph < 6.5) {
      results.push({
        parameter: 'pH',
        value: ph,
        status: 'LOW',
        message: language === 'es' ? 'pH bajo - agua ácida' : 'Low pH - acidic water'
      });
      recommendations.push({
        type: 'warning',
        issue: language === 'es' ? 'pH Bajo' : 'Low pH',
        action: language === 'es' 
          ? `Añadir ${Math.ceil((6.5 - ph) * 10)} g/L de bicarbonato de sodio` 
          : `Add ${Math.ceil((6.5 - ph) * 10)} g/L sodium bicarbonate`,
        impact: language === 'es' ? 'Mejora sabor y previene corrosión' : 'Improves taste and prevents corrosion'
      });
      score -= 15;
      riskLevel = 'MODERATE';
    } else {
      results.push({
        parameter: 'pH',
        value: ph,
        status: 'HIGH',
        message: language === 'es' ? 'pH alto - agua alcalina' : 'High pH - alkaline water'
      });
      recommendations.push({
        type: 'warning',
        issue: language === 'es' ? 'pH Alto' : 'High pH',
        action: language === 'es' ? 'Considerar sistema de neutralización' : 'Consider neutralization system',
        impact: language === 'es' ? 'Reduce formación de sarro' : 'Reduces scale formation'
      });
      score -= 10;
      riskLevel = 'MODERATE';
    }
  }

  // Lead Analysis
  if (data.lead) {
    const lead = parseFloat(data.lead);
    if (lead <= 15) {
      results.push({
        parameter: 'Lead (Pb)',
        value: `${lead} ppb`,
        status: 'GOOD',
        message: language === 'es' ? 'Plomo dentro de límites seguros EPA' : 'Lead within EPA safe limits'
      });
    } else {
      results.push({
        parameter: 'Lead (Pb)',
        value: `${lead} ppb`,
        status: 'CRITICAL',
        message: language === 'es' ? '¡PELIGRO! Plomo excede límites EPA' : 'DANGER! Lead exceeds EPA limits'
      });
      recommendations.push({
        type: 'critical',
        issue: language === 'es' ? 'Plomo Elevado' : 'Elevated Lead',
        action: language === 'es' 
          ? '¡ACCIÓN INMEDIATA! Instalar filtro certificado NSF/ANSI 53. NO BEBER.' 
          : 'IMMEDIATE ACTION! Install NSF/ANSI 53 certified filter. DO NOT DRINK.',
        impact: language === 'es' ? 'Previene daño neurológico' : 'Prevents neurological damage'
      });
      score -= 40;
      riskLevel = 'CRITICAL';
    }
  }

  // E.coli
  if (data.ecoli !== undefined) {
    const ecoli = parseFloat(data.ecoli);
    if (ecoli === 0) {
      results.push({
        parameter: 'E.coli',
        value: 'Absent',
        status: 'GOOD',
        message: language === 'es' ? 'No se detectaron bacterias patógenas' : 'No pathogenic bacteria detected'
      });
    } else {
      results.push({
        parameter: 'E.coli',
        value: `${ecoli} CFU/100mL`,
        status: 'CRITICAL',
        message: language === 'es' ? '¡CONTAMINACIÓN FECAL!' : 'FECAL CONTAMINATION!'
      });
      recommendations.push({
        type: 'critical',
        issue: language === 'es' ? 'E.coli Detectada' : 'E.coli Detected',
        action: language === 'es' 
          ? 'HERVIR AGUA 1 MINUTO antes de usar. Contactar departamento de salud.' 
          : 'BOIL WATER 1 MINUTE before use. Contact health department.',
        impact: language === 'es' ? 'Previene enfermedades gastrointestinales' : 'Prevents gastrointestinal illness'
      });
      score -= 50;
      riskLevel = 'CRITICAL';
    }
  }

  // Nitrate
  if (data.nitrate) {
    const nitrate = parseFloat(data.nitrate);
    if (nitrate <= 10) {
      results.push({
        parameter: 'Nitrate',
        value: `${nitrate} mg/L`,
        status: 'GOOD',
        message: language === 'es' ? 'Nitrato dentro de límites EPA' : 'Nitrate within EPA limits'
      });
    } else {
      results.push({
        parameter: 'Nitrate',
        value: `${nitrate} mg/L`,
        status: 'HIGH',
        message: language === 'es' ? 'Nitrato elevado - riesgo para bebés' : 'Elevated nitrate - risk for infants'
      });
      recommendations.push({
        type: 'warning',
        issue: language === 'es' ? 'Nitrato Alto' : 'High Nitrate',
        action: language === 'es' 
          ? 'NO usar para fórmula de bebés. Considerar ósmosis inversa.' 
          : 'DO NOT use for infant formula. Consider reverse osmosis.',
        impact: language === 'es' ? 'Previene metahemoglobinemia' : 'Prevents methemoglobinemia'
      });
      score -= 25;
      riskLevel = 'HIGH';
    }
  }

  return {
    testType: 'water',
    timestamp: new Date().toISOString(),
    results,
    recommendations,
    overallScore: Math.max(0, score),
    riskLevel,
    summary: generateWaterSummary(score, riskLevel, language)
  };
};

// ═══════════════════════════════════════════════════════════
// SOIL ANALYSIS
// ═══════════════════════════════════════════════════════════
const analyzeSoil = (data, language) => {
  const results = [];
  const recommendations = [];
  let score = 100;
  let riskLevel = 'GOOD';

  // pH
  if (data.pH) {
    const ph = parseFloat(data.pH);
    if (ph >= 6.0 && ph <= 7.0) {
      results.push({
        parameter: 'pH',
        value: ph,
        status: 'OPTIMAL',
        message: language === 'es' ? 'pH óptimo para mayoría de cultivos' : 'Optimal pH for most crops'
      });
    } else if (ph < 6.0) {
      results.push({
        parameter: 'pH',
        value: ph,
        status: 'LOW',
        message: language === 'es' ? 'Suelo ácido' : 'Acidic soil'
      });
      recommendations.push({
        type: 'action',
        issue: language === 'es' ? 'pH Bajo' : 'Low pH',
        action: language === 'es' 
          ? `Aplicar ${Math.ceil((6.0 - ph) * 500)} kg/hectárea de cal agrícola` 
          : `Apply ${Math.ceil((6.0 - ph) * 500)} kg/hectare agricultural lime`,
        impact: language === 'es' ? 'Mejora disponibilidad de nutrientes 15-25%' : 'Improves nutrient availability 15-25%'
      });
      score -= 15;
    }
  }

  // Nitrogen
  if (data.nitrogen) {
    const n = parseFloat(data.nitrogen);
    if (n >= 20 && n <= 40) {
      results.push({
        parameter: 'Nitrogen (N)',
        value: `${n} ppm`,
        status: 'GOOD',
        message: language === 'es' ? 'Nitrógeno adecuado' : 'Adequate nitrogen'
      });
    } else if (n < 20) {
      results.push({
        parameter: 'Nitrogen (N)',
        value: `${n} ppm`,
        status: 'LOW',
        message: language === 'es' ? 'Nitrógeno deficiente' : 'Nitrogen deficient'
      });
      recommendations.push({
        type: 'critical',
        issue: language === 'es' ? 'Nitrógeno Bajo' : 'Low Nitrogen',
        action: language === 'es' 
          ? `Aplicar ${Math.ceil((20 - n) * 10)} kg/hectárea de nitrato de amonio` 
          : `Apply ${Math.ceil((20 - n) * 10)} kg/hectare ammonium nitrate`,
        impact: language === 'es' ? 'Aumento esperado de rendimiento: 20-30%' : 'Expected yield increase: 20-30%'
      });
      score -= 20;
      riskLevel = 'MODERATE';
    }
  }

  // Phosphorus
  if (data.phosphorus) {
    const p = parseFloat(data.phosphorus);
    if (p >= 40 && p <= 80) {
      results.push({
        parameter: 'Phosphorus (P)',
        value: `${p} ppm`,
        status: 'GOOD',
        message: language === 'es' ? 'Fósforo óptimo' : 'Optimal phosphorus'
      });
    } else if (p < 40) {
      results.push({
        parameter: 'Phosphorus (P)',
        value: `${p} ppm`,
        status: 'LOW',
        message: language === 'es' ? 'Fósforo bajo' : 'Low phosphorus'
      });
      recommendations.push({
        type: 'action',
        issue: language === 'es' ? 'Fósforo Bajo' : 'Low Phosphorus',
        action: language === 'es' 
          ? 'Aplicar fosfato monoamónico (MAP) 50 kg/hectárea' 
          : 'Apply monoammonium phosphate (MAP) 50 kg/hectare',
        impact: language === 'es' ? 'Mejora desarrollo radicular y floración' : 'Improves root development and flowering'
      });
      score -= 15;
    }
  }

  // Potassium
  if (data.potassium) {
    const k = parseFloat(data.potassium);
    if (k >= 150 && k <= 300) {
      results.push({
        parameter: 'Potassium (K)',
        value: `${k} ppm`,
        status: 'GOOD',
        message: language === 'es' ? 'Potasio adecuado' : 'Adequate potassium'
      });
    } else if (k < 150) {
      results.push({
        parameter: 'Potassium (K)',
        value: `${k} ppm`,
        status: 'LOW',
        message: language === 'es' ? 'Potasio bajo' : 'Low potassium'
      });
      recommendations.push({
        type: 'action',
        issue: language === 'es' ? 'Potasio Bajo' : 'Low Potassium',
        action: language === 'es' 
          ? 'Aplicar sulfato de potasio 75 kg/hectárea' 
          : 'Apply potassium sulfate 75 kg/hectare',
        impact: language === 'es' ? 'Mejora calidad de fruta y resistencia a estrés' : 'Improves fruit quality and stress resistance'
      });
      score -= 10;
    }
  }

  return {
    testType: 'soil',
    timestamp: new Date().toISOString(),
    results,
    recommendations,
    overallScore: Math.max(0, score),
    riskLevel,
    summary: generateSoilSummary(score, language)
  };
};

// ═══════════════════════════════════════════════════════════
// AG ANALYSIS (STRAWBERRY, VEGETABLES, FRUITS)
// ═══════════════════════════════════════════════════════════
const analyzeAg = (data, cropType, language) => {
  const results = [];
  const recommendations = [];
  let score = 100;
  let riskLevel = 'GOOD';

  // Brix (Sugar Content)
  if (data.brix) {
    const brix = parseFloat(data.brix);
    const optimalBrix = cropType === 'strawberry' ? 10 : 12;
    
    if (brix >= optimalBrix) {
      results.push({
        parameter: 'Brix (Sweetness)',
        value: `${brix}°`,
        status: 'EXCELLENT',
        message: language === 'es' ? '¡Dulzura óptima alcanzada!' : 'Optimal sweetness achieved!'
      });
    } else if (brix >= optimalBrix - 2) {
      results.push({
        parameter: 'Brix (Sweetness)',
        value: `${brix}°`,
        status: 'GOOD',
        message: language === 'es' ? 'Dulzura aceptable' : 'Acceptable sweetness'
      });
      recommendations.push({
        type: 'optimization',
        issue: language === 'es' ? 'Brix Mejorable' : 'Brix Can Improve',
        action: language === 'es' 
          ? `Aumentar potasio 30%. Esperar 7-10 días adicionales para cosecha óptima.` 
          : `Increase potassium 30%. Wait 7-10 additional days for optimal harvest.`,
        impact: language === 'es' ? `Meta: ${optimalBrix}° Brix (+${(optimalBrix - brix).toFixed(1)}°)` : `Target: ${optimalBrix}° Brix (+${(optimalBrix - brix).toFixed(1)}°)`
      });
      score -= 10;
    } else {
      results.push({
        parameter: 'Brix (Sweetness)',
        value: `${brix}°`,
        status: 'LOW',
        message: language === 'es' ? 'Dulzura baja - fruta inmadura' : 'Low sweetness - immature fruit'
      });
      recommendations.push({
        type: 'action',
        issue: language === 'es' ? 'Brix Bajo' : 'Low Brix',
        action: language === 'es' 
          ? 'NO COSECHAR. Aplicar 50 kg/ha K₂SO₄. Esperar 14 días mínimo.' 
          : 'DO NOT HARVEST. Apply 50 kg/ha K₂SO₄. Wait minimum 14 days.',
        impact: language === 'es' ? 'Aumentará calidad y precio de mercado 25-40%' : 'Will increase quality and market price 25-40%'
      });
      score -= 25;
      riskLevel = 'MODERATE';
    }
  }

  // Pesticide Residues
  if (data.pesticides !== undefined) {
    const pesticideLevel = parseFloat(data.pesticides);
    if (pesticideLevel === 0 || pesticideLevel < 0.01) {
      results.push({
        parameter: 'Pesticide Residues',
        value: 'Not Detected',
        status: 'EXCELLENT',
        message: language === 'es' ? '✅ Sin residuos detectables - cumple orgánico' : '✅ No detectable residues - meets organic'
      });
    } else if (pesticideLevel < 0.5) {
      results.push({
        parameter: 'Pesticide Residues',
        value: `${pesticideLevel} mg/kg`,
        status: 'SAFE',
        message: language === 'es' ? 'Dentro de límites EPA/FDA' : 'Within EPA/FDA limits'
      });
    } else {
      results.push({
        parameter: 'Pesticide Residues',
        value: `${pesticideLevel} mg/kg`,
        status: 'HIGH',
        message: language === 'es' ? '⚠️ Residuos elevados' : '⚠️ Elevated residues'
      });
      recommendations.push({
        type: 'warning',
        issue: language === 'es' ? 'Residuos de Pesticidas' : 'Pesticide Residues',
        action: language === 'es' 
          ? 'Respetar período de espera. Aumentar lavado pre-comercialización.' 
          : 'Respect waiting period. Increase pre-market washing.',
        impact: language === 'es' ? 'Cumplimiento con límites de comercialización' : 'Compliance with marketing limits'
      });
      score -= 20;
      riskLevel = 'MODERATE';
    }
  }

  // Anthocyanins (Berries)
  if (data.anthocyanins && (cropType === 'strawberry' || cropType === 'berries')) {
    const anthocyanins = parseFloat(data.anthocyanins);
    if (anthocyanins >= 40) {
      results.push({
        parameter: 'Anthocyanins',
        value: `${anthocyanins} mg/100g`,
        status: 'EXCELLENT',
        message: language === 'es' ? 'Color intenso - alto valor antioxidante' : 'Intense color - high antioxidant value'
      });
    } else {
      results.push({
        parameter: 'Anthocyanins',
        value: `${anthocyanins} mg/100g`,
        status: 'MODERATE',
        message: language === 'es' ? 'Color moderado' : 'Moderate color'
      });
      recommendations.push({
        type: 'optimization',
        issue: language === 'es' ? 'Color Mejorable' : 'Color Can Improve',
        action: language === 'es' 
          ? 'Aumentar exposición solar. Considerar variedades con mayor pigmentación.' 
          : 'Increase sun exposure. Consider higher-pigment varieties.',
        impact: language === 'es' ? 'Mejora atractivo visual y valor nutricional' : 'Improves visual appeal and nutritional value'
      });
      score -= 5;
    }
  }

  return {
    testType: cropType,
    timestamp: new Date().toISOString(),
    results,
    recommendations,
    overallScore: Math.max(0, score),
    riskLevel,
    summary: generateAgSummary(score, cropType, language)
  };
};

// ═══════════════════════════════════════════════════════════
// FUEL ANALYSIS
// ═══════════════════════════════════════════════════════════
const analyzeFuel = (data, language) => {
  const results = [];
  const recommendations = [];
  let score = 100;
  let riskLevel = 'SAFE';

  // Octane Rating
  if (data.octane) {
    const octane = parseFloat(data.octane);
    if (octane >= 87) {
      results.push({
        parameter: 'Octane Rating',
        value: octane,
        status: 'GOOD',
        message: language === 'es' ? 'Octanaje adecuado' : 'Adequate octane rating'
      });
    } else {
      results.push({
        parameter: 'Octane Rating',
        value: octane,
        status: 'LOW',
        message: language === 'es' ? 'Octanaje bajo - riesgo de detonación' : 'Low octane - knock risk'
      });
      recommendations.push({
        type: 'warning',
        issue: language === 'es' ? 'Octanaje Bajo' : 'Low Octane',
        action: language === 'es' ? 'NO USAR. Cambiar proveedor de combustible.' : 'DO NOT USE. Change fuel supplier.',
        impact: language === 'es' ? 'Previene daño al motor' : 'Prevents engine damage'
      });
      score -= 30;
      riskLevel = 'HIGH';
    }
  }

  // Water Contamination
  if (data.water !== undefined) {
    const water = parseFloat(data.water);
    if (water < 0.1) {
      results.push({
        parameter: 'Water Content',
        value: `${water}%`,
        status: 'GOOD',
        message: language === 'es' ? 'Contenido de agua aceptable' : 'Acceptable water content'
      });
    } else if (water < 0.5) {
      results.push({
        parameter: 'Water Content',
        value: `${water}%`,
        status: 'MODERATE',
        message: language === 'es' ? 'Agua detectada - monitorear' : 'Water detected - monitor'
      });
      recommendations.push({
        type: 'action',
        issue: language === 'es' ? 'Agua en Combustible' : 'Water in Fuel',
        action: language === 'es' ? 'Agregar aditivo removedor de agua' : 'Add water removal additive',
        impact: language === 'es' ? 'Previene corrosión y crecimiento microbiano' : 'Prevents corrosion and microbial growth'
      });
      score -= 15;
      riskLevel = 'MODERATE';
    } else {
      results.push({
        parameter: 'Water Content',
        value: `${water}%`,
        status: 'CRITICAL',
        message: language === 'es' ? '¡ALTO NIVEL DE AGUA!' : 'HIGH WATER LEVEL!'
      });
      recommendations.push({
        type: 'critical',
        issue: language === 'es' ? 'Contaminación Severa de Agua' : 'Severe Water Contamination',
        action: language === 'es' 
          ? '¡DRENAR TANQUE INMEDIATAMENTE! Limpiar sistema de combustible.' 
          : 'DRAIN TANK IMMEDIATELY! Clean fuel system.',
        impact: language === 'es' ? 'Previene falla catastrófica del motor' : 'Prevents catastrophic engine failure'
      });
      score -= 50;
      riskLevel = 'CRITICAL';
    }
  }

  return {
    testType: 'fuel',
    timestamp: new Date().toISOString(),
    results,
    recommendations,
    overallScore: Math.max(0, score),
    riskLevel,
    summary: generateFuelSummary(score, riskLevel, language)
  };
};

// ═══════════════════════════════════════════════════════════
// ALCOHOL ANALYSIS
// ═══════════════════════════════════════════════════════════
const analyzeAlcohol = (data, language) => {
  const results = [];
  const recommendations = [];
  let score = 100;
  let riskLevel = 'SAFE';

  // Ethanol Content
  if (data.ethanol) {
    const ethanol = parseFloat(data.ethanol);
    if (ethanol >= 40 && ethanol <= 95) {
      results.push({
        parameter: 'Ethanol Content',
        value: `${ethanol}% ABV`,
        status: 'GOOD',
        message: language === 'es' ? 'Contenido alcohólico dentro de rango' : 'Alcohol content within range'
      });
    }
  }

  // Methanol (CRITICAL)
  if (data.methanol !== undefined) {
    const methanol = parseFloat(data.methanol);
    if (methanol < 0.01) {
      results.push({
        parameter: 'Methanol',
        value: `${methanol}%`,
        status: 'SAFE',
        message: language === 'es' ? '✅ Metanol dentro de límites seguros' : '✅ Methanol within safe limits'
      });
    } else {
      results.push({
        parameter: 'Methanol',
        value: `${methanol}%`,
        status: 'CRITICAL',
        message: language === 'es' ? '🚨 METANOL PELIGROSO DETECTADO' : '🚨 DANGEROUS METHANOL DETECTED'
      });
      recommendations.push({
        type: 'critical',
        issue: language === 'es' ? 'Metanol Tóxico' : 'Toxic Methanol',
        action: language === 'es' 
          ? '¡NO CONSUMIR! DESTRUIR LOTE. Puede causar ceguera/muerte.' 
          : 'DO NOT CONSUME! DESTROY BATCH. Can cause blindness/death.',
        impact: language === 'es' ? 'Previene envenenamiento fatal' : 'Prevents fatal poisoning'
      });
      score = 0;
      riskLevel = 'CRITICAL';
    }
  }

  return {
    testType: 'alcohol',
    timestamp: new Date().toISOString(),
    results,
    recommendations,
    overallScore: Math.max(0, score),
    riskLevel,
    summary: generateAlcoholSummary(score, riskLevel, language)
  };
};

// ═══════════════════════════════════════════════════════════
// ENGINE OIL ANALYSIS
// ═══════════════════════════════════════════════════════════
const analyzeEngine = (data, language) => {
  const results = [];
  const recommendations = [];
  let score = 100;
  let riskLevel = 'GOOD';

  // Wear Metals (Iron)
  if (data.iron) {
    const iron = parseFloat(data.iron);
    if (iron < 50) {
      results.push({
        parameter: 'Iron (Wear Metals)',
        value: `${iron} ppm`,
        status: 'GOOD',
        message: language === 'es' ? 'Desgaste normal' : 'Normal wear'
      });
    } else if (iron < 100) {
      results.push({
        parameter: 'Iron (Wear Metals)',
        value: `${iron} ppm`,
        status: 'MODERATE',
        message: language === 'es' ? 'Desgaste elevado' : 'Elevated wear'
      });
      recommendations.push({
        type: 'action',
        issue: language === 'es' ? 'Desgaste de Motor' : 'Engine Wear',
        action: language === 'es' ? 'Cambiar aceite pronto. Monitorear cada 1000 km.' : 'Change oil soon. Monitor every 1000 km.',
        impact: language === 'es' ? 'Previene daño mayor al motor' : 'Prevents major engine damage'
      });
      score -= 20;
      riskLevel = 'MODERATE';
    } else {
      results.push({
        parameter: 'Iron (Wear Metals)',
        value: `${iron} ppm`,
        status: 'CRITICAL',
        message: language === 'es' ? '¡DESGASTE SEVERO!' : 'SEVERE WEAR!'
      });
      recommendations.push({
        type: 'critical',
        issue: language === 'es' ? 'Falla Inminente de Motor' : 'Imminent Engine Failure',
        action: language === 'es' 
          ? '¡DETENER OPERACIÓN! Inspección mecánica urgente requerida.' 
          : 'STOP OPERATION! Urgent mechanical inspection required.',
        impact: language === 'es' ? 'Previene falla catastrófica' : 'Prevents catastrophic failure'
      });
      score -= 50;
      riskLevel = 'CRITICAL';
    }
  }

  // Viscosity
  if (data.viscosity) {
    const viscosity = parseFloat(data.viscosity);
    if (viscosity >= 9 && viscosity <= 11) {
      results.push({
        parameter: 'Viscosity',
        value: `${viscosity} cSt`,
        status: 'GOOD',
        message: language === 'es' ? 'Viscosidad óptima' : 'Optimal viscosity'
      });
    } else {
      results.push({
        parameter: 'Viscosity',
        value: `${viscosity} cSt`,
        status: 'WARNING',
        message: language === 'es' ? 'Viscosidad fuera de rango' : 'Viscosity out of range'
      });
      recommendations.push({
        type: 'action',
        issue: language === 'es' ? 'Viscosidad Incorrecta' : 'Incorrect Viscosity',
        action: language === 'es' ? 'Cambiar aceite - degradación térmica' : 'Change oil - thermal degradation',
        impact: language === 'es' ? 'Restaura protección del motor' : 'Restores engine protection'
      });
      score -= 15;
    }
  }

  return {
    testType: 'engine',
    timestamp: new Date().toISOString(),
    results,
    recommendations,
    overallScore: Math.max(0, score),
    riskLevel,
    summary: generateEngineSummary(score, riskLevel, language)
  };
};

// ═══════════════════════════════════════════════════════════
// SUMMARY GENERATORS
// ═══════════════════════════════════════════════════════════
const generateWaterSummary = (score, riskLevel, language) => {
  if (riskLevel === 'CRITICAL') {
    return language === 'es' 
      ? '🚨 AGUA NO SEGURA PARA CONSUMO. Acción inmediata requerida.' 
      : '🚨 WATER UNSAFE FOR CONSUMPTION. Immediate action required.';
  } else if (riskLevel === 'HIGH' || riskLevel === 'MODERATE') {
    return language === 'es' 
      ? '⚠️ Calidad del agua requiere atención. Ver recomendaciones.' 
      : '⚠️ Water quality requires attention. See recommendations.';
  } else {
    return language === 'es' 
      ? '✅ Agua segura para consumo. Calidad excelente.' 
      : '✅ Water safe for consumption. Excellent quality.';
  }
};

const generateSoilSummary = (score, language) => {
  if (score >= 90) {
    return language === 'es' 
      ? '✅ Suelo en excelente condición. Listo para cultivo óptimo.' 
      : '✅ Soil in excellent condition. Ready for optimal cultivation.';
  } else if (score >= 70) {
    return language === 'es' 
      ? '⚠️ Suelo necesita ajustes menores para rendimiento óptimo.' 
      : '⚠️ Soil needs minor adjustments for optimal performance.';
  } else {
    return language === 'es' 
      ? '🔧 Suelo requiere enmiendas significativas. Seguir recomendaciones.' 
      : '🔧 Soil requires significant amendments. Follow recommendations.';
  }
};

const generateAgSummary = (score, cropType, language) => {
  if (score >= 90) {
    return language === 'es' 
      ? `✅ ${cropType} en condición premium. Listo para cosecha/venta.` 
      : `✅ ${cropType} in premium condition. Ready for harvest/sale.`;
  } else if (score >= 70) {
    return language === 'es' 
      ? `⚠️ ${cropType} necesita optimización. Ver recomendaciones para mejorar calidad.` 
      : `⚠️ ${cropType} needs optimization. See recommendations to improve quality.`;
  } else {
    return language === 'es' 
      ? `🔧 ${cropType} requiere atención. NO cosechar hasta resolver problemas.` 
      : `🔧 ${cropType} requires attention. DO NOT harvest until issues resolved.`;
  }
};

const generateFuelSummary = (score, riskLevel, language) => {
  if (riskLevel === 'CRITICAL') {
    return language === 'es' 
      ? '🚨 COMBUSTIBLE PELIGROSO. NO USAR. Riesgo de daño catastrófico.' 
      : '🚨 DANGEROUS FUEL. DO NOT USE. Risk of catastrophic damage.';
  } else if (riskLevel === 'HIGH' || riskLevel === 'MODERATE') {
    return language === 'es' 
      ? '⚠️ Calidad de combustible comprometida. Tomar acción correctiva.' 
      : '⚠️ Fuel quality compromised. Take corrective action.';
  } else {
    return language === 'es' 
      ? '✅ Combustible cumple especificaciones. Seguro para uso.' 
      : '✅ Fuel meets specifications. Safe for use.';
  }
};

const generateAlcoholSummary = (score, riskLevel, language) => {
  if (riskLevel === 'CRITICAL') {
    return language === 'es' 
      ? '🚨 PRODUCTO TÓXICO. NO CONSUMIR. DESTRUIR INMEDIATAMENTE.' 
      : '🚨 TOXIC PRODUCT. DO NOT CONSUME. DESTROY IMMEDIATELY.';
  } else {
    return language === 'es' 
      ? '✅ Producto seguro para consumo. Cumple estándares de calidad.' 
      : '✅ Product safe for consumption. Meets quality standards.';
  }
};

const generateEngineSummary = (score, riskLevel, language) => {
  if (riskLevel === 'CRITICAL') {
    return language === 'es' 
      ? '🚨 FALLA INMINENTE. Detener operación inmediatamente.' 
      : '🚨 IMMINENT FAILURE. Stop operation immediately.';
  } else if (riskLevel === 'MODERATE') {
    return language === 'es' 
      ? '⚠️ Motor requiere mantenimiento pronto. Monitorear de cerca.' 
      : '⚠️ Engine requires maintenance soon. Monitor closely.';
  } else {
    return language === 'es' 
      ? '✅ Motor en buena condición. Continuar programa de mantenimiento.' 
      : '✅ Engine in good condition. Continue maintenance program.';
  }
};

export default analyzeTestResults;
