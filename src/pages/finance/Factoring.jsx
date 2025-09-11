export default function Factoring(){
  return (
    <div className="space-y-4">
      <div className="card">
        <div className="text-lg font-semibold">Factoring & Trade Finance</div>
        <p className="text-gray-700 mt-2">Submit invoices/BLs, shipment details, buyer credit info. We compute advances and risk bands.</p>
        <div className="grid md:grid-cols-3 gap-3 mt-3">
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Seller / Grower"/>
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Buyer / Offtaker"/>
          <input className="border border-silver-300 rounded-xl2 px-3 py-2" placeholder="Invoice Amount (USD)"/>
          <button className="btn">Attach Invoice</button>
          <button className="btn">Attach B/L</button>
          <button className="btn btn-primary">Calculate Advance</button>
        </div>
      </div>
    </div>
  );
}