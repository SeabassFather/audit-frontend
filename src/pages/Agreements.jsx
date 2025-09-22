import React from "react";
import { forms } from "../data/forms";
export default function Agreements() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Agreements & Forms</h1>
      <div className="space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-1">{forms.financialAuditAuthorization.title}</h2>
          <p className="text-gray-500 mb-1">Please complete this authorization or download a blank copy.</p>
          <div dangerouslySetInnerHTML={{ __html: forms.financialAuditAuthorization.html }} />
          <a href={forms.financialAuditAuthorization.txtDownload} download className="btn btn-sm mt-2">Download .txt</a>
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-1">{forms.partnerOnboarding.title}</h2>
          <p className="text-gray-500 mb-1">For professional partners and onboarding.</p>
          <div dangerouslySetInnerHTML={{ __html: forms.partnerOnboarding.html }} />
          <a href={forms.partnerOnboarding.txtDownload} download className="btn btn-sm mt-2">Download .txt</a>
        </section>
      </div>
    </div>
  );
}
