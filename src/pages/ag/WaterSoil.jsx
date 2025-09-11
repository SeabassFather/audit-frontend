export default function WaterSoil(){
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="text-lg font-semibold">Water & Soil Tech Audits</div>
        <p className="text-gray-700 mt-2">Upload lab reports, water conditioning configs, and remediation plans. Generate a standardized audit summary for growers and lenders.</p>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Farm / Ranch"/>
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Region / State"/>
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Contact"/>
          <button className="btn">Upload Lab Report (PDF)</button>
          <button className="btn">Add Conditioning Specs</button>
          <button className="btn btn-primary">Generate Audit</button>
        </div>
      </div>
    </div>
  );
}