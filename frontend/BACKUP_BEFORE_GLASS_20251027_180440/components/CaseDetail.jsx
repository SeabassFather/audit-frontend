const downloadPdf = () => {
  const doc = generateIntakePdf(rec.service, rec.id, rec.data);
  doc.save(rec.service.replace(/\s+/g, "_") + "__Intake.pdf");
};
