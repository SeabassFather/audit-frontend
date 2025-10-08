export default function Compliance(){
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Compliance Dashboard</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li>TRID  TILA-RESPA Integrated Disclosure</li>
        <li>ECOA  Equal Credit Opportunity Act</li>
        <li>CCPA  California Consumer Privacy Act</li>
        <li>GDPR  General Data Protection Regulation</li>
        <li>GLBA  Gramm-Leach-Bliley Act</li>
        <li>PDPA  Personal Data Protection Act</li>
      </ul>
      <p className="mt-6 text-gray-600">Upload compliance docs and run audits here.</p>
    </div>
  );
}


