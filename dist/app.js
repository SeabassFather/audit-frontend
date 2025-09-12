const $=(s,e=document)=>e.querySelector(s), $$=(s,e=document)=>[...e.querySelectorAll(s)];
const API=t=>`/.netlify/functions/data?type=${t}`; const state={loans:[],rules:[],issues:[],commodities:{},services:[],factoring:[]};
async function apiGet(t,qs=""){const r=await fetch(API(t)+qs); if(!r.ok) throw new Error(await r.text()); return r.json()}
async function apiCSV(t,csv){const r=await fetch(API(t),{method:"POST",headers:{"content-type":"text/csv"},body:csv}); if(!r.ok) throw new Error(await r.text()); return r.json()}
async function apiPatch(t,body){const r=await fetch(API(t),{method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(body)}); if(!r.ok) throw new Error(await r.text()); return r.json()}
function toast(m,ty="ok"){const t=$("#toasts");const el=document.createElement("div");el.className=`toast ${ty}`;el.textContent=m;t.appendChild(el);setTimeout(()=>el.remove(),2200)}
function escapeHTML(v){return (v??"").toString().replace(/[&<>\"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[m]))}
window.addEventListener("hashchange",render); window.addEventListener("DOMContentLoaded",()=>{bindPalette();render()}); function setActive(tab){$$(".nav a").forEach(a=>a.classList.toggle("active",a.dataset.route===tab))}
function render(){ const r=(location.hash||"#/").slice(2)||"exec"; setActive(r); ({"exec":viewExec,"mortgage":viewMortgage,"usda":viewUSDA,"factoring":viewFactoring,"services":viewServices,"compliance":viewCompliance,"legal":viewLegal,"admin":viewAdmin}[r]||viewExec)() }

function viewAdmin(){ $("#app").innerHTML=`<section class="card"><div class="h2">Admin: Upload CSV (to GitHub via API)</div>
<div class="row mt12"><label>Loans</label><input id="csvLoans" type="file" accept=".csv"><button class="btn" id="upLoans">Upload</button></div>
<div class="row mt12"><label>Rules</label><input id="csvRules" type="file" accept=".csv"><button class="btn" id="upRules">Upload</button></div>
<div class="row mt12"><label>Factoring</label><input id="csvFact" type="file" accept=".csv"><button class="btn" id="upFact">Upload</button></div>
<div class="row mt12"><label>Services</label><input id="csvSvc" type="file" accept=".csv"><button class="btn" id="upSvc">Upload</button></div>
<div class="row mt12"><label>Issues</label><input id="csvIssues" type="file" accept=".csv"><button class="btn" id="upIssues">Upload</button></div>
<div class="row mt12"><label>Commodities</label><input id="csvComm" type="file" accept=".csv"><button class="btn" id="upComm">Upload</button></div>
<p class="small mt8">Required headers: Loans(id,borrower,product,lender,state,purpose,ltv,fico,dti,stage,status,close,amt)  Rules(id,name,lender,min_fico,max_ltv,max_dti,min_amt,max_amt,states,products,purposes,occupancy,notes)  Factoring(id,debtor,lender,state,industry,amount,advance,fee,term,recourse,aging,risk,status)  Services(id,title,domain,description,tags,status,slug)  Issues(id,title,severity,owner,due,status)  Commodities(commodity,week,price,avg5)</p></section>`;
  const send=(inp,type)=>{const f=$(inp).files[0]; if(!f) return; f.text().then(txt=>apiCSV(type,txt)).then(()=>toast(`${type} uploaded`)).catch(e=>toast(e.message,"bad"))}
  $("#upLoans").onclick=()=>send("#csvLoans","loans"); $("#upRules").onclick=()=>send("#csvRules","rules");
  $("#upFact").onclick=()=>send("#csvFact","factoring"); $("#upSvc").onclick=()=>send("#csvSvc","services");
  $("#upIssues").onclick=()=>send("#csvIssues","issues"); $("#upComm").onclick=()=>send("#csvComm","commodities");
}

async function viewExec(){ $("#app").innerHTML=`<section class="card"><div class="h2">Executive</div><p class="small mt8">Loading</p></section>`;
  try{ const [loans,issues]=await Promise.all([apiGet("loans"),apiGet("issues")]); const group=(a,f)=>a.reduce((m,x)=>{const k=f(x);m[k]=(m[k]||0)+1;return m},{}); const byStage=group(loans,x=>x.stage||""); const sev=group(issues,x=>x.severity||"");
    $("#app").innerHTML=`<section class="card"><div class="h2">Executive</div><div class="grid grid-3 mt16"><div class="card"><canvas id="a" height="180"></canvas></div><div class="card"><canvas id="b" height="180"></canvas></div><div class="card"><canvas id="c" height="180"></canvas></div></div></section>`;
    new Chart($("#a"),{type:"bar",data:{labels:Object.keys(byStage),datasets:[{data:Object.values(byStage)}]},options:{plugins:{legend:{display:false}}}});
    const risk={"LTV>80":loans.filter(l=>+l.ltv>80).length,"FICO<660":loans.filter(l=>+l.fico && +l.fico<660).length}; new Chart($("#b"),{type:"doughnut",data:{labels:Object.keys(risk),datasets:[{data:Object.values(risk)}]},options:{plugins:{legend:{position:"bottom"}}}});
    new Chart($("#c"),{type:"bar",data:{labels:Object.keys(sev),datasets:[{data:Object.values(sev)}]},options:{plugins:{legend:{display:false}}}});
  }catch(e){ $("#app").innerHTML=`<section class="card"><div class="h2">Executive</div><p class="small mt8">Error: ${escapeHTML(e.message||e)}</p></section>` }
}

function parseMoney(s){ if(!s) return null; const t=String(s).toLowerCase().replace(/[,\s$]/g,""); if(t.endsWith("m")) return Number(t.slice(0,-1))*1e6; if(t.endsWith("k")) return Number(t.slice(0,-1))*1e3; if(t.includes("..")){const[a,b]=t.split("..");return[Number(a),Number(b)]} const n=Number(t); return isNaN(n)?null:n }
function parseRange(s){ if(!s) return null; const m=String(s).match(/^([<>]=?|)(-?\d+(\.\d+)?)(?:\.\.(-?\d+(\.\d+)?))?$/); if(!m) return null; if(m[1]||m[4]) return s; const n=Number(m[2]); return isNaN(n)?null:n }
function matchRange(v,exp){ if(exp==null) return true; if(Array.isArray(exp)) return v>=exp[0]&&v<=exp[1]; if(typeof exp==="number") return v===exp; const m=String(exp).match(/^([<>]=?|)(-?\d+(?:\.\d+)?)(?:\.\.(-?\d+(?:\.\d+)?))?$/); if(!m) return true; const op=m[1],a=Number(m[2]),b=m[3]?Number(m[3]):null; if(b!=null) return v>=a&&v<=b; if(op===">")return v>a; if(op===">=")return v>=a; if(op==="<")return v<a; if(op==="<=")return v<=a; return v===a }
function parseDSL(q){const out={};(q||"").split(/\s+/).filter(Boolean).forEach(tok=>{const[k,...rest]=tok.split(":"); if(!rest.length){out._text=(out._text||[]).concat(tok);return} out[k.toLowerCase()]=rest.join(":")}); return out}
function loanQualifies(l,rule){ if(!rule) return true; if(rule.min_fico && +l.fico < +rule.min_fico) return false; if(rule.max_ltv!=null && +l.ltv > +rule.max_ltv) return false; if(rule.max_dti!=null && +l.dti > +rule.max_dti) return false; if(rule.min_amt && +l.amt < +rule.min_amt) return false; if(rule.max_amt && +l.amt > +rule.max_amt) return false;
  const eq=(a,b)=>String(a||"").toLowerCase()===String(b||"").toLowerCase(); if(rule.lender && l.lender && !eq(rule.lender,l.lender)) return false;
  const has=(x,arr)=>!arr?.length || arr.map(s=>String(s).toLowerCase()).includes(String(x||"").toLowerCase());
  if(!has(l.state,rule.states)) return false; if(!has(l.product,rule.products)) return false; if(!has(l.purpose,rule.purposes)) return false; return true }

async function viewMortgage(){
  $("#app").innerHTML=`<section class="card"><div class="h2">Mortgage  Advanced Search</div><p class="small mt8">Loading</p></section>`;
  try{
    const [loans,rules]=await Promise.all([apiGet("loans"),apiGet("rules")]); state.loans=loans; state.rules=Array.isArray(rules)?rules:[];
    const lenders=[...new Set(loans.map(x=>x.lender).filter(Boolean))].sort(), states=[...new Set(loans.map(x=>x.state).filter(Boolean))].sort(), prods=[...new Set(loans.map(x=>x.product).filter(Boolean))].sort();
    $("#app").innerHTML=`
    <section class="card">
      <div class="row"><div class="h2">Mortgage  Search & Eligibility</div><button class="btn" id="saveRule">Save Current as Rule</button></div>
      <div class="grid grid-3 mt12">
        <div class="card">
          <div class="h2">Filters</div>
          <div class="mt12 row"><label class="small">Lender</label><select id="fLender" class="input"><option value="">Any</option>${lenders.map(x=>`<option>${x}</option>`).join("")}</select></div>
          <div class="mt12 row"><label class="small">State</label><select id="fState" class="input"><option value="">Any</option>${states.map(x=>`<option>${x}</option>`).join("")}</select></div>
          <div class="mt12 row"><label class="small">Product</label><select id="fProd" class="input"><option value="">Any</option>${prods.map(x=>`<option>${x}</option>`).join("")}</select></div>
          <div class="mt12 row"><label class="small">Purpose</label><input id="fPurpose" class="input" placeholder="Purchase|Refi|CashOut"></div>
          <div class="mt12 row"><label class="small">FICO </label><input id="minFico" class="input" placeholder="680"></div>
          <div class="mt12 row"><label class="small">LTV </label><input id="maxLtv" class="input" placeholder="80"></div>
          <div class="mt12 row"><label class="small">DTI </label><input id="maxDti" class="input" placeholder="43"></div>
          <div class="mt12 row"><label class="small">Amount</label><input id="amt" class="input" placeholder="200k..1.2m / >=250k"></div>
          <div class="mt12 row"><label class="small">Stage</label><input id="fStage" class="input" placeholder="comma list"></div>
          <div class="mt12 row"><label class="small">Status</label><input id="fStatus" class="input" placeholder="comma list"></div>
        </div>
        <div class="card">
          <div class="h2">Lender Rules</div>
          <div class="mt12 row"><select id="ruleSel" class="input"><option value="">None</option>${state.rules.map(r=>`<option value="${r.id}">${r.name}  ${r.lender||"Any"}</option>`).join("")}</select><button class="btn" id="applyRule">Apply</button></div>
          <div class="h2 mt16">Query DSL</div>
          <input id="dsl" class="input mt8" placeholder='Examples: fico>=700 ltv<=80 dti<=43 lender:"Chase" state:CA amount:200k..1m product:Conventional status:Approved'>
          <button class="btn mt8" id="apply">Apply Filters</button><button class="btn mt8" id="clear">Clear</button>
          <div class="small mt8" id="stat"></div>
        </div>
        <div class="card"><div class="h2">Export</div><button class="btn mt12" id="export">Export CSV</button></div>
      </div>
      <table class="table mt16"><thead><tr><th>Eligible</th><th>Loan #</th><th>Lender</th><th>Borrower</th><th>Product</th><th>State</th><th>Purpose</th><th>FICO</th><th>LTV</th><th>DTI</th><th>Amount</th><th>Stage</th><th>Status</th></tr></thead><tbody id="tb"></tbody></table>
    </section>`;
    const $id=x=>document.getElementById(x); let rule=null;
    function pred(){ const lender=$id("fLender").value.trim(), st=$id("fState").value.trim(), prod=$id("fProd").value.trim(), purpose=$id("fPurpose").value.trim();
      const minFico=+$id("minFico").value||0, maxLtv=$id("maxLtv").value.trim(), maxDti=$id("maxDti").value.trim();
      const amtExp=(s=>{if(!s) return null; const t=s.toLowerCase().replace(/[,\s$]/g,""); if(t.includes("..")){const[a,b]=t.split("..");return[Number(a),Number(b)]} if(t.endsWith("k")) return Number(t.slice(0,-1))*1e3; if(t.endsWith("m")) return Number(t.slice(0,-1))*1e6; const n=Number(t); return isNaN(n)?null:n})($id("amt").value.trim());
      const stages=($id("fStage").value||"").split(/[,|]/).map(s=>s.trim()).filter(Boolean), statuses=($id("fStatus").value||"").split(/[,|]/).map(s=>s.trim()).filter(Boolean);
      const dsl=(q=>{const o={};(q||"").split(/\s+/).filter(Boolean).forEach(t=>{const[k,...rest]=t.split(":"); if(!rest.length){o._text=(o._text||[]).concat(t);return} o[k.toLowerCase()]=rest.join(":")}); return o})($id("dsl").value.trim());
      return l=>{
        if(lender && String(l.lender||"").toLowerCase()!==lender.toLowerCase()) return false;
        if(st && String(l.state||"").toLowerCase()!==st.toLowerCase()) return false;
        if(prod && String(l.product||"").toLowerCase()!==prod.toLowerCase()) return false;
        if(purpose && String(l.purpose||"").toLowerCase()!==purpose.toLowerCase()) return false;
        if(minFico && +l.fico<minFico) return false;
        if(maxLtv && !matchRange(+l.ltv, maxLtv)) return false;
        if(maxDti && !matchRange(+l.dti, maxDti)) return false;
        if(amtExp!=null){ if(Array.isArray(amtExp)){ if(!(+l.amt>=amtExp[0] && +l.amt<=amtExp[1])) return false } else if(typeof amtExp==="number"){ if(+l.amt<amtExp) return false } }
        if(stages.length && !stages.includes(String(l.stage||""))) return false;
        if(statuses.length && !statuses.includes(String(l.status||""))) return false;
        if(dsl._text){ const t=dsl._text.join(" ").toLowerCase(); if(t && !Object.values(l).some(x=>String(x??"").toLowerCase().includes(t))) return false }
        if(dsl.lender && String(l.lender||"").toLowerCase()!==dsl.lender.replace(/^"(.*)"$/,"$1").toLowerCase()) return false;
        if(dsl.state  && String(l.state||"").toLowerCase() !==dsl.state.toLowerCase()) return false;
        if(dsl.product&& String(l.product||"").toLowerCase()!==dsl.product.toLowerCase()) return false;
        if(dsl.purpose&& String(l.purpose||"").toLowerCase()!==dsl.purpose.toLowerCase()) return false;
        if(dsl.fico && !matchRange(+l.fico, dsl.fico)) return false;
        if(dsl.ltv  && !matchRange(+l.ltv,  dsl.ltv)) return false;
        if(dsl.dti  && !matchRange(+l.dti,  dsl.dti)) return false;
        if(dsl.amount||dsl.amt){ const v=dsl.amount||dsl.amt; if(!matchRange(+l.amt, v)) return false }
        return loanQualifies(l,rule);
      }
    }
    const tb=$("#tb"); function draw(rows){ tb.innerHTML=rows.map(r=>`<tr><td>${loanQualifies(r,rule)?"":""}</td><td>${r.id}</td><td>${r.lender||""}</td><td>${escapeHTML(r.borrower)}</td><td>${r.product||""}</td><td>${r.state||""}</td><td>${r.purpose||""}</td><td>${r.fico||""}</td><td>${r.ltv||""}</td><td>${r.dti||""}</td><td>$${(r.amt/1000).toFixed(0)}k</td><td>${r.stage||""}</td><td>${r.status||""}</td></tr>`).join(""); $("#stat").textContent=`${rows.length} results  ${(rows.filter(x=>loanQualifies(x,rule)).length)} eligible` }
    let data=loans.slice(); draw(data);
    $("#apply").onclick=()=>{ data=loans.filter(pred()); draw(data) }
    $("#clear").onclick=()=>{ ["fLender","fState","fProd","fPurpose","minFico","maxLtv","maxDti","amt","dsl","fStage","fStatus"].forEach(id=>document.getElementById(id).value=""); rule=null; $("#ruleSel").value=""; data=loans.slice(); draw(data) }
    $("#export").onclick=()=>{ const head=["Eligible","Loan#","Lender","Borrower","Product","State","Purpose","FICO","LTV","DTI","Amount","Stage","Status"]; const rows=data.map(r=>[loanQualifies(r,rule)?"YES":"NO",r.id,r.lender||"",r.borrower,r.product||"",r.state||"",r.purpose||"",r.fico||"",r.ltv||"",r.dti||"",r.amt||0,r.stage||"",r.status||""]); const csv=[head.join(",")].concat(rows.map(r=>r.map(x=>`"${String(x??"").replace(/"/g,'""')}"`).join(","))).join("\n"); const a=Object.assign(document.createElement("a"),{href:URL.createObjectURL(new Blob([csv],{type:"text/csv"})),download:"mortgage_search.csv"}); a.click(); URL.revokeObjectURL(a.href) }
    $("#applyRule").onclick=()=>{ const id=$("#ruleSel").value; rule=state.rules.find(r=>String(r.id)===String(id))||null; data=loans.filter(pred()); draw(data); toast(rule?`Rule: ${rule.name}`:"Rule cleared") }
    $("#saveRule").onclick=async()=>{ const lender=$("#fLender").value.trim(); const name=prompt("Rule name","New Rule"); if(!name) return;
      const amt=$("#amt").value.trim(); const parseAmt=(which)=>{ if(!amt) return which?9e15:0; const t=amt.toLowerCase().replace(/[,\s$]/g,""); if(t.includes("..")){const[a,b]=t.split(".."); return which?Number(b):Number(a)} if(t.endsWith("k")) return which?9e15:Number(t.slice(0,-1))*1e3; if(t.endsWith("m")) return which?9e15:Number(t.slice(0,-1))*1e6; const n=Number(t); return which?9e15:n }
      const r={id:`r-${Date.now()}`,name,lender,min_fico:+($("#minFico").value)||0,max_ltv:+($("#maxLtv").value)||100,max_dti:+($("#maxDti").value)||100,min_amt:parseAmt(0),max_amt:parseAmt(1),states:($("#fState").value?[ $("#fState").value ]:[]),products:($("#fProd").value?[ $("#fProd").value ]:[]),purposes:($("#fPurpose").value?[ $("#fPurpose").value ]:[])};
      await apiPatch("rules",{op:"upsert",item:r}); state.rules=await apiGet("rules"); $("#ruleSel").innerHTML=`<option value="">None</option>`+state.rules.map(x=>`<option value="${x.id}">${x.name}  ${x.lender||"Any"}</option>`).join(""); toast("Rule saved")
    }
  }catch(e){ $("#app").innerHTML=`<section class="card"><div class="h2">Mortgage  Advanced Search</div><p class="small mt8">Error: ${escapeHTML(e.message||e)}</p></section>` }
}

async function viewUSDA(){
  $("#app").innerHTML=`<section class="card"><div class="h2">USDA Pricing</div><p class="small mt8">Loading</p></section>`;
  try{
    const DEFAULT=["Avocado","Papaya","Orange","Lemon","Tomato","Onion","Corn","Carrot","Apple","Potato"]; let mode="api", list=DEFAULT.slice(), map={}; const labels=Array.from({length:26},(_,i)=>`W${i+1}`);
    async function draw(){ if(mode==="api"){ const repo=await apiGet("commodities"); map=Object.keys(repo).length?repo:await apiGet("commodities",`&source=algo&commodities=${encodeURIComponent(list.join(","))}&weeks=26`); list=Object.keys(map).length?Object.keys(map):DEFAULT.slice() } else { map=await apiGet("commodities",`&source=algo&commodities=${encodeURIComponent(list.join(","))}&weeks=26`) }
      $("#app").innerHTML=`<section class="card"><div class="row"><div class="h2">Weekly Price  W1..W26</div></div>
      <div class="row mt12"><button class="btn ${mode==='api'?'primary':''}" id="apiBtn">API Data</button><button class="btn ${mode==='algo'?'primary':''}" id="algoBtn">Algorithmic</button><input id="csearch" class="input" placeholder="Search commodities"><button class="btn" id="all">Show All</button></div>
      <canvas id="chart" height="260" class="mt16"></canvas></section>`;
      const ctx=$("#chart").getContext("2d"); let chart; const toSeries=name=>(map[name]||[]).sort((a,b)=>a.week-b.week).map(p=>+p.price);
      function render(names){ if(chart) chart.destroy(); chart=new Chart(ctx,{type:"line",data:{labels,datasets:names.map(n=>({label:n,data:toSeries(n),borderWidth:2,tension:.3}))},options:{plugins:{legend:{position:"bottom"}},animation:false}}) }
      $("#apiBtn").onclick=()=>{mode="api";draw()}; $("#algoBtn").onclick=()=>{mode="algo";draw()}; $("#csearch").oninput=e=>{const t=e.target.value.toLowerCase(); const names=list.filter(n=>n.toLowerCase().includes(t)); render(names.slice(0,10))}; $("#all").onclick=()=>render(list.slice(0,10)); $("#all").click();
    } await draw();
  }catch(e){ $("#app").innerHTML=`<section class="card"><div class="h2">USDA Pricing</div><p class="small mt8">Error: ${escapeHTML(e.message||e)}</p></section>` }
}

async function viewFactoring(){ $("#app").innerHTML=`<section class="card"><div class="h2">Factoring  Search</div><p class="small mt8">Loading</p></section>`;
  try{ const deals=await apiGet("factoring"); state.factoring=deals; const lenders=[...new Set(deals.map(x=>x.lender).filter(Boolean))].sort(), states=[...new Set(deals.map(x=>x.state).filter(Boolean))].sort(), inds=[...new Set(deals.map(x=>x.industry).filter(Boolean))].sort();
    $("#app").innerHTML=`<section class="card"><div class="row"><div class="h2">Factoring  Search</div><button class="btn" id="export">Export CSV</button></div>
    <div class="grid grid-3 mt12"><div class="card"><div class="h2">Filters</div>
    <div class="mt12 row"><label class="small">Lender</label><select id="lender" class="input"><option value="">Any</option>${lenders.map(x=>`<option>${x}</option>`).join("")}</select></div>
    <div class="mt12 row"><label class="small">State</label><select id="state" class="input"><option value="">Any</option>${states.map(x=>`<option>${x}</option>`).join("")}</select></div>
    <div class="mt12 row"><label class="small">Industry</label><select id="industry" class="input"><option value="">Any</option>${inds.map(x=>`<option>${x}</option>`).join("")}</select></div>
    <div class="mt12 row"><label class="small">Recourse?</label><select id="recourse" class="input"><option value="">Any</option><option>Yes</option><option>No</option></select></div>
    <div class="mt12 row"><label class="small">Amount</label><input id="fAmt" class="input" placeholder="50k..5m / >=250k"></div>
    <div class="mt12 row"><label class="small">Min Advance %</label><input id="minAdv" class="input" placeholder="80"></div>
    <div class="mt12 row"><label class="small">Max Aging</label><input id="maxAging" class="input" placeholder="60"></div>
    <div class="mt12 row"><label class="small">Max Risk</label><input id="maxRisk" class="input" placeholder="500"></div>
    <button class="btn mt12" id="apply">Apply</button> <button class="btn mt12" id="clear">Clear</button></div>
    <div class="card"><div class="h2">Stats</div><div id="stat" class="mt12 small"></div></div>
    <div class="card"><div class="h2">Search</div><input id="q" class="input mt12" placeholder="Search text"></div></div>
    <table class="table mt16"><thead><tr><th>ID</th><th>Debtor</th><th>Lender</th><th>State</th><th>Industry</th><th>Amount</th><th>Advance%</th><th>Fee</th><th>Term</th><th>Recourse</th><th>Aging</th><th>Risk</th><th>Status</th></tr></thead><tbody id="tb"></tbody></table></section>`;
    const tb=$("#tb"); function parseMoney(s){ if(!s) return null; const t=String(s).toLowerCase().replace(/[,\s$]/g,""); if(t.endsWith("m")) return Number(t.slice(0,-1))*1e6; if(t.endsWith("k")) return Number(t.slice(0,-1))*1e3; if(t.includes("..")){const[a,b]=t.split("..");return[Number(a),Number(b)]} const n=Number(t); return isNaN(n)?null:n }
    function apply(){ const lender=$("#lender").value.trim(),st=$("#state").value.trim(),ind=$("#industry").value.trim(),rq=$("#recourse").value.trim();
      const amt=parseMoney($("#fAmt").value.trim()); const minAdv=+($("#minAdv").value)||0; const maxAging=+($("#maxAging").value)||1e9; const maxRisk=+($("#maxRisk").value)||1e9; const q=$("#q").value.toLowerCase();
      const out=state.factoring.filter(d=>{ if(lender && String(d.lender||"").toLowerCase()!==lender.toLowerCase()) return false; if(st && String(d.state||"").toLowerCase()!==st.toLowerCase()) return false; if(ind && String(d.industry||"").toLowerCase()!==ind.toLowerCase()) return false; if(rq==="Yes"&&!d.recourse) return false; if(rq==="No"&&d.recourse) return false;
        if(amt!=null){ if(Array.isArray(amt)){ if(!(+d.amount>=amt[0]&&+d.amount<=amt[1])) return false } else if(typeof amt==="number"){ if(+d.amount<amt) return false } }
        if(+d.advance<minAdv) return false; if(+d.aging>maxAging) return false; if(+d.risk>maxRisk) return false;
        if(q){ const blob=[d.id,d.debtor,d.lender,d.state,d.industry,d.status].map(x=>String(x||"").toLowerCase()).join(" "); if(!blob.includes(q)) return false } return true
      });
      tb.innerHTML=out.map(r=>`<tr><td>${r.id}</td><td>${escapeHTML(r.debtor)}</td><td>${escapeHTML(r.lender||"")}</td><td>${escapeHTML(r.state||"")}</td><td>${escapeHTML(r.industry||"")}</td><td>$${(r.amount/1000).toFixed(0)}k</td><td>${r.advance||""}</td><td>${r.fee||""}</td><td>${escapeHTML(r.term||"")}</td><td>${r.recourse?"Yes":"No"}</td><td>${r.aging||""}</td><td>${r.risk||""}</td><td>${escapeHTML(r.status||"")}</td></tr>`).join(""); $("#stat").textContent=`${out.length} results` }
    $("#apply").onclick=apply; $("#clear").onclick=()=>{["lender","state","industry","recourse","fAmt","minAdv","maxAging","maxRisk","q"].forEach(id=>{$("#"+id).value=""}); apply()}; $("#export").onclick=()=>{ const rows=[...tb.querySelectorAll("tr")].map(tr=>[...tr.children].map(td=>td.textContent)); const head=["ID","Debtor","Lender","State","Industry","Amount","Advance%","Fee","Term","Recourse","Aging","Risk","Status"]; const csv=[head.join(",")].concat(rows.map(r=>r.map(x=>`"${String(x??"").replace(/"/g,'""')}"`).join(","))).join("\n"); const a=Object.assign(document.createElement("a"),{href:URL.createObjectURL(new Blob([csv],{type:"text/csv"})),download:"factoring_search.csv"}); a.click(); URL.revokeObjectURL(a.href) }
    apply();
  }catch(e){ $("#app").innerHTML=`<section class="card"><div class="h2">Factoring</div><p class="small mt8">Error: ${escapeHTML(e.message||e)}</p></section>` }
}

async function viewCompliance(){ $("#app").innerHTML=`<section class="card"><div class="h2">Compliance</div><p class="small mt8">Loading</p></section>`;
  try{ const issues=await apiGet("issues"); $("#app").innerHTML=`<section class="card"><div class="h2">Compliance</div><table class="table mt12"><thead><tr><th>ID</th><th>Issue</th><th>Severity</th><th>Owner</th><th>Due</th><th>Status</th></tr></thead><tbody>${issues.map(r=>`<tr><td>${r.id}</td><td>${escapeHTML(r.title)}</td><td>${r.severity}</td><td>${r.owner}</td><td>${r.due}</td><td>${r.status}</td></tr>`).join("")}</tbody></table></section>` }catch(e){ $("#app").innerHTML=`<section class="card"><div class="h2">Compliance</div><p class="small mt8">Error: ${escapeHTML(e.message||e)}</p></section>` } }
async function viewServices(){ $("#app").innerHTML=`<section class="card"><div class="h2">Services</div><p class="small mt8">Loading</p></section>`;
  try{ const svc=await apiGet("services"); const fuse=window.Fuse?new Fuse(svc,{keys:["title","domain","description","tags"],threshold:.35,ignoreLocation:true}):null;
    $("#app").innerHTML=`<section class="card"><div class="row"><div class="h2">Services</div><input id="q" class="input" placeholder="Search services"></div><div id="cards" class="mt16"></div></section>`;
    const cards=$("#cards"); const card=s=>`<div class="card mt12"><div class="h2">${escapeHTML(s.title)}</div><p class="small mt8">${escapeHTML(s.domain||"")}  ${escapeHTML(s.slug||"")}</p><p class="mt8">${escapeHTML(s.description||"")}</p><div class="row mt8">${(s.tags||[]).map(t=>`<span class="badge">${escapeHTML(t)}</span>`).join(" ")}</div></div>`;
    function draw(list){ cards.innerHTML=(list||[]).map(card).join("") || `<p class="small">No services.</p>` } draw(svc);
    $("#q").oninput=e=>{ const t=e.target.value.trim(); draw(!t?svc:(fuse?fuse.search(t).map(x=>x.item):svc.filter(s=>[s.title,s.domain,s.description,(s.tags||[]).join(" ")].some(v=>String(v||"").toLowerCase().includes(t.toLowerCase()))))) };
  }catch(e){ $("#app").innerHTML=`<section class="card"><div class="h2">Services</div><p class="small mt8">Error: ${escapeHTML(e.message||e)}</p></section>` } }
async function viewLegal(){ $("#app").innerHTML=`<section class="card"><div class="h2">Legal / Privacy</div>
  <div class="row mt12"><input id="dsarName" class="input" placeholder="Requestor name"><button class="btn" id="newDsar">Create DSAR</button></div>
  <p class="small mt8" id="dsarMsg"></p><ul id="dsarList" class="mt12"></ul></section>`;
  const list=async()=>{ try{ const items=await apiGet("dsar"); $("#dsarList").innerHTML=items.map(x=>`<li>${x.id}  ${escapeHTML(x.name)} <span class="small">(${new Date(x.created).toLocaleString()})</span></li>`).join("") }catch{} };
  $("#newDsar").onclick=async()=>{ const name=$("#dsarName").value.trim(); if(!name) return; const r=await fetch(API("dsar"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({name,created:Date.now()})}); $("#dsarMsg").textContent=r.ok?"DSAR created ":"Error"; list() };
  list();
}

function bindPalette(){ const pal=$("#palette"),input=$("#pal-input"),list=$("#pal-list"),open=()=>{pal.classList.remove("hidden");input.value="";fill("");input.focus()},close=()=>pal.classList.add("hidden");
  $("#cmdk").onclick=open; document.addEventListener("keydown",e=>{ if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();open()} if(e.key==="Escape")close()});
  function items(q){ const all=[{label:"Go: Executive",action:()=>location.hash="#/exec"},{label:"Go: Mortgage",action:()=>location.hash="#/mortgage"},{label:"Go: Compliance",action:()=>location.hash="#/compliance"},{label:"Go: Legal/Privacy",action:()=>location.hash="#/legal"},{label:"Go: USDA",action:()=>location.hash="#/usda"},{label:"Go: Services",action:()=>location.hash="#/services"},{label:"Go: Factoring",action:()=>location.hash="#/factoring"}]; const t=(q||"").toLowerCase(); return !t?all:all.filter(x=>x.label.toLowerCase().includes(t)) }
  function fill(q){ const it=items(q); list.innerHTML=it.map((x,i)=>`<div class="pal-item" data-i="${i}"><div>${x.label}</div><div></div></div>`).join(""); $$(".pal-item",list).forEach((d,i)=>d.onclick=()=>{it[i].action();close()}) }
  input.oninput=()=>fill(input.value); pal.addEventListener("click",e=>{ if(e.target===pal) close() })
}