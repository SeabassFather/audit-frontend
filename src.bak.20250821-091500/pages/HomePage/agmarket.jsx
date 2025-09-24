// App.jsx — AuditDNA single-file React UI (BrowserRouter + safe basename for Netlify)
// Drop into: src/App.jsx
// Requires: react, react-dom, react-router-dom, lucide-react, recharts
// Clean URLs with BrowserRouter; robust basename detection with NO use of new URL().

import React, { useMemo, useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import {
  Shield,
  Home as HomeIcon,
  BarChart3,
  Building2,
  Leaf,
  Crown,
  Files,
  Settings as SettingsIcon,
  Search,
  Filter,
  TrendingUp,
  DollarSign,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/************************************
 * BASENAME (no URL constructor)     *
 ************************************/
export function sanitizePathBase(input) {
  if (typeof input !== "string") return "";
  let s = input.trim();
  if (!s) return "";
  s = s.replace(/\\+/g, "/");
  s = s.replace(/^[a-z]+:\/\/[\w.-]+(?::\d+)?/i, "");
  s = s.replace(/^file:\/\/.+?(?=\/)/i, "");
  if (!s.startsWith("/")) return "";
  if (s.length > 1 && s.endsWith("/")) s = s.slice(0, -1);
  return s;
}
function detectBasename() {
  try {
    const env =
      (typeof process !== "undefined" &&
        process.env &&
        process.env.PUBLIC_URL) ||
      "";
    const fromEnv = sanitizePathBase(env);
    if (fromEnv) return fromEnv;
    if (typeof document !== "undefined") {
      const el = document.querySelector("base[href]");
      if (el) {
        const href = el.getAttribute("href") || "";
        const fromBase = sanitizePathBase(href);
        if (fromBase) return fromBase;
      }
    }
  } catch {}
  return "";
}

/************************************
 * ERROR BOUNDARY & DEV DIAGNOSTICS *
 ************************************/
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {}
  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 16,
            color: "#fff",
            background: "#2a1b1b",
            border: "1px solid #5b2c2c",
            borderRadius: 12,
          }}
        >
          <h3 style={{ marginTop: 0 }}>UI crashed</h3>
          <div
            style={{
              whiteSpace: "pre-wrap",
              fontFamily:
                'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
          >
            {String(this.state.error)}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const DevDiagnostics = () => {
  const checks = [];
  const push = (name, pass, note = "") => checks.push({ name, pass, note });
  push("styles defined", !!styles && typeof styles === "object");
  push("styles.card defined", !!styles.card && typeof styles.card === "object");
  push(
    "styles.cardHead defined",
    !!styles.cardHead && typeof styles.cardHead === "object",
  );

  // Basename function tests (runtime test cases)
  const cases = [
    { in: "", out: "" },
    { in: "/", out: "/" },
    { in: "/app", out: "/app" },
    { in: "/app/", out: "/app" },
    { in: "app", out: "" },
    { in: "https://example.com/app/", out: "/app" },
    { in: "http://example.com", out: "" },
    { in: "file:///C:/site/", out: "" },
    { in: "C:\\Users\\Admin", out: "" },
  ];
  const results = cases.map((c) => ({ ...c, got: sanitizePathBase(c.in) }));
  const allPass = results.every((r) => r.got === r.out);
  push(
    "sanitizePathBase test cases",
    allPass,
    allPass ? "" : JSON.stringify(results),
  );

  // Chart data shape tests (26 weeks)
  const sample = generateWeeklySeries("Tomatoes", 2024);
  push(
    "Tomatoes 2024 has 26 weeks",
    Array.isArray(sample) && sample.length === 26,
  );
  push(
    "Weeks labeled W1..W26",
    sample[0]?.week === "W1" && sample[25]?.week === "W26",
  );

  return (
    <div style={{ marginTop: 16 }}>
      <details>
        <summary>Diagnostics</summary>
        <ul style={{ margin: "8px 0 0 18px" }}>
          {checks.map((c, i) => (
            <li
              key={i}
              data-testid={`diag-${i}`}
              style={{ color: c.pass ? "#9BE29B" : "#FF9B9B" }}
            >
              {c.pass ? "PASS" : "FAIL"} — {c.name}
              {c.note ? ` — ${c.note}` : ""}
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
};

/****************
 * DATA & UTILS  *
 ****************/
const YEARS = [2020, 2021, 2022, 2023, 2024];
const COMMODITIES = [
  { id: "Tomatoes", name: "Tomatoes" },
  { id: "Avocado", name: "Avocado" },
  { id: "Strawberries", name: "Strawberries" },
  { id: "Pineapple", name: "Pineapple" },
  { id: "Papaya", name: "Papaya" },
  { id: "Roma Tomato", name: "Roma Tomato" },
  { id: "Oranges — Navels", name: "Oranges — Navels" },
  { id: "Oranges — Valencia", name: "Oranges — Valencia" },
  { id: "Green Beans", name: "Green Beans" },
  { id: "Romaine", name: "Romaine" },
];

// Deterministic pseudo-random (seed by commodity+year)
function seed(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function randBetween(rng, min, max) {
  // simple LCG
  rng = (rng * 48271) % 0x7fffffff;
  const n = min + (rng / 0x7fffffff) * (max - min);
  return [n, rng];
}
function baseForCommodity(c) {
  switch (c) {
    case "Tomatoes":
      return 17.5;
    case "Avocado":
      return 22.8;
    case "Strawberries":
      return 12.7;
    case "Pineapple":
      return 9.1;
    case "Papaya":
      return 8.0;
    case "Roma Tomato":
      return 14.0;
    case "Oranges — Navels":
      return 14.3;
    case "Oranges — Valencia":
      return 13.9;
    case "Green Beans":
      return 10.2;
    case "Romaine":
      return 9.0;
    default:
      return 10;
  }
}
export function generateWeeklySeries(commodity, year) {
  const s = seed(`${commodity}-${year}`);
  let rng = s;
  const base = baseForCommodity(commodity);
  const arr = [];
  for (let w = 1; w <= 26; w++) {
    // gentle seasonal trend + noise
    const seasonal =
      Math.sin((w / 26) * Math.PI * 2) *
      (commodity.includes("Avocado") ? 2.5 : 1.8);
    let n;
    [n, rng] = randBetween(rng, -0.6, 0.6);
    const yearAdj = (year - 2020) * 0.35;
    const value = +(base + seasonal + yearAdj + n).toFixed(2);
    arr.push({ week: `W${w}`, value });
  }
  return arr;
}

function mergeForChart(selected, year) {
  const weeks = Array.from({ length: 26 }, (_, i) => `W${i + 1}`);
  return weeks.map((week) => {
    const row = { week };
    selected.forEach((name) => {
      const series = generateWeeklySeries(name, year);
      const point = series.find((p) => p.week === week);
      row[name] = point ? point.value : null;
    });
    return row;
  });
}

/****************
 * UI HELPERS    *
 ****************/
const Card = ({ title, icon: Icon, actions, children }) => (
  <div style={styles.card}>
    <div style={styles.cardHead}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Icon && (typeof Icon === "function" || typeof Icon === "object") ? (
          <Icon size={18} />
        ) : null}
        {title ? <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3> : null}
      </div>
      <div>{actions}</div>
    </div>
    <div style={{ padding: 16 }}>{children}</div>
  </div>
);

const Pill = ({ active = false, onClick, children }) => (
  <button
    onClick={onClick}
    style={{
      ...styles.pill,
      ...(active
        ? { background: "#1a2240", borderColor: "#2f3d68", color: "#fff" }
        : {}),
      cursor: "pointer",
    }}
  >
    {children}
  </button>
);

/****************
 * SEED SERVICE DATA (unchanged)    *
 ****************/
const SERVICE_DATA = [
  {
    id: "consumer",
    title: "Consumer Protection",
    icon: Shield,
    items: [
      { code: "CS001", name: "Mortgage Loan Audit" },
      { code: "CS002", name: "Escrow Fee Reconciliation" },
      { code: "CS003", name: "Promissory Note Audit" },
      { code: "CS004", name: "Servicing Audit" },
      { code: "CS005", name: "Insurance Premium Refunds" },
      { code: "CS006", name: "Credit Card Rate/Fee Review" },
      { code: "CS007", name: "Subscription/App Fee Audit" },
      { code: "CS008", name: "Utilities Bill Audit" },
    ],
  },
  {
    id: "commercial",
    title: "Commercial & Business",
    icon: Building2,
    items: [
      { code: "CB101", name: "Accounts Payable Audit" },
      { code: "CB102", name: "Vendor Overcharge Recovery" },
      { code: "CB103", name: "Logistics & Freight Audit" },
      { code: "CB104", name: "PCI & Data Compliance Check" },
    ],
  },
  {
    id: "ag",
    title: "Agriculture & Trade",
    icon: Leaf,
    items: [
      { code: "AG201", name: "Produce Marketplace (USDA AMS)" },
      { code: "AG202", name: "Factoring & Receivables" },
      { code: "AG203", name: "Food Safety (Primus/GlobalG.A.P.)" },
      { code: "AG204", name: "Export/Import Compliance" },
    ],
  },
];

/****************
 * PAGES         *
 ****************/
const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card title="Welcome to AuditDNA" icon={HomeIcon}>
        <p style={styles.p}>
          Frontend-only build. Netlify-friendly. Keep deploying while you build
          — no need to "finish" first.
        </p>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button
            style={styles.btnPrimary}
            onClick={() => navigate("/ag-market")}
          >
            Open Ag Market (USDA)
          </button>
          <button style={styles.btn} onClick={() => navigate("/lender-match")}>
            Open Lender Match
          </button>
          <button style={styles.btn} onClick={() => navigate("/elite")}>
            Open AuditDNA Elite
          </button>
          <button style={styles.btn} onClick={() => navigate("/services")}>
            Browse Services
          </button>
        </div>
        <DevDiagnostics />
      </Card>
    </div>
  );
};

const Elite = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <Card title="AuditDNA Elite — Priority Panel" icon={Crown}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Pill>VIP Intake</Pill>
        <Pill>Rapid Case Builder</Pill>
        <Pill>Discovery & Evidence Locker</Pill>
        <Pill>Attorney/CPA Relay</Pill>
      </div>
    </Card>
  </div>
);

/****************
 * NEW: AgMarket — Chart ON TOP, Search UNDER chart
 ****************/
const AgMarket = () => {
  const [year, setYear] = useState(2024);
  const [selected, setSelected] = useState([
    "Tomatoes",
    "Avocado",
    "Strawberries",
    "Pineapple",
    "Papaya",
    "Roma Tomato",
  ]);
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState("");

  // Attempt to fetch backend data (non-blocking); if it fails we stay on demo data
  async function tryFetch(commodity) {
    setFetchError("");
    try {
      const res = await fetch(
        `/api/market/avg?commodity=${encodeURIComponent(commodity)}&year=${year}`,
        { method: "GET" },
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const payload = await res.json();
      // expected payload: [{ week: 'W1', value: 12.3 }, ...] length 26
      if (!Array.isArray(payload) || payload.length !== 26)
        throw new Error("Unexpected payload");
      return payload;
    } catch (e) {
      setFetchError(
        `TypeError: Failed to fetch — using demo data (${commodity})`,
      );
      return generateWeeklySeries(commodity, year);
    }
  }

  const chartData = useMemo(
    () => mergeForChart(selected, year),
    [selected, year],
  );

  const toggle = (name) => {
    setSelected((s) =>
      s.includes(name) ? s.filter((x) => x !== name) : [...s, name],
    );
  };
  const addBySearch = () => {
    const match = COMMODITIES.find(
      (c) => c.name.toLowerCase() === search.trim().toLowerCase(),
    );
    if (match && !selected.includes(match.name))
      setSelected((s) => [...s, match.name]);
    setSearch("");
  };

  return (
    <div style={{ display: "grid", gap: 16 }}>
      {/* Chart card pinned ON TOP */}
      <Card
        title="Elite Multi-Commodity Pricing (USDA)"
        icon={BarChart3}
        actions={
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={styles.kvLabel}>Year</div>
            <select
              style={styles.select}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
            >
              {YEARS.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        }
      >
        {fetchError && (
          <div style={{ color: "#ff6b6b", marginBottom: 8 }}>{fetchError}</div>
        )}
        <ResponsiveContainer width="100%" height={360}>
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="week"
              label={{ value: "Weeks", position: "insideBottom", offset: -2 }}
            />
            <YAxis
              label={{
                value: "USD per unit (weekly)",
                angle: -90,
                position: "insideLeft",
              }}
              domain={[0, "auto"]}
            />
            <Tooltip />
            <Legend />
            {selected.map((name) => (
              <Line
                key={name}
                type="monotone"
                dataKey={name}
                dot={false}
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        <div style={{ opacity: 0.7, fontSize: 12, marginTop: 8 }}>
          Tip: Toggle buttons to compare commodities. Values fall back to demo
          series until your backend <code>/api/market/avg</code> is wired to
          USDA pricing.
        </div>
      </Card>

      {/* SEARCH engine placed UNDER the chart, per request */}
      <Card
        title="Search & Toggle Commodities"
        icon={Search}
        actions={
          <div style={{ display: "flex", gap: 8 }}>
            <input
              list="commodities"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Type a commodity (e.g., Papaya)"
              style={styles.input}
            />
            <datalist id="commodities">
              {COMMODITIES.map((c) => (
                <option key={c.id} value={c.name} />
              ))}
            </datalist>
            <button style={styles.btnPrimary} onClick={addBySearch}>
              Add
            </button>
          </div>
        }
      >
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {COMMODITIES.map((c) => (
            <Pill
              key={c.id}
              active={selected.includes(c.name)}
              onClick={() => toggle(c.name)}
            >
              {c.name}
            </Pill>
          ))}
        </div>
      </Card>
    </div>
  );
};

const Services = () => {
  const [open, setOpen] = useState({});
  useEffect(() => {
    if (!Object.keys(open).length && SERVICE_DATA.length)
      setOpen({ [SERVICE_DATA[0].id]: true });
  }, [open]);
  return (
    <div style={{ display: "grid", gap: 16 }}>
      {SERVICE_DATA.map((cat) => (
        <div key={cat.id} style={styles.group}>
          <button
            onClick={() => setOpen((o) => ({ ...o, [cat.id]: !o[cat.id] }))}
            style={styles.groupHead}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {cat.icon &&
              (typeof cat.icon === "function" || typeof cat.icon === "object")
                ? React.createElement(cat.icon, { size: 18 })
                : null}
              <strong>{cat.title}</strong>
            </div>
            {open[cat.id] ? (
              <ChevronDown size={18} />
            ) : (
              <ChevronRight size={18} />
            )}
          </button>
          {open[cat.id] && (
            <div style={styles.groupBody}>
              {cat.items.map((item) => (
                <div key={item.code} style={styles.row}>
                  <span>{item.name}</span>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={styles.btn}>Start</button>
                    <button style={styles.btnGhost}>Details</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const LenderMatch = () => {
  const [filters, setFilters] = useState({
    product: "Purchase",
    score: 620,
    state: "CA",
  });
  const results = useMemo(() => {
    return LENDER_DATA.filter(
      (l) =>
        l.products.includes(filters.product) &&
        l.minScore <= filters.score &&
        l.states.includes(filters.state),
    );
  }, [filters]);

  const set = (k, v) => setFilters((f) => ({ ...f, [k]: v }));

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <Card title="Lender Matching (Local Only)" icon={Search}>
        <div style={styles.grid4}>
          <div>
            <div style={styles.kvLabel}>Scenario</div>
            <select
              style={styles.input}
              value={filters.product}
              onChange={(e) => set("product", e.target.value)}
            >
              <option>Purchase</option>
              <option>Refi</option>
              <option>Cash-out Refi</option>
              <option>HELOC</option>
              <option>2nd Mortgage</option>
            </select>
          </div>
          <div>
            <div style={styles.kvLabel}>Credit Score</div>
            <input
              type="number"
              style={styles.input}
              value={filters.score}
              onChange={(e) => set("score", Number(e.target.value || 0))}
            />
          </div>
          <div>
            <div style={styles.kvLabel}>Property State</div>
            <select
              style={styles.input}
              value={filters.state}
              onChange={(e) => set("state", e.target.value)}
            >
              <option>CA</option>
              <option>NV</option>
              <option>AZ</option>
              <option>OR</option>
            </select>
          </div>
          <div style={{ alignSelf: "end" }}>
            <button style={styles.btn}>
              <Filter size={16} /> Apply
            </button>
          </div>
        </div>
      </Card>

      <Card title={`Results (${results.length})`} icon={CheckCircle2}>
        <div style={{ overflowX: "auto" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Lender</th>
                <th>Products</th>
                <th>Min Score</th>
                <th>Max LTV</th>
                <th>States</th>
                <th>Notes</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>{r.products.join(", ")}</td>
                  <td>{r.minScore}</td>
                  <td>{r.maxLTV}%</td>
                  <td>{r.states.join(", ")}</td>
                  <td>{r.notes}</td>
                  <td>
                    <button style={styles.btnPrimary}>Start</button>
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr>
                  <td colSpan={7} style={{ opacity: 0.7 }}>
                    No lenders for current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

const ComplianceDocs = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <Card title="Compliance Docs" icon={Files}>
      <div style={styles.grid3}>
        <div style={styles.tile}>CFPB Complaint Pack</div>
        <div style={styles.tile}>FDCPA/Debt Validation</div>
        <div style={styles.tile}>UCC Dispute Letters</div>
      </div>
    </Card>
  </div>
);

const SettingsPage = () => (
  <div style={{ display: "grid", gap: 16 }}>
    <Card title="Settings" icon={SettingsIcon}>
      <div style={styles.grid2}>
        <div>
          <div style={styles.kvLabel}>Theme</div>
          <select style={styles.input} defaultValue="Light">
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>
        <div>
          <div style={styles.kvLabel}>Locale</div>
          <select style={styles.input} defaultValue="en-US">
            <option>en-US</option>
            <option>es-MX</option>
          </select>
        </div>
      </div>
    </Card>
  </div>
);

/****************
 * LAYOUT        *
 ****************/
const Shell = ({ children }) => (
  <div style={styles.app}>
    <TopNav />
    <main style={styles.main}>{children}</main>
    <footer style={styles.footer}>
      © {new Date().getFullYear()} AuditDNA — Frontend preview
    </footer>
  </div>
);

const TopNav = () => {
  const tabs = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/ag-market", label: "Ag Market", icon: Leaf },
    { to: "/lender-match", label: "Lender Match", icon: Search },
    { to: "/elite", label: "Elite", icon: Crown },
    { to: "/services", label: "Services", icon: Shield },
    { to: "/docs", label: "Compliance Docs", icon: Files },
    { to: "/settings", label: "Settings", icon: SettingsIcon },
  ];
  return (
    <header style={styles.header}>
      <div
        style={{
          fontWeight: 800,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Shield size={18} /> AuditDNA
      </div>
      <nav style={styles.nav}>
        {tabs.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end
            style={({ isActive }) => ({
              ...styles.navBtn,
              ...(isActive ? styles.navBtnActive : {}),
            })}
          >
            {typeof t.icon === "function" || typeof t.icon === "object" ? (
              <t.icon size={16} />
            ) : null}
            <span>{t.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

/****************
 * APP           *
 ****************/
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={detectBasename()}>
        <Shell>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ag-market" element={<AgMarket />} />
            <Route path="/lender-match" element={<LenderMatch />} />
            <Route path="/elite" element={<Elite />} />
            <Route path="/services" element={<Services />} />
            <Route path="/docs" element={<ComplianceDocs />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Shell>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

/****************
 * STYLES        *
 ****************/
const styles = {
  app: {
    minHeight: "100vh",
    background: "#0b0f1a",
    color: "#e6e9ef",
    display: "grid",
    gridTemplateRows: "auto 1fr auto",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
    borderBottom: "1px solid #1f2a44",
    position: "sticky",
    top: 0,
    background: "#0b0f1a",
    zIndex: 10,
  },
  nav: { display: "flex", gap: 8, flexWrap: "wrap" },
  navBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "8px 10px",
    borderRadius: 999,
    textDecoration: "none",
    color: "#c6d0f5",
    border: "1px solid #24304f",
  },
  navBtnActive: {
    background: "#1a2240",
    color: "#fff",
    borderColor: "#2f3d68",
  },
  main: { padding: 16, maxWidth: 1200, width: "100%", margin: "0 auto" },
  footer: {
    borderTop: "1px solid #1f2a44",
    padding: 12,
    textAlign: "center",
    opacity: 0.6,
  },

  card: {
    background: "#0f1424",
    border: "1px solid #1b2746",
    borderRadius: 14,
    overflow: "hidden",
  },
  cardHead: {
    padding: "12px 16px",
    borderBottom: "1px solid #1b2746",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  p: { margin: "8px 0 0 0", opacity: 0.9 },
  kvLabel: { fontSize: 12, opacity: 0.7, marginBottom: 6 },
  kvRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 16,
  },

  table: { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    borderBottom: "1px solid #1b2746",
  },
  group: { border: "1px solid #1b2746", borderRadius: 12, overflow: "hidden" },
  groupHead: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 12px",
    background: "#0f1424",
    cursor: "pointer",
    border: "none",
    color: "#e6e9ef",
  },
  groupBody: {},

  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 12,
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: 12,
  },

  tile: {
    border: "1px solid #1b2746",
    borderRadius: 12,
    padding: 12,
    background: "#0b1120",
  },

  btn: {
    background: "transparent",
    border: "1px solid #2a3964",
    color: "#c6d0f5",
    padding: "8px 10px",
    borderRadius: 10,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },
  btnGhost: {
    background: "transparent",
    border: "1px dashed #2a3964",
    color: "#c6d0f5",
    padding: "8px 10px",
    borderRadius: 10,
    cursor: "pointer",
  },
  btnPrimary: {
    background: "#2b5cff",
    border: "1px solid #2b5cff",
    color: "white",
    padding: "8px 12px",
    borderRadius: 10,
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
  },

  input: {
    background: "#0b1120",
    border: "1px solid #2a3964",
    color: "#e6e9ef",
    padding: "8px 10px",
    borderRadius: 10,
    width: "100%",
  },
  select: {
    background: "#0b1120",
    border: "1px solid #2a3964",
    color: "#e6e9ef",
    padding: "8px 10px",
    borderRadius: 10,
  },
  pill: {
    background: "#132045",
    border: "1px solid #2a3964",
    color: "#c6d0f5",
    padding: "6px 10px",
    borderRadius: 999,
  },
};
