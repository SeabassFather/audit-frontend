import { useState } from "react";

export default function UploadWidget() {
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState({
    property: "",
    region: "",
    lab: "",
    testDate: "",
    certification: ""
  });

  async function handleUpload() {
    const formData = new FormData();
    formData.append("file", file);
    Object.entries(meta).forEach(([k,v]) => formData.append(k, v));

    const res = await fetch("/api/uploads/water", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    alert("✅ Upload complete for " + data.record.property);
  }

  return (
    <div className="p-4 border rounded mb-6">
      <h2 className="font-bold mb-2">Upload Water/Soil Report</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} className="mb-2"/>
      <input placeholder="Property" onChange={e=>setMeta({...meta,property:e.target.value})}/>
      <input placeholder="Region" onChange={e=>setMeta({...meta,region:e.target.value})}/>
      <input placeholder="Lab Name" onChange={e=>setMeta({...meta,lab:e.target.value})}/>
      <input type="date" onChange={e=>setMeta({...meta,testDate:e.target.value})}/>
      <input placeholder="Certification Type" onChange={e=>setMeta({...meta,certification:e.target.value})}/>
      <button className="bg-green-600 text-white px-3 py-2 rounded mt-2" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}