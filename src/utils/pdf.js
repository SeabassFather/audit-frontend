import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function generateIntakePdf(serviceName, savedId, formData) {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text(`${serviceName} Intake Summary`, 14, 16);

  doc.setFontSize(10);
  if (savedId) doc.text(`Case ID: ${savedId}`, 14, 23);
  doc.text(`Timestamp: ${new Date().toLocaleString()}`, 14, 29);

  const rows = Object.entries(formData || {}).map(([k, v]) => [
    k,
    String(v ?? ""),
  ]);

  doc.autoTable({
    startY: 35,
    head: [["Field", "Value"]],
    body: rows,
    styles: { fontSize: 9 },
  });

  return doc;
}
