# Mortgage Loan Audit Module

## What is this?
A self-contained, modular audit workflow for mortgage loans. Upload docs, fill form, submit, notify, and track—all in one place.

## Files
- MortgageLoanAudit.jsx: Main UI shell for this audit.
- MortgageLoanAuditForm.jsx: Inputs for audit request.
- MortgageLoanAuditService.js: Service/API logic (mock, no backend required).
- UploadChecklist.jsx: Required docs, upload status.
- DocumentUploader.jsx: Uploads, progress.
- AuditStatusCard.jsx: Status, locks billing until all docs complete.
- CFPBNotifier.jsx: Notify CFPB on violation.
- EscrowNotifier.jsx: Notify escrow/title.
- QRGenerator.jsx: Generates QR code for tracking.
- ConsumerContactCard.jsx: Consumer info/status.
- index.js: Barrel export.

## Workflow
1. Upload all required docs (checklist updates).
2. Complete audit form.
3. Submit audit (mock API).
4. Notify escrow/title and CFPB if needed.
5. QR code for tracking.
6. Billing is locked until doc complete and audit submitted.

## Expansion
- Replace all TODOs and mock handlers with real backend integration as needed.