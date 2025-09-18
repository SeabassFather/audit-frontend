export default function Footer(){
  return (
    <footer className="border-t border-gray-200 bg-white/70">
      <div className="container px-4 py-6 text-center">
        <div className="text-base font-semibold">AuditDNA Platform</div>
        <div className="text-sm text-gray-600">CFPB-aware • NMLS #137694 • © ' + (Get-Date).Year + ' All Rights Reserved</div>
      </div>
    </footer>
  );
}