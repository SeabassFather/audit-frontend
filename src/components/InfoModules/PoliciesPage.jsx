import React from "react";
import { policies } from "../../data/policies";
export default function PoliciesPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Policies & Verification Guides</h1>
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-1">Partner Access Policy Disclosure</h2>
        <pre className="bg-gray-100 p-3 rounded">{policies.partnerAccessDisclosure}</pre>
      </section>
      <section>
        <h2 className="text-lg font-semibold mb-1">QR Verification Instructions</h2>
        <pre className="bg-gray-100 p-3 rounded">{policies.qrInstructions}</pre>
      </section>
    </div>
  );
}
