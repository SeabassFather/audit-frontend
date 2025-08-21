import React, { useState } from "react";
import { apiUpload, apiNotify } from "../utils/api";

export default function UploadArea({ title="Upload", accept="*/*", multiple=true, to="/api/upload", extraFields={}, notifyTopic }){
  const [files,setFiles] = useState([]);
  const [busy,setBusy] = useState(false);
  const [msg,setMsg] = useState("");
  const pick = (e)=> setFiles(Array.from(e.target.files||[]));
  const send = async ()=>{
    if (!files.length) return;
    setBusy(true); setMsg("");
    try{
      const fd = new FormData();
      files.forEach(f=>fd.append("files", f));
      Object.entries(extraFields||{}).forEach(([k,v])=>fd.append(k, v));
      await apiUpload(to, fd);
      setMsg("Uploaded ✓");
      if (notifyTopic) { await apiNotify({ topic: notifyTopic, channel:["email","sms"], meta: { count: files.length, extraFields } }); }
    }catch(err){ setMsg(String(err)); }
    finally{ setBusy(false); }
  };
  return (
    <div className="page-card" style={{display:"grid",gap:8}}>
      <div style={{fontWeight:800}}>{title}</div>
      <input type="file" accept={accept} multiple={multiple} onChange={pick}/>
      <button className="btn" disabled={busy || !files.length} onClick={send}>
        {busy ? "Uploading..." : `Upload ${files.length||""}`}
      </button>
      {msg && <small className="muted">{msg}</small>}
    </div>
  );
}