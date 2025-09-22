const AMS_BASE = "https://mymarketnews.ams.usda.gov/filerepo/api/v1";

export async function handler(event) {
  try {
    // Example: /.netlify/functions/ams?path=reports&search=beef&page=1&pageSize=50
    const url = new URL(event.rawUrl);
    const path = url.searchParams.get("path") || "reports";
    url.searchParams.delete("path");
    const q = url.searchParams.toString();
    const target = `${AMS_BASE}/${path}${q ? "?" + q : ""}`;

    const r = await fetch(target);
    const txt = await r.text();
    return { statusCode: r.status, headers: { "content-type": r.headers.get("content-type") || "application/json" }, body: txt };
  } catch (e) {
    return { statusCode: 500, body: String(e) };
  }
}
