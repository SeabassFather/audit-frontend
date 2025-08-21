import React, { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { ALL_SERVICES } from "../data/serviceData";

export default function ServiceDetail(){
  const { id } = useParams();
  const svc = useMemo(()=> ALL_SERVICES.find(s => s.id === id), [id]);

  useEffect(()=>{ document.title = svc ? `${svc.name} • AuditDNA` : "Service • AuditDNA"; }, [svc]);

  if(!svc) return <div className="p-4">Service not found.</div>;

  return (
    <div className="p-4">
      <h2 className="h2">{svc.name}</h2>
      <div className="subtext" style={{marginBottom:12}}>{svc.category}</div>
      <div className="card">
        <div className="card-title">Overview</div>
        <div>{svc.desc || "Module description."}</div>
      </div>
      <div className="card" style={{marginTop:12}}>
        <div className="card-title">Next Steps</div>
        <ol>
          <li>Open intake form</li>
          <li>Upload documents</li>
          <li>Generate audit package</li>
        </ol>
        <div style={{marginTop:10}}>
          <button className="btn">Start Intake</button>
          <button className="btn" style={{marginLeft:8}}>Add to Queue</button>
        </div>
      </div>
    </div>
  );
}