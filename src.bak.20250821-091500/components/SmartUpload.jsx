import React, { useState } from "react";
import { apiUpload } from "../utils/api";

export default function SmartUpload({
  title="Upload",
  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg",
  to="/api/upload",
  extraFields={}
}){
  const [files,setFiles] = useState([]);
  const [busy,setBusy] = useState(false);
  const [msg,setMsg] = useState("");
  const [ok,setOk] = useState(false);

  const pick = (e)=> setFiles(Array.from(e.target.files||[]));
  const send = async ()=>{
    if (!files.length) return;
    setBusy(true); setMsg(""); setOk(false);
    try{
      const fd = new FormData();
      files.forEach(f=>fd.append("files", f));
      Object.entries(extraFields||{}).forEach(([k,v])=> fd.append(k, v ?? ""));
      await apiUpload(to, fd);
      setOk(true);
      setMsg("Uploaded ");
      setFiles([]);
    }catch(err){
      setMsg(String(err));
    }finally{ setBusy(false); }
  };

  return (
    <div style={{
      padding:"14px", border:"1px dashed #cbd5e1", borderRadius:10,
      background:"#f8fafc"
    }}>
      <div style={{fontWeight:700, marginBottom:8}}>{title}</div>
      <input type="file" accept={accept} multiple={false} onChange={pick}/>
      <div style={{display:"flex", gap:8, marginTop:8}}>
        <button
          onClick={send}
          disabled={busy || files.length===0}
          style={{
            padding:"8px 12px", borderRadius:8, border:"1px solid #cbd5e1",
            background: busy ? "#e5e7eb" : "#eef2ff", cursor: busy ? "not-allowed" : "pointer",
            fontWeight:600
          }}
        >{busy ? "Uploading" : "Upload"}</button>
        {files.length>0 && <span style={{fontSize:12, color:"#475569"}}>{files[0].name}</span>}
      </div>
      {msg && <div style={{marginTop:6, fontSize:12, color: ok ? "#15803d" : "#b91c1c"}}>{msg}</div>}
    </div>
  );
}