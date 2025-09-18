const $ = sel => document.querySelector(sel);
const api = async (qs, opt) => (await fetch("/.netlify/functions/data?"+qs, opt)).json();

const Router = {
  routes: {},
  go(hash){ location.hash = hash; },
  start(){
    window.addEventListener("hashchange", this.render.bind(this));
    if(!location.hash) location.hash = "#/usda";
    this.render();
  },
  async render(){
    const hash = location.hash.split("?")[0];
    if(this.routes[hash]) await this.routes[hash](); else $("#app").innerHTML = "<section class='card'>Unknown route.</section>";
  }
};

/* ---------- USDA ---------- */
Router.routes["#/usda"] = async ()=>{
  $("#app").innerHTML = `
    <section class="card">
      <div class="row" style="justify-content:space-between">
        <div class="row">
          <label>Commodity</label>
          <select id="comm">
            <option>Avocado</option><option>Apple</option><option>Orange</option><option>Papaya</option>
            <option>Lemon</option><option>Tomato</option><option>Onion</option><option>Corn</option>
            <option>Carrot</option><option>Potato</option>
          </select>
        </div>
        <div class="row"><button id="gen" class="primary">Generate 26w</button><span class="small">Synthetic when live API is unavailable.</span></div>
      </div>
    </section>
    <section class="card"><h4>Weekly Price W1W26 + 5-Year Avg</h4><canvas id="chart"></canvas></section>`;
  let chart;
  const ctx = $("#chart").getContext("2d");
  const draw = (name, rows)=>{
    const labels = rows.map(r => (r.week || r.w || "").toString().replace(/^W/,"W"));
    const price  = rows.map(r => +r.price);
    const avg5   = rows.map(r => +r.avg5 || +r.avg || null);
    chart && chart.destroy();
    chart = new Chart(ctx,{type:"line",data:{labels,
      datasets:[
        {label:"Price",data:price,borderWidth:2,tension:.25,pointRadius:0},
        {label:"5y Avg",data:avg5,borderWidth:2,tension:.25,pointRadius:0}
      ]},
      options:{responsive:true,interaction:{mode:"index",intersect:false},plugins:{legend:{position:"top"}}}});
  };
  async function load(name){
    const map = await api(`type=commodities&source=algo&commodities=${encodeURIComponent(name)}&weeks=26`);
    draw(name, map[name]||[]);
  }
  $("#comm").addEventListener("change", e=>load(e.target.value));
  $("#gen").addEventListener("click", ()=>load($("#comm").value));
  load($("#comm").value);
};

