const { GITHUB_TOKEN, GH_REPO, GH_BRANCH="main" } = process.env;

// ---- helpers ----
function headers(extra={}){ return {"content-type":"application/json","Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"GET,POST,PATCH,DELETE,OPTIONS","Access-Control-Allow-Headers":"Content-Type",...extra};}
function res(code,body){ return {statusCode:code,headers:headers(),body:JSON.stringify(body)}}
function b64(s){ return Buffer.from(s,"utf8").toString("base64") }
async function ghGet(path){ const [o,r]=GH_REPO.split("/"); const url=`https://api.github.com/repos/${o}/${r}/contents/${path}?ref=${GH_BRANCH}`;
  const rr=await fetch(url,{headers:{Authorization:`Bearer ${GITHUB_TOKEN}`,"User-Agent":"auditdna"}}); if(rr.status===404) return null; if(!rr.ok) throw new Error(await rr.text());
  const j=await rr.json(); return {sha:j.sha,text:Buffer.from(j.content,"base64").toString("utf8")}
}
async function ghPut(path,content,msg){ const [o,r]=GH_REPO.split("/"); let sha=null; try{const g=await ghGet(path); if(g) sha=g.sha;}catch(e){}
  const url=`https://api.github.com/repos/${o}/${r}/contents/${path}`;
  const rr=await fetch(url,{method:"PUT",headers:{Authorization:`Bearer ${GITHUB_TOKEN}`,"User-Agent":"auditdna","content-type":"application/json"},
    body:JSON.stringify({message:msg,content:b64(content),branch:GH_BRANCH,sha:sha||undefined})});
  if(!rr.ok) throw new Error(await rr.text()); return true;
}
function csvParse(t){ const rows=t.trim().split(/\r?\n/).map(l=>{let a=[],c="",q=false;for(let i=0;i<l.length;i++){const ch=l[i];if(ch==='"'){if(q&&l[i+1]==='"'){c+='"';i++;}else q=!q}else if(ch===','&&!q){a.push(c);c=""}else c+=ch}a.push(c);return a}); const head=rows.shift().map(h=>h.trim());
  return rows.filter(r=>r.length && r.some(x=>x!=="")).map(r=>Object.fromEntries(head.map((h,i)=>[h,(r[i]??"").trim()])));
}
function num(v){ if(v==null||v==="") return 0; const s=String(v).toLowerCase().replace(/[\$,_%\s]/g,""); if(s.endsWith("k")) return Number(s.slice(0,-1))*1e3; if(s.endsWith("m")) return Number(s.slice(0,-1))*1e6; return Number(s) }
function csvToDomain(type,rows){
  if(type==="commodities"){ const map={}; rows.forEach(r=>{ const n=(r.commodity||r.name||"").trim(); const w=Number(r.week); const price=num(r.price); const avg5=(r.avg5!==undefined)?num(r.avg5):null;
    if(!n||!(w>=1&&w<=26)||Number.isNaN(price)) return; (map[n] ||= []).push({week:w,price, ...(avg5!=null?{avg5}:{})}); }); for(const k in map) map[k].sort((a,b)=>a.week-b.week); return map }
  if(type==="loans"){ return rows.map(r=>({id:r.id,borrower:r.borrower,product:r.product,lender:r.lender,state:r.state,purpose:r.purpose,ltv:num(r.ltv)||0,fico:num(r.fico)||0,dti:num(r.dti)||0,stage:r.stage,status:r.status,close:r.close,amt:num(r.amt)||0})).filter(x=>x.id&&x.borrower)}
  if(type==="issues"){ return rows.map(r=>({id:r.id,title:r.title,severity:r.severity,owner:r.owner,due:r.due,status:r.status})).filter(x=>x.id&&x.title) }
  if(type==="services"){ return rows.map(r=>({id:r.id,title:r.title,domain:r.domain,description:r.description,tags:(r.tags||"").split(/[;,]/).map(s=>s.trim()).filter(Boolean),status:r.status||"Active",slug:r.slug||String(r.title||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")})).filter(x=>x.id&&x.title)}
  if(type==="factoring"){ return rows.map(r=>({id:r.id,debtor:r.debtor,lender:r.lender,state:r.state,industry:r.industry,amount:num(r.amount)||0,advance:num(r.advance)||0,fee:num(r.fee)||0,term:r.term,recourse:/^(y|true)/i.test(String(r.recourse||"")),aging:num(r.aging)||0,risk:num(r.risk)||0,status:r.status})).filter(x=>x.id&&x.debtor) }
  if(type==="rules"){ return rows.map(r=>({id:r.id,name:r.name,lender:r.lender,min_fico:num(r.min_fico)||0,max_ltv:num(r.max_ltv)||100,max_dti:num(r.max_dti)||100,min_amt:num(r.min_amt)||0,max_amt:num(r.max_amt)||9e15,
    states:(r.states||"").split(/[,\s;|]+/).filter(Boolean),products:(r.products||"").split(/[,\s;|]+/).filter(Boolean),purposes:(r.purposes||"").split(/[,\s;|]+/).filter(Boolean),occupancy:(r.occupancy||"").split(/[,\s;|]+/).filter(Boolean),notes:r.notes||""})).filter(x=>x.id&&x.name)}
  return rows;
}
// ---- USDA algo you supplied ----
function hash(s){ let h=0; for(let i=0;i<s.length;i++){ h=((h<<5)-h)+s.charCodeAt(i); h|=0 } return h }
function noise(w,seed){ return ((hash(seed+":"+w)%7)-3) }
function round(n){ return Math.round(n*100)/100 }
function genSeries(name,weeks=26){ const base=20+(Math.abs(hash(name))%30); const amp=5+(Math.abs(hash(name+"amp"))%12); const avg=base-2;
  return Array.from({length:weeks},(_,i)=>{const w=i+1; return {week:w,price:round(base+Math.sin(w/4)*amp+noise(w,name)),avg5:round(avg+Math.sin((w+1)/4)*(amp*0.6))}}) }

exports.handler=async(event)=>{
  try{
    if(event.httpMethod==="OPTIONS") return {statusCode:204,headers:headers()};
    if(!GITHUB_TOKEN||!GH_REPO) return res(500,{error:"Missing env GITHUB_TOKEN or GH_REPO"});
    const qs=event.queryStringParameters||{}; const type=(qs.type||"").toLowerCase();
    if(!["loans","issues","commodities","services","factoring","rules","dsar"].includes(type)) return res(400,{error:"bad type"});

    // DSAR minimal
    if(type==="dsar"){
      if(event.httpMethod==="POST"){ const body=JSON.parse(event.body||"{}"); const id=`dsar-${Date.now()}`;
        await ghPut(`data/dsar/${id}.json`, JSON.stringify(body,null,2), `DSAR ${id}`);
        const idx=await ghGet("data/dsar/index.json"); const arr=idx?JSON.parse(idx.text):[]; arr.push({id,name:body.name||"",created:Date.now()});
        await ghPut("data/dsar/index.json", JSON.stringify(arr,null,2), `DSAR index`); return res(200,{ok:true,id}); }
      if(event.httpMethod==="GET"){ const idx=await ghGet("data/dsar/index.json"); return res(200, idx?JSON.parse(idx.text):[]); }
      return res(405,{error:"method"});
    }

    // USDA algo direct
    if(type==="commodities" && String(qs.source||"").toLowerCase().startsWith("algo")){
      const list=(qs.commodities||"Avocado,Papaya,Orange,Lemon,Tomato,Onion,Corn,Carrot,Apple,Potato").split(",").map(s=>s.trim()).filter(Boolean).slice(0,50);
      const weeks=Math.max(1,Math.min(52,parseInt(qs.weeks||"26",10)));
      const map={}; for(const n of list) map[n]=genSeries(n,weeks); return res(200,map);
    }

    const pathMap={loans:"data/loans.json",issues:"data/issues.json",commodities:"data/commodities.json",services:"data/services.json",factoring:"data/factoring.json",rules:"data/rules.json"};
    const path=pathMap[type];

    if(event.httpMethod==="GET"){ const got=await ghGet(path); return res(200, got?JSON.parse(got.text):(type==="commodities"?{}:[])); }

    const ct=(event.headers["content-type"]||event.headers["Content-Type"]||"").toLowerCase();
    if(event.httpMethod==="POST" && ct.includes("text/csv")){
      const rows=csvParse(event.body||""); const payload=csvToDomain(type,rows); await ghPut(path, JSON.stringify(payload,null,2), `CSV ${type}`); return res(200,{ok:true});
    }
    if(event.httpMethod==="PATCH"){
      const body=event.body?JSON.parse(event.body):{}; const op=body.op||""; const got=await ghGet(path); let cur=got?JSON.parse(got.text):(type==="commodities"?{}:[]);
      if(type==="commodities"){ if(op==="put-map"){ cur=body.map||{} } }
      else{
        if(op==="upsert"){ const item=body.item||{}; if(!Array.isArray(cur)) cur=[]; const i=cur.findIndex(x=>String(x.id)===String(item.id)); if(i>=0) cur[i]=item; else cur.push(item); }
        if(op==="delete"){ const id=String(body.id||""); if(Array.isArray(cur)) cur=cur.filter(x=>String(x.id)!==id); }
      }
      await ghPut(path, JSON.stringify(cur,null,2), `Patch ${type} ${op}`); return res(200,{ok:true});
    }
    if(event.httpMethod==="POST"||event.httpMethod==="PUT"){ const body=event.body?JSON.parse(event.body):{}; await ghPut(path, JSON.stringify(body,null,2), `Replace ${type}`); return res(200,{ok:true}) }

    return res(405,{error:"method"});
  }catch(e){ return res(500,{error:String(e.message||e)})}
}