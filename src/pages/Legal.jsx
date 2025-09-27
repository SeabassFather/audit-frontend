import React, { useEffect, useState } from "react";
export default function Legal() {
  const [items, setItems] = useState([]);
  useEffect(()=>{
    (async ()=>{
      try{
        const base =
          (typeof process !== "undefined" && process.env && process.env.REACT_APP_API_BASE) ||
          "http://localhost:3002";
        const url = (base.endsWith("/api")?base:base+"/api") + "/legals?visibility=public&published=true";
        const res = await fetch(url);
        setItems(await res.json());
      }catch(e){ console.error(e); }
    })();
  },[]);
  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Legal & Disclosures</h1>
      {items.length===0 && <div className="opacity-60 text-sm">No published items yet.</div>}
      <div className="space-y-6">
        {items.map(i => (
          <section key={i._id} className="border rounded-2xl p-4">
            <h3 className="font-semibold">{i.title}</h3>
            <div className="text-xs opacity-60">{i.category} {i.published ? "(published)" : ""}</div>
            <pre className="whitespace-pre-wrap text-sm mt-2">{i.body}</pre>
          </section>
        ))}
      </div>
    </div>
  );
}