/* ---------- Mortgage ---------- */
Router.routes["#/mortgage"] = async ()=>{
  // UI
  $("#app").innerHTML = `
    <section class="card">
      <div class="row" style="gap:12px;align-items:flex-end;flex-wrap:wrap">
        <div><label>State</label><input id="m_state" placeholder="CA" style="width:90px"></div>
        <div><label>Product</label><input id="m_prod" placeholder="Agency-Fixed / DSCR" style="width:160px"></div>
        <div><label>Purpose</label><input id="m_purpose" placeholder="Purchase / Refi" style="width:140px"></div>
        <div><label>Occupancy</label><input id="m_occ" placeholder="OO / NOO" style="width:110px"></div>
        <div><label>FICO </label><input id="m_fico" type="number" value="680" style="width:100px"></div>
        <div><label>LTV </label><input id="m_ltv" type="number" value="80" style="width:100px"></div>
        <div><label>DTI </label><input id="m_dti" type="number" value="45" style="width:100px"></div>
        <div><label>Amount</label><input id="m_amt" type="number" placeholder="500000" style="width:140px"></div>
        <div class="row" style="gap:8px">
          <button id="m_search" class="primary">Search Loans</button>
          <button id="m_match"  class="primary">Match Lenders</button>
          <label class="small"><input id="m_only" type="checkbox" checked> Only eligible</label>
        </div>
      </div>
      <div class="small" style="margin-top:6px">Tip: leave Product/Purpose/Occupancy blank to ignore those checks.</div>
    </section>

    <section class="card" id="mort-out">
      <div class="h2">Results</div>
      <table id="m_tbl"><thead></thead><tbody></tbody></table>
    </section>
  `;

  // Data
  const loans = await GET("type=loans");          // [{...}]
  const rules = await GET("type=rules");          // [{...}] each rule = lender program

  // Helpers
  const V = id => (document.getElementById(id)?.value || "").trim();
  const N = id => { const v = V(id); return v==="" ? null : +v; };
  const inList = (val, arr) => !arr || !arr.length || arr.includes(val);
  const hasAny  = (vals, arr) => !vals.length || vals.some(v => arr?.includes(v));
  const normCSV = s => s.split(/[,\s/;]+/).map(x=>x.trim()).filter(Boolean);

  // Build a borrower "scenario" from inputs
  const scenario = () => ({
    state: V("m_state").toUpperCase(),
    product: V("m_prod"),
    purpose: V("m_purpose"),
    occupancy: V("m_occ").toUpperCase(),
    fico: N("m_fico"),
    ltv:  N("m_ltv"),
    dti:  N("m_dti"),
    amt:  N("m_amt")
  });

  // Qualify object (loan or scenario) against a rule; return score + reasons
  function qualify(rule, obj){
    const reasons = [];
    let score = 0, ok = true;

    // State
    if (obj.state) {
      if (inList(obj.state, rule.states)) { score+=10; reasons.push(" state"); }
      else { ok=false; reasons.push(" state"); }
    }

    // Product
    if (obj.product) {
      if (inList(obj.product, rule.products)) { score+=10; reasons.push(" product"); }
      else { ok=false; reasons.push(" product"); }
    }

    // Purpose
    if (obj.purpose) {
      if (inList(obj.purpose, rule.purposes)) { score+=6; reasons.push(" purpose"); }
      else { ok=false; reasons.push(" purpose"); }
    }

    // Occupancy
    if (obj.occupancy) {
      if (inList(obj.occupancy, rule.occupancy)) { score+=6; reasons.push(" occupancy"); }
      else { ok=false; reasons.push(" occupancy"); }
    }

    // Numeric caps / floors
    if (obj.fico!=null) {
      if (obj.fico >= (rule.min_fico ?? 0)) { score+=10; reasons.push(` fico${rule.min_fico}`); }
      else { ok=false; reasons.push(` fico ${obj.fico} < ${rule.min_fico}`); }
    }

    if (obj.ltv!=null) {
      if (obj.ltv <= (rule.max_ltv ?? 100)) { score+=10; reasons.push(` ltv${rule.max_ltv}`); }
      else { ok=false; reasons.push(` ltv ${obj.ltv} > ${rule.max_ltv}`); }
    }

    if (obj.dti!=null) {
      if (obj.dti <= (rule.max_dti ?? 100)) { score+=6; reasons.push(` dti${rule.max_dti}`); }
      else { ok=false; reasons.push(` dti ${obj.dti} > ${rule.max_dti}`); }
    }

    if (obj.amt!=null) {
      const min = rule.min_amt ?? 0, max = rule.max_amt ?? Number.MAX_SAFE_INTEGER;
      if (obj.amt >= min && obj.amt <= max) { score+=8; reasons.push(` amt in [${min.toLocaleString()}..${max.toLocaleString()}]`); }
      else {
        ok=false;
        reasons.push(` amt ${obj.amt?.toLocaleString?.()||obj.amt}  [${min.toLocaleString()}..${max.toLocaleString()}]`);
      }
    }

    return { ok, score, reasons };
  }

  // -------- Renderers --------
  const thead = $("#m_tbl thead"), tbody = $("#m_tbl tbody");

  function renderLoans(){
    thead.innerHTML = `<tr>
      <th>Borrower</th><th>Lender/Rule</th><th>State</th><th>Product</th>
      <th>FICO</th><th>LTV</th><th>DTI</th><th>Amount</th>
      <th>Eligible</th><th>Score</th>
    </tr>`;
    const sc = scenario();
    const only = $("#m_only").checked;

    const rows = loans.map(l=>{
      // choose best rule (highest score) among all rules
      let best = {score:-1, ok:false, reasons:["no rules"]}, bestRule=null;
      for (const r of rules){
        const res = qualify(r, {
          state: l.state, product:l.product, purpose:l.purpose, occupancy:(l.occupancy||"").toUpperCase(),
          fico:l.fico, ltv:l.ltv, dti:l.dti, amt:l.amt
        });
        // optional: intersect with scenario inputs (tighten search if user typed filters)
        const res2 = qualify(r, {
          state: sc.state || l.state,
          product: sc.product || l.product,
          purpose: sc.purpose || l.purpose,
          occupancy: (sc.occupancy || l.occupancy || "").toUpperCase(),
          fico: sc.fico ?? l.fico,
          ltv:  sc.ltv  ?? l.ltv,
          dti:  sc.dti  ?? l.dti,
          amt:  sc.amt  ?? l.amt
        });
        if (res2.score > best.score) { best = res2; bestRule = r; }
      }
      return { l, best, bestRule };
    }).filter(x => !only || x.best.ok)
      .sort((a,b)=> b.best.score - a.best.score);

    tbody.innerHTML = rows.map(x=>`<tr title="${x.best.reasons.join("    ")}">
      <td>${x.l.borrower}</td>
      <td>${x.bestRule ? (x.bestRule.lender+"  "+x.bestRule.name) : ""}</td>
      <td>${x.l.state}</td>
      <td>${x.l.product}</td>
      <td>${x.l.fico}</td>
      <td>${x.l.ltv}</td>
      <td>${x.l.dti}</td>
      <td>${(+x.l.amt||0).toLocaleString()}</td>
      <td>${x.best.ok ? "YES" : "NO"}</td>
      <td>${x.best.score}</td>
    </tr>`).join("") || "<tr><td colspan=10>No results</td></tr>";
  }

  function renderLenders(){
    thead.innerHTML = `<tr>
      <th>Lender</th><th>Program</th><th>States</th><th>Products</th>
      <th>Caps</th><th>Amounts</th><th>Eligible</th><th>Score</th>
    </tr>`;
    const sc = scenario();
    const rows = rules.map(r=>{
      const res = qualify(r, sc);
      return { r, res };
    }).filter(x => !$("#m_only").checked || x.res.ok)
      .sort((a,b)=> b.res.score - a.res.score);

    tbody.innerHTML = rows.map(x=>`<tr title="${x.res.reasons.join("    ")}">
      <td>${x.r.lender}</td>
      <td>${x.r.name || "Program"}</td>
      <td>${(x.r.states||[]).join(", ") || ""}</td>
      <td>${(x.r.products||[]).join(", ") || ""}</td>
      <td>FICO${x.r.min_fico ?? ""}  LTV${x.r.max_ltv ?? ""}  DTI${x.r.max_dti ?? ""}</td>
      <td>${(x.r.min_amt??0).toLocaleString()}${(x.r.max_amt??0).toLocaleString()}</td>
      <td>${x.res.ok ? "YES" : "NO"}</td>
      <td>${x.res.score}</td>
    </tr>`).join("") || "<tr><td colspan=8>No eligible programs</td></tr>";
  }

  // Wire buttons
  $("#m_search").addEventListener("click", renderLoans);
  $("#m_match").addEventListener("click", renderLenders);
  $("#m_only").addEventListener("change", ()=> {
    // redraw last view (default to lenders)
    if (document.querySelector("#m_tbl thead th")?.textContent === "Lender") renderLenders();
    else renderLoans();
  });

  // First draw: lender match against your inputs
  renderLenders();
};
    render(loans.filter(l=>match(rule,l)));
  });
  $("#m_go").click();
};

