import React from "react";
import { auditEngines } from "../data/auditEngines";

export default function AuditEnginesList() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AI Audit & Compliance Engines</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Powerful AI-driven tools that automate document analysis, compliance checking, and regulatory processes 
          to streamline your audit workflow and ensure accuracy.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {auditEngines.map((engine, index) => (
          <div key={engine.id} className="card group hover:scale-[1.02] transition-transform duration-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-ocean-500 to-ocean-600 rounded-xl flex items-center justify-center text-white font-bold">
                {index + 1}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-ocean-700 transition-colors">
                  {engine.name}
                </h2>
                <p className="text-gray-600 mt-1">{engine.description}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Key Features</h3>
              <div className="grid gap-2">
                {engine.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 hover:bg-ocean-50 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-ocean-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <button className="btn btn-outline w-full group-hover:border-ocean-300 group-hover:text-ocean-700">
                Launch {engine.name}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="card bg-gradient-to-r from-ocean-50 to-blue-50 border-ocean-200">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Custom AI Integration?</h3>
          <p className="text-gray-600 mb-4">
            Our team can develop custom AI engines tailored to your specific audit and compliance requirements.
          </p>
          <button className="btn btn-primary">
            Contact AI Solutions Team
          </button>
        </div>
      </div>
    </div>
  );
}
