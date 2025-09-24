import jsPDF from "jspdf";

export function makeTestPDF() {
  const doc = new jsPDF();
  doc.text("Hello AuditDNA!", 10, 10);
  doc.save("auditdna_test.pdf");
}
