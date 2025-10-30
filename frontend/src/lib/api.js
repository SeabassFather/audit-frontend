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



<<<<<<< HEAD
=======

// Missing exports for Search.jsx
export const listFactoringDeals = async () => {
  return { data: [] };
};

export const searchMortgageRates = async () => {
  return { data: [] };
};

export const getUSDAWeeklyPrices = async () => {
  return { data: [] };
};
>>>>>>> my/push-branch
