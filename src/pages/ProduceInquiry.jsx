import React from "react";
import { jsPDF } from "jspdf";

export default function ProduceInquiry() {
  const onSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const doc = new jsPDF();
    doc.text("Produce Inquiry", 14, 16);

    [...form.entries()].forEach(([k, v], i) => {
      doc.text(`${k}: ${String(v)}`, 14, 28 + i * 8);
    });

    doc.save("produce-inquiry.pdf");
  };

  return (
    <form onSubmit={onSubmit} className="p-4 space-y">
      <div className="form-row">
        <label>Commodity</label>
        <input name="commodity" placeholder="Commodity" />
      </div>
      <div className="form-row">
        <label>Variety</label>
        <input name="variety" placeholder="Variety" />
      </div>
      <div className="form-row">
        <label>Origin</label>
        <input name="origin" placeholder="Origin" />
      </div>
      <div className="form-row">
        <label>Quantity</label>
        <input name="quantity" placeholder="Quantity" />
      </div>
      <button type="submit" className="btn">Download PDF</button>
    </form>
  );
}