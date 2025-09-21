export function saveLead(lead){
 try{
 const key = "auditdna.leads";
 const cur = JSON.parse(localStorage.getItem(key) || "[]");
 cur.push(lead);
 localStorage.setItem(key, JSON.stringify(cur));
 return true;
 }catch{ return false; }
}
export function getLeads(){
 try{ return JSON.parse(localStorage.getItem("auditdna.leads") || "[]"); }catch{ return []; }
}
export function clearLeads(){ localStorage.removeItem("auditdna.leads"); }
export function toCSV(leads){
 const headers = ["ts","service","fullName","company","email","phone","payload"];
 const lines = leads.map(l=>[
 l.ts||"", l.service||"", q(l.fullName), q(l.company), q(l.email), q(l.phone), q(JSON.stringify(l))
 ].join(","));
 return [headers.join(","), ...lines].join("\n");
 function q(s){ if(s==null) return ""; const v=String(s).replace(/"/g,'""'); return /[,"\n]/.test(v)?"${v}":v; }
}