import React, { useMemo, useState } from "react";
import ContactCard from "../../components/ContactCard";
import { saveLead } from "../../lib/leads";
import { loanProducts, lenderCriteria, evaluateQualification, complianceRequirements } from "../../data/mexicoLoanProducts";

const STATES = ["CDMX","JAL","NLE","QRO","YUC","BCN","BCS","GTO","MEX","MOR","PUE","QROO","SIN","SON","TAM","VER"];
const PROPERTY_TYPES = ["Residential", "Condo", "Land", "Mixed-use", "Villa", "Investment", "Construction", "Development"];
const PURPOSES = ["Purchase","Refinance","Cash-out Refi","Construction"];
const CURRENCIES = ["USD","MXN"];
const INCOME_DOC = ["Full-Doc","Bank Statements","DSCR-like","Foreign National (Alt-Doc)","Asset-Based"];
const TERMS = [10,15,20,25,30];

export default function SearchMexicoLoans(){
  const [f,setF] = useState({
    state:"CDMX", city:"", propertyType:"Residential", purpose:"Purchase",
    price:8000000, downPct:30, loanCurrency:"MXN",
    residency:"Foreign National", nationality:"US", term:20,
    monthlyIncome:250000, monthlyDebts:20000, incomeDoc:"Foreign National (Alt-Doc)",
    creditScore: 720, annualIncome: 150000
  });

  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const ltv = useMemo(()=> Math.max(0, Math.min(100, 100 - (f.downPct||0))), [f.downPct]);
  const dti = useMemo(()=>{
    const inc = Number(f.monthlyIncome||0), debts = Number(f.monthlyDebts||0);
    return inc>0 ? +((debts)/(inc)).toFixed(2) : null;
  },[f.monthlyIncome,f.monthlyDebts]);

  const loanAmount = useMemo(() => {
    return f.price * (ltv / 100);
  }, [f.price, ltv]);

  const application = useMemo(() => ({
    creditScore: f.creditScore,
    loanAmount: loanAmount,
    propertyValue: f.price,
    dti: dti || 0,
    annualIncome: f.loanCurrency === 'USD' ? f.annualIncome : f.annualIncome * 0.055, // Rough MXN to USD conversion
    residency: f.residency,
    propertyType: f.propertyType,
    state: f.state,
    purpose: f.purpose
  }), [f, loanAmount, dti]);

  const searchLoanProducts = () => {
    const results = loanProducts.map(product => {
      const qualification = evaluateQualification(application, product);
      return {
        product,
        qualification,
        matchScore: qualification.score
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
    
    setSearchResults(results);
    setShowResults(true);
  };

  const prelim = useMemo(()=>{
    // Enhanced preliminary checks
    const gates = [];
    if (ltv > 80) gates.push("Target ≤ 80% LTV"); 
    if (dti!=null && dti > 0.45) gates.push("Target DTI ≤ 0.45");
    if (f.residency.includes("Foreign") && (f.price||0) < 1000000) gates.push("Min price ≥ 1,000,000 MXN for FN/Alt-Doc");
    if (f.creditScore < 650) gates.push("Minimum credit score 650");
    return gates.length ? { ok:false, notes:gates } : { ok:true, notes:["Looks in-range for partner underwriting"] };
  },[ltv,dti,f]);

  function change(k,v){ setF(s=>({ ...s, [k]: v })); }

  function handleLead(lead){
    const payload = { ...lead, service:"MEX-RE", app: f, calc:{ ltv, dti } };
    if (saveLead(payload)) alert("Mexico Loan lead saved to Inbox.");
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Mexico Mortgage & Loan Qualification Search</h1>
        <p className="text-emerald-100">Find qualified loan products for Mexico real estate investments</p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-white/10 rounded-lg p-3">
            <div className="font-semibold">Cross-Border</div>
            <div className="text-emerald-100">US-Mexico lending</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="font-semibold">Bilingual</div>
            <div className="text-emerald-100">Full compliance</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="font-semibold">Remote</div>
            <div className="text-emerald-100">E-signature ready</div>
          </div>
          <div className="bg-white/10 rounded-lg p-3">
            <div className="font-semibold">Full Service</div>
            <div className="text-emerald-100">Title, escrow, legal</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Search Form */}
        <div className="lg:col-span-2 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 mb-4">Loan Application Details</h2>
          
          {/* Property Information */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-medium text-slate-900 mb-3">Property Information</h3>
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-600">State</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.state} onChange={e=>change("state", e.target.value)}>
                  {STATES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600">City</label>
                <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.city} onChange={e=>change("city", e.target.value)} placeholder="CDMX / Guadalajara / etc."/>
              </div>
              <div>
                <label className="text-xs text-slate-600">Property Type</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.propertyType} onChange={e=>change("propertyType", e.target.value)}>
                  {PROPERTY_TYPES.map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600">Purpose</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.purpose} onChange={e=>change("purpose", e.target.value)}>
                  {PURPOSES.map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600">Price ({f.loanCurrency})</label>
                <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.price} onChange={e=>change("price", +e.target.value||0)} />
              </div>
              <div>
                <label className="text-xs text-slate-600">Down Payment %</label>
                <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.downPct} onChange={e=>change("downPct", +e.target.value||0)} />
              </div>
            </div>
          </div>

          {/* Borrower Information */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-medium text-slate-900 mb-3">Borrower Information</h3>
            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <label className="text-xs text-slate-600">Currency</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.loanCurrency} onChange={e=>change("loanCurrency", e.target.value)}>
                  {CURRENCIES.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600">Residency Status</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.residency} onChange={e=>change("residency", e.target.value)}>
                  <option>Mexican Resident</option><option>Foreign National</option><option>Temporary/Permanent Resident</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600">Nationality</label>
                <input className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.nationality} onChange={e=>change("nationality", e.target.value)} placeholder="US / CA / EU / etc."/>
              </div>
              <div>
                <label className="text-xs text-slate-600">Credit Score</label>
                <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.creditScore} onChange={e=>change("creditScore", +e.target.value||0)} placeholder="650-850" />
              </div>
              <div>
                <label className="text-xs text-slate-600">Annual Income (USD)</label>
                <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.annualIncome} onChange={e=>change("annualIncome", +e.target.value||0)} />
              </div>
              <div>
                <label className="text-xs text-slate-600">Term (years)</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.term} onChange={e=>change("term", +e.target.value||20)}>
                  {TERMS.map(t=><option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs text-slate-600">Monthly Income ({f.loanCurrency})</label>
                <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.monthlyIncome} onChange={e=>change("monthlyIncome", +e.target.value||0)} />
              </div>
              <div>
                <label className="text-xs text-slate-600">Monthly Debts ({f.loanCurrency})</label>
                <input type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.monthlyDebts} onChange={e=>change("monthlyDebts", +e.target.value||0)} />
              </div>
              <div>
                <label className="text-xs text-slate-600">Income Documentation</label>
                <select className="w-full rounded-lg border border-slate-300 px-3 py-2" value={f.incomeDoc} onChange={e=>change("incomeDoc", e.target.value)}>
                  {INCOME_DOC.map(x=><option key={x}>{x}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Preliminary Assessment */}
          <div className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-medium text-slate-900 mb-3">Preliminary Assessment</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500">Estimated LTV</div>
                <div className="text-xl font-semibold text-slate-900">{ltv}%</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500">Estimated DTI</div>
                <div className="text-xl font-semibold text-slate-900">{dti!=null ? (dti*100).toFixed(0)+"%" : "N/A"}</div>
              </div>
              <div className="text-center p-3 bg-slate-50 rounded-lg">
                <div className="text-xs text-slate-500">Prelim Check</div>
                <div className={`text-sm font-medium ${prelim.ok? "text-emerald-700" : "text-rose-700"}`}>
                  {prelim.ok ? "In-range" : "Adjust inputs"}
                </div>
              </div>
            </div>
            {!prelim.ok && (
              <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-lg">
                <div className="text-xs text-rose-700 font-medium mb-1">Areas to address:</div>
                <ul className="text-xs text-rose-600 space-y-1">
                  {prelim.notes.map((note, i) => <li key={i}>• {note}</li>)}
                </ul>
              </div>
            )}
          </div>

          {/* Search Button */}
          <div className="pt-4">
            <button 
              onClick={searchLoanProducts}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Search Qualified Loan Products
            </button>
          </div>
        </div>

        {/* Contact Card */}
        <div className="space-y-4">
          <ContactCard
            title="Mexico Real Estate Loans"
            partner="Cross-Border Lending Network"
            service="MEX-RE"
            onSubmit={handleLead}
            targetEmail="mexico@auditdna.org"
          />
          
          {/* Compliance Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Compliance Features</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• FINCEN & AML compliance</li>
              <li>• Mexican bank trust setup</li>
              <li>• Bilingual documentation</li>
              <li>• Title insurance coordination</li>
              <li>• Tax ID assistance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Search Results */}
      {showResults && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">
              Loan Product Results ({searchResults.length} found)
            </h2>
            <button 
              onClick={() => setShowResults(false)}
              className="text-slate-500 hover:text-slate-700"
            >
              ✕ Close Results
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {searchResults.map((result, index) => (
              <LoanProductCard key={result.product.id} result={result} index={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Loan Product Card Component
function LoanProductCard({ result, index }) {
  const { product, qualification } = result;
  
  const getQualificationColor = (score) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getQualificationLabel = (score) => {
    if (score >= 80) return 'Highly Qualified';
    if (score >= 60) return 'Conditionally Qualified';
    return 'Does Not Qualify';
  };

  return (
    <div className={`bg-white rounded-xl border-2 p-6 transition-all hover:shadow-lg ${
      qualification.eligible ? 'border-emerald-200 hover:border-emerald-300' : 'border-rose-200'
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
          <p className="text-sm text-slate-600">{product.lender}</p>
          <p className="text-xs text-slate-500">{product.type}</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getQualificationColor(qualification.score)}`}>
          {getQualificationLabel(qualification.score)}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-700 mb-4">{product.description}</p>

      {/* Key Criteria */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="text-xs text-slate-500">Max LTV</div>
          <div className="font-semibold">{(product.criteria.maxLTV * 100)}%</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="text-xs text-slate-500">Min FICO</div>
          <div className="font-semibold">{product.criteria.minFICO}</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="text-xs text-slate-500">Max DTI</div>
          <div className="font-semibold">{(product.criteria.maxDTI * 100)}%</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-3">
          <div className="text-xs text-slate-500">Min Down</div>
          <div className="font-semibold">{(product.criteria.minDownPayment * 100)}%</div>
        </div>
      </div>

      {/* Key Features */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-slate-900 mb-2">Key Features</h4>
        <div className="space-y-1">
          {product.features.slice(0, 3).map((feature, i) => (
            <div key={i} className="text-xs text-slate-600 flex items-center">
              <span className="text-emerald-500 mr-2">✓</span>
              {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Qualification Feedback */}
      {qualification.warnings.length > 0 && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 rounded-lg">
          <h4 className="text-sm font-medium text-rose-900 mb-1">Qualification Notes</h4>
          <ul className="space-y-1">
            {qualification.warnings.slice(0, 2).map((warning, i) => (
              <li key={i} className="text-xs text-rose-700">• {warning}</li>
            ))}
          </ul>
        </div>
      )}

      {qualification.strengths.length > 0 && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
          <h4 className="text-sm font-medium text-emerald-900 mb-1">Strengths</h4>
          <ul className="space-y-1">
            {qualification.strengths.map((strength, i) => (
              <li key={i} className="text-xs text-emerald-700">• {strength}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Qualification Note */}
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-700">
          <span className="font-medium">Note:</span> {product.qualificationNote}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          Request Pre-Approval
        </button>
        <button className="px-4 py-2 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
}
