/* Minimal USDA page + chart (works with Netlify function /.netlify/functions/data) */
const API = "/.netlify/functions/data";
const COMMS = ["Avocado","Orange","Papaya","Lemon","Tomato","Onion","Corn","Carrot","Apple","Potato"];

function html(strings,...vals){return strings.map((s,i)=>s+(vals[i]??"")).join("")}

function mount(){
  const app = document.getElementById("app");
  app.innerHTML = html`
    <section class="card">
      <div class="row" style="gap:.75rem;align-items:center;">
        <label style="min-width:80px;">Commodity</label>
        <select id="commodity" class="input" style="min-width:220px;"></select>
        <button id="seed" class="btn">Generate 26w</button>
        <small class="muted">Synthetic series via function; persisted locally.</small>
      </div>
    </section>
    <section class="card" style="height:480px;">
      <div class="h2">Weekly Price W1–W26 + 5-Year Average</div>
      <div style="height:420px;"><canvas id="chart"></canvas></div>
    </section>
  `;
  const sel = document.getElementById("commodity");
  COMMS.forEach(c=>sel.appendChild(new Option(c,c)));
  sel.value = COMMS[0];
  document.getElementById("seed").addEventListener("click",seed);
  sel.addEventListener("change",render);
}

async function seed(){
  const qs = `type=commodities&source=algo&commodities=${encodeURIComponent(COMMS.join(","))}&weeks=26`;
  const map = await (await fetch(`${API}?${qs}`)).json();
  await fetch(`${API}?type=commodities`, {
    method:"PATCH", headers:{ "Content-Type":"application/json" },
    body: JSON.stringify({op:"put-map", map})
  });
  await render();
}

function toSeries(map, name){
  const rows = map[name] || [];
  const num = v => (v==null? null : typeof v==="string" ? +v.replace(/[^0-9.\-]/g,"") : +v);
  const lab = r => `W${String(r.week??r.w??r.label??"").toString().replace(/^W/i,"")}`;
  return {
    labels: rows.map(lab),
    datasets: [
      {label:"Price", data: rows.map(r=>num(r.price))},
      {label:"5y Avg", data: rows.map(r=>num(r.avg5 ?? r.avg))}
    ]
  };
}

let chart;
async function render(){
  // get persisted map; if empty, auto-seed once
  let map = await (await fetch(`${API}?type=commodities`)).json();
  if (!map || !Object.keys(map).length){
    await seed(); return;
  }
  const name = document.getElementById("commodity").value;
  const data = toSeries(map, name);
  const ctx = document.getElementById("chart").getContext("2d");
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "line",
    data,
    options: {
      responsive: true, maintainAspectRatio: false,
      parsing: false,
      scales: { x:{ type:"category" }, y:{ beginAtZero:true, grace:"10%" } },
      elements: { point: { radius: 0 } },
      datasets: { line: { tension:.25, borderWidth:2, spanGaps:true } }
    }
  });
}

window.addEventListener("DOMContentLoaded", async ()=>{
  mount();
  // ensure Chart is present
  if (!window.Chart) {
    const s = document.createElement("script");
    s.src = "https://cdn.jsdelivr.net/npm/chart.js"; await new Promise(r=>{s.onload=r;document.head.appendChild(s);});
  }
  await render();
});