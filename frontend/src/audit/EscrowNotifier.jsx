import React, { useState } from "react";
export default function EscrowNotifier({ auditResult }) {
  const [sent, setSent] = useState(false);
  if (!auditResult) return null;
  return (
    <div className="mb-3">
      <button
        className="bg-blue-400 rounded px-3 py-2 font-bold"
        onClick={() => setSent(true)}
        disabled={sent}
      >
        {sent ? "Escrow Company Notified" : "Notify Escrow/Title"}
      </button>
      {sent && <div className="text-blue-700 mt-2">Escrow/title notification sent.</div>}
    </div>
  );
}