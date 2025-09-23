export async function mortgageSearchAPI(payload) {
  const resp = await fetch("/api/search/mortgages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!resp.ok) throw new Error("API failed");
  return await resp.json();
}
