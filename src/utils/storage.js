const KEY = "auditdna_cases";
export function loadCases() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
export function saveCase(rec) {
  const arr = loadCases();
  arr.unshift(rec);
  localStorage.setItem(KEY, JSON.stringify(arr));
}
export function deleteCase(id) {
  const arr = loadCases().filter((c) => c.id !== id);
  localStorage.setItem(KEY, JSON.stringify(arr));
}
export function clearCases() {
  localStorage.removeItem(KEY);
}
export function findCase(id) {
  return loadCases().find((c) => c.id === id);
}
function flattenCase(c) {
  const out = { id: c.id, service: c.service, ts: c.ts };
  const d = c.data || {};
  Object.keys(d).forEach((k) => {
    out[k] = typeof d[k] === "object" ? JSON.stringify(d[k]) : d[k];
  });
  return out;
}
export function toCSV(rows) {
  if (!rows.length) return "id,service,ts\n";
  const headers = Array.from(
    rows.reduce((s, r) => {
      Object.keys(r).forEach((k) => s.add(k));
      return s;
    }, new Set()),
  );
  const esc = (v) => "";
  const body = rows
    .map((r) => headers.map((h) => esc(r[h])).join(","))
    .join("\n");
  return headers.join(",") + "\n" + body;
}
export function exportCasesAsCSV(cases) {
  return toCSV(cases.map(flattenCase));
}
export function exportCasesAsJSON(cases) {
  return JSON.stringify(cases, null, 2);
}
