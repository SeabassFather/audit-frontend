import React from "react";
import { feeSchedule } from "../data/feeSchedule";

export default function Services() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-100/40 to-blue-100/40 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Fee Schedule & Services</h1>
        <p className="text-gray-600">
          Transparent pricing for our most requested audits and services. If you have a custom engagement, contact us for a tailored quote!
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg border border-gray-200 shadow-sm text-sm">
          <thead>
            <tr className="bg-blue-50 text-blue-900">
              <th className="px-4 py-3 text-left">Service Category</th>
              <th className="px-4 py-3 text-left">Avg. Recovery</th>
              <th className="px-4 py-3 text-left">Base Fee</th>
              <th className="px-4 py-3 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {feeSchedule.map((item, idx) => (
              <tr key={idx} className="even:bg-blue-50/10">
                <td className="px-4 py-2 font-medium">{item.category}</td>
                <td className="px-4 py-2">{item.avgRecovery}</td>
                <td className="px-4 py-2">{item.baseFee}</td>
                <td className="px-4 py-2">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8">
        <p className="text-blue-800 text-sm">
          For volume discounts, enterprise solutions, or custom audit projects, please <a href="/admin" className="underline font-medium">contact our team</a>.
        </p>
      </div>
    </div>
  );
}