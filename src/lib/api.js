const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5050";

export async function uploadDoc(file) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${API_BASE}/api/uploads`, {
    method: "POST",
    body: form
  });
  return res.json();
}

export async function fetchReports() {
  const res = await fetch(`${API_BASE}/api/uploads`);
  return res.json();
}



