import React from "react";
import { feeSchedule } from "../data/feeSchedule";
export default function FeeScheduleTable() {
  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-2">AuditDNA Standard Fee Schedule</h2>
      <table className="min-w-full bg-white rounded">
        <thead>
          <tr>
            <th>Service Category</th>
            <th>Avg. Recovery</th>
            <th>Base Fee</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {feeSchedule.map((row, idx) => (
            <tr key={idx}>
              <td>{row.category}</td>
              <td>{row.avgRecovery}</td>
              <td>{row.baseFee}</td>
              <td>{row.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs mt-2 text-gray-500">
        *Recovery is subject to creditor cooperation and regulatory support. Fees may vary by region and case.
      </p>
    </div>
  );
}
