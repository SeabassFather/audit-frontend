export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white border-b shadow-sm px-6 py-3">
      <div className="font-bold text-blue-700">AuditDNA ELITE</div>
      <div className="flex gap-4 text-sm">
        <a href="/usda" className="hover:text-blue-600">USDA</a>
        <a href="/mortgage" className="hover:text-blue-600">Mortgage</a>
        <a href="/factoring" className="hover:text-blue-600">Factoring</a>
        <a href="/compliance" className="hover:text-blue-600">Compliance</a>
        <a href="/watertech" className="hover:text-blue-600">WaterTech</a>
        <a href="/mexico-finance" className="hover:text-blue-600">Mexico Finance</a>
        <a href="/reports" className="hover:text-blue-600">Reports</a>
      </div>
    </nav>
  );
}
