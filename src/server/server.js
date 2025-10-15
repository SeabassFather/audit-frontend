app.get("/api/usda/search", async (req, res) => {
  const q = req.query.q || "";
  // TODO: Replace this with real USDA/FDA/Organic registry query logic
  // Example static response for demo:
  const demoResults = [
    { name: "Organic Farm LLC", location: "CA", certification: "USDA Organic", id: "12345" },
    { name: "Green Fields Inc", location: "TX", certification: "FDA", id: "67890" }
  ].filter(row =>
    q === "" ||
    row.name.toLowerCase().includes(q.toLowerCase()) ||
    row.location.toLowerCase().includes(q.toLowerCase()) ||
    row.certification.toLowerCase().includes(q.toLowerCase()) ||
    row.id.includes(q)
  );
  res.json(demoResults);
});