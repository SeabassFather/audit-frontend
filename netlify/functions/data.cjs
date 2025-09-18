"use strict";
const fs = require("fs"); const path = require("path");
const ROOT = process.cwd(); const STORE = path.join(ROOT,".localdata");
const F = (n)=>path.join(STORE, n+".json");
const files = { commodities:F("commodities"), loans:F("loans"), rules:F("rules"), factoring:F("factoring"), services:F("services") };
const ok=(o)=>({statusCode:200,headers:{"content-type":"application/json"},body:JSON.stringify(o)});
const err=(c,m)=>({statusCode:c,headers:{"content-type":"application/json"},body:JSON.stringify({error:String(m)})});
const rj=(f,def)=>{ try{ return JSON.parse(fs.readFileSync(f,"utf8")); }catch{ return def; } };
const wj=(f,o)=>{ fs.mkdirSync(path.dirname(f),{recursive:true}); fs.writeFileSync(f,JSON.stringify(o,null,2)); };
const h=s=>{let x=0; for(let i=0;i<s.length;i++){x=((x<<5)-x)+s.charCodeAt(i); x|=0} return Math.abs(x) };
const noise=(w,s)=> (h(s+":"+w)%7)-3, rnd=n=>Math.round(n*100)/100;
function series(name,weeks){ const base=40+(h(name)%25), amp=5+(h(name+"amp")%12), avg=base-2; const out=[];
  for(let w=1;w<=weeks;w++){ out.push({week:"W"+w, price:rnd(base+Math.sin(w/4)*amp+noise(w,name)), avg5:rnd(avg+Math.sin((w+1)/4)*(amp*0.6))}); } return out; }

exports.handler = async (event)=>{
  try{
    const qs = event.queryStringParameters||{}; const t=(qs.type||"").toLowerCase(); const m=(event.httpMethod||"GET").toUpperCase();
    if (t==="ping") return ok({ok:true});

    if (t==="commodities"){
      if (m==="GET"){
        if ((qs.source||"") === "algo"){
          const names=(qs.commodities||"").split(",").map(s=>s.trim()).filter(Boolean);
          const weeks=Math.max(1,Math.min(104,parseInt(qs.weeks||"26",10))); const map={};
          names.forEach(n=> map[n]=series(n,weeks)); return ok(map);
        }
        return ok(rj(files.commodities,{}));
      }
      if (m==="PATCH"){
        const body=JSON.parse(event.body||"{}");
        if (body.op==="put-map" && body.map){ wj(files.commodities, body.map); return ok({ok:true}); }
        return err(400,"bad patch");
      }
      if (m==="PUT"){ wj(files.commodities, JSON.parse(event.body||"{}")); return ok({ok:true}); }
    }

    const table = ({loans:files.loans, rules:files.rules, factoring:files.factoring, services:files.services})[t];
    if (table){
      if (m==="GET")  return ok(rj(table,[]));
      if (m==="PUT")  { wj(table, JSON.parse(event.body||"[]")); return ok({ok:true}); }
      if (m==="PATCH"){
        let arr=rj(table,[]); const p=JSON.parse(event.body||"{}");
        if (p.op==="upsert" && p.item){ const i=arr.findIndex(x=>x.id===p.item.id); if(i>=0)arr[i]=p.item; else arr.push(p.item); }
        else if (p.op==="delete" && p.id){ arr=arr.filter(x=>x.id!==p.id); }
        else return err(400,"bad patch");
        wj(table,arr); return ok({ok:true,count:arr.length});
      }
    }

    return err(404,"unknown type");
  }catch(e){ return err(500,e.message||String(e)); }
};