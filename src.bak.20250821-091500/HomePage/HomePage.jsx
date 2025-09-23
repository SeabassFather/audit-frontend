import React from "react";

export default function Terms() {
  return (
    <article className="prose max-w-none">
      <h2>Service Terms (Summary)</h2>
      <p>
        This is a summary of the binding service agreement between the customer
        and <strong>AuditDNA a MFG, Inc. dba AuditDNA</strong> (patent pending).
        Full text and signatures will be attached at checkout or account
        onboarding. The platform may use AI-assisted analysis to help evaluate
        compliance, overcharges, and refund potential; human review and
        regulatory requirements apply.
      </p>

      <h3>Scope of Services</h3>
      <ul>
        <li>Consumer, business, and professional audit/compliance services.</li>
        <li>
          Automated letters/complaints to creditors and CFPB (with customer
          consent).
        </li>
        <li>Escrow coordination for refunds/disbursements.</li>
      </ul>

      <h3>AI-Assisted Analysis</h3>
      <ul>
        <li>
          The platform may use AI to surface potential overpayments/overcharges,
          fee non-compliance, and refund eligibility. AI outputs are reviewed
          under applicable policies.
        </li>
        <li>
          Rationale includes contract terms, fee schedules, statutory/regulatory
          thresholds, and historic payments when provided. Results are
          recommendations, not legal advice.
        </li>
      </ul>

      <h3>Identity & Fraud Controls</h3>
      <ul>
        <li>
          Customer identity verification is required (government ID, passport,
          or license).
        </li>
        <li>Escrow is used to process refunds and deter fraud/false claims.</li>
        <li>
          Notary may be required for disbursement confirmations; discounted
          notary options available.
        </li>
      </ul>

      <h3>Escrow Workflow</h3>
      <ul>
        <li>
          Customer consents to escrow at checkout; escrow provider receives
          automated notice.
        </li>
        <li>
          Upon refund eligibility, escrow coordinates disbursement and
          record-keeping.
        </li>
      </ul>

      <h3>CFPB & Creditor Notices</h3>
      <ul>
        <li>
          When an overcharge/refund is indicated, the platform can send a
          demand/notice to creditor(s) and optionally file a CFPB complaint on
          the customer’s behalf, including timing data from the date of
          overcharge.
        </li>
      </ul>

      <h3>Retention & Delivery</h3>
      <ul>
        <li>
          Purchased results are stored for 45 days for download/printing
          (Bluetooth/Wi-Fi) or email delivery.
        </li>
        <li>
          After retention, data may be purged unless required for compliance.
        </li>
      </ul>

      <h3>Billing</h3>
      <ul>
        <li>
          Per-service pricing disclosed prior to checkout (e.g., $49.99 per
          analysis unless otherwise shown).
        </li>
        <li>
          Taxes/fees may apply. Refund policy will be specified in the full
          agreement.
        </li>
      </ul>

      <h3>Disclaimers</h3>
      <ul>
        <li>
          No legal, tax, or investment advice. Use requires acceptance of full
          terms.
        </li>
        <li>
          Regulatory and creditor timelines vary; outcomes are not guaranteed.
        </li>
      </ul>

      <p className="text-sm text-gray-500">
        Full, signed Service Agreement controls. This page is a convenience
        summary only.
      </p>
    </article>
  );
}
