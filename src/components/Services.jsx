/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle, AlertCircle, Send, Shield, CreditCard, QrCode, FileCheck, Award, DollarSign, Clock, TrendingUp } from 'lucide-react';

// COMPLETE AUDIT SERVICES DATABASE
const AUDIT_CATEGORIES = {
  "Consumer Financial Protection": {
    icon: "🛡️",
    color: "#3b82f6",
    description: "CFPB-regulated financial services audits",
    services: [
      {
        id: "CFP001",
        name: "Mortgage Loan Audit (TRID/RESPA/ECOA)",
        price: "$1,497",
        recovery: "Average recovery: $12,500",
        successRate: "94.2%",
        timeframe: "30-45 business days",
        description: "Complete mortgage compliance audit - TILA-RESPA violations, fee discrepancies, ECOA discrimination",
        documents: ["Loan Estimate", "Closing Disclosure", "Promissory Note", "12-month payment history", "Escrow statements"],
        regulators: ["CFPB", "State Banking"],
        qrEnabled: true,
        partnerAgreement: "CPA/Attorney required"
      },
      {
        id: "CFP002",
        name: "Escrow Account Audit",
        price: "$897",
        recovery: "Average recovery: $3,200",
        successRate: "91.7%",
        timeframe: "21-30 business days",
        description: "Escrow shortage analysis, cushion violations, shortage notice compliance",
        documents: ["12-month escrow statements", "Annual analysis", "Shortage notices", "Payment records"],
        regulators: ["CFPB", "HUD"],
        qrEnabled: true,
        partnerAgreement: "Escrow Officer collaboration"
      },
      {
        id: "CFP003",
        name: "Credit Card Compliance Audit",
        price: "$747",
        recovery: "Average recovery: $2,890",
        successRate: "85.9%",
        timeframe: "21-30 business days",
        description: "CARD Act violations, improper rate increases, fee compliance",
        documents: ["12-month statements", "Card agreements", "Rate change notices", "Fee schedules"],
        regulators: ["CFPB", "OCC"],
        qrEnabled: true,
        partnerAgreement: "Standard"
      },
      {
        id: "CFP004",
        name: "Banking NSF/Overdraft Fee Audit",
        price: "$597",
        recovery: "Average recovery: $1,850",
        successRate: "88.3%",
        timeframe: "14-21 business days",
        description: "NSF fee analysis, overdraft consent compliance, duplicate charge detection",
        documents: ["12-month bank statements", "Account agreements", "Fee schedules"],
        regulators: ["CFPB", "FDIC"],
        qrEnabled: true,
        partnerAgreement: "Standard"
      },
      {
        id: "CFP005",
        name: "Auto Loan Compliance Audit",
        price: "$1,297",
        recovery: "Average recovery: $8,750",
        successRate: "89.7%",
        timeframe: "35-45 business days",
        description: "Auto financing TILA compliance, rate markup analysis, add-on product verification",
        documents: ["Loan contract", "Payment history", "Insurance documents", "Trade-in records"],
        regulators: ["CFPB", "State AG"],
        qrEnabled: true,
        partnerAgreement: "CPA required"
      },
      {
        id: "CFP006",
        name: "Student Loan Federal Compliance Audit",
        price: "$997",
        recovery: "Average recovery: $5,600",
        successRate: "90.1%",
        timeframe: "30-45 business days",
        description: "Federal student loan servicer compliance, payment misapplication, forgiveness eligibility",
        documents: ["Loan history", "Payment records", "Servicer correspondence", "Forgiveness applications"],
        regulators: ["Dept of Education", "CFPB"],
        qrEnabled: true,
        partnerAgreement: "Standard"
      }
    ]
  },
  "Retirement & Investment Audits": {
    icon: "💰",
    color: "#10b981",
    description: "401k, IRA, and investment account fee audits",
    services: [
      {
        id: "RIA001",
        name: "401(k) Hidden Fee Audit",
        price: "$1,197",
        recovery: "Average recovery: $7,200",
        successRate: "92.4%",
        timeframe: "30-45 business days",
        description: "ERISA compliance, hidden administrative fees, fiduciary breach analysis",
        documents: ["Plan documents", "Fee disclosures", "12-month statements", "Summary Plan Description"],
        regulators: ["DOL", "IRS"],
        qrEnabled: true,
        partnerAgreement: "CPA required"
      },
      {
        id: "RIA002",
        name: "Roth IRA Compliance Audit",
        price: "$897",
        recovery: "Average recovery: $4,100",
        successRate: "87.6%",
        timeframe: "21-30 business days",
        description: "Contribution limit violations, early withdrawal penalty analysis, custodian fee review",
        documents: ["Account statements", "Contribution records", "Tax forms", "Fee schedules"],
        regulators: ["IRS", "SEC"],
        qrEnabled: true,
        partnerAgreement: "CPA required"
      }
    ]
  },
  "Healthcare & Medical Billing": {
    icon: "🏥",
    color: "#ef4444",
    description: "Medical billing code audits (ICD-11/12)",
    services: [
      {
        id: "MED001",
        name: "Medical Billing Code Audit (ICD-11/12)",
        price: "$897",
        recovery: "Average recovery: $5,300",
        successRate: "93.1%",
        timeframe: "21-35 business days",
        description: "ICD-11/12 billing code verification, upcoding detection, duplicate charge analysis",
        documents: ["Itemized bills", "EOB statements", "Medical records", "Insurance policies"],
        regulators: ["CMS", "State Health Dept"],
        qrEnabled: true,
        partnerAgreement: "Healthcare billing specialist"
      }
    ]
  },
  "Business & Commercial Audits": {
    icon: "🏢",
    color: "#06b6d4",
    description: "Business loans, factoring, P.O. financing",
    services: [
      {
        id: "BUS001",
        name: "Business Loan Audit (Mexico/USA)",
        price: "$1,897",
        recovery: "Average recovery: $15,200",
        successRate: "91.3%",
        timeframe: "45-60 business days",
        description: "Cross-border business loan compliance, SBA loan audit, factoring agreement review",
        documents: ["Loan documents", "Business financials", "Payment history", "Collateral agreements"],
        regulators: ["SBA", "State Banking"],
        qrEnabled: true,
        partnerAgreement: "CPA + Attorney required"
      }
    ]
  }
};

