import { NavLink } from "react-router-dom";
export default function Navbar(){
 const base="px-3 py-1.5 rounded-lg text-sm font-medium transition";
 const active=base+" bg-white text-dnaBlue";
 const idle=base+" text-white/90 hover:bg-white/20";
 const isAuthed = !!localStorage.getItem("auth_token");
 return (
 <header className="sticky top-0 z-40">
 <div className="bg-dnaBlue">
 <div className="container px-3 md:px-4 py-3 flex items-center gap-2">
 <div className="w-9 h-9 rounded-lg bg-white/20 grid place-items-center font-bold text-white">AD</div>
 <div className="text-white font-semibold">AuditDNA</div>
 <nav className="ml-2 md:ml-6 flex flex-wrap gap-1 md:gap-2">
 <NavLink to="/" end className={({isActive})=>isActive?active:idle}>Dashboard</NavLink>
 <NavLink to="/modules" className={({isActive})=>isActive?active:idle}>Modules</NavLink>
 <NavLink to="/services" className={({isActive})=>isActive?active:idle}>Services</NavLink>
 <NavLink to="/engines" className={({isActive})=>isActive?active:idle}>Engines</NavLink>
 <NavLink to="/findings" className={({isActive})=>isActive?active:idle}>Findings</NavLink>
 <NavLink to="/results" className={({isActive})=>isActive?active:idle}>Results</NavLink>
 <NavLink to="/admin" className={({isActive})=>isActive?active:idle}>Admin</NavLink>
 {isAuthed
 ? <button onClick={()=>{localStorage.removeItem("auth_token");location.href="/login"}} className={idle}>Logout</button>
 : <NavLink to="/login" className={({isActive})=>isActive?active:idle}>Login</NavLink>}
 <NavLink to="/mortgage-search" className={({isActive})=>isActive?active:idle}>Mortgage Search</NavLink>n <NavLink to="/ag-market" className={({isActive})=>isActive?active:idle}>Ag Market</NavLink>n <NavLink to="/trade-finance" className={({isActive})=>isActive?active:idle}>Trade Finance</NavLink>n <NavLink to="/usda" className={({isActive})=>isActive?active:idle}>USDA</NavLink>
 </nav>
 </div>
 </div>
 </header>
 );
}

