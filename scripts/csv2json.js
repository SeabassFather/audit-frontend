const fs = require("fs");
const path = require("path");
function parseCSV(text) {
  const lines = text.split(/\r?\n/).filter(Boolean);
  const head = lines
    .shift()
    .split(",")
    .map((s) => s.trim().toLowerCase());
  const idx = (k) => head.findIndex((h) => h === k);
  const ci = {
    commodity: idx("commodity"),
    year: idx("year"),
    week: idx("week"),
    value: idx("value"),
  };
  if (Object.values(ci).some((i) => i < 0))
    throw new Error("CSV must have headers: commodity,year,week,value");
  return lines
    .map((r) => {
      const c = r.split(",").map((s) => s.trim());
      return {
        commodity: c[ci.commodity],
        year: String(c[ci.year]),
        week: Number(c[ci.week]),
        value: Number(c[ci.value]),
      };
    })
    .filter(
      (r) =>
        r.commodity && Number.isFinite(r.week) && r.week >= 1 && r.week <= 52,
    );
}
function buildDB(rows) {
  const db = {};
  for (const r of rows) {
    if (!db[r.commodity]) db[r.commodity] = { unit: "$/unit", years: {} };
    if (!db[r.commodity].years[r.year])
      db[r.commodity].years[r.year] = Array(52).fill(null);
    db[r.commodity].years[r.year][r.week - 1] = Number.isFinite(r.value)
      ? r.value
      : null;
  }
  return db;
}
const inFile = process.argv[2];
if (!inFile) {
  console.error("Usage: node scripts/csv2json.js path/to/data.csv");
  process.exit(1);
}
const rows = parseCSV(fs.readFileSync(inFile, "utf8"));
const db = buildDB(rows);
const outDir = path.join(process.cwd(), "src", "data", "commodities");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
for (const [name, obj] of Object.entries(db)) {
  const p = path.join(outDir, `${name}.json`);
  fs.writeFileSync(p, JSON.stringify(obj, null, 2));
  console.log("Wrote", p);
}
