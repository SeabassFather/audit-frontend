import React from "react";
import { mexicoLoanServices } from "../data/mexicoLoanServices";
export default function MexicoRealEstateLoan() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-brand-blue">Mexico Real Estate & Loan Services</h1>
      {mexicoLoanServices.map((svc) => (
        <div key={svc.id} className="bg-white rounded-xl shadow border border-brand-silver p-6">
          <h2 className="text-2xl font-bold text-brand-green mb-2">{svc.title}</h2>
          <p className="mb-3 text-gray-700">{svc.description}</p>
          <ul className="list-disc pl-6 text-gray-800">
            {svc.features.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
      ))}
      <div className="mt-6 text-center">
        <a
          href="mailto:mexico@auditdna.org"
          className="btn btn-primary"
          target="_blank"
          rel="noopener"
        >
          Contact Mexico Services Team
        </a>
      </div>
    </div>
  );
}
