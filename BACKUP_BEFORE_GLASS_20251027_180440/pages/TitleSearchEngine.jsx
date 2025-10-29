import React, { useState } from "react";
import { openEscrowAccount } from "../api/escrow";

export default function EscrowFeatureCard({ property, onEscrowOpened }) {
  const [loading, setLoading] = useState(false);
  const [escrowId, setEscrowId] = useState(null);

  const handleOpenEscrow = async () => {
    setLoading(true);
    const result = await openEscrowAccount(property);
    setEscrowId(result.escrowId);
    setLoading(false);
    onEscrowOpened(result);
  };

  return (
    <div className="bg-blue-50 rounded-lg shadow-md p-6 my-8">
      <h2 className="text-xl font-bold text-blue-800 mb-2">Open Escrow with First American Title</h2>
      <p className="text-gray-700 mb-4">
        Ready to proceed? Start the Title & Escrow process with First American Title.
      </p>
      <button
        onClick={handleOpenEscrow}
        className="bg-blue-700 text-white px-6 py-2 rounded-lg font-bold shadow hover:bg-blue-800 transition"
        disabled={!property || loading}
      >
        {loading ? "Opening Escrow..." : "Start Escrow"}
      </button>
      {escrowId && (
        <div className="mt-4 text-green-700 font-semibold">
          Escrow Account Opened! ID: {escrowId}
        </div>
      )}
    </div>
  );
}