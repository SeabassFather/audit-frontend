const api = {
  usdaList: () => "/api/usda/list",
  usdaAvg: (name) =>
    `/api/usda/market/avg?commodity=${encodeURIComponent(name)}`,
};
export default api;
