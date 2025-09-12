const { GITHUB_TOKEN, GH_REPO, GH_BRANCH="main" } = process.env;

function res(status, body){ return { statusCode: status, headers: { "content-type":"application/json" }, body: JSON.stringify(body) }; }
function b64(s){ return Buffer.from(s, "utf8").toString("base64"); }
async function ghGet(path){
  const [owner, repo] = GH_REPO.split("/");
  const r = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}?ref=${GH_BRANCH}`,{
    headers: { Authorization:`Bearer ${GITHUB_TOKEN}`, "User-Agent":"auditdna" }
  });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(await r.text());
  const j = await r.json();
  return { sha:j.sha, text: Buffer.from(j.content, "base64").toString("utf8") };
}
async function ghPut(path, content, message){
  const [owner, repo] = GH_REPO.split("/");
  let sha=null;
  try{ const got = await ghGet(path); if(got) sha=got.sha; }catch(e){}
  const r = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`,{
    method:"PUT",
    headers:{ Authorization:`Bearer ${GITHUB_TOKEN}`, "User-Agent":"auditdna", "content-type":"application/json" },
    body: JSON.stringify({ message, content: b64(content), branch: GH_BRANCH, sha: sha || undefined })
  });
  if(!r.ok) throw new Error(await r.text());
  return true;
}
function csvParse(text){
  const rows = text.trim().split(/\r?\n/).map(line=>{
    let out=[], cur="", q=false;
    for(let i=0;i<line.length;i++){
      const ch=line[i];
      if(ch===`"`){ if(q && line[i+1]==='"'){ cur+='"'; i++; } else { q=!q; } }
      else if(ch===',' && !q){ out.push(cur); cur=""; }
      else cur+=ch;
    } out.push(cur); return out;
  });
  const head = rows.shift().map(h=>h.trim().toLowerCase());
  return rows.filter(r=>r.length && r.some(x=>x!=="")).map(r=>Object.fromEntries(head.map((h,i)=>[h, (r[i]??"").trim()])));
}
function csvToDomain(type, rows){
  if(type==="commodities"){
    // expect: commodity,week,price,avg5
    const map = {};
    rows.forEach(r=>{
      const name=(r.commodity||r.name||"").trim();
      const w = Number(r.week); const price = Number(r.price); const avg5 = r.avg5!==undefined? Number(r.avg5) : null;
      if(!name || !(w>=1 && w<=26) || Number.isNaN(price)) return;
      map[name] = map[name] || [];
      map[name].push({ week: w, price, ...(avg5!=null?{avg5}: {}) });
    });
    // sort weeks
    for(const k of Object.keys(map)) map[k].sort((a,b)=>a.week-b.week);
    return map;
  }
  if(type==="loans"){
    // id,borrower,product,ltv,fico,dti,stage,status,close,amt
    return rows.map(r=>({
      id:r.id, borrower:r.borrower, product:r.product,
      ltv: Number(r.ltv)||0, fico: Number(r.fico)||0, dti: Number(r.dti)||0,
      stage:r.stage, status:r.status, close:r.close, amt:Number(r.amt)||0
    })).filter(x=>x.id && x.borrower);
  }
  if(type==="issues"){
    // id,title,severity,owner,due,status
    return rows.map(r=>({ id:r.id, title:r.title, severity:r.severity, owner:r.owner, due:r.due, status:r.status }))
               .filter(x=>x.id && x.title);
  }
  return rows;
}

exports.handler = async (event) => {
  try{
    if(!GITHUB_TOKEN || !GH_REPO) return res(500,{error:"Missing env: GITHUB_TOKEN, GH_REPO"});
    const type = (event.queryStringParameters?.type||"").toLowerCase();
    if(!["loans","issues","commodities","dsar"].includes(type)) return res(400,{error:"type must be loans|issues|commodities|dsar"});

    // DSAR create/list
    if(type==="dsar"){
      if(event.httpMethod==="POST"){
        const payload = JSON.parse(event.body||"{}");
        const id = `dsar-${Date.now()}`;
        await ghPut(`data/dsar/${id}.json`, JSON.stringify(payload,null,2), `DSAR create ${id}`);
        return res(200,{ok:true,id});
      }
      if(event.httpMethod==="GET"){
        const got = await ghGet("data/dsar/index.json"); // optional aggregated index
        return res(200, got? JSON.parse(got.text) : []);
      }
      return res(405,{error:"method"});
    }

    const pathMap = { loans:"data/loans.json", issues:"data/issues.json", commodities:"data/commodities.json" };
    const path = pathMap[type];

    if(event.httpMethod==="GET"){
      const got = await ghGet(path);
      if(!got) return res(200, type==="commodities"? {} : []);
      return res(200, JSON.parse(got.text));
    }

    if(event.httpMethod==="POST" || event.httpMethod==="PUT"){
      const ct = (event.headers["content-type"]||event.headers["Content-Type"]||"").toLowerCase();
      let payload;
      if(ct.includes("text/csv")) payload = csvToDomain(type, csvParse(event.body||""));
      else payload = JSON.parse(event.body||"{}");
      await ghPut(path, JSON.stringify(payload,null,2), `Update ${type}`);
      return res(200,{ok:true});
    }

    return res(405,{error:"method"});
  }catch(e){
    return res(500,{error:String(e.message||e)});
  }
};