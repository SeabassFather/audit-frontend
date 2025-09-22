export const forms = {
  financialAuditAuthorization: {
    title: "Financial Audit Authorization Form",
    txtDownload: "/forms/Financial_Audit_Authorization (1).txt",
    html: `
      <p><b>Authorization:</b> I authorize AuditDNA & reps to access, review, and analyze all relevant financial, billing, and contractual documentation for a consumer protection audit.</p>
      <ul>
        <li><input type="checkbox" checked disabled /> I consent to OCR and AI analysis.</li>
        <li><input type="checkbox" checked disabled /> I authorize regulatory transmission (CFPB, State).</li>
        <li><input type="checkbox" checked disabled /> I understand QR verification will be attached.</li>
      </ul>
      <label>Name: <input type="text" name="name" /></label>
      <label>Date: <input type="date" name="date" /></label>
      <label>Signature: <input type="text" name="signature" /></label>
    `
  },
  partnerOnboarding: {
    title: "Partner Onboarding & Eligibility Form",
    txtDownload: "/forms/Partner_Onboarding_Form.txt",
    html: `
      <p><b>Eligible Roles:</b></p>
      <ul>
        <li><input type="checkbox" checked disabled /> NMLS-licensed professional</li>
        <li><input type="checkbox" checked disabled /> CPA</li>
        <li><input type="checkbox" checked disabled /> Attorney</li>
        <li><input type="checkbox" checked disabled /> Escrow Officer</li>
      </ul>
      <label>Name: <input type="text" /></label>
      <label>Company: <input type="text" /></label>
      <label>License Type: <input type="text" /></label>
      <label>License #: <input type="text" /></label>
      <label>Email: <input type="email" /></label>
      <label>Phone: <input type="tel" /></label>
      <input type="checkbox" checked disabled /> I affirm eligibility
      <input type="checkbox" checked disabled /> I agree to policies
      <label>Signature: <input type="text" /></label>
      <label>Date: <input type="date" /></label>
    `
  }
};
