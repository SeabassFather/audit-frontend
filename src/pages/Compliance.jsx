import React from "react";
import { Link } from "react-router-dom";
import { Shield, FileText, Building, ArrowRight } from "lucide-react";

const regs = {
  "US": [
    {code:"TRID", desc:"TILA-RESPA Integrated Disclosure rules for mortgage lending."},
    {code:"ECOA", desc:"Equal Credit Opportunity Act fair lending obligations."},
    {code:"GLBA", desc:"GrammLeachBliley Act privacy & safeguarding."},
    {code:"CCPA", desc:"California Consumer Privacy Act data rights."}
  ],
  "International": [
    {code:"GDPR", desc:"EU data protection lawlawful basis, DSR, DPIA."},
    {code:"PIPEDA", desc:"Canada privacy for commercial activities."},
    {code:"UK GDPR", desc:"United Kingdom GDPR post-Brexit."},
    {code:"PDPA (SG)", desc:"Singapore Personal Data Protection Act."}
  ],
  "Environmental": [
    {code:"Water Quality", desc:"Water analysis and contamination reports for agricultural properties."},
    {code:"Soil Testing", desc:"Soil composition, nutrient levels, and environmental compliance."},
    {code:"EPA Compliance", desc:"Environmental Protection Agency regulatory compliance."},
    {code:"USDA Organic", desc:"Organic certification and compliance documentation."}
  ]
};

export default function Compliance(){
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center">
              <Shield className="w-6 h-6 mr-3 text-blue-600" />
              Compliance Frameworks
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive regulatory compliance management across privacy, financial, and environmental domains
            </p>
          </div>
          <Link
            to="/compliance-dashboard"
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FileText className="w-4 h-4 mr-2" />
            Open Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Active Frameworks</p>
              <p className="text-2xl font-semibold text-green-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Reports Uploaded</p>
              <p className="text-2xl font-semibold text-blue-900">28</p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <Building className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Compliance Score</p>
              <p className="text-2xl font-semibold text-purple-900">98%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Categories */}
      {Object.keys(regs).map(category => (
        <div key={category} className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h2 className="text-lg font-semibold flex items-center">
              {category === 'Environmental' && <Building className="w-5 h-5 mr-2" />}
              {category === 'US' && <Shield className="w-5 h-5 mr-2" />}
              {category === 'International' && <FileText className="w-5 h-5 mr-2" />}
              {category} Compliance
            </h2>
          </div>
          <div className="p-6">
            <div className="grid gap-4">
              {regs[category].map(reg => (
                <div key={reg.code} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Shield className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">{reg.code}</h3>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{reg.desc}</p>
                    {category === 'Environmental' && (
                      <div className="mt-2">
                        <Link 
                          to="/pages/ag/WaterSoil"
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          Upload {reg.code.toLowerCase()} reports →
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/compliance-dashboard"
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
          >
            <FileText className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">View Dashboard</span>
          </Link>
          <Link
            to="/pages/ag/WaterSoil"
            className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-400 hover:bg-green-50 transition-colors text-center"
          >
            <Building className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Upload Environmental Reports</span>
          </Link>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-colors text-center">
            <Shield className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Generate Compliance Kit</span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-yellow-400 hover:bg-yellow-50 transition-colors text-center">
            <FileText className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-700">Audit History</span>
          </button>
        </div>
      </div>
    </div>
  );
}
