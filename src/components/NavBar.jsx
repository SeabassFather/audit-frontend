import { NavLink } from "react-router-dom";

export default function Navbar(){
  const base="px-3 py-1.5 rounded-lg text-sm font-medium transition";
  const active=base+" bg-white text-dnaBlue";
  const idle=base+" text-white/90 hover:bg-white/20";

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-dnaBlue">
        <div className="container px-4 py-3 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/20 grid place-items-center font-bold text-white">AD</div>
          <div className="text-white font-semibold">AuditDNA</div>
          <nav className="ml-6 flex flex-wrap gap-2">
            <NavLink to="/" end className={({isActive})=>isActive?active:idle}>Dashboard</NavLink>
            <NavLink to="/services" className={({isActive})=>isActive?active:idle}>Services</NavLink>
            <NavLink to="/engines" className={({isActive})=>isActive?active:idle}>Engines</NavLink>
            <NavLink to="/findings" className={({isActive})=>isActive?active:idle}>Findings</NavLink>
            <NavLink to="/results" className={({isActive})=>isActive?active:idle}>Results</NavLink>
            <NavLink to="/mortgage-search" className={({isActive})=>isActive?active:idle}>Mortgage</NavLink>
            <NavLink to="/ag-market" className={({isActive})=>isActive?active:idle}>Ag</NavLink>
            <NavLink to="/trade-finance" className={({isActive})=>isActive?active:idle}>Trade Finance</NavLink>
            <NavLink to="/pricing" className={({isActive})=>isActive?active:idle}>USDA</NavLink>
            <NavLink to="/mortgage" className={({isActive})=>isActive?active:idle}>Legacy Mortgage</NavLink>
            <NavLink to="/factoring" className={({isActive})=>isActive?active:idle}>Factoring</NavLink>
            <NavLink to="/tickers" className={({isActive})=>isActive?active:idle}>Tickers</NavLink>
            <NavLink to="/caseflow" className={({isActive})=>isActive?active:idle}>CaseFlow</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
}