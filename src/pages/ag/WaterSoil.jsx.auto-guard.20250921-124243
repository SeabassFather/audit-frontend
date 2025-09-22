import React, { useState } from "react";

export default function WaterSoil(){
  const [file,setFile] = useState(null);
  const [msg,setMsg] = useState("");

  function upload(e){
    e.preventDefault();
    if(!file){ setMsg("No file selected"); return; }
    setMsg(`Uploaded: ${file.name}`);
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Water & Soil Report Upload</h2>
      <form onSubmit={upload}>
        <input type="file" onChange={e=>setFile(e.target.files[0])}/>
        <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded ml-2">Upload</button>
      </form>
      {msg && <p className="mt-2 text-sm text-gray-700">{msg}</p>}
    </div>
  );
}