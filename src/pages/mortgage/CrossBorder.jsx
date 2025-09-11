export default function CrossBorder(){
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="text-lg font-semibold">Cross-Border Lending (U.S. buyer  Mexico)</div>
        <p className="text-gray-700 mt-2">Handle leasehold/structure-only scenarios (e.g., Estero Beach). Collect KYC/KYB, proof of funds, employment, and collateral docs. Route to internal partners.</p>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Borrower name"/>
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Citizenship / Passport"/>
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Target development (e.g., Estero Beach)"/>
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Structure type"/>
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Budget (USD)"/>
          <button className="btn btn-primary">Submit Intake</button>
        </div>
      </div>
    </div>
  );
}