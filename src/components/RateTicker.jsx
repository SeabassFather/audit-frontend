import React from "react";
import Card from "../ui/Card";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { endpoints, apiGet } from "../utils/api";

export default function RateTicker(){
  const [data,setData]   = React.useState(null);
  const [err,setErr]     = React.useState(null);
  const [load,setLoad]   = React.useState(true);

  React.useEffect(()=>{
    let alive=true;
    async function go(){
      setLoad(true); setErr(null);
      try{
        const url = endpoints.tickersRate();
        const json = await apiGet(url);
        if (!alive) return;
        setData(Array.isArray(json) ? json : []);
      }catch(e){ if (alive) setErr(e?.message || "Failed"); }
      finally{ if (alive) setLoad(false); }
    }
    go();
    const id = setInterval(go, 30_000); // refresh every 30s
    return ()=>{ alive=false; clearInterval(id); };
  },[]);

  return (
    <Card title="Interest Rates">
      {load && <Spinner />}
      {err && <Alert>{err}</Alert>}
      {!load && !err && (
        data && data.length ? (
          <ul className="ticker-list">
            {data.map((r,idx)=>(
              <li key={idx}>
                <span>{r.label || r.name || `Rate ${idx+1}`}</span>
                <span className="badge">{(r.rate ?? r.value ?? "").toString()}</span>
              </li>
            ))}
          </ul>
        ) : <div className="small-muted">No rates available.</div>
      )}
    </Card>
  );
}