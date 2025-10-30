const downloadPdf = () => {
  const doc = generateIntakePdf(serviceName, savedId, form);
  doc.save(serviceName.replace(/\s+/g, "_") + "_Intake.pdf");
};
