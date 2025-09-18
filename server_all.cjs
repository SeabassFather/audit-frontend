"use strict";
const http = require("http");
const fs   = require("fs");
const path = require("path");
const url  = require("url");

const PORT = 3000;
const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");
const STORE= path.join(ROOT, ".localdata");
const F = n => path.join(STORE, n + ".json");

const types = { ".html":"text/html; charset=utf-8",".js":"application/javascript; charset=utf-8",".css":"text/css; charset=utf-8",".json":"application/json; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".svg":"image/svg+xml",".ico":"image/x-icon" };
const send = (res, code, body, type="text/plain; charset=utf-8") => { res.writeHead(code,{"content-type":type}); res.end(body); };
const sendJSON = (res, code, obj) => send(res, code, Buffer.from(JSON.stringify(obj)), "application/json; charset=utf-8");

function ensureDir(p){ if(!fs.existsSync(p)) fs.mkdirSync(p,{recursive:true}); }
function readJson(file, def){ try{ return JSON.parse(fs.readFileSync(file,"utf8")); } catch{ return def; } }
function writeJson(file, data){ ensureDir(path.dirname(file)); fs.writeFileSync(file, JSON.stringify(data,null,2)); }

const h=s=>{ let x=0; for(let i=0;i<s.length;i++){ x=((x<<5)-x) + s.charCodeAt(i); x|=0; } return Math.abs(x); };
const noise=(w,s)=> (h(s+":"+w)%7)-3, rnd=n=>Math.round(n*100)/100;
function series(name, weeks){
  const base=40+(h(name)%25), amp=5+(h(name+"amp")%12), avg=base-2, out=[];
  for(let w=1; w<=weeks; w++) out.push({ week:"W"+w, price:rnd(base + Math.sin(w/4)*amp + noise(w,name)), avg5:rnd(avg + Math.sin((w+1)/4)*(amp*0.6)) });
  return out;
}

function ensureSeeds(){
  ensureDir(STORE);
  // Commodities: 10 x 26
  const commFile = F("commodities");
  if (!fs.existsSync(commFile)) {
    const names = ["Avocado","Orange","Papaya","Lemon","Tomato","Onion","Corn","Carrot","Apple","Potato"];
    const map = {}; names.forEach(n => map[n] = series(n, 26));
    writeJson(commFile, map);
  }
  // Loans
  if (!fs.existsSync(F("loans"))) writeJson(F("loans"), [
    {id:"L-1001", borrower:"Acme LLC", product:"Agency-Fixed", lender:"Wells", state:"CA", purpose:"Purchase", ltv:72, fico:742, dti:34, stage:"UW", status:"Active", close:"2025-10-01", amt:650000},
    {id:"L-1002", borrower:"Beta LLC", product:"DSCR",        lender:"Chase", state:"TX", purpose:"Refi",     ltv:70, fico:700, dti:40, stage:"UW", status:"Active", close:"2025-10-10", amt:450000}
  ]);
  // Rules
  if (!fs.existsSync(F("rules"))) writeJson(F("rules"), [
    {id:"R-1", name:"Agency Prime",   lender:"Wells", min_fico:680, max_ltv:80, max_dti:45, min_amt:100000, max_amt:2000000, states:["CA","TX","FL"], products:["Agency-Fixed","Agency-ARM"], purposes:["Purchase","Refi"], occupancy:["OO","NOO"]},
    {id:"R-2", name:"DSCR Core",      lender:"Chase", min_fico:700, max_ltv:75, max_dti:50, min_amt:150000, max_amt:1500000, states:["CA","TX","FL","AZ"], products:["DSCR"], purposes:["Purchase","Refi"], occupancy:["NOO"]},
    {id:"R-3", name:"Bank Statement", lender:"Citi",  min_fico:680, max_ltv:85, max_dti:50, min_amt:250000, max_amt:3000000, states:["CA","NY","NJ","FL"], products:["Non-QM","Bank-Statement"], purposes:["Purchase","Refi"], occupancy:["OO","NOO"]}
  ]);
  // Factoring
  if (!fs.existsSync(F("factoring"))) writeJson(F("factoring"), [
    {id:"F-2001", debtor:"RetailCo", lender:"BlueCap", state:"CA", industry:"Retail",       amount:250000, advance:85, fee:2.2, term:"90d", recourse:true,  aging:38, risk:12, status:"Review"},
    {id:"F-2002", debtor:"BuildCo",  lender:"BlueCap", state:"TX", industry:"Construction", amount:400000, advance:80, fee:2.6, term:"60d", recourse:false, aging:25, risk:18, status:"Active"}
  ]);
  // Services
  if (!fs.existsSync(F("services"))) writeJson(F("services"), [
    {id:"svc-audit", title:"Mortgage QA & Audit", domain:"mortgage",   description:"QC, post-close, pre-fund audits", tags:["mortgage","qa","audit"], status:"Active", slug:"mortgage-audit"},
    {id:"svc-kyc",   title:"KYC/AML Compliance",   domain:"compliance", description:"Identity, sanctions, AML monitoring", tags:["kyc","aml","compliance"], status:"Active", slug:"kyc-aml"}
  ]);
}
ensureSeeds();

function parseBody(req){
  return new Promise(resolve=>{
    const chunks=[]; req.on("data",c=>chunks.push(c));
    req.on("end",()=>{ const raw=Buffer.concat(chunks).toString("utf8"); try{ resolve(JSON.parse(raw||"{}")); }catch{ resolve({}) } });
  });
}

function handleAPI(req,res,parsed){
  const q = Object.fromEntries(new URLSearchParams(parsed.query||""));
  const type = (q.type||"").toLowerCase();

  if (parsed.pathname==="/api/ping") return sendJSON(res,200,{ok:true});

  if (parsed.pathname==="/api/data"){
    // Commodities special
    if (type==="commodities"){
      if (req.method==="GET"){
        if ((q.source||"")==="algo"){
          const names = (q.commodities||"").split(",").map(s=>s.trim()).filter(Boolean);
          const weeks = Math.max(1, Math.min(104, parseInt(q.weeks||"26",10)));
          const map = {}; names.forEach(n => map[n] = series(n,weeks));
          return sendJSON(res,200,map);
        }
        return sendJSON(res,200, readJson(F("commodities"),{}));
      }
      if (req.method==="PATCH"){
        return parseBody(req).then(b=>{
          if (b && b.op==="put-map" && b.map){ writeJson(F("commodities"), b.map); return sendJSON(res,200,{ok:true}); }
          return sendJSON(res,400,{error:"bad patch"});
        });
      }
      if (req.method==="PUT"){
        return parseBody(req).then(b=>{ writeJson(F("commodities"), b||{}); return sendJSON(res,200,{ok:true}); });
      }
    }

    // Generic tables
    const map = {loans:"loans", rules:"rules", factoring:"factoring", services:"services"};
    if (map[type]){
      const file = F(map[type]);
      if (req.method==="GET")  return sendJSON(res,200, readJson(file,[]));
      if (req.method==="PUT")  return parseBody(req).then(b=>{ writeJson(file, b||[]); return sendJSON(res,200,{ok:true}); });
      if (req.method==="PATCH"){
        return parseBody(req).then(p=>{
          let arr = readJson(file,[]);
          if (p.op==="upsert" && p.item){ const i=arr.findIndex(x=>x.id===p.item.id); if(i>=0)arr[i]=p.item; else arr.push(p.item); }
          else if (p.op==="delete" && p.id){ arr = arr.filter(x=>x.id!==p.id); }
          else return sendJSON(res,400,{error:"bad patch"});
          writeJson(file,arr); return sendJSON(res,200,{ok:true,count:arr.length});
        });
      }
    }

    return sendJSON(res,404,{error:"unknown type"});
  }

  return sendJSON(res,404,{error:"not found"});
}

function serveStatic(req,res){
  let p = req.url.split("?")[0];
  if (p==="/") p="/index.html";
  const file = path.join(DIST, p);
  if (fs.existsSync(file) && fs.statSync(file).isFile()){
    const ext = path.extname(file).toLowerCase();
    return send(res, 200, fs.readFileSync(file), types[ext] || "application/octet-stream");
  }
  // SPA fallback
  return send(res, 200, fs.readFileSync(path.join(DIST,"index.html")), "text/html; charset=utf-8");
}

http.createServer((req,res)=>{
  try{
    const parsed = url.parse(req.url);
    if (parsed.pathname && parsed.pathname.startsWith("/api/")) return handleAPI(req,res,parsed);
    return serveStatic(req,res);
  } catch(e){
    return sendJSON(res,500,{error:String(e&&e.message||e)});
  }
}).listen(PORT, ()=> console.log(" AuditDNA full stack at http://localhost:"+PORT));