import React,{useState} from "react";
export default function Compliance(){
  const [files,setFiles]=useState([]);
  const onPick=e=>setFiles(Array.from(e.target.files||[]));
  return(
    <div className="card">
      <h2>Compliance Workspace</h2>
      <input type="file" multiple onChange={onPick}/>
      <ul className="files">
        {files.map((f,i)=><li key={i}>{f.name} — {(f.size/1024).toFixed(1)} KB</li>)}
      </ul>
      {/* rules/ocr hooks go here */}
    </div>
  );
}