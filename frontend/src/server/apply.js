// Express route handler for POST /api/apply
const express = require("express");
const router = express.Router();
const PDFDocument = require("pdfkit");
const nodemailer = require("nodemailer");
const { Readable } = require("stream");

// CONFIG SECTION -- FILL THESE IN!
const EMAIL_TO = "YOUR_EMAIL@domain.com"; // <--- Set your destination email here
const EMAIL_FROM = "noreply@yourdomain.com";
const SMTP_CONFIG = {
  host: "smtp.yourprovider.com",
  port: 465,
  secure: true,
  auth: {
    user: "your_smtp_user",
    pass: "your_smtp_password"
  }
};

router.post("/api/apply", async (req, res) => {
  try {
    const data = req.body;

    // 1. Generate PDF (in memory)
    const doc = new PDFDocument();
    let pdfBuffers = [];
    doc.on("data", (chunk) => pdfBuffers.push(chunk));
    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(pdfBuffers);

      // 2. Email PDF
      const transporter = nodemailer.createTransport(SMTP_CONFIG);
      await transporter.sendMail({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        subject: `New Loan Inquiry from ${data.name || "Unknown"}`,
        text: `A new loan app has been submitted. See attached PDF.\n\nData: ${JSON.stringify(data, null, 2)}`,
        attachments: [
          { filename: "loan-inquiry.pdf", content: pdfBuffer }
        ]
      });

      res.json({ ok: true });
    });

    // Write PDF content
    doc.fontSize(20).text("Loan Inquiry (Short 1003)", { align: "center" });
    doc.moveDown();
    Object.entries(data).forEach(([k, v]) => {
      doc.fontSize(12).text(`${k}: ${v}`);
    });
    doc.end();
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;