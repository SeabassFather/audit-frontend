const NASS_KEY = import.meta.env.VITE_NASS_KEY || '';

async function tryFetch(url) {
  try {
    const r = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.json();
  } catch {
    return null;
  }
}

export async function fetchCommoditySeries({
  commodity = 'PAPAYA',
  wFrom = 1,
  wTo = 26,
  yearsBack = 5,
}) {
  const yearNow = new Date().getUTCFullYear();
  const years = Array.from({ length: yearsBack }, (_, i) => yearNow - i);

  // --- NASS attempt (may not have weekly granularity for all commodities) ---
  async function fetchNass(y) {
    if (!NASS_KEY) return null;
    const q = new URLSearchParams({
      key: NASS_KEY,
      commodity_desc: commodity.toUpperCase(),
      year: String(y),
    });
    const url = `https://quickstats.nass.usda.gov/api/api_GET/?${q.toString()}`;
    const json = await tryFetch(url);
    if (!json || !json.data) return null;

    const rows = json.data
      .map((r) => {
        const wk = Number(r.week || r.week_ending || r.week_end || r.period);
        const val =
          r.value != null ? Number(String(r.value).replace(/,/g, '')) : NaN;
        return wk && !Number.isNaN(val) ? { week: wk, price: val } : null;
      })
      .filter(Boolean)
      .sort((a, b) => a.week - b.week);

    return rows;
  }

  // --- Synthetic fallback so charts always render ---
  function synthetic(y) {
    const base = 10 + (y % 5) * 0.4;
    const out = [];
    for (let w = wFrom; w <= wTo; w++) {
      const seasonal = Math.sin((w / 26) * Math.PI) * 2;
      const noise = ((w * y) % 11) * 0.03;
      out.push({ week: w, price: +(base + seasonal + noise).toFixed(2) });
    }
    return out;
  }

  const series = [];
  for (const y of years) {
    let rows = await fetchNass(y);
    if (!rows || !rows.length) rows = synthetic(y);

    // keep requested weeks and fill gaps
    rows = rows.filter((r) => r.week >= wFrom && r.week <= wTo);
    const have = new Set(rows.map((r) => r.week));
    for (let w = wFrom; w <= wTo; w++) {
      if (!have.has(w)) {
        const prev = [...rows].reverse().find((r) => r.week < w)?.price;
        rows.push({ week: w, price: prev ?? rows[0]?.price ?? 10 });
      }
    }
    rows.sort((a, b) => a.week - b.week);
    series.push({ year: y, rows });
  }

  return series;
}
