import React from "react";
export default function ConsumerContactCard({ auditResult }) {
  if (!auditResult) return null;
  // TODO: Fill in with real consumer info from auditResult
  return (
    <div className="bg-white border rounded p-3 mt-3">
      <b>Consumer Info</b>
      <div>Name: [Name]</div>
      <div>Email: [Email]</div>
      <div>Phone: [Phone]</div>
    </div>
  );
}