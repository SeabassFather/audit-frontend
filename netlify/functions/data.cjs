const { GITHUB_TOKEN, GH_REPO, GH_BRANCH="main" } = process.env;

function headers(extra={}){ return { "content-type":"application/json", "Access-Control-Allow-Origin":"*", "Access-Control-Allow-Methods":"GET,POST,PATCH,DELETE,OPTIONS", "Access-Control-Allow-Headers":"Content-Type", ...extra }; }
function res(code, body){ return { statusCode: code, headers: headers(), body: JSON.stringify(body) }; }
function b64(s){ return Buffer.from(s,"utf8").toString("base64"); }

async function ghGet(path){
  const [owner, repo] = GH_REPO.split("/");
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${GH_BRANCH}`;
  const r = await fetch(url,{ headers:{ Authorization:`Bearer ${GITHUB_TOKEN}`, "User-Agent":"auditdna" }});
  if (r.status===404) return null;
  if (!r.ok) throw new Error(await r.text());
  const j = await r.json();
  return { sha:j.sha, text: Buffer.from(j.content,"base64").toString("utf8") };
}
async function ghPut(path, content, message){
  const [owner, repo] = GH_REPO.split("/");
  let sha=null; try{ const got = await ghGet(path); if(got) sha=got.sha; }catch(e){}
  const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
  const r = await fetch(url,{ method:"PUT", headers:{ Authorization:`Bearer ${GITHUB_TOKEN}`, "User-Agent":"auditdna", "content-type":"application/json" },
    body: JSON.stringify({ message, content: b64(content), branch: GH_BRANCH, sha: sha || undefined })
  });
  if(!r.ok) throw new Error(await r.text());
  return true;
}

/* ---------------- CSV helpers ---------------- */
function csvParse(text){
  const rows = text.trim().split(/\r?\n/).map(line=>{
    let out=[], cur="", q=false; for(let i=0;i<line.length;i++){ const ch=line[i];
      if(ch===`"`){ if(q && line[i+1]==='"'){ cur+='"'; i++; } else { q=!q; } }
      else if(ch===',' && !q){ out.push(cur); cur=""; } else cur+=ch;
    } out.push(cur); return out;
  });
  const head = rows.shift().map(h=>h.trim());
  return rows.filter(r=>r.length && r.some(x=>x!=="")).map(r=>Object.fromEntries(head.map((h,i)=>[h.trim(),(r[i]??"").trim()])));
}
function num(v){ if(v==null||v==="") return 0; const s=String(v).toLowerCase().replace(/[\$,_%\s]/g,""); if(s.includes("k")) return Number(s.replace("k",""))*1000; if(s.includes("m")) return Number(s.replace("m",""))*1_000_000; return Number(s); }

