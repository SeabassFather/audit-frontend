/* eslint-disable default-case */
// AI-powered buyer/seller matchmaking and risk assessment utilities

// Calculate match score between buyer requirements and grower offerings
export function calculateMatchScore(buyerRequirements, growerProfile) {
  let score = 0;
  const factors = [];
  
  // Commodity match (40 points)
  if (buyerRequirements.commodity && growerProfile.commodities) {
    const commodityMatch = growerProfile.commodities.some(c => 
      c.toLowerCase().includes(buyerRequirements.commodity.toLowerCase()) ||
      buyerRequirements.commodity.toLowerCase().includes(c.toLowerCase())
    );
    if (commodityMatch) {
      score += 40;
      factors.push({ factor: 'Commodity Match', impact: 'positive', weight: 40 });
    } else {
      factors.push({ factor: 'Commodity Mismatch', impact: 'negative', weight: -20 });
      score -= 20;
    }
  }
  
  // Volume capability (20 points)
  if (buyerRequirements.volume && growerProfile.capacity) {
    const volumeMatch = matchVolume(buyerRequirements.volume, growerProfile.capacity);
    score += volumeMatch.points;
    factors.push(volumeMatch.factor);
  }
  
  // Certification requirements (20 points)
  if (buyerRequirements.certifications && growerProfile.certifications) {
    const certMatch = matchCertifications(buyerRequirements.certifications, growerProfile.certifications);
    score += certMatch.points;
    factors.push(certMatch.factor);
  }
  
  // Geographic proximity (10 points)
  if (buyerRequirements.region && growerProfile.location) {
    const geoMatch = matchGeography(buyerRequirements.region, growerProfile.location.region);
    score += geoMatch.points;
    factors.push(geoMatch.factor);
  }
  
  // Organic requirement (10 points)
  if (buyerRequirements.organic !== undefined) {
    if (buyerRequirements.organic === growerProfile.organic) {
      score += 10;
      factors.push({ factor: 'Organic Requirement Met', impact: 'positive', weight: 10 });
    } else if (buyerRequirements.organic && !growerProfile.organic) {
      score -= 15;
      factors.push({ factor: 'Organic Requirement Not Met', impact: 'negative', weight: -15 });
    }
  }
  
  // Risk score bonus (up to 10 points)
  if (growerProfile.riskScore >= 95) {
    score += 10;
    factors.push({ factor: 'Excellent Risk Score', impact: 'positive', weight: 10 });
  } else if (growerProfile.riskScore >= 90) {
    score += 5;
    factors.push({ factor: 'Good Risk Score', impact: 'neutral', weight: 5 });
  }
  
  // Delivery performance bonus (up to 10 points)
  if (growerProfile.onTimeDelivery >= 98) {
    score += 10;
    factors.push({ factor: 'Excellent Delivery Performance', impact: 'positive', weight: 10 });
  } else if (growerProfile.onTimeDelivery >= 95) {
    score += 5;
    factors.push({ factor: 'Good Delivery Performance', impact: 'neutral', weight: 5 });
  }
  
  // Experience bonus (up to 5 points)
  const yearsInBusiness = new Date().getFullYear() - growerProfile.established;
  if (yearsInBusiness >= 20) {
    score += 5;
    factors.push({ factor: 'Highly Experienced', impact: 'positive', weight: 5 });
  } else if (yearsInBusiness >= 10) {
    score += 3;
    factors.push({ factor: 'Experienced', impact: 'neutral', weight: 3 });
  }
  
  // Ensure score is between 0-100
  score = Math.max(0, Math.min(100, score));
  
  return {
    score,
    factors,
    matchLevel: score >= 85 ? 'Excellent' : score >= 70 ? 'Good' : score >= 50 ? 'Fair' : 'Poor',
    recommendation: getRecommendation(score, factors),
    dealProbability: Math.min(95, score * 0.9), // Convert to deal probability
    estimatedTimeToClose: estimateTimeToClose(score, growerProfile)
  };
}

function matchVolume(required, capacity) {
  const capacityMap = {
    'small': 1,
    'medium': 2,
    'high': 3,
    'very-high': 4
  };
  
  const requiredLevel = typeof required === 'string' ? required.toLowerCase() : 'medium';
  const growerLevel = capacity.toLowerCase();
  
  if (capacityMap[growerLevel] >= capacityMap[requiredLevel]) {
    return {
      points: 20,
      factor: { factor: 'Volume Capacity Met', impact: 'positive', weight: 20 }
    };
  } else {
    return {
      points: -10,
      factor: { factor: 'Insufficient Volume Capacity', impact: 'negative', weight: -10 }
    };
  }
}

function matchCertifications(required, available) {
  const requiredCerts = Array.isArray(required) ? required : [required];
  const matchCount = requiredCerts.filter(r => available.includes(r)).length;
  const matchRatio = matchCount / requiredCerts.length;
  
  if (matchRatio === 1) {
    return {
      points: 20,
      factor: { factor: 'All Certifications Met', impact: 'positive', weight: 20 }
    };
  } else if (matchRatio >= 0.5) {
    return {
      points: 10,
      factor: { factor: 'Most Certifications Met', impact: 'neutral', weight: 10 }
    };
  } else {
    return {
      points: -10,
      factor: { factor: 'Certification Gap', impact: 'negative', weight: -10 }
    };
  }
}

