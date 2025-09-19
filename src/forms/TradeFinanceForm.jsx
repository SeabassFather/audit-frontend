import FileUpload from "../components/FileUpload";

export default function TradeFinanceForm({values,setValue,onSubmit,loading}){
  return (
    <div className="card p-4 space-y-3">
      <div className="grid md:grid-cols-2 gap-3">
        <div>
          <div className="font-semibold mb-1">Business</div>
          <input className="border rounded p-2 w-full mb-2" placeholder="Legal name" value={values.legalName} onChange={e=>setValue("legalName",e.target.value)}/>
          <input className="border rounded p-2 w-full mb-2" placeholder="DUNS" value={values.duns} onChange={e=>setValue("duns",e.target.value)}/>
          <input className="border rounded p-2 w-full" placeholder="Annual revenue" value={values.revenue} onChange={e=>setValue("revenue",e.target.value)}/>
          <input className="border rounded p-2 w-full mt-2" placeholder="AR aging summary" value={values.arAging} onChange={e=>setValue("arAging",e.target.value)}/>
        </div>
        <div>
          <div className="font-semibold mb-1">Facility & Invoice/PO</div>
          <div className="grid grid-cols-2 gap-2">
            <select className="border rounded p-2" value={values.facility} onChange={e=>setValue("facility",e.target.value)}>
              <option>Factoring</option><option>PO Financing</option><option>Both</option>
            </select>
            <input className="border rounded p-2" placeholder="Amount" value={values.amount} onChange={e=>setValue("amount",e.target.value)}/>
            <select className="border rounded p-2" value={values.currency} onChange={e=>setValue("currency",e.target.value)}>
              <option>USD</option><option>MXN</option><option>CAD</option>
            </select>
            <input className="border rounded p-2" placeholder="Debtor / Buyer" value={values.debtor} onChange={e=>setValue("debtor",e.target.value)}/>
            <select className="border rounded p-2" value={values.terms} onChange={e=>setValue("terms",e.target.value)}>
              <option>Net 30</option><option>Net 45</option><option>Net 60</option><option>Net 90</option>
            </select>
            <input className="border rounded p-2" placeholder="Collateral" value={values.collateral} onChange={e=>setValue("collateral",e.target.value)}/>
            <select className="border rounded p-2 col-span-2" value={values.commitment} onChange={e=>setValue("commitment",e.target.value)}>
              <option>30 days</option><option>60 days</option><option>90 days</option><option>120 days</option><option>Seasonal</option>
            </select>
          </div>
          <div className="mt-2">
            <FileUpload label="Uploads (PO, Invoice, MSA, insurance, certs)" multiple accept=".pdf,.png,.jpg" onFiles={()=>{}} />
          </div>
        </div>
      </div>
      <button onClick={onSubmit} disabled={loading}
        className={"w-full mt-2 px-3 py-2 rounded text-white "+(loading?"bg-slate-400":"bg-dnaBlue")}>
        {loading?"Matching…":"Find Trade Finance"}
      </button>
    </div>
  );
}