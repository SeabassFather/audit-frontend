import FileUpload from "../components/FileUpload";
import { CertBadge } from "../components/RiskCertBadges";

export default function AgSearchForm({values,setValue,onSubmit,loading}){
 return (
 <div className="card p-4 space-y-3">
 <div className="grid md:grid-cols-2 gap-3">
 <div>
 <div className="font-semibold mb-1">Company & KYB</div>
 <input className="border rounded p-2 w-full mb-2" placeholder="Legal name" value={values.legalName} onChange={e=>setValue("legalName",e.target.value)}/>
 <input className="border rounded p-2 w-full mb-2" placeholder="DUNS" value={values.duns} onChange={e=>setValue("duns",e.target.value)}/>
 <input className="border rounded p-2 w-full" placeholder="Locations" value={values.locations} onChange={e=>setValue("locations",e.target.value)}/>
 <label className="text-xs block mt-1"><input type="checkbox" checked={values.laWarehouse} onChange={e=>setValue("laWarehouse",e.target.checked)}/> Use LA warehouse partner</label>
 </div>
 <div>
 <div className="font-semibold mb-1">Products</div>
 <div className="grid grid-cols-2 gap-2">
 <input className="border rounded p-2" placeholder="Crop" value={values.crop} onChange={e=>setValue("crop",e.target.value)}/>
 <input className="border rounded p-2" placeholder="Variety" value={values.variety} onChange={e=>setValue("variety",e.target.value)}/>
 <input className="border rounded p-2" placeholder="Grade/Spec" value={values.grade} onChange={e=>setValue("grade",e.target.value)}/>
 <input className="border rounded p-2" placeholder="Pack/Size" value={values.pack} onChange={e=>setValue("pack",e.target.value)}/>
 <input className="border rounded p-2" placeholder="Volume / week" value={values.volume} onChange={e=>setValue("volume",e.target.value)}/>
 <input className="border rounded p-2" placeholder="Target price" value={values.price} onChange={e=>setValue("price",e.target.value)}/>
 </div>
 </div>
 <div>
 <div className="font-semibold mb-1">Certifications</div>
 <div className="flex gap-2 flex-wrap mb-2">
 <CertBadge label="PrimusGFS" valid={values.primus}/>
 <CertBadge label="GlobalG.A.P." valid={values.globalgap}/>
 <CertBadge label="USDA Reg" valid={values.usdaReg}/>
 <CertBadge label="FDA FFR" valid={values.fdaFFR}/>
 </div>
 <div className="grid grid-cols-2 gap-2">
 <label className="text-xs"><input type="checkbox" checked={values.primus} onChange={e=>setValue("primus",e.target.checked)}/> PrimusGFS</label>
 <label className="text-xs"><input type="checkbox" checked={values.globalgap} onChange={e=>setValue("globalgap",e.target.checked)}/> GlobalG.A.P.</label>
 <label className="text-xs"><input type="checkbox" checked={values.usdaReg} onChange={e=>setValue("usdaReg",e.target.checked)}/> USDA facility reg</label>
 <label className="text-xs"><input type="checkbox" checked={values.fdaFFR} onChange={e=>setValue("fdaFFR",e.target.checked)}/> FDA FFR</label>
 </div>
 <div className="mt-2">
 <FileUpload label="Upload certs (PDF/IMG)" multiple accept=".pdf,.png,.jpg" onFiles={()=>{}} />
 </div>
 </div>
 <div>
 <div className="font-semibold mb-1">Buyer / Insurance (optional)</div>
 <input className="border rounded p-2 w-full mb-2" placeholder="Buyer name / PO #" />
 <FileUpload label="Insurance COI / Cargo" multiple accept=".pdf,.png,.jpg" onFiles={()=>{}} />
 </div>
 </div>
 <button onClick={onSubmit} disabled={loading}
 className={"w-full mt-2 px-3 py-2 rounded text-white "+(loading?"bg-slate-400":"bg-dnaBlue")}>
 {loading?"SearchingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦":"Find Growers"}
 </button>
 </div>
 );
}