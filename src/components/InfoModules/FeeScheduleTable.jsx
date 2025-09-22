import React from "react";
import { feeSchedule } from "../../data/feeSchedule";

export default function FeeScheduleTable() {
  return (
    <div className="card">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AuditDNA Fee Schedule</h2>
        <p className="text-gray-600">Transparent pricing for our comprehensive audit services</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Service Category</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Avg. Recovery</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Base Fee</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {feeSchedule.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 font-medium text-gray-900">{row.category}</td>
                <td className="py-4 px-4 text-green-600 font-semibold">{row.avgRecovery}</td>
                <td className="py-4 px-4 text-gray-700">{row.baseFee}</td>
                <td className="py-4 px-4 text-gray-600 text-sm">{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
        <p className="text-sm text-amber-800">
          <strong>Important:</strong> Recovery amounts are subject to creditor cooperation and regulatory support. 
          Fees may vary by region and case complexity. No upfront payment required for most services.
        </p>
      </div>
    </div>
  );
}
