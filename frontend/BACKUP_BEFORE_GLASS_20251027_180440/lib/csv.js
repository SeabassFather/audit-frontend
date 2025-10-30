export function toCSV(rows) {
  if (!rows?.length) return "";
  const keys = Object.keys(rows[0]);
  const esc = (v) => String(v ?? "").replace(/"/g, '""');
  const lines = [keys.join(",")].concat(
    rows.map((r) => keys.map((k) => `"${esc(r[k])}"`).join(",")),
  );
  return lines.join("\n");
}
export function downloadCSV(filename, rows) {
  const csv = toCSV(rows);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
