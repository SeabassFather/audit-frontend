import React, { useState } from "react";

const PolicySection = ({ title, content, downloadPath }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <div className="flex items-center gap-3">
            <a
              href={downloadPath}
              download
              className="flex items-center gap-2 px-3 py-1.5 bg-brand-green text-white rounded-md hover:bg-brand-green/90 transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download
            </a>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
            >
              {isExpanded ? "Collapse" : "Expand"}
              <svg className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <div className="p-6">
          <div className="prose max-w-none text-sm leading-relaxed">
            {content.split('\n\n').map((section, index) => {
              if (section.includes(':') && section.split(':')[0].length < 50) {
                const [heading, ...rest] = section.split(':');
                return (
                  <div key={index} className="mb-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{heading.trim()}:</h3>
                    <div className="text-gray-700 whitespace-pre-line">{rest.join(':').trim()}</div>
                  </div>
                );
              }
              return (
                <div key={index} className="mb-4 text-gray-700 whitespace-pre-line">
                  {section}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const policyContent = {
  partnerAccess: `OVERVIEW:
This document outlines the access policies and procedures for AuditDNA partners and authorized users. By accessing our platform, you agree to comply with these terms.

ACCESS LEVELS:
1. BASIC PARTNER ACCESS
   - Service catalog browsing
   - Basic USDA pricing data
   - Standard form downloads
   - Email support

2. PREMIUM PARTNER ACCESS  
   - Full service suite access
   - Real-time data feeds
   - Priority customer support
   - Advanced reporting tools

3. ENTERPRISE ACCESS
   - Custom integration support
   - Dedicated account management
   - White-label solutions
   - API access and documentation

SECURITY REQUIREMENTS:
- Multi-factor authentication required
- Password complexity minimum: 12 characters with mixed case, numbers, symbols
- Session timeout after 30 minutes of inactivity
- Regular security awareness training required for enterprise users

DATA PROTECTION:
- All data encrypted in transit and at rest
- SOC 2 Type II compliance maintained
- Regular third-party security audits
- Data retention per industry standards

COMPLIANCE OBLIGATIONS:
Partners must maintain compliance with:
- Industry-specific regulations (USDA, FDA, etc.)
- Financial privacy requirements
- Environmental protection standards
- Fair lending practices (where applicable)

VIOLATION CONSEQUENCES:
- First violation: Warning and mandatory training
- Second violation: Temporary access suspension
- Third violation: Permanent access revocation

UPDATES TO POLICY:
This policy is reviewed quarterly and updated as needed. Partners will be notified of material changes 30 days in advance.

Last Updated: January 2024
Policy Version: 2.1
Contact: compliance@auditdna.com`,

  qrVerification: `PURPOSE:
QR codes provide secure, instant verification of audit documents, certificates, and compliance reports. This guide explains how to use AuditDNA's QR verification system.

VERIFICATION PROCESS:
STEP 1: LOCATE THE QR CODE
- QR codes appear on all official AuditDNA documents
- Usually positioned in the top-right or bottom-right corner
- Accompanied by a unique verification ID

STEP 2: SCAN THE CODE
- Use any QR code scanner app on your mobile device
- Point camera at the QR code until it focuses
- Tap the notification that appears

STEP 3: VERIFY AUTHENTICITY
- Browser will open to verification page
- Document details will display automatically
- Green checkmark = Authentic document
- Red X = Invalid or expired document

WHAT YOU'LL SEE:
✓ Document Type (e.g., "USDA Organic Certification")
✓ Issue Date
✓ Expiration Date (if applicable)
✓ Issuing Authority
✓ Document Status (Active/Expired/Revoked)
✓ Digital Signature Verification

TROUBLESHOOTING:
QR CODE WON'T SCAN:
- Ensure adequate lighting
- Hold device steady, 6-8 inches from code
- Clean camera lens
- Try different QR scanner app

VERIFICATION FAILS:
- Check internet connection
- Verify you're scanning complete QR code
- Contact support if persistent issues

SECURITY FEATURES:
- Each QR code is unique and cannot be duplicated
- Codes expire automatically with documents
- Scanning logs maintained for audit trail
- Real-time validation against secure database

MOBILE OPTIMIZATION:
- Works on all smartphones and tablets
- No special app required
- Optimized for low-bandwidth connections
- Accessible design for all users

SUPPORT:
For technical issues or questions:
- Email: support@auditdna.com  
- Phone: 1-800-AUDIT-DNA
- Live chat: Available 24/7 on our website

Best Practices:
- Always verify documents before accepting
- Save verification screenshots for records
- Report suspicious or invalid documents immediately
- Keep QR codes clean and unobstructed on printed materials`
};

export default function Policies() {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-brand-blue/10 to-brand-green/10 rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Policies & Guidelines</h1>
        <p className="text-gray-600">
          Essential policies and verification guides for AuditDNA partners and users. 
          Review these documents to understand our security, access, and compliance requirements.
        </p>
      </div>

      <div className="grid gap-6">
        <PolicySection 
          title="Partner Access Policy Disclosure"
          content={policyContent.partnerAccess}
          downloadPath="/forms/partner_access_disclosure.txt"
        />
        
        <PolicySection 
          title="QR Code Verification Guide"
          content={policyContent.qrVerification}
          downloadPath="/forms/qr_verification_guide.txt"
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <h3 className="font-medium text-amber-900">Important Notice</h3>
            <p className="text-sm text-amber-700 mt-1">
              All partners must acknowledge and comply with these policies. 
              Failure to adhere to security and access requirements may result in account suspension.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 className="font-medium text-blue-900">Policy Updates</h3>
            <p className="text-sm text-blue-700 mt-1">
              Policies are reviewed quarterly. Subscribe to our newsletter or check this page regularly for updates.
              Questions? Contact our compliance team at <a href="mailto:compliance@auditdna.com" className="underline">compliance@auditdna.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}