function matchGeography(buyerRegion, growerRegion) {
  if (buyerRegion === growerRegion) {
    return {
      points: 10,
      factor: { factor: 'Same Region (Low Shipping Cost)', impact: 'positive', weight: 10 }
    };
  } else {
    return {
      points: 0,
      factor: { factor: 'Different Region', impact: 'neutral', weight: 0 }
    };
  }
}

function getRecommendation(score, factors) {
  if (score >= 85) {
    return "Highly recommended match. Initiate contact immediately.";
  } else if (score >= 70) {
    return "Good match. Consider contacting to discuss terms.";
  } else if (score >= 50) {
    return "Fair match. Review details before proceeding.";
  } else {
    return "Poor match. Consider alternative suppliers.";
  }
}

function estimateTimeToClose(score, growerProfile) {
  // Base time in days
  let days = 14;
  
  if (score >= 90) {
    days = 5;
  } else if (score >= 75) {
    days = 7;
  } else if (score >= 60) {
    days = 10;
  }
  
  // Adjust based on grower's deal history
  if (growerProfile.deals > 300) {
    days = Math.max(3, days - 2);
  } else if (growerProfile.deals > 150) {
    days = Math.max(5, days - 1);
  }
  
  return `${days} days`;
}

// Risk assessment for growers
export function assessGrowerRisk(growerProfile) {
  const risks = [];
  const warnings = [];
  const strengths = [];
  
  // Risk Score Analysis
  if (growerProfile.riskScore < 85) {
    risks.push({
      type: 'Low Risk Score',
      severity: 'high',
      description: `Risk score of ${growerProfile.riskScore} is below recommended threshold of 85`,
      mitigation: 'Request additional documentation and references'
    });
  } else if (growerProfile.riskScore >= 95) {
    strengths.push({
      type: 'Excellent Risk Score',
      description: `Outstanding risk score of ${growerProfile.riskScore}`
    });
  }
  
  // Delivery Performance
  if (growerProfile.onTimeDelivery < 90) {
    risks.push({
      type: 'Poor Delivery Performance',
      severity: 'high',
      description: `On-time delivery rate of ${growerProfile.onTimeDelivery}% is below acceptable`,
      mitigation: 'Include delivery penalties in contract'
    });
  } else if (growerProfile.onTimeDelivery >= 98) {
    strengths.push({
      type: 'Excellent Delivery Record',
      description: `${growerProfile.onTimeDelivery}% on-time delivery rate`
    });
  }
  
  // Certification Coverage
  if (growerProfile.certifications.length < 3) {
    warnings.push({
      type: 'Limited Certifications',
      severity: 'medium',
      description: 'Limited food safety certifications',
      mitigation: 'Verify additional compliance documentation'
    });
  } else if (growerProfile.certifications.length >= 5) {
    strengths.push({
      type: 'Comprehensive Certifications',
      description: `${growerProfile.certifications.length} active certifications`
    });
  }
  
  // Experience
  const yearsInBusiness = new Date().getFullYear() - growerProfile.established;
  if (yearsInBusiness < 5) {
    warnings.push({
      type: 'Limited Track Record',
      severity: 'medium',
      description: `Only ${yearsInBusiness} years in business`,
      mitigation: 'Request financial statements and bank references'
    });
  } else if (yearsInBusiness >= 15) {
    strengths.push({
      type: 'Established Business',
      description: `${yearsInBusiness} years of industry experience`
    });
  }
  
  // Deal History
  if (growerProfile.deals < 50) {
    warnings.push({
      type: 'Limited Deal History',
      severity: 'low',
      description: `Only ${growerProfile.deals} completed deals`,
      mitigation: 'Start with smaller trial orders'
    });
  } else if (growerProfile.deals >= 200) {
    strengths.push({
      type: 'Extensive Deal History',
      description: `${growerProfile.deals} successfully completed deals`
    });
  }
  
  // Overall Risk Assessment
  let overallRisk = 'Low';
  if (risks.length >= 2) {
    overallRisk = 'High';
  } else if (risks.length === 1 || warnings.length >= 2) {
    overallRisk = 'Medium';
  }
  
  return {
    overallRisk,
    riskLevel: overallRisk,
    risks,
    warnings,
    strengths,
    score: growerProfile.riskScore,
    recommendation: getRiskRecommendation(overallRisk, risks, strengths)
  };
}

function getRiskRecommendation(riskLevel, risks, strengths) {
  if (riskLevel === 'Low' && strengths.length >= 3) {
    return 'Preferred supplier. Proceed with confidence.';
  } else if (riskLevel === 'Low') {
    return 'Acceptable risk level. Proceed with standard due diligence.';
  } else if (riskLevel === 'Medium') {
    return 'Moderate risk. Additional verification recommended before large orders.';
  } else {
    return 'High risk supplier. Proceed with caution and enhanced due diligence.';
  }
}

