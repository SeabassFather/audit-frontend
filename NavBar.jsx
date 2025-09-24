import { NavLink } from "react-router-dom";

const base =
  "nav-link px-3 py-2 rounded text-sm font-medium transition-colors";
const idle =
  base + " text-white/80 hover:text-white hover:bg-white/10";
const active =
  base + " text-white bg-white/20";

export default function Navbar() {
  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/modules", label: "Modules" },
    { to: "/services", label: "Services" },
    { to: "/engines", label: "Engines" },
    { to: "/findings", label: "Findings" },
    { to: "/results", label: "Results" },
    { to: "/admin", label: "Admin" },
    { to: "/login", label: "Login" },
    { to: "/mortgage-search", label: "Mortgage Search" },
    { to: "/ag-market", label: "Ag Market" },
    { to: "/trade-finance", label: "Trade Finance" },
  ];

  return (
    <header className="bg-blue-600 text-white">
      <nav className="container flex items-center gap-1 py-2">
        <div className="mr-2 flex items-center gap-2">
          <div className="h-7 w-7 rounded bg-white/20 grid place-items-center font-bold">
            AD
          </div>
          <span className="hidden sm:block font-semibold">AuditDNA</span>
        </div>

        <div className="flex flex-wrap items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) => (isActive ? active : idle)}
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}