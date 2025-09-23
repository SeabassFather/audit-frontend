import React from "react";
import Card from "../ui/Card";
import Spinner from "../ui/Spinner";
import Alert from "../ui/Alert";
import { endpoints, apiGet } from "../utils/api";

export default function StockTicker(){
  const [data,setData] = React.useState(null);
  const [err,setErr]   = React.useState(null);
  const [load,setLoad] = React.useState(true);

  React.useEffect(()=>{
    let alive=true;
    async function go(){
      setLoad(true); setErr(null);
      try{
        const url = endpoints.tickersStock();
        const json = await apiGet(url);
        if (!alive) return;
        setData(Array.isArray(json) ? json : []);
      }catch(e){ if (alive) setErr(e?.message || "Failed"); }
      finally{ if (alive) setLoad(false); }
    }
    go();
    const id = setInterval(go, 30_000);
    return ()=>{ alive=false; clearInterval(id); };
  },[]);

  return (
    <Card title="Stocks">
      {load && <Spinner />}
      {err && <Alert>{err}</Alert>}
      {!load && !err && (
        data && data.length ? (
          <ul className="ticker-list">
            {data.map((s,idx)=>(
              <li key={idx}>
                <span>{s.symbol || s.name || `Symbol ${idx+1}`}</span>
                <span className="badge">{(s.price ?? s.last ?? "").toString()}</span>
              </li>
            ))}
          </ul>
        ) : <div className="small-muted">No stocks available.</div>
      )}
    </Card>
  );
}