import api from "./config";
export async function verifyPaca(license) {
  const r = await fetch(api.paca(license));
  if (!r.ok) throw new Error("PACA error");
  return r.json(); // {license,status,firm,issued,expires}
}
