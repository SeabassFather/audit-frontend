export default function Reports(){
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="text-lg font-semibold">Reports</div>
        <p className="text-gray-700 mt-2">Generate stakeholder-friendly bundles: investor decks, audit summaries, compliance kits.</p>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <button className="btn">Investor Deck</button>
          <button className="btn">Compliance Kit (Zip)</button>
          <button className="btn btn-primary">Full AuditDNA Bundle</button>
        </div>
      </div>
    </div>
  );
}