// Predictive shipping and ETA calculation
export function predictShipping(growerLocation, buyerLocation, commodity) {
  const distances = calculateDistance(growerLocation, buyerLocation);
  const transportMode = determineTransportMode(distances, commodity);
  const eta = calculateETA(distances, transportMode, commodity);
  
  return {
    distance: distances,
    transportMode,
    eta,
    estimatedCost: estimateShippingCost(distances, transportMode, commodity),
    route: generateRoute(growerLocation, buyerLocation),
    recommendations: getShippingRecommendations(transportMode, commodity)
  };
}

function calculateDistance(origin, destination) {
  // Simple distance calculation (in real app, use proper geo library)
  const lat1 = origin.coordinates?.lat || 0;
  const lon1 = origin.coordinates?.lng || 0;
  const lat2 = destination?.coordinates?.lat || 0;
  const lon2 = destination?.coordinates?.lng || 0;
  
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const miles = R * c;
  
  return {
    miles: Math.round(miles),
    km: Math.round(miles * 1.60934)
  };
}

function determineTransportMode(distances, commodity) {
  if (distances.miles > 1000) {
    return 'Air Freight';
  } else if (distances.miles > 500) {
    return 'Refrigerated Truck (Long Haul)';
  } else if (distances.miles > 100) {
    return 'Refrigerated Truck (Regional)';
  } else {
    return 'Refrigerated Truck (Local)';
  }
}

function calculateETA(distances, transportMode, commodity) {
  let hours = 0;
  
  switch (transportMode) {
    case 'Air Freight':
      hours = 6 + (distances.miles / 500);
      break;
    case 'Refrigerated Truck (Long Haul)':
      hours = distances.miles / 55; // Average highway speed
      break;
    case 'Refrigerated Truck (Regional)':
      hours = distances.miles / 50;
      break;
    case 'Refrigerated Truck (Local)':
      hours = distances.miles / 45;
      break;
    default:
      hours = distances.miles / 50;
  }
  
  const days = Math.ceil(hours / 24);
  const eta = new Date();
  eta.setDate(eta.getDate() + days);
  
  return {
    hours: Math.round(hours),
    days,
    estimatedArrival: eta.toISOString().split('T')[0]
  };
}

function estimateShippingCost(distances, transportMode, commodity) {
  let costPerMile = 2.5; // Base cost
  
  switch (transportMode) {
    case 'Air Freight':
      costPerMile = 8;
      break;
    case 'Refrigerated Truck (Long Haul)':
      costPerMile = 3;
      break;
    case 'Refrigerated Truck (Regional)':
      costPerMile = 3.5;
      break;
    case 'Refrigerated Truck (Local)':
      costPerMile = 4;
      break;
  }
  
  const baseCost = distances.miles * costPerMile;
  const estimatedLow = Math.round(baseCost * 0.8);
  const estimatedHigh = Math.round(baseCost * 1.2);
  
  return {
    low: estimatedLow,
    high: estimatedHigh,
    currency: 'USD',
    perMile: costPerMile
  };
}

function generateRoute(origin, destination) {
  return {
    origin: `${origin.city}, ${origin.region}`,
    destination: destination?.city ? `${destination.city}, ${destination.region}` : 'Destination',
    waypoints: [], // In real app, calculate actual route waypoints
    borderssCrossed: origin.country !== destination?.country ? [origin.country, destination?.country] : []
  };
}

function getShippingRecommendations(transportMode, commodity) {
  const recommendations = [];
  
  if (transportMode.includes('Refrigerated')) {
<<<<<<< HEAD
    recommendations.push('Maintain cold chain at 34-38Â°F');
=======
    recommendations.push('Maintain cold chain at 34-38Ãƒâ€šÃ‚Â°F');
>>>>>>> my/push-branch
    recommendations.push('Use temperature monitoring devices');
  }
  
  if (transportMode === 'Air Freight') {
    recommendations.push('Pack for rapid temperature changes');
    recommendations.push('Ensure proper ventilation');
  }
  
  recommendations.push('Verify all compliance documentation before shipping');
  recommendations.push('Use GPS tracking for real-time monitoring');
  
  return recommendations;
}

// Deal scoring and suggestions
export function suggestBestDeals(growers, buyerRequirements) {
  const scoredGrowers = growers.map(grower => ({
    grower,
    matchData: calculateMatchScore(buyerRequirements, grower),
    riskData: assessGrowerRisk(grower)
  }));
  
  // Sort by match score
  scoredGrowers.sort((a, b) => b.matchData.score - a.matchData.score);
  
  // Filter for acceptable risk
  const acceptableDeals = scoredGrowers.filter(d => d.riskData.overallRisk !== 'High');
  
  return {
    topMatches: scoredGrowers.slice(0, 10),
    recommendedDeals: acceptableDeals.slice(0, 5),
    totalOptions: growers.length,
    avgMatchScore: scoredGrowers.reduce((sum, d) => sum + d.matchData.score, 0) / scoredGrowers.length
  };
}

