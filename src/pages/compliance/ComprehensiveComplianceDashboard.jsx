import React, { useState, useMemo } from 'react';

// Comprehensive service categories (275+ items organized by category)
const serviceCategories = [
  {
    id: 'mortgage-lending',
    title: 'Mortgage & Lending Compliance',
    icon: '🏠',
    services: [
      { id: 'ML001', name: 'TRID/RESPA Compliance Review', description: 'Timing and disclosure requirements', critical: true },
      { id: 'ML002', name: 'Truth in Lending Act (TILA)', description: 'Interest rate and payment disclosures', critical: true },
      { id: 'ML003', name: 'Fair Credit Reporting Act (FCRA)', description: 'Credit report usage compliance', critical: true },
      { id: 'ML004', name: 'Equal Credit Opportunity Act (ECOA)', description: 'Anti-discrimination compliance', critical: true },
      { id: 'ML005', name: 'Fair Debt Collection Practices Act', description: 'Debt collection compliance', critical: false },
      { id: 'ML006', name: 'Home Mortgage Disclosure Act (HMDA)', description: 'Lending data reporting', critical: true },
      { id: 'ML007', name: 'Qualified Mortgage (QM) Rules', description: 'Ability-to-repay verification', critical: true },
      { id: 'ML008', name: 'Community Reinvestment Act (CRA)', description: 'Community lending obligations', critical: false },
      { id: 'ML009', name: 'Flood Insurance Requirements', description: 'NFIP compliance verification', critical: true },
      { id: 'ML010', name: 'SAFE Act Licensing', description: 'Loan originator licensing', critical: true },
      { id: 'ML011', name: 'Predatory Lending Review', description: 'High-cost loan analysis', critical: true },
      { id: 'ML012', name: 'State Licensing Compliance', description: 'State-specific requirements', critical: true },
      { id: 'ML013', name: 'Escrow Account Management', description: 'RESPA escrow rules', critical: true },
      { id: 'ML014', name: 'Privacy Notice Requirements', description: 'GLBA privacy compliance', critical: true },
      { id: 'ML015', name: 'Anti-Money Laundering (AML)', description: 'BSA/AML compliance', critical: true }
    ]
  },
  {
    id: 'consumer-finance',
    title: 'Consumer Finance Protection',
    icon: '💳',
    services: [
      { id: 'CF001', name: 'CFPB Examination Prep', description: 'Consumer Financial Protection Bureau readiness', critical: true },
      { id: 'CF002', name: 'Fair Credit Billing Act', description: 'Billing error procedures', critical: false },
      { id: 'CF003', name: 'Electronic Fund Transfer Act', description: 'Debit card and ACH compliance', critical: true },
      { id: 'CF004', name: 'Card Act Compliance', description: 'Credit card regulations', critical: true },
      { id: 'CF005', name: 'Telemarketing Sales Rule', description: 'Do-not-call compliance', critical: false },
      { id: 'CF006', name: 'Military Lending Act', description: 'Service member protections', critical: true },
      { id: 'CF007', name: 'Payday Lending Rules', description: 'Short-term lending compliance', critical: true },
      { id: 'CF008', name: 'Auto Lending Compliance', description: 'Vehicle financing rules', critical: true },
      { id: 'CF009', name: 'Student Loan Servicing', description: 'Educational loan compliance', critical: true },
      { id: 'CF010', name: 'Debt Settlement Compliance', description: 'Third-party debt relief', critical: true }
    ]
  },
  {
    id: 'banking-regulation',
    title: 'Banking & Financial Institution Regulation',
    icon: '🏦',
    services: [
      { id: 'BR001', name: 'Bank Secrecy Act (BSA)', description: 'Anti-money laundering reporting', critical: true },
      { id: 'BR002', name: 'USA PATRIOT Act', description: 'Customer identification programs', critical: true },
      { id: 'BR003', name: 'FDIC Insurance Compliance', description: 'Deposit insurance requirements', critical: true },
      { id: 'BR004', name: 'Federal Reserve Regulations', description: 'Fed regulatory compliance', critical: true },
      { id: 'BR005', name: 'OCC Examination Standards', description: 'Office of Comptroller compliance', critical: true },
      { id: 'BR006', name: 'State Banking Regulations', description: 'State-specific banking rules', critical: true },
      { id: 'BR007', name: 'Interest Rate Risk Management', description: 'ALM compliance review', critical: false },
      { id: 'BR008', name: 'Capital Adequacy Requirements', description: 'Basel III implementation', critical: true },
      { id: 'BR009', name: 'Liquidity Coverage Ratio', description: 'LCR compliance monitoring', critical: true },
      { id: 'BR010', name: 'Stress Testing Requirements', description: 'CCAR/DFAST compliance', critical: true }
    ]
  },
  {
    id: 'agricultural-compliance',
    title: 'Agricultural & Food Safety Compliance',
    icon: '🌾',
    services: [
      { id: 'AG001', name: 'USDA Organic Certification', description: 'Organic standards compliance', critical: true },
      { id: 'AG002', name: 'Food Safety Modernization Act', description: 'FSMA compliance review', critical: true },
      { id: 'AG003', name: 'Good Agricultural Practices (GAP)', description: 'FDA GAP standards', critical: true },
      { id: 'AG004', name: 'Produce Safety Rule', description: 'Fresh produce regulations', critical: true },
      { id: 'AG005', name: 'Worker Protection Standards', description: 'Pesticide safety compliance', critical: true },
      { id: 'AG006', name: 'HACCP Implementation', description: 'Hazard analysis systems', critical: true },
      { id: 'AG007', name: 'GlobalG.A.P. Certification', description: 'International GAP standards', critical: false },
      { id: 'AG008', name: 'SQF Certification', description: 'Safe Quality Food standards', critical: false },
      { id: 'AG009', name: 'BRC Food Safety', description: 'British Retail Consortium standards', critical: false },
      { id: 'AG010', name: 'Fair Trade Certification', description: 'Ethical trading standards', critical: false },
      { id: 'AG011', name: 'Rainforest Alliance', description: 'Sustainable agriculture certification', critical: false },
      { id: 'AG012', name: 'Non-GMO Project Verification', description: 'GMO-free certification', critical: false },
      { id: 'AG013', name: 'Water Quality Testing', description: 'Irrigation water standards', critical: true },
      { id: 'AG014', name: 'Soil Testing Compliance', description: 'Soil health monitoring', critical: true },
      { id: 'AG015', name: 'Pesticide Application Records', description: 'Chemical usage documentation', critical: true }
    ]
  },
  {
    id: 'environmental-compliance',
    title: 'Environmental & Sustainability Compliance',
    icon: '🌱',
    services: [
      { id: 'EN001', name: 'EPA Clean Air Act', description: 'Air quality compliance', critical: true },
      { id: 'EN002', name: 'Clean Water Act Compliance', description: 'Water discharge regulations', critical: true },
      { id: 'EN003', name: 'RCRA Waste Management', description: 'Hazardous waste compliance', critical: true },
      { id: 'EN004', name: 'CERCLA/Superfund', description: 'Environmental cleanup liability', critical: true },
      { id: 'EN005', name: 'TSCA Chemical Compliance', description: 'Toxic substances control', critical: true },
      { id: 'EN006', name: 'OSHA Environmental Safety', description: 'Workplace environmental safety', critical: true },
      { id: 'EN007', name: 'NEPA Environmental Assessment', description: 'Environmental impact analysis', critical: false },
      { id: 'EN008', name: 'Endangered Species Act', description: 'Species protection compliance', critical: false },
      { id: 'EN009', name: 'Carbon Credits Verification', description: 'Carbon offset compliance', critical: false },
      { id: 'EN010', name: 'Renewable Energy Credits', description: 'REC tracking and compliance', critical: false },
      { id: 'EN011', name: 'ISO 14001 Certification', description: 'Environmental management systems', critical: false },
      { id: 'EN012', name: 'Green Building Standards', description: 'LEED/ENERGY STAR compliance', critical: false },
      { id: 'EN013', name: 'Emissions Monitoring', description: 'GHG reporting compliance', critical: true },
      { id: 'EN014', name: 'Waste Reduction Programs', description: 'Sustainability initiatives', critical: false },
      { id: 'EN015', name: 'Water Conservation Compliance', description: 'Water usage regulations', critical: true }
    ]
  },
  {
    id: 'data-privacy',
    title: 'Data Privacy & Protection',
    icon: '🔒',
    services: [
      { id: 'DP001', name: 'GDPR Compliance (EU)', description: 'European data protection regulation', critical: true },
      { id: 'DP002', name: 'CCPA/CPRA (California)', description: 'California privacy laws', critical: true },
      { id: 'DP003', name: 'PIPEDA (Canada)', description: 'Canadian privacy legislation', critical: true },
      { id: 'DP004', name: 'PDPA (Singapore)', description: 'Singapore data protection', critical: false },
      { id: 'DP005', name: 'Australia Privacy Act', description: 'Australian privacy compliance', critical: false },
      { id: 'DP006', name: 'HIPAA Compliance', description: 'Healthcare data protection', critical: true },
      { id: 'DP007', name: 'FERPA Compliance', description: 'Educational records privacy', critical: true },
      { id: 'DP008', name: 'GLBA Privacy Rule', description: 'Financial privacy requirements', critical: true },
      { id: 'DP009', name: 'COPPA Compliance', description: 'Children\'s online privacy', critical: true },
      { id: 'DP010', name: 'BIPA (Illinois)', description: 'Biometric information protection', critical: true },
      { id: 'DP011', name: 'Data Breach Response', description: 'Incident response procedures', critical: true },
      { id: 'DP012', name: 'Privacy Impact Assessment', description: 'PIA documentation', critical: false },
      { id: 'DP013', name: 'Data Subject Access Requests', description: 'DSAR processing procedures', critical: true },
      { id: 'DP014', name: 'Cookie Consent Management', description: 'Website privacy compliance', critical: false },
      { id: 'DP015', name: 'Cross-Border Data Transfers', description: 'International data movement', critical: true }
    ]
  },
  {
    id: 'employment-labor',
    title: 'Employment & Labor Law Compliance',
    icon: '👥',
    services: [
      { id: 'EL001', name: 'Fair Labor Standards Act', description: 'Wage and hour compliance', critical: true },
      { id: 'EL002', name: 'Equal Employment Opportunity', description: 'EEO compliance review', critical: true },
      { id: 'EL003', name: 'Americans with Disabilities Act', description: 'ADA workplace compliance', critical: true },
      { id: 'EL004', name: 'Family Medical Leave Act', description: 'FMLA administration', critical: true },
      { id: 'EL005', name: 'Worker Classification', description: 'Employee vs contractor determination', critical: true },
      { id: 'EL006', name: 'Immigration Compliance (I-9)', description: 'Employment eligibility verification', critical: true },
      { id: 'EL007', name: 'OSHA Workplace Safety', description: 'Occupational safety compliance', critical: true },
      { id: 'EL008', name: 'Workers\' Compensation', description: 'State compensation compliance', critical: true },
      { id: 'EL009', name: 'Union Relations (NLRA)', description: 'Labor relations compliance', critical: false },
      { id: 'EL010', name: 'State Employment Laws', description: 'State-specific requirements', critical: true },
      { id: 'EL011', name: 'Payroll Tax Compliance', description: 'Employment tax obligations', critical: true },
      { id: 'EL012', name: 'Background Check Compliance', description: 'FCRA background screening', critical: true },
      { id: 'EL013', name: 'Drug Testing Programs', description: 'Workplace drug testing compliance', critical: false },
      { id: 'EL014', name: 'Employee Handbook Review', description: 'Policy compliance review', critical: false },
      { id: 'EL015', name: 'Discrimination Prevention Training', description: 'Required training programs', critical: true }
    ]
  },
  {
    id: 'international-trade',
    title: 'International Trade & Cross-Border Compliance',
    icon: '🌍',
    services: [
      { id: 'IT001', name: 'Export Administration Regulations', description: 'EAR compliance review', critical: true },
      { id: 'IT002', name: 'International Traffic in Arms', description: 'ITAR compliance (if applicable)', critical: true },
      { id: 'IT003', name: 'Anti-Boycott Regulations', description: 'Trade boycott compliance', critical: true },
      { id: 'IT004', name: 'Foreign Corrupt Practices Act', description: 'FCPA compliance review', critical: true },
      { id: 'IT005', name: 'OFAC Sanctions Compliance', description: 'Economic sanctions screening', critical: true },
      { id: 'IT006', name: 'Customs Regulations', description: 'Import/export compliance', critical: true },
      { id: 'IT007', name: 'Free Trade Agreement Benefits', description: 'FTA utilization compliance', critical: false },
      { id: 'IT008', name: 'Country of Origin Marking', description: 'Product labeling requirements', critical: true },
      { id: 'IT009', name: 'Anti-Dumping Compliance', description: 'Trade remedy compliance', critical: false },
      { id: 'IT010', name: 'Foreign Investment Review', description: 'CFIUS and similar reviews', critical: true },
      { id: 'IT011', name: 'Transfer Pricing Documentation', description: 'International tax compliance', critical: false },
      { id: 'IT012', name: 'Tax Treaty Benefits', description: 'International tax optimization', critical: false },
      { id: 'IT013', name: 'Documentary Collections', description: 'Trade finance compliance', critical: false },
      { id: 'IT014', name: 'Letters of Credit', description: 'LC compliance review', critical: false },
      { id: 'IT015', name: 'Incoterms Compliance', description: 'International shipping terms', critical: false }
    ]
  },
  {
    id: 'healthcare-life-sciences',
    title: 'Healthcare & Life Sciences Compliance',
    icon: '⚕️',
    services: [
      { id: 'HL001', name: 'FDA Drug Regulations', description: 'Pharmaceutical compliance', critical: true },
      { id: 'HL002', name: 'Medical Device Regulations', description: 'FDA device compliance', critical: true },
      { id: 'HL003', name: 'Clinical Trial Regulations', description: 'GCP compliance review', critical: true },
      { id: 'HL004', name: 'HIPAA Privacy & Security', description: 'Healthcare data protection', critical: true },
      { id: 'HL005', name: 'Medicare/Medicaid Compliance', description: 'CMS regulations compliance', critical: true },
      { id: 'HL006', name: 'Anti-Kickback Statute', description: 'Healthcare fraud prevention', critical: true },
      { id: 'HL007', name: 'Stark Law Compliance', description: 'Physician self-referral rules', critical: true },
      { id: 'HL008', name: 'CLIA Laboratory Standards', description: 'Clinical lab compliance', critical: true },
      { id: 'HL009', name: 'Pharmaceutical Supply Chain', description: 'DSCSA compliance', critical: true },
      { id: 'HL010', name: 'Good Manufacturing Practices', description: 'GMP compliance review', critical: true },
      { id: 'HL011', name: 'Adverse Event Reporting', description: 'FDA safety reporting', critical: true },
      { id: 'HL012', name: 'Healthcare Accreditation', description: 'Joint Commission standards', critical: false },
      { id: 'HL013', name: 'Telemedicine Compliance', description: 'Remote healthcare regulations', critical: true },
      { id: 'HL014', name: 'Controlled Substances', description: 'DEA compliance requirements', critical: true },
      { id: 'HL015', name: 'Health Information Exchange', description: 'HIE compliance standards', critical: false }
    ]
  },
  {
    id: 'technology-cybersecurity',
    title: 'Technology & Cybersecurity Compliance',
    icon: '🔐',
    services: [
      { id: 'TC001', name: 'SOX IT Controls', description: 'Sarbanes-Oxley IT compliance', critical: true },
      { id: 'TC002', name: 'PCI DSS Compliance', description: 'Payment card data security', critical: true },
      { id: 'TC003', name: 'ISO 27001 Certification', description: 'Information security management', critical: false },
      { id: 'TC004', name: 'NIST Cybersecurity Framework', description: 'Federal cybersecurity standards', critical: true },
      { id: 'TC005', name: 'FedRAMP Authorization', description: 'Federal cloud security', critical: true },
      { id: 'TC006', name: 'SOC 2 Compliance', description: 'Service organization controls', critical: true },
      { id: 'TC007', name: 'CMMC Compliance', description: 'Defense contractor cybersecurity', critical: true },
      { id: 'TC008', name: 'Cloud Security Standards', description: 'Cloud service compliance', critical: true },
      { id: 'TC009', name: 'Mobile Device Management', description: 'MDM compliance policies', critical: false },
      { id: 'TC010', name: 'Software Licensing Compliance', description: 'Software asset management', critical: false },
      { id: 'TC011', name: 'Data Encryption Standards', description: 'Encryption compliance review', critical: true },
      { id: 'TC012', name: 'Network Security Compliance', description: 'Network protection standards', critical: true },
      { id: 'TC013', name: 'Incident Response Planning', description: 'Cybersecurity incident procedures', critical: true },
      { id: 'TC014', name: 'Vulnerability Management', description: 'Security vulnerability programs', critical: true },
      { id: 'TC015', name: 'Third-Party Risk Management', description: 'Vendor security assessments', critical: true }
    ]
  },
  {
    id: 'corporate-governance',
    title: 'Corporate Governance & Securities',
    icon: '📊',
    services: [
      { id: 'CG001', name: 'SEC Reporting Requirements', description: 'Securities law compliance', critical: true },
      { id: 'CG002', name: 'Sarbanes-Oxley Compliance', description: 'SOX implementation', critical: true },
      { id: 'CG003', name: 'Board Governance Review', description: 'Corporate governance assessment', critical: false },
      { id: 'CG004', name: 'Insider Trading Compliance', description: 'Securities trading policies', critical: true },
      { id: 'CG005', name: 'Proxy Statement Requirements', description: 'Shareholder communication', critical: true },
      { id: 'CG006', name: 'Audit Committee Charter', description: 'Audit oversight requirements', critical: true },
      { id: 'CG007', name: 'Executive Compensation', description: 'Compensation disclosure rules', critical: true },
      { id: 'CG008', name: 'Related Party Transactions', description: 'RPT disclosure requirements', critical: true },
      { id: 'CG009', name: 'Whistleblower Programs', description: 'Internal reporting systems', critical: true },
      { id: 'CG010', name: 'Code of Business Conduct', description: 'Ethics policy development', critical: false },
      { id: 'CG011', name: 'Risk Management Framework', description: 'Enterprise risk management', critical: false },
      { id: 'CG012', name: 'Internal Audit Function', description: 'Internal audit effectiveness', critical: true },
      { id: 'CG013', name: 'Disclosure Controls', description: 'Financial reporting controls', critical: true },
      { id: 'CG014', name: 'Management Certifications', description: 'CEO/CFO certifications', critical: true },
      { id: 'CG015', name: 'Shareholder Rights Plan', description: 'Anti-takeover provisions', critical: false }
    ]
  }
];

