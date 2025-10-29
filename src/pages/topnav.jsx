import { Link, NavLink } from "react-router-dom";

function Tab({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `px-3 py-2 font-medium ${
          isActive
            ? "border-b-2 border-[var(--primary)] text-[var(--primary)]"
            : "text-[var(--muted)] hover:text-[var(--primary)]"
        }`
      }
    >
      {children}
    </NavLink>
  );
}

export default function TopNav() {
  return (
    <div
      className="sticky top-0 z-40 border-b border-[var(--border)]"
      style={{ background: "var(--panel-2)" }}
    >
      <div className="max-w-7xl mx-auto flex gap-4 items-center px-4 py-3">
        <Link
          to="/"
          style={{
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "var(--primary)",
            textDecoration: "none",
          }}
        >
          AUDITDNA
        </Link>
        <Tab to="/">Home</Tab>
        <Tab to="/services">Services</Tab>
        <Tab to="/usda">USDA Pricing</Tab>
        <Tab to="/mortgage/search">Mortgage</Tab>
        <Tab to="/mortgage/mexico">Mortgage (USAÃ¢â€ â€™MX)</Tab>
        <Tab to="/realestate/mx">Real Estate (MX)</Tab>
        <Tab to="/trade/factoring">Factoring</Tab>
        <Tab to="/water">Water</Tab>
        <Tab to="/files">Files</Tab>
        <Tab to="/docusign">DocuSign</Tab>
        <Tab to="/admin">Admin</Tab>
      </div>
    </div>
  );
}
