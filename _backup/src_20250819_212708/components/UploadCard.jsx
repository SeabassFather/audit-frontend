import React, { useState } from "react";
import { apiUpload } from "../utils/api";

export default function UploadCard({ title, to="/api/upload/ag", accept=".pdf,.png,.jpg,.jpeg,.doc,.docx", extraFields={} }){
  const [files,setFiles] = useState([]);
  const [busy,setBusy]   = useState(false);
  const [msg,setMsg]     = useState("");

  const choose = (e)=> setFiles(Array.from(e.target.files||[]));

  const send = async ()=>{
    if (!files.length) return;
    setBusy(true); setMsg("");
    try{
      const fd = new FormData();
      files.forEach(f=>fd.append("files", f));
      for (const [k,v] of Object.entries(extraFields||{})) fd.append(k, v);
      await apiUpload(to, fd);
      setMsg("Uploaded ");
      setFiles([]);
    }catch(err){ setMsg(String(err)); }
    finally{ setBusy(false); }
  };

  return (
    <div className="card upload-card">
      <div className="upload-title">{title}</div>
      <input type="file" multiple accept={accept} onChange={choose}/>
      <button className="btn btn-accent" disabled={busy||files.length===0} onClick={send}>
        {busy ? "Uploading..." : "Upload"}
      </button>
      {msg && <div className="small" style={{marginTop:6}}>{msg}</div>}
    </div>
  );
}