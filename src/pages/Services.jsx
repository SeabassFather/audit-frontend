import React, { useState } from "react";
import { feeSchedule, serviceTiers } from "../data/feeSchedule.js";

const FeeScheduleTable = () => {
  const [selectedTier, setSelectedTier] = useState('standard');
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Standard Fee Schedule</h2>
        <p className="text-gray-600">Transparent pricing for all AuditDNA services. Select service tier to view pricing.</p>
      </div>
      
      <div className="p-6">
        {/* Service Tier Selector */}
        <div className="flex items-center gap-4 mb-6">
          {Object.entries(serviceTiers).map(([key, tier]) => (
            <button
              key={key}
              onClick={() => setSelectedTier(key)}
              className={`px-4 py-2 rounded-lg border font-medium text-sm transition-colors ${
                selectedTier === key 
                  ? 'bg-brand-blue text-white border-brand-blue' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tier.name}
              <div className="text-xs opacity-75 mt-1">{tier.timeline}</div>
            </button>
          ))}
        </div>

        {/* Fee Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Service Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Service</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Price</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {feeSchedule.map((category, categoryIndex) => (
                <React.Fragment key={category.category}>
                  {category.services.map((service, serviceIndex) => (
                    <tr key={`${categoryIndex}-${serviceIndex}`} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className={`py-3 px-4 ${serviceIndex === 0 ? 'font-medium text-gray-900' : 'text-gray-400'}`}>
                        {serviceIndex === 0 ? category.category : ''}
                      </td>
                      <td className="py-3 px-4 text-gray-700">{service.service}</td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        {service[selectedTier + 'Fee'] || service.standardFee}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button className="text-brand-blue hover:text-brand-blue/80 text-sm font-medium">
                          Request Quote
                        </button>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-2">{serviceTiers[selectedTier].name} Tier Features:</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            {serviceTiers[selectedTier].features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const ServiceCategoryCard = ({ category, icon, description, services, featured = false }) => (
  <div className={`rounded-lg border p-6 hover:shadow-md transition-shadow ${
    featured ? 'border-brand-blue bg-gradient-to-br from-brand-blue/5 to-brand-green/5' : 'border-gray-200 bg-white'
  }`}>
    <div className="flex items-start gap-4">
      <div className={`p-3 rounded-lg ${featured ? 'bg-brand-blue text-white' : 'bg-gray-100 text-gray-600'}`}>
        <div className="w-6 h-6">{icon}</div>
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className={`text-lg font-semibold ${featured ? 'text-brand-blue' : 'text-gray-900'}`}>
            {category}
          </h3>
          {featured && (
            <span className="px-2 py-1 text-xs font-medium bg-brand-yellow text-gray-900 rounded-full">
              Most Popular
            </span>
          )}
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        <div className="space-y-2 mb-4">
          {services.slice(0, 3).map((service, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{service.name}</span>
              <span className="text-gray-500">{service.startingPrice}</span>
            </div>
          ))}
          {services.length > 3 && (
            <div className="text-sm text-gray-500">
              + {services.length - 3} more services
            </div>
          )}
        </div>
        
        <button className={`w-full py-2 px-4 rounded-md font-medium text-sm transition-colors ${
          featured 
            ? 'bg-brand-blue text-white hover:bg-brand-blue/90' 
            : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}>
          View All Services
        </button>
      </div>
    </div>
  </div>
);

const serviceCategories = [
  {
    category: "Agricultural Audits",
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
    description: "USDA, GlobalGAP, and organic certification audits for agricultural operations.",
    services: [
      { name: "USDA Organic Certification", startingPrice: "$850" },
      { name: "GlobalGAP Compliance", startingPrice: "$750" },
      { name: "Food Safety Audit", startingPrice: "$650" },
      { name: "Soil & Water Testing", startingPrice: "$450" }
    ],
    featured: true
  },
  {
    category: "Financial Services",
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" /></svg>,
    description: "Comprehensive financial audits, compliance reviews, and risk assessments.",
    services: [
      { name: "Financial Statement Review", startingPrice: "$1,250" },
      { name: "Payroll Reconciliation", startingPrice: "$550" },
      { name: "Tax Compliance Audit", startingPrice: "$950" },
      { name: "Internal Controls Assessment", startingPrice: "$1,150" }
    ]
  },
  {
    category: "Mortgage & Lending",
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    description: "Loan file reviews, appraisals, and compliance checks for lending institutions.",
    services: [
      { name: "Loan File Review", startingPrice: "$275" },
      { name: "Appraisal Review", startingPrice: "$195" },
      { name: "Compliance Check", startingPrice: "$325" },
      { name: "Risk Assessment", startingPrice: "$425" }
    ]
  },
  {
    category: "Environmental",
    icon: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    description: "Water quality, soil testing, and environmental impact assessments.",
    services: [
      { name: "Water Quality Analysis", startingPrice: "$375" },
      { name: "Soil Contamination Test", startingPrice: "$425" },
      { name: "Environmental Impact", startingPrice: "$850" },
      { name: "Remediation Planning", startingPrice: "$1,150" }
    ]
  }
];

export default function Services() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-brand-blue/10 to-brand-green/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Services & Fee Schedule</h1>
        <p className="text-gray-600">
          Professional audit services with transparent pricing. Over 275+ services across agriculture, 
          finance, mortgage, environmental, and compliance sectors.
        </p>
      </div>

      {/* Fee Schedule Table - Top Priority */}
      <FeeScheduleTable />

      {/* Important Audit Types Callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-semibold text-amber-900 mb-2">High-Priority Audit Types</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-amber-800">Time-Sensitive:</strong>
                <ul className="mt-1 space-y-1 text-amber-700">
                  <li>• USDA Organic Certification (Seasonal)</li>
                  <li>• Tax Compliance (Filing Deadlines)</li>
                  <li>• Financial Statement Review (Quarter-End)</li>
                </ul>
              </div>
              <div>
                <strong className="text-amber-800">Regulatory Required:</strong>
                <ul className="mt-1 space-y-1 text-amber-700">
                  <li>• Environmental Impact Assessment</li>
                  <li>• Loan File Compliance Review</li>
                  <li>• Food Safety Certification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Categories */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Service Categories</h2>
          <button className="text-brand-blue hover:text-brand-blue/80 text-sm font-medium">
            View All 275+ Services →
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {serviceCategories.map((category, index) => (
            <ServiceCategoryCard key={index} {...category} />
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium text-blue-900">Quality Guarantee</h3>
              <p className="text-sm text-blue-700 mt-1">
                All audits include revision guarantee and compliance certification. 
                100% satisfaction or full refund within 30 days.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg className="w-5 h-5 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-medium text-green-900">Fast Turnaround</h3>
              <p className="text-sm text-green-700 mt-1">
                Standard delivery in 10-14 days. Expedited service available for urgent audits. 
                Real-time status tracking included.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
