import React from "react";
export default function AuditStatusCard({ auditResult, docsComplete }) {
  if (!docsComplete) return <div className="bg-yellow-50 p-3 rounded mb-3">Awaiting all required documents...</div>;
  if (!auditResult) return <div className="bg-gray-100 p-3 rounded mb-3">Ready to submit audit for review.</div>;
  return <div className="bg-green-50 p-3 rounded mb-3">Audit submitted! Status: {auditResult.status || "Pending"}</div>;
}