/* ---------- mapping per type ---------- */
function csvToDomain(type, rows){
  if(type==="commodities"){
    const map={}; rows.forEach(r=>{
      const name=(r.commodity||r.name||"").trim(); const w=Number(r.week); const price=num(r.price); const avg5 = r.avg5!==undefined? num(r.avg5) : null;
      if(!name || !(w>=1 && w<=26) || Number.isNaN(price)) return;
      (map[name] ||= []).push({ week:w, price, ...(avg5!=null?{avg5}:{}) });
    }); for(const k in map) map[k].sort((a,b)=>a.week-b.week); return map;
  }
  if(type==="loans"){
    const std = ["id","borrower","product","lender","state","purpose","ltv","fico","dti","stage","status","close","amt"];
    return rows.map(r=>{
      const o={
        id:r.id, borrower:r.borrower, product:r.product,
        lender:r.lender, state:r.state, purpose:r.purpose,
        ltv:num(r.ltv)||0, fico:num(r.fico)||0, dti:num(r.dti)||0,
        stage:r.stage, status:r.status, close:r.close, amt:num(r.amt)||0
      };
      // pass through any extra columns (rate, apr, term, occupancy, etc.)
      for(const k of Object.keys(r)){ if(!std.includes(k)) o[k]=r[k]; }
      return o;
    }).filter(x=>x.id && x.borrower);
  }
  if(type==="issues"){
    return rows.map(r=>({ id:r.id, title:r.title, severity:r.severity, owner:r.owner, due:r.due, status:r.status }))
               .filter(x=>x.id && x.title);
  }
  if(type==="services"){
    return rows.map(r=>({
      id:r.id, title:r.title, domain:r.domain, description:r.description,
      tags:(r.tags||"").split(/[;,]/).map(s=>s.trim()).filter(Boolean),
      status:r.status||"Active", slug:r.slug||String(r.title||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")
    })).filter(x=>x.id && x.title);
  }
  if(type==="factoring"){
    return rows.map(r=>({
      id:r.id, debtor:r.debtor, lender:r.lender, state:r.state, industry:r.industry,
      amount:num(r.amount)||0, advance:num(r.advance)||0, fee:num(r.fee)||0,
      term:r.term, recourse:(String(r.recourse||"").toLowerCase().startsWith("y")||String(r.recourse||"").toLowerCase()==="true"),
      aging:num(r.aging)||0, risk:num(r.risk)||0, status:r.status
    })).filter(x=>x.id && x.debtor);
  }
  if(type==="rules"){
    return rows.map(r=>({
      id:r.id, name:r.name, lender:r.lender,
      min_fico: num(r.min_fico)||0, max_ltv: num(r.max_ltv)||100, max_dti: num(r.max_dti)||100,
      min_amt: num(r.min_amt)||0, max_amt: num(r.max_amt)||9e15,
      states: (r.states||"").split(/[,\s;|]+/).map(s=>s.trim()).filter(Boolean),
      products: (r.products||"").split(/[,\s;|]+/).map(s=>s.trim()).filter(Boolean),
      purposes: (r.purposes||"").split(/[,\s;|]+/).map(s=>s.trim()).filter(Boolean),
      occupancy: (r.occupancy||"").split(/[,\s;|]+/).map(s=>s.trim()).filter(Boolean),
      notes:r.notes||""
    })).filter(x=>x.id && x.name);
  }
  return rows;
}

/* ====== USDA ALGO (your code) ====== */
function hash(s){ let h=0; for(let i=0;i<s.length;i++){ h=((h<<5)-h)+s.charCodeAt(i); h|=0;} return h; }
function noise(w, seed){ return ((hash(seed+":"+w)%7)-3); }
function round(n){ return Math.round(n*100)/100; }
function genSeries(name, weeks=26){
  const base = 20 + (Math.abs(hash(name)) % 30);
  const amp = 5 + (Math.abs(hash(name+"amp")) % 12); // 5..16
  const avg = base - 2;
  return Array.from({length:weeks}, (_,i)=>{
    const w=i+1;
    return {
      week: w,
      price: round(base + Math.sin(w/4)*amp + noise(w, name)),
      avg5:  round(avg  + Math.sin((w+1)/4)*(amp*0.6))
    };
  });
}

exports.handler = async (event)=>{
  try{
    if(event.httpMethod==="OPTIONS") return { statusCode:204, headers:headers() };
    if(!GITHUB_TOKEN || !GH_REPO) return res(500,{error:"Missing env: GITHUB_TOKEN, GH_REPO"});

    const qs = event.queryStringParameters||{};
    const type = (qs.type||"").toLowerCase();
    if(!["loans","issues","commodities","dsar","services","factoring","rules"].includes(type)) return res(400,{error:"bad type"});

    // DSAR
    if(type==="dsar"){
      if(event.httpMethod==="POST"){
        const payload = JSON.parse(event.body||"{}");
        const id = `dsar-${Date.now()}`;
        await ghPut(`data/dsar/${id}.json`, JSON.stringify(payload,null,2), `DSAR create ${id}`);
        const idxGet = await ghGet("data/dsar/index.json");
        const idx = idxGet ? JSON.parse(idxGet.text) : [];
        idx.push({ id, name: payload.name||"", created: Date.now() });
        await ghPut("data/dsar/index.json", JSON.stringify(idx,null,2), `DSAR index ${id}`);
        return res(200,{ok:true,id});
      }
      if(event.httpMethod==="GET"){
        const got = await ghGet("data/dsar/index.json");
        return res(200, got? JSON.parse(got.text) : []);
      }
      return res(405,{error:"method"});
    }

    // USDA algo mode
    if(type==="commodities" && String(qs.source||"").toLowerCase().startsWith("algo")){
      const list = (qs.commodities||"Avocado,Papaya,Orange,Lemon,Tomato,Onion,Corn,Carrot,Apple,Potato")
        .split(",").map(s=>s.trim()).filter(Boolean).slice(0,50);
      const weeks = Math.max(1, Math.min(52, parseInt(qs.weeks||"26",10)));
      const map={}; for(const n of list) map[n] = genSeries(n, weeks);
      return res(200, map);
    }

    const pathMap = {
      loans:"data/loans.json",
      issues:"data/issues.json",
      commodities:"data/commodities.json",
      services:"data/services.json",
      factoring:"data/factoring.json",
      rules:"data/rules.json"
    };
    const path = pathMap[type];

    if(event.httpMethod==="GET"){
      const got = await ghGet(path);
      return res(200, got ? JSON.parse(got.text) : (type==="commodities"? {} : []));
    }

    const ct = (event.headers["content-type"]||event.headers["Content-Type"]||"").toLowerCase();

    // CSV uploads
    if(event.httpMethod==="POST" && ct.includes("text/csv")){
      const rows = csvParse(event.body||"");
      const payload = csvToDomain(type, rows);
      await ghPut(path, JSON.stringify(payload,null,2), `Upload CSV ${type}`);
      return res(200,{ok:true});
    }

    // JSON patch (upsert/delete, plus commodities put-map)
    if(event.httpMethod==="PATCH"){
      const body = event.body? JSON.parse(event.body) : {};
      const op = body.op||"";
      const got = await ghGet(path);
      let cur = got ? JSON.parse(got.text) : (type==="commodities"? {} : []);
      if(type==="commodities"){ if(op==="put-map"){ cur = body.map||{}; } }
      else {
        if(op==="upsert"){
          const item = body.item||{};
          const idx = Array.isArray(cur) ? cur.findIndex(x=>String(x.id)===String(item.id)) : -1;
          if(idx>=0) cur[idx]=item; else (Array.isArray(cur)? cur.push(item) : (cur=[item]));
        }
        if(op==="delete"){
          const id = String(body.id||"");
          if(Array.isArray(cur)) cur = cur.filter(x=>String(x.id)!==id);
        }
      }
      await ghPut(path, JSON.stringify(cur,null,2), `Patch ${type} ${op}`);
      return res(200,{ok:true});
    }

    // Replace JSON
    if(event.httpMethod==="POST" || event.httpMethod==="PUT"){
      const body = event.body? JSON.parse(event.body) : {};
      await ghPut(path, JSON.stringify(body,null,2), `Replace ${type}`);
      return res(200,{ok:true});
    }

    return res(405,{error:"method"});
  }catch(e){
    return res(500,{error:String(e.message||e)});
  }
};