// Regulatory kits
const regulatoryKits = [
  {
    id: 'mortgage-starter',
    name: 'Mortgage Lending Starter Kit',
    description: 'Essential compliance requirements for mortgage lenders',
    categories: ['mortgage-lending', 'consumer-finance'],
    documents: ['TRID Flowchart', 'QM Safe Harbor Guide', 'HMDA LAR Template'],
    price: '$2,500'
  },
  {
    id: 'ag-compliance',
    name: 'Agricultural Compliance Package',
    description: 'Complete agricultural and food safety compliance',
    categories: ['agricultural-compliance', 'environmental-compliance'],
    documents: ['FSMA Compliance Guide', 'GAP Audit Checklist', 'Organic Certification Guide'],
    price: '$1,800'
  },
  {
    id: 'privacy-master',
    name: 'Data Privacy Master Package',
    description: 'Global privacy law compliance suite',
    categories: ['data-privacy'],
    documents: ['GDPR Toolkit', 'CCPA Compliance Guide', 'Privacy Policy Templates'],
    price: '$3,200'
  },
  {
    id: 'fintech-complete',
    name: 'FinTech Complete Compliance',
    description: 'Comprehensive financial technology compliance',
    categories: ['banking-regulation', 'consumer-finance', 'technology-cybersecurity'],
    documents: ['BSA/AML Program', 'API Security Standards', 'Digital Lending Guide'],
    price: '$4,500'
  }
];

