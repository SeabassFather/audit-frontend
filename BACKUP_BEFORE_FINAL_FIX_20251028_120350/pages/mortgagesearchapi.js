import api from "./api";
export const searchMortgages = (payload) =>
  api.post("/search/mortgages", payload).then((r) => r.data);