function ServiceCard({ service, category, onSelect }) {
  return (
    <div onClick={() => onSelect(service, category)} className="group bg-white rounded-xl border-2 border-gray-200 hover:border-blue-500 hover:shadow-xl transition-all cursor-pointer p-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
        <span className="text-xl font-bold text-blue-600">{service.price}</span>
      </div>
      <p className="text-sm text-gray-600 mb-4">{service.description}</p>
      <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
        <TrendingUp size={16} />
        <span className="font-semibold">{service.successRate} success | {service.recovery}</span>
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition">Request Audit</button>
    </div>
  );
}

function AuditRequestModal({ service, category, onClose }) {
  const [step, setStep] = useState(1);
  const [caseId] = useState(`ADN-2025-${Math.floor(Math.random() * 10000)}`);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{service.name}</h2>
          <button onClick={onClose}><X size={24} /></button>
        </div>
        {step === 1 && (
          <div>
            <p className="mb-4">Price: {service.price}</p>
            <p className="mb-4">Success Rate: {service.successRate}</p>
            <p className="mb-6">{service.description}</p>
            <button onClick={() => setStep(2)} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Continue</button>
          </div>
        )}
        {step === 2 && (
          <div className="text-center">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Request Submitted!</h3>
            <p className="text-xl font-mono text-blue-600 mb-4">{caseId}</p>
            <p className="text-gray-600 mb-6">Check your email for confirmation and next steps.</p>
            <button onClick={onClose} className="bg-blue-600 text-white py-3 px-8 rounded-lg font-bold">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Services() {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">AuditDNA <span className="text-blue-600">Professional Services</span></h1>
          <p className="text-xl text-gray-600">Comprehensive auditing & compliance services</p>
        </div>
        <div className="space-y-6">
          {Object.entries(AUDIT_CATEGORIES).map(([categoryKey, category], idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-lg border-2 border-gray-200">
              <button onClick={() => setExpandedCategory(expandedCategory === idx ? null : idx)} className="w-full flex items-center justify-between p-6 text-left" style={{ borderLeft: `6px solid ${category.color}` }}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{category.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{categoryKey}</h2>
                    <p className="text-gray-600">{category.description}</p>
                  </div>
                </div>
              </button>
              {expandedCategory === idx && (
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-50">
                  {category.services.map((service, idx2) => (
                    <ServiceCard key={idx2} service={service} category={category} onSelect={(s) => { setSelectedService(s); setSelectedCategory(category); }} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {selectedService && <AuditRequestModal service={selectedService} category={selectedCategory} onClose={() => { setSelectedService(null); setSelectedCategory(null); }} />}
    </div>
  );
}