export default function ComprehensiveComplianceDashboard() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [checkedServices, setCheckedServices] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [scoreCalculated, setScoreCalculated] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  // Filter services based on search term
  const filteredCategories = useMemo(() => {
    if (!searchTerm) return serviceCategories;
    
    return serviceCategories.map(category => ({
      ...category,
      services: category.services.filter(service =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })).filter(category => category.services.length > 0);
  }, [searchTerm]);

  // Calculate compliance score
  const complianceScore = useMemo(() => {
    const totalCriticalServices = serviceCategories.reduce((acc, cat) => 
      acc + cat.services.filter(service => service.critical).length, 0);
    const checkedCriticalServices = Array.from(checkedServices).filter(serviceId => {
      const service = serviceCategories.flatMap(cat => cat.services).find(s => s.id === serviceId);
      return service && service.critical;
    }).length;
    
    return totalCriticalServices > 0 ? Math.round((checkedCriticalServices / totalCriticalServices) * 100) : 0;
  }, [checkedServices]);

  const handleServiceToggle = (serviceId) => {
    const newChecked = new Set(checkedServices);
    if (newChecked.has(serviceId)) {
      newChecked.delete(serviceId);
    } else {
      newChecked.add(serviceId);
    }
    setCheckedServices(newChecked);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocs = files.map(file => ({
      id: Math.random().toString(36),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadDate: new Date().toLocaleDateString()
    }));
    setUploadedDocs(prev => [...prev, ...newDocs]);
  };

  const calculateScore = () => {
    setScoreCalculated(true);
    // Trigger score calculation animation
    setTimeout(() => setScoreCalculated(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit & Compliance Dashboard</h1>
          <p className="text-gray-600">Comprehensive compliance management across 275+ service categories</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-600 font-medium">Compliance Score</div>
          <div className={`text-3xl font-bold text-blue-800 ${scoreCalculated ? 'animate-pulse' : ''}`}>
            {complianceScore}%
          </div>
          <div className="text-xs text-blue-600">
            {Array.from(checkedServices).length} of {serviceCategories.reduce((acc, cat) => acc + cat.services.length, 0)} checked
          </div>
        </div>
      </div>

      {/* Search and Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search compliance services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={calculateScore}
              className="btn btn-primary"
            >
              📊 Calculate Score
            </button>
            <button className="btn btn-outline">
              📄 Export Report
            </button>
            <button className="btn btn-outline">
              📧 Generate Audit Pack
            </button>
          </div>
        </div>
      </div>

      {/* Regulatory Kits */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Compliance Kits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {regulatoryKits.map(kit => (
            <div key={kit.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-2">{kit.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{kit.description}</p>
              <div className="text-sm text-gray-500 mb-3">
                {kit.documents.length} documents included
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-600">{kit.price}</span>
                <button className="btn btn-primary text-sm">Purchase</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Document Upload */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Document Upload Center</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="document-upload"
            accept=".pdf,.doc,.docx,.xlsx,.xls"
          />
          <label htmlFor="document-upload" className="cursor-pointer">
            <div className="text-4xl text-gray-400 mb-2">📁</div>
            <p className="text-gray-600">Click to upload compliance documents</p>
            <p className="text-sm text-gray-500">PDF, DOC, DOCX, XLS, XLSX files supported</p>
          </label>
        </div>
        
        {uploadedDocs.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium text-gray-900 mb-2">Uploaded Documents</h3>
            <div className="space-y-2">
              {uploadedDocs.map(doc => (
                <div key={doc.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <span className="font-medium">{doc.name}</span>
                    <span className="text-sm text-gray-500 ml-2">({(doc.size / 1024).toFixed(1)} KB)</span>
                  </div>
                  <span className="text-sm text-gray-500">{doc.uploadDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Service Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Category Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-4">Service Categories</h3>
            <div className="space-y-2">
              {filteredCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 text-blue-800 border border-blue-200'
                      : 'hover:bg-gray-50 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <div>
                      <div className="font-medium text-sm">{category.title}</div>
                      <div className="text-xs text-gray-500">{category.services.length} services</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className="lg:col-span-3">
          {selectedCategory ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              {(() => {
                const category = filteredCategories.find(cat => cat.id === selectedCategory);
                return (
                  <>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl">{category.icon}</span>
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{category.title}</h2>
                        <p className="text-gray-600">{category.services.length} compliance services</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {category.services.map(service => (
                        <div
                          key={service.id}
                          className={`p-4 rounded-lg border transition-colors ${
                            checkedServices.has(service.id)
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={checkedServices.has(service.id)}
                              onChange={() => handleServiceToggle(service.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-gray-900">{service.name}</h3>
                                {service.critical && (
                                  <span className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium">
                                    Critical
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                              <div className="text-xs text-gray-500 mt-2">ID: {service.id}</div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <div className="text-4xl text-gray-400 mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Category</h3>
              <p className="text-gray-600">Choose a compliance category from the sidebar to view services</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}