/* ---------- Factoring ---------- */
Router.routes["#/factoring"]=async()=>{
  $("#app").innerHTML=`
    <section class="card"><div class="row">
      <label>State</label><input id="f_state" placeholder="CA" style="width:90px">
      <label>Industry</label><input id="f_ind" placeholder="Retail" style="width:120px">
      <button id="f_go" class="primary">Search</button>
    </div></section>
    <section class="card"><table id="f_tbl"><thead><tr>
      <th>Debtor</th><th>Lender</th><th>State</th><th>Industry</th><th>Amount</th><th>Advance%</th><th>Fee%</th><th>Status</th>
    </tr></thead><tbody></tbody></table></section>`;
  const rows = await api("type=factoring");
  const body=$("#f_tbl tbody");
  const render=()=>{ const st=$("#f_state").value.trim().toUpperCase(), ind=$("#f_ind").value.trim().toLowerCase();
    const out=rows.filter(x=>(!st||x.state===st)&&(!ind||x.industry.toLowerCase().includes(ind)));
    body.innerHTML = out.map(r=>`<tr><td>${r.debtor}</td><td>${r.lender}</td><td>${r.state}</td>
      <td>${r.industry}</td><td>${r.amount.toLocaleString()}</td><td>${r.advance}</td><td>${r.fee}</td><td>${r.status}</td></tr>`).join("") || "<tr><td colspan=8>No results</td></tr>";
  };
  $("#f_go").addEventListener("click",render); render();
};

/* ---------- Services ---------- */
Router.routes["#/services"]=async()=>{
  const list = await api("type=services");
  $("#app").innerHTML = `
    <section class="card"><h3>AuditDNA Services</h3>
      <div id="svc" class="row" style="gap:12px;flex-wrap:wrap"></div>
      <div class="small">Edit via Netlify Function later; read-only here.</div>
    </section>`;
  $("#svc").innerHTML = list.map(s=>`
    <div class="card" style="width:320px">
      <div><b>${s.title}</b></div>
      <div class="small" style="margin:8px 0">${s.description}</div>
      <div class="small">Domain: ${s.domain}</div>
      <div class="small">Tags: ${(s.tags||[]).join(", ")}</div>
    </div>`).join("");
};

Router.start();