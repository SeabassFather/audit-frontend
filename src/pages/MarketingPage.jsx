import React from "react";

export default function MarketingPage() {
  const marketingScripts = [
    {
      id: 1,
      title: "Mortgage Audit Value Proposition",
      category: "Mortgage",
      preview: "Did you know that 75% of mortgage files contain errors that could save you money?",
      fullScript: `
        Hi [Name], I'm calling from AuditDNA. Did you know that 75% of mortgage files contain errors that could save you thousands?
        
        Our comprehensive mortgage audit reviews:
        - Escrow calculations and overcharges
        - PMI removal eligibility 
        - Servicing transfer errors
        - TRID compliance issues
        
        We typically find $2,000-$15,000 in recoverable fees. Would you like to learn how this works?
      `
    },
    {
      id: 2,
      title: "Agriculture Compliance Introduction",
      category: "Agriculture",
      preview: "Ensure your agricultural business meets all PACA and food safety requirements.",
      fullScript: `
        Hello [Name], this is [Your Name] from AuditDNA. I understand you're in the agricultural business.
        
        Are you confident your operation is fully compliant with:
        - PACA verification requirements
        - Food safety audits (HACCP/FSMA)
        - Traceability documentation
        - Supplier certification tracking
        
        We help agricultural businesses avoid costly violations and streamline compliance. Can we schedule a brief consultation?
      `
    },
    {
      id: 3,
      title: "Trade Finance Solutions Pitch",
      category: "Trade Finance",
      preview: "Unlock working capital with invoice factoring and trade finance solutions.",
      fullScript: `
        Good [morning/afternoon] [Name], I'm [Your Name] from AuditDNA's Trade Finance division.
        
        Many businesses struggle with cash flow gaps between invoicing and payment. Our trade finance solutions include:
        - Invoice factoring (advance up to 90% within 24 hours)
        - Purchase order financing
        - Cross-border trade support
        - SBA lending programs
        
        We've helped businesses access over $50M in working capital. What challenges are you facing with cash flow?
      `
    }
  ];

  const [selectedScript, setSelectedScript] = React.useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Marketing Scripts</h1>
        <p className="text-gray-600">
          Professional scripts and materials for client outreach and service promotion.
        </p>
      </div>

      {/* Script Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {marketingScripts.map((script) => (
          <div key={script.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{script.title}</h3>
              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {script.category}
              </span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{script.preview}</p>
            
            <div className="space-y-2">
              <button
                onClick={() => setSelectedScript(script)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 font-medium"
              >
                View Full Script
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(script.fullScript);
                  alert('Script copied to clipboard!');
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 font-medium"
              >
                Copy Script
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Script Modal */}
      {selectedScript && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedScript.title}</h2>
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {selectedScript.category}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedScript(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans">
                  {selectedScript.fullScript}
                </pre>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(selectedScript.fullScript);
                    alert('Script copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                >
                  Copy Script
                </button>
                <button
                  onClick={() => setSelectedScript(null)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Marketing Resources */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Marketing Resources</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Email Templates</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Welcome Email Sequence</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">Download</button>
              </li>
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Follow-up Templates</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">Download</button>
              </li>
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Service Explanation Emails</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">Download</button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Promotional Materials</h3>
            <ul className="space-y-2">
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Service Brochures</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">Download</button>
              </li>
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-700">Case Study Templates</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">Download</button>
              </li>
              <li className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span className="text-sm text-gray-7000">ROI Calculator</span>
                <button className="text-blue-600 text-sm hover:text-blue-800">Launch</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}