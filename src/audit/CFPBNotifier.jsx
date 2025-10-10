import React, { useState } from "react";
export default function CFPBNotifier({ auditResult }) {
  const [sent, setSent] = useState(false);
  if (!auditResult) return null;
  return (
    <div className="mb-3">
      <button
        className="bg-yellow-400 rounded px-3 py-2 font-bold"
        onClick={() => setSent(true)}
        disabled={sent}
      >
        {sent ? "CFPB Notified" : "Notify CFPB"}
      </button>
      {sent && <div className="text-green-700 mt-2">CFPB notification sent.</div>}
    </div>
  );
}