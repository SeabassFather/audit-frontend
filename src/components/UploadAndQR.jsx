import { useRef, useState } from "react";
import QRCode from "qrcode";

export default function UploadAndQR({ title="Upload", accept=".pdf,.csv,.xlsx" }){
 const [file,setFile] = useState(null);
 const [qr,setQr] = useState("");
 const inputRef = useRef(null);

 async function makeQr(){
 const payload = {
 name: file?.name || "no-file",
 size: file?.size || 0,
 ts: Date.now(),
 module: "ag-lab-upload"
 };
 const text = JSON.stringify(payload);
 const dataUrl = await QRCode.toDataURL(text, { width: 240, margin: 1 });
 setQr(dataUrl);
 }

 return (
 <div className="card p-4 space-y-3">
 <div className="font-semibold">{title}</div>
 <input
 ref={inputRef}
 type="file"
 accept={accept}
 onChange={e=>setFile(e.target.files?.[0]||null)}
 className="border rounded p-2 w-full"
 />
 {file && (
 <div className="text-xs text-slate-600">
 Selected: <span className="font-medium">{file.name}</span> ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· {(file.size/1024).toFixed(1)} KB
 </div>
 )}
 <div className="flex gap-2">
 <button
 onClick={()=>inputRef.current?.click()}
 className="border px-3 py-2 rounded"
 >Choose file</button>
 <button
 disabled={!file}
 onClick={makeQr}
 className={"px-3 py-2 rounded text-white " + (!file ? "bg-slate-400 cursor-not-allowed" : "bg-dnaBlue")}
 >Generate QR</button>
 </div>
 {qr && (
 <div className="mt-2">
 <img src={qr} alt="QR code" className="border rounded" />
 <div className="text-xs text-slate-500 mt-1">Scan to share minimal upload metadata.</div>
 </div>
 )}
 </div>
 );
}
