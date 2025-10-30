import React, { useState } from "react";
import axios from "axios";
import "./WaterTech.css";

export default function WaterTechModule() {
  const [waterData, setWaterData] = useState({
    pH: "",
    nitrate: "",
    turbidity: "",
    source: "",
    flowRate: "",
    location: "",
    testDate: new Date().toISOString().split('T')[0]
  });

  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  // ROI Calculations based on real-world data
  const calculateROI = (data) => {
    const baseline = {
      waterSavings: { min: 500, max: 1500 }, // $ per acre
      complianceSavings: { min: 100, max: 400 },
      certificationValue: { min: 100, max: 400 },
      yieldImprovement: { min: 300, max: 1500 }
    };

    let roi = {
      waterEfficiency: 0,
      compliance: 0,
      certification: 0,
      yieldGain: 0,
      total: 0
    };

    // pH impact on nutrient uptake (15-20% improvement in optimal range)
    if (data.pH >= 6.0 && data.pH <= 7.0) {
      roi.yieldGain = (baseline.yieldImprovement.min + baseline.yieldImprovement.max) / 2;
      roi.waterEfficiency = (baseline.waterSavings.min + baseline.waterSavings.max) / 2 * 0.15;
    } else {
      roi.yieldGain = baseline.yieldImprovement.min * 0.5;
    }

    // Nitrate impact on fertilizer cost (10-25% reduction)
    if (data.nitrate && data.nitrate < 10) {
      roi.compliance = baseline.complianceSavings.max;
      roi.certification = baseline.certificationValue.max;
    } else {
      roi.compliance = baseline.complianceSavings.min;
      roi.certification = baseline.certificationValue.min;
    }

    // Turbidity impact on irrigation system
    if (data.turbidity && data.turbidity < 5) {
      roi.waterEfficiency += baseline.waterSavings.min * 0.1;
    }

    roi.total = roi.waterEfficiency + roi.compliance + roi.certification + roi.yieldGain;

    return roi;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const roi = calculateROI(waterData);
    
    try {
      const response = await axios.post("http://localhost:8001/api/water/analyze", {
        ...waterData,
        roi
      });
      
      setAnalysis({
        ...response.data,
        roi,
        compliance: checkCompliance(waterData),
        certifications: getCertifications(waterData)
      });
    } catch (err) {
      setAnalysis({
        roi,
        compliance: checkCompliance(waterData),
        certifications: getCertifications(waterData),
        error: err.message
      });
    }
    
    setLoading(false);
  };

  const checkCompliance = (data) => {
    const compliance = {
      EPA: data.nitrate < 10 && data.turbidity < 5,
      USDA: data.pH >= 6.0 && data.pH <= 8.5,
      StateWaterBoard: data.nitrate < 10,
      CleanWaterAct: data.nitrate < 10 && data.turbidity < 5
    };

    return compliance;
  };

  const getCertifications = (data) => {
    const certs = [];
    
    if (data.pH >= 6.0 && data.pH <= 7.5 && data.nitrate < 10) {
      certs.push({ name: "GlobalG.A.P.", status: "Eligible", premium: "5-10%" });
    }
    
    if (data.nitrate < 5 && data.turbidity < 3) {
      certs.push({ name: "Rainforest Alliance", status: "Eligible", premium: "8-15%" });
    }
    
    if (data.source === "Recycled" || data.source === "Rainwater") {
      certs.push({ name: "Carbon Smart Farming", status: "Eligible", premium: "10-20%" });
    }
    
    return certs;
  };

  return (
    <div className="water-tech-module">
      <div className="module-hero">
        <h1>💧 Water Technology & Quality Management</h1>
        <p>Quantify, Monitor, and Optimize Water Quality for Maximum ROI</p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-value">5-15%</div>
            <div className="stat-label">Water Use Reduction</div>
          </div>
          <div className="stat">
            <div className="stat-value">$490-$2,180</div>
            <div className="stat-label">Value per Acre/Year</div>
          </div>
          <div className="stat">
            <div className="stat-value">15-20%</div>
            <div className="stat-label">Nutrient Uptake Improvement</div>
          </div>
        </div>
      </div>

      <div className="content-grid">
        <div className="input-panel">
          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <h2>🔬 Water Quality Parameters</h2>
              
              <div className="input-group">
                <label>
                  pH Level
                  <span className="optimal">(Optimal: 6.0-7.0)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={waterData.pH}
                  onChange={e => setWaterData({...waterData, pH: e.target.value})}
                  placeholder="7.0"
                />
                <div className="impact-note">
                  💡 Maintaining 6.0-7.0 improves nutrient uptake by 15-20%
                </div>
              </div>

              <div className="input-group">
                <label>
                  Nitrate (NO₃) mg/L
                  <span className="optimal">(Max: 10)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={waterData.nitrate}
                  onChange={e => setWaterData({...waterData, nitrate: e.target.value})}
                  placeholder="5.0"
                />
                <div className="impact-note">
                  💰 Lower nitrate = 10-25% reduction in fertilizer cost
                </div>
              </div>

              <div className="input-group">
                <label>
                  Turbidity (NTU)
                  <span className="optimal">(Max: 5)</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={waterData.turbidity}
                  onChange={e => setWaterData({...waterData, turbidity: e.target.value})}
                  placeholder="2.0"
                />
                <div className="impact-note">
                  🔧 Protects drip systems, prevents clogging
                </div>
              </div>

              <div className="input-group">
                <label>Water Source</label>
                <select
                  value={waterData.source}
                  onChange={e => setWaterData({...waterData, source: e.target.value})}
                >
                  <option value="">Select source...</option>
                  <option value="Groundwater">Groundwater/Well</option>
                  <option value="Canal">Canal/Surface Water</option>
                  <option value="Municipal">Municipal Supply</option>
                  <option value="Recycled">Recycled Water</option>
                  <option value="Rainwater">Rainwater Harvesting</option>
                </select>
                <div className="impact-note">
                  📋 Determines treatment requirements and traceability
                </div>
              </div>

              <div className="input-group">
                <label>Flow Rate (L/min)</label>
                <input
                  type="number"
                  value={waterData.flowRate}
                  onChange={e => setWaterData({...waterData, flowRate: e.target.value})}
                  placeholder="100"
                />
              </div>

              <div className="input-group">
                <label>Location/Field ID</label>
                <input
                  type="text"
                  value={waterData.location}
                  onChange={e => setWaterData({...waterData, location: e.target.value})}
                  placeholder="Field A-12"
                />
              </div>

              <div className="input-group">
                <label>Test Date</label>
                <input
                  type="date"
                  value={waterData.testDate}
                  onChange={e => setWaterData({...waterData, testDate: e.target.value})}
                />
              </div>
            </div>

            <button type="submit" className="analyze-btn" disabled={loading}>
              {loading ? "⏳ Analyzing..." : "🚀 Analyze Water Quality & Calculate ROI"}
            </button>
          </form>
        </div>

        {analysis && (
          <div className="analysis-panel">
            <div className="roi-dashboard">
              <h2>💰 Economic Impact Analysis</h2>
              
              <div className="roi-hero">
                <div className="roi-total">
                  <div className="roi-value">${analysis.roi.total.toFixed(0)}</div>
                  <div className="roi-label">Total Value per Acre/Year</div>
                </div>
              </div>

              <div className="roi-breakdown">
                <div className="roi-item">
                  <span className="roi-icon">💧</span>
                  <div className="roi-details">
                    <div className="roi-title">Water Efficiency Savings</div>
                    <div className="roi-amount">${analysis.roi.waterEfficiency.toFixed(0)}</div>
                  </div>
                </div>

                <div className="roi-item">
                  <span className="roi-icon">✅</span>
                  <div className="roi-details">
                    <div className="roi-title">Compliance Value</div>
                    <div className="roi-amount">${analysis.roi.compliance.toFixed(0)}</div>
                  </div>
                </div>

                <div className="roi-item">
                  <span className="roi-icon">🏆</span>
                  <div className="roi-details">
                    <div className="roi-title">Certification Value</div>
                    <div className="roi-amount">${analysis.roi.certification.toFixed(0)}</div>
                  </div>
                </div>

                <div className="roi-item">
                  <span className="roi-icon">🌾</span>
                  <div className="roi-details">
                    <div className="roi-title">Yield Improvement</div>
                    <div className="roi-amount">${analysis.roi.yieldGain.toFixed(0)}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="compliance-card">
              <h3>📋 Regulatory Compliance Status</h3>
              <div className="compliance-grid">
                {Object.entries(analysis.compliance).map(([agency, status]) => (
                  <div key={agency} className={`compliance-item ${status ? 'compliant' : 'warning'}`}>
                    <span className="status-icon">{status ? '✅' : '⚠️'}</span>
                    <div>
                      <div className="agency-name">{agency}</div>
                      <div className="status-text">{status ? 'Compliant' : 'Needs Attention'}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="certification-card">
              <h3>🏆 Certification Eligibility</h3>
              {analysis.certifications.length > 0 ? (
                <div className="cert-list">
                  {analysis.certifications.map((cert, i) => (
                    <div key={i} className="cert-item">
                      <div className="cert-header">
                        <span className="cert-name">{cert.name}</span>
                        <span className="cert-badge">{cert.status}</span>
                      </div>
                      <div className="cert-premium">
                        Premium Potential: <strong>{cert.premium}</strong>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-certs">Improve water parameters to unlock certification opportunities</p>
              )}
            </div>

            <div className="recommendations-card">
              <h3>💡 AI-Powered Recommendations</h3>
              <ul className="rec-list">
                {waterData.pH < 6.0 && (
                  <li className="rec-item priority-high">
                    <strong>Critical:</strong> pH too low. Add lime to raise to 6.0-7.0 range. 
                    Potential yield gain: $300-500/acre
                  </li>
                )}
                {waterData.pH > 7.5 && (
                  <li className="rec-item priority-high">
                    <strong>Critical:</strong> pH too high. Consider sulfur application.
                    Nutrient availability is reduced by 20-30%
                  </li>
                )}
                {waterData.nitrate > 10 && (
                  <li className="rec-item priority-medium">
                    <strong>Warning:</strong> High nitrate levels. Reduce fertilizer application by 15-25%.
                    Save $50-150/acre + meet EPA standards
                  </li>
                )}
                {waterData.turbidity > 5 && (
                  <li className="rec-item priority-medium">
                    <strong>Warning:</strong> High turbidity. Install filtration system.
                    Protect irrigation equipment (save $200-800 in maintenance)
                  </li>
                )}
                {waterData.pH >= 6.0 && waterData.pH <= 7.0 && waterData.nitrate < 10 && (
                  <li className="rec-item priority-low">
                    <strong>Excellent:</strong> Water quality is optimal. 
                    Consider applying for premium certifications.
                  </li>
                )}
              </ul>
            </div>

            <div className="export-actions">
              <button className="export-btn">📥 Export Report (PDF)</button>
              <button className="export-btn">📊 Send to USDA Dashboard</button>
              <button className="export-btn">🔗 Link to Blockchain</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}