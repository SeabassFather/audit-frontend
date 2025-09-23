import React from "react";

// List your form files manually or automate (with Webpack require.context or similar)
// For static public files, you must list them by name unless you use an API or metadata file
const forms = [
  {
    name: "Financial Audit Authorization",
    file: "/forms/financial_audit_authorization.txt",
  },
  {
    name: "Partner Onboarding & Eligibility",
    file: "/forms/partner_onboarding_eligibility.txt",
  },
  // Add more as needed
];

export default function FormsList() {
  return (
    <div>
      <h2>Available Forms</h2>
      <ul>
        {forms.map((form) => (
          <li key={form.file}>
            <a href={form.file} target="_blank" rel="noopener noreferrer">
              {form.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
