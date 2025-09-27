import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CompliancePage() {
  const navigate = useNavigate();
  const [selectedLender, setSelectedLender] = useState(null);
  const [complianceRules, setComplianceRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedRules, setCheckedRules] = useState(new Set());

  // Mock compliance rules database
  const complianceDatabase = {
    TRID: {
      name: "TILA-RESPA Integrated Disclosure",
      description: "Truth in Lending Act and Real Estate Settlement Procedures Act requirements",
      rules: [
        { id: "TRID-1", rule: "Loan Estimate must be provided within 3 business days", severity: "High", category: "Disclosure Timing" },
        { id: "TRID-2", rule: "Closing Disclosure must be provided 3 business days before closing", severity: "High", category: "Disclosure Timing" },
        { id: "TRID-3", rule: "APR must be calculated correctly", severity: "High", category: "Rate Calculation" },
        { id: "TRID-4", rule: "Finance charges must be disclosed accurately", severity: "Medium", category: "Fee Disclosure" }
      ]
    },
    ECOA: {
      name: "Equal Credit Opportunity Act",
      description: "Prohibits discrimination in credit transactions",
      rules: [
        { id: "ECOA-1", rule: "Cannot discriminate based on race, color, religion, national origin", severity: "High", category: "Anti-Discrimination" },
        { id: "ECOA-2", rule: "Adverse action notices must be provided within 30 days", severity: "High", category: "Notice Requirements" },
        { id: "ECOA-3", rule: "Credit scoring must be applied consistently", severity: "Medium", category: "Underwriting" },
        { id: "ECOA-4", rule: "Spousal signature requirements limited", severity: "Medium", category: "Documentation" }
      ]
    },
    HMDA: {
      name: "Home Mortgage Disclosure Act",
      description: "Requires reporting of mortgage lending data",
      rules: [
        { id: "HMDA-1", rule: "Collect applicant demographic information", severity: "High", category: "Data Collection" },
        { id: "HMDA-2", rule: "Report covered loans annually", severity: "High", category: "Reporting" },
        { id: "HMDA-3", rule: "Maintain loan register", severity: "Medium", category: "Record Keeping" },
        { id: "HMDA-4", rule: "Make data publicly available", severity: "Medium", category: "Disclosure" }
      ]
    },
    CNBV: {
      name: "Comisión Nacional Bancaria y de Valores",
      description: "Mexican banking and securities regulatory requirements",
      rules: [
        { id: "CNBV-1", rule: "Comply with Mexican banking law", severity: "High", category: "Legal Compliance" },
        { id: "CNBV-2", rule: "Maintain proper capital ratios", severity: "High", category: "Capital Requirements" },
        { id: "CNBV-3", rule: "Submit regulatory reports", severity: "Medium", category: "Reporting" },
        { id: "CNBV-4", rule: "Follow anti-money laundering protocols", severity: "High", category: "AML" }
      ]
    }
  };

  useEffect(() => {
    // Load selected lender from previous step
    const storedLender = localStorage.getItem('selectedLender');
    if (storedLender) {
      const lender = JSON.parse(storedLender);
      setSelectedLender(lender);
      
      // Load compliance rules for this lender
      const rules = lender.complianceRules.flatMap(ruleName => 
        complianceDatabase[ruleName]?.rules.map(rule => ({
          ...rule,
          category_name: complianceDatabase[ruleName].name,
          parent: ruleName
        })) || []
      );
      setComplianceRules(rules);
    }
    setLoading(false);
  }, []);

  const toggleRuleCheck = (ruleId) => {
    const newChecked = new Set(checkedRules);
    if (newChecked.has(ruleId)) {
      newChecked.delete(ruleId);
    } else {
      newChecked.add(ruleId);
    }
    setCheckedRules(newChecked);
  };

  const proceedToUpload = () => {
    // Store compliance check status
    localStorage.setItem('complianceChecked', JSON.stringify({
      lender: selectedLender,
      rules: complianceRules,
      checkedRules: Array.from(checkedRules)
    }));
    navigate('/audit-report');
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading compliance rules...</p>
        </div>
      </div>
    );
  }

  if (!selectedLender) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Lender Selected</h2>
          <p className="text-gray-600 mb-6">Please select a lender first to view compliance requirements.</p>
          <button
            onClick={() => navigate('/mortgage')}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Go to Lender Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Compliance Rules & Requirements
          </h1>
          <p className="text-gray-600">
            Step 2: Review regulatory compliance requirements for {selectedLender.name}
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
                  <span className="bg-blue-600 text-white px-3 py-1 text-sm font-medium rounded-full ml-4">2</span>
                  <span className="ml-2 text-sm font-medium text-blue-600">Compliance Rules</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400">→</span>
                  <span className="bg-gray-300 text-gray-500 px-3 py-1 text-sm font-medium rounded-full ml-4">3</span>
                  <span className="ml-2 text-sm font-medium text-gray-500">Contract Upload</span>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="text-gray-400">→</span>
                  <span className="bg-gray-300 text-gray-500 px-3 py-1 text-sm font-medium rounded-full ml-4">4</span>
                  <span className="ml-2 text-sm font-medium text-gray-500">Audit Report</span>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Lender Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Selected Lender</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg text-blue-900">{selectedLender.name}</h3>
                <p className="text-blue-700">Region: {selectedLender.region}</p>
                <p className="text-blue-700">Rating: {selectedLender.rating}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-900 mb-1">Compliance Requirements:</p>
                <div className="flex flex-wrap gap-1 justify-end">
                  {selectedLender.complianceRules.map(rule => (
                    <span key={rule} className="bg-blue-100 text-blue-800 px-2 py-1 text-xs rounded">
                      {rule}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Rules */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Regulatory Compliance Checklist</h2>
            <div className="text-sm text-gray-600">
              {checkedRules.size} of {complianceRules.length} rules reviewed
            </div>
          </div>

          <div className="space-y-6">
            {selectedLender.complianceRules.map(regulation => {
              const regulationInfo = complianceDatabase[regulation];
              const regulationRules = complianceRules.filter(rule => rule.parent === regulation);
              
              return (
                <div key={regulation} className="border border-gray-200 rounded-lg p-4">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{regulationInfo.name} ({regulation})</h3>
                    <p className="text-gray-600 text-sm">{regulationInfo.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {regulationRules.map(rule => (
                      <div key={rule.id} className="flex items-start space-x-3 p-3 border border-gray-100 rounded-md">
                        <input
                          type="checkbox"
                          id={rule.id}
                          checked={checkedRules.has(rule.id)}
                          onChange={() => toggleRuleCheck(rule.id)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div className="flex-1">
                          <label htmlFor={rule.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                            {rule.rule}
                          </label>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded border ${getSeverityColor(rule.severity)}`}>
                              {rule.severity}
                            </span>
                            <span className="text-xs text-gray-500">{rule.category}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary and Next Steps */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Compliance Review Summary</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-red-600">
                {complianceRules.filter(r => r.severity === 'High').length}
              </div>
              <div className="text-sm text-red-700">High Priority Rules</div>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {complianceRules.filter(r => r.severity === 'Medium').length}
              </div>
              <div className="text-sm text-yellow-700">Medium Priority Rules</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {checkedRules.size}
              </div>
              <div className="text-sm text-green-700">Rules Reviewed</div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => navigate('/mortgage')}
              className="text-blue-600 hover:text-blue-800 underline"
            >
              ← Back to Lender Search
            </button>
            
            <div className="text-center">
              <p className="text-gray-600 mb-2">
                Next: Upload mortgage contract for compliance audit
              </p>
              <button
                onClick={proceedToUpload}
                className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Proceed to Contract Upload →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
