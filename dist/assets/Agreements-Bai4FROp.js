import{r as i,j as e}from"./index-VjBi3Mlf.js";function m(){const[t,r]=i.useState(null),[a,n]=i.useState("all"),l=[{id:1,title:"Service Agreement",type:"service",version:"v2.1",lastUpdated:"2024-01-15",status:"active",description:"Standard terms of service for AuditDNA platform usage",content:`SERVICE AGREEMENT

1. SERVICES
AuditDNA provides comprehensive audit and compliance services including but not limited to:
- Document processing and OCR analysis
- CFPB-aware compliance checking
- Real-time USDA pricing data
- AI-powered audit assistance
- Professional reporting and documentation

2. TERMS OF USE
- Services are provided on a subscription basis
- Users must comply with all applicable regulations
- Data security and privacy are maintained according to industry standards

3. LIMITATION OF LIABILITY
AuditDNA's liability is limited to the subscription fees paid for the relevant service period.

4. INTELLECTUAL PROPERTY
All platform technology and methodologies remain the property of AuditDNA.

Last updated: January 15, 2024`},{id:2,title:"Privacy Policy",type:"privacy",version:"v1.8",lastUpdated:"2024-01-10",status:"active",description:"Data privacy and protection policies",content:`PRIVACY POLICY

1. DATA COLLECTION
We collect information necessary to provide our audit services:
- Account information and contact details
- Uploaded documents and audit data
- Usage analytics and platform interactions

2. DATA PROTECTION
- All data is encrypted in transit and at rest
- GDPR and CCPA compliant data handling
- Regular security audits and monitoring

3. DATA SHARING
We do not sell or share personal data with third parties except:
- As required by law or regulation
- With explicit user consent
- For legitimate business purposes (anonymized data only)

4. USER RIGHTS
Users have the right to:
- Access their personal data
- Request data correction or deletion
- Opt-out of non-essential communications

Last updated: January 10, 2024`},{id:3,title:"Partner Agreement",type:"partnership",version:"v1.5",lastUpdated:"2023-12-20",status:"active",description:"Terms for AuditDNA integration partners",content:`PARTNER AGREEMENT

1. PARTNERSHIP SCOPE
This agreement governs the relationship between AuditDNA and integration partners.

2. RESPONSIBILITIES
Partner responsibilities include:
- Maintaining data security standards
- Following API usage guidelines
- Providing timely support to mutual clients

3. REVENUE SHARING
- 20% commission on referred business
- Quarterly payments with detailed reporting
- Performance bonuses for top partners

4. INTELLECTUAL PROPERTY
- Shared technology remains with respective owners
- Joint marketing materials require mutual approval

5. TERMINATION
Either party may terminate with 30 days written notice.

Last updated: December 20, 2023`},{id:4,title:"Enterprise License",type:"enterprise",version:"v3.0",lastUpdated:"2024-01-05",status:"active",description:"Enterprise-level service licensing terms",content:`ENTERPRISE LICENSE AGREEMENT

1. LICENSE GRANT
AuditDNA grants enterprise clients an unlimited license to use platform services.

2. ENTERPRISE FEATURES
- Unlimited audit processing
- Dedicated support team
- Custom integrations and APIs
- White-label options
- Advanced security controls

3. SERVICE LEVEL AGREEMENT
- 99.9% uptime guarantee
- 24/7 technical support
- Response time guarantees
- Disaster recovery provisions

4. CUSTOM DEVELOPMENT
- Additional development work billed separately
- Source code escrow available
- Intellectual property assignments

5. PRICING
Enterprise pricing is custom-negotiated based on volume and requirements.

Last updated: January 5, 2024`},{id:5,title:"API Terms of Use",type:"api",version:"v2.3",lastUpdated:"2023-11-30",status:"active",description:"Terms governing API access and usage",content:`API TERMS OF USE

1. API ACCESS
Authorized users may access AuditDNA APIs subject to these terms.

2. USAGE LIMITS
- Rate limiting applies based on subscription tier
- Excessive usage may result in throttling
- Enterprise clients have higher limits

3. ACCEPTABLE USE
APIs must be used for legitimate business purposes only:
- No reverse engineering or unauthorized access
- No reselling of API access
- Compliance with all applicable laws

4. SUPPORT
- API documentation available online
- Technical support during business hours
- Community forums for developer discussion

5. CHANGES
API terms may be updated with 30 days notice to registered developers.

Last updated: November 30, 2023`},{id:6,title:"Data Processing Agreement",type:"privacy",version:"v1.2",lastUpdated:"2023-10-15",status:"archived",description:"GDPR-compliant data processing terms (archived)",content:`DATA PROCESSING AGREEMENT (ARCHIVED)

This version has been superseded by the current Privacy Policy.

Please refer to the current Privacy Policy for up-to-date data processing terms.

Archive date: October 15, 2023`}].filter(s=>a==="all"||s.type===a),c=[{value:"all",label:"All Types"},{value:"service",label:"Service Agreements"},{value:"privacy",label:"Privacy & Data"},{value:"partnership",label:"Partnerships"},{value:"enterprise",label:"Enterprise"},{value:"api",label:"API & Technical"}];return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-slate-800",children:"Legal Agreements"}),e.jsx("p",{className:"text-slate-600 mt-2",children:"Access all AuditDNA legal documents, terms of service, and partnership agreements"})]}),e.jsx("div",{className:"flex items-center gap-4",children:e.jsx("select",{value:a,onChange:s=>n(s.target.value),className:"input w-48",children:c.map(s=>e.jsx("option",{value:s.value,children:s.label},s.value))})})]}),e.jsxs("div",{className:"grid lg:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"lg:col-span-1 space-y-4",children:[e.jsx("h2",{className:"text-xl font-semibold text-slate-800",children:"Documents"}),l.map(s=>e.jsx("div",{onClick:()=>r(s),className:`card cursor-pointer transition-all duration-200 ${(t==null?void 0:t.id)===s.id?"border-blue-500 shadow-md":"hover:shadow-md"}`,children:e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsxs("div",{className:"flex-1",children:[e.jsx("h3",{className:"font-semibold text-slate-800",children:s.title}),e.jsx("p",{className:"text-sm text-slate-600 mt-1",children:s.description}),e.jsxs("div",{className:"flex items-center gap-4 mt-3 text-xs text-slate-500",children:[e.jsx("span",{children:s.version}),e.jsx("span",{children:"•"}),e.jsx("span",{children:s.lastUpdated})]})]}),e.jsx("div",{className:"ml-4",children:e.jsx("span",{className:`badge ${s.status==="active"?"badge-green":"badge-silver"}`,children:s.status})})]})},s.id))]}),e.jsx("div",{className:"lg:col-span-2",children:t?e.jsxs("div",{className:"card",children:[e.jsxs("div",{className:"flex items-center justify-between mb-6",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-bold text-slate-800",children:t.title}),e.jsxs("div",{className:"flex items-center gap-4 mt-2 text-sm text-slate-600",children:[e.jsxs("span",{children:["Version ",t.version]}),e.jsx("span",{children:"•"}),e.jsxs("span",{children:["Last updated: ",t.lastUpdated]}),e.jsx("span",{className:`badge ${t.status==="active"?"badge-green":"badge-silver"}`,children:t.status})]})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{className:"btn-outline",children:"📥 Download PDF"}),e.jsx("button",{className:"btn-primary",children:"📧 Email Copy"})]})]}),e.jsx("div",{className:"prose max-w-none",children:e.jsx("pre",{className:"whitespace-pre-wrap text-sm leading-relaxed text-slate-700 font-sans",children:t.content})})]}):e.jsxs("div",{className:"card text-center py-12",children:[e.jsx("div",{className:"w-16 h-16 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center",children:e.jsx("svg",{className:"w-8 h-8 text-slate-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",children:e.jsx("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"})})}),e.jsx("h3",{className:"text-xl font-semibold text-slate-600 mb-2",children:"Select a Document"}),e.jsx("p",{className:"text-slate-500",children:"Choose an agreement from the list to view its contents"})]})})]}),e.jsxs("div",{className:"grid md:grid-cols-3 gap-6",children:[e.jsxs("div",{className:"card-hover text-center",children:[e.jsx("h3",{className:"font-semibold text-slate-800 mb-2",children:"Need Help?"}),e.jsx("p",{className:"text-sm text-slate-600 mb-4",children:"Questions about our agreements or terms?"}),e.jsx("a",{href:"/admin",className:"btn-outline",children:"Contact Legal Team"})]}),e.jsxs("div",{className:"card-hover text-center",children:[e.jsx("h3",{className:"font-semibold text-slate-800 mb-2",children:"Enterprise Agreements"}),e.jsx("p",{className:"text-sm text-slate-600 mb-4",children:"Custom terms for enterprise clients"}),e.jsx("a",{href:"/admin",className:"btn-primary",children:"Contact Sales"})]}),e.jsxs("div",{className:"card-hover text-center",children:[e.jsx("h3",{className:"font-semibold text-slate-800 mb-2",children:"Updates & Notifications"}),e.jsx("p",{className:"text-sm text-slate-600 mb-4",children:"Stay informed about agreement changes"}),e.jsx("button",{className:"btn-secondary",children:"Subscribe to Updates"})]})]})]})}export{m as default};
