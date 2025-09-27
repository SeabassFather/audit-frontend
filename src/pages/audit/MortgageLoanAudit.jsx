import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OCRUpload from "../../components/OCRUpload";

export default function MortgageLoanAudit() {
  const navigate = useNavigate();
  const [selectedLender, setSelectedLender] = useState(null);
  const [complianceData, setComplianceData] = useState(null);
  const [uploadedContract, setUploadedContract] = useState(null);
  const [auditResults, setAuditResults] = useState(null);
  const [auditInProgress, setAuditInProgress] = useState(false);
  const [currentStep, setCurrentStep] = useState('upload'); // upload, processing, results

  useEffect(() => {
    // Load data from previous steps
    const storedLender = localStorage.getItem('selectedLender');
    const storedCompliance = localStorage.getItem('complianceChecked');
    
    if (storedLender) {
      setSelectedLender(JSON.parse(storedLender));
    }
    if (storedCompliance) {
      setComplianceData(JSON.parse(storedCompliance));
    }
  }, []);

  const handleContractUpload = (extractedText) => {
    setUploadedContract({
      text: extractedText,
      uploadedAt: new Date().toISOString(),
      wordCount: extractedText.split(' ').length,
      lineCount: extractedText.split('\n').length
    });
    setCurrentStep('processing');
    
    // Start audit processing
    runAuditEngine(extractedText);
  };

  const runAuditEngine = async (contractText) => {
    setAuditInProgress(true);
    
    // Simulate audit processing
    setTimeout(() => {
      const mockAuditResults = generateMockAuditResults(contractText);
      setAuditResults(mockAuditResults);
      setCurrentStep('results');
      setAuditInProgress(false);
      
      // Store results for dashboard
      localStorage.setItem('latestAuditResults', JSON.stringify(mockAuditResults));
    }, 3000);
  };

  const generateMockAuditResults = (contractText) => {
    const compliance = complianceData?.checkedRules || [];
    const riskFactors = [];
    const violations = [];
    
    // Mock compliance checking logic
    const hasAPRMention = contractText.toLowerCase().includes('apr') || contractText.toLowerCase().includes('rate');
    const hasDisclosureTiming = contractText.toLowerCase().includes('disclosure') || contractText.toLowerCase().includes('business days');
    const hasProperSignatures = contractText.toLowerCase().includes('signature') || contractText.toLowerCase().includes('sign');
    
    if (!hasAPRMention) {
      violations.push({
        rule: "TRID-3",
        description: "APR calculation or disclosure missing",
        severity: "High",
        category: "Rate Calculation"
      });
      riskFactors.push("Missing APR disclosure");
    }
    
    if (!hasDisclosureTiming) {
      violations.push({
        rule: "TRID-1",
        description: "Disclosure timing requirements unclear",
        severity: "High", 
        category: "Disclosure Timing"
      });
      riskFactors.push("Unclear disclosure timing");
    }
    
    if (!hasProperSignatures) {
      violations.push({
        rule: "ECOA-4",
        description: "Signature requirements may not comply with ECOA",
        severity: "Medium",
        category: "Documentation"
      });
      riskFactors.push("Signature compliance issue");
    }

    // Calculate overall score
    const totalRules = complianceData?.rules?.length || 10;
    const passedRules = totalRules - violations.length;
    const complianceScore = Math.round((passedRules / totalRules) * 100);
    
    return {
      auditId: `AUD-${Date.now()}`,
      timestamp: new Date().toISOString(),
      lender: selectedLender,
      contract: uploadedContract,
      complianceScore,
      status: complianceScore >= 80 ? 'PASS' : complianceScore >= 60 ? 'WARNING' : 'FAIL',
      violations,
      riskFactors,
      summary: {
        totalRules: totalRules,
        passedRules,
        failedRules: violations.length,
        highRiskIssues: violations.filter(v => v.severity === 'High').length,
        mediumRiskIssues: violations.filter(v => v.severity === 'Medium').length
      }
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PASS': return 'text-green-600';
      case 'WARNING': return 'text-yellow-600';
      case 'FAIL': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'PASS': return 'bg-green-50 border-green-200';
      case 'WARNING': return 'bg-yellow-50 border-yellow-200';
      case 'FAIL': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const proceedToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Mortgage Contract Audit & Compliance Validation
          </h1>
          <p className="text-gray-600">
            Step 3 & 4: Upload contract and get comprehensive audit results
          </p>
        </div>

        {/* Navigation breadcrumb */}
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <div className="flex items-center">
                  <span className="bg-green-600 text-white px-3 py-1 text-sm font-medium rounded-full">✓</span>
                  <span className="ml-2 text-sm font-medium text-green-600">Lender Search</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400">→</span>
                  <span className="bg-green-600 text-white px-3 py-1 text-sm font-medium rounded-full ml-4">✓</span>
                  <span className="ml-2 text-sm font-medium text-green-600">Compliance Rules</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400">→</span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ml-4 ${
                    currentStep === 'upload' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
                  }`}>
                    {currentStep === 'upload' ? '3' : '✓'}
                  </span>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep === 'upload' ? 'text-blue-600' : 'text-green-600'
                  }`}>Contract Upload</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400">→</span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ml-4 ${
                    currentStep === 'results' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
                  }`}>4</span>
                  <span className={`ml-2 text-sm font-medium ${
                    currentStep === 'results' ? 'text-blue-600' : 'text-gray-500'
                  }`}>Audit Report</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Contract Upload Section */}
        {currentStep === 'upload' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Upload Mortgage Contract</h2>
            {selectedLender && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-blue-800">
                  <strong>Selected Lender:</strong> {selectedLender.name} ({selectedLender.region})
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  Contract will be audited against: {selectedLender.complianceRules.join(', ')} requirements
                </p>
              </div>
            )}
            
            <OCRUpload 
              onTextExtracted={handleContractUpload}
              documentType="mortgage"
            />
          </div>
        )}

        {/* Processing Section */}
        {currentStep === 'processing' && auditInProgress && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold mb-4">Processing Audit</h2>
              <p className="text-gray-600 mb-2">Analyzing contract against compliance rules...</p>
              <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{width: '75%'}}></div>
              </div>
              <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
            </div>
          </div>
        )}

        {/* Audit Results Section */}
        {currentStep === 'results' && auditResults && (
          <div className="space-y-8">
            {/* Overall Results Summary */}
            <div className={`rounded-lg shadow-md p-6 border-2 ${getStatusBgColor(auditResults.status)}`}>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Audit Results</h2>
                  <p className="text-gray-600">Audit ID: {auditResults.auditId}</p>
                </div>
                <div className="text-right">
                  <div className={`text-4xl font-bold mb-2 ${getStatusColor(auditResults.status)}`}>
                    {auditResults.status}
                  </div>
                  <div className="text-2xl font-semibold text-gray-700">
                    {auditResults.complianceScore}%
                  </div>
                  <div className="text-sm text-gray-500">Compliance Score</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{auditResults.summary.passedRules}</div>
                  <div className="text-sm text-gray-600">Rules Passed</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">{auditResults.summary.failedRules}</div>
                  <div className="text-sm text-gray-600">Rules Failed</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{auditResults.summary.highRiskIssues}</div>
                  <div className="text-sm text-gray-600">High Risk Issues</div>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-yellow-600">{auditResults.summary.mediumRiskIssues}</div>
                  <div className="text-sm text-gray-600">Medium Risk Issues</div>
                </div>
              </div>
            </div>

            {/* Violations and Risk Alerts */}
            {auditResults.violations.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-red-600">
                  ⚠️ Compliance Violations Detected
                </h3>
                <div className="space-y-4">
                  {auditResults.violations.map((violation, index) => (
                    <div key={index} className="border-l-4 border-red-400 bg-red-50 p-4 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold text-red-800">Rule {violation.rule}</h4>
                          <p className="text-red-700">{violation.description}</p>
                          <p className="text-sm text-red-600 mt-1">Category: {violation.category}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          violation.severity === 'High' ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'
                        }`}>
                          {violation.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Factors */}
            {auditResults.riskFactors.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-600">
                  🔍 Risk Factors Identified
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {auditResults.riskFactors.map((risk, index) => (
                    <div key={index} className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                      <span className="text-orange-800 font-medium">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contract Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Contract Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">{uploadedContract?.wordCount || 0}</div>
                  <div className="text-sm text-gray-600">Words Analyzed</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{uploadedContract?.lineCount || 0}</div>
                  <div className="text-sm text-gray-600">Lines Processed</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedLender?.complianceRules.length || 0}</div>
                  <div className="text-sm text-gray-600">Compliance Rules Applied</div>
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Audit Complete</h3>
                  <p className="text-gray-600">
                    Review the dashboard for detailed reporting and risk management options.
                  </p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => navigate('/compliance')}
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    ← Review Compliance
                  </button>
                  <button
                    onClick={proceedToDashboard}
                    className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    View Dashboard & Reports →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
