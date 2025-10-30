# setup-auditdna-ui.ps1
# Creates AuditDNA UI/UX scaffolding for Task 1

$src = "src"
$components = "$src\components"
$pages = "$src\pages"

# Create folder structure
New-Item -Path $src -ItemType Directory -Force | Out-Null
New-Item -Path $components -ItemType Directory -Force | Out-Null
New-Item -Path $pages -ItemType Directory -Force | Out-Null

# Layout.js
@"
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
"@ | Set-Content "$components\Layout.js"

# Navbar.js
@"
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="navbar">
    <div className="logo">AuditDNA</div>
    <ul>
      <li><Link to="/">Dashboard</Link></li>
      <li><Link to="/trade-portal">Trade Portal</Link></li>
    </ul>
    <div className="profile-menu">
      {/* Profile/Notification icons here */}
    </div>
  </nav>
);

export default Navbar;
"@ | Set-Content "$components\Navbar.js"

# Footer.js
@"
import React from "react";

const Footer = () => (
  <footer>
    <div>
      © 2024 AuditDNA. All rights reserved. | Licensed Financial Services Provider
    </div>
    <div>
      NMLS ID: 123456 | Equal Housing Opportunity
    </div>
  </footer>
);

export default Footer;
"@ | Set-Content "$components\Footer.js"

# Dashboard.js
@"
import React from "react";

const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <p>Advanced audit and compliance solutions for mortgage, agriculture, and trade finance industries.</p>
    {/* Add widgets, charts, or dashboard UI as needed */}
  </div>
);

export default Dashboard;
"@ | Set-Content "$pages\Dashboard.js"

# TradePortal.js
@"
import React from "react";

const TradePortal = () => (
  <div>
    <h1>Trade Portal</h1>
    <p>Search, connect, and manage trades efficiently with AuditDNA’s Trade Portal.</p>
    {/* Add trade portal search/forms/components here */}
  </div>
);

export default TradePortal;
"@ | Set-Content "$pages\TradePortal.js"

# App.js
@"
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import TradePortal from "./pages/TradePortal";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/trade-portal" element={<TradePortal />} />
        </Routes>
      </Layout>
    </Router>
  );
}
export default App;
"@ | Set-Content "$src\App.js"

# index.js
@"
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
"@ | Set-Content "$src\index.js"

# index.css
@"
body {
  margin: 0;
  font-family: 'Roboto', Arial, sans-serif;
  background: #fafbfc;
  color: #23272f;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 4px #ececec;
  padding: 0.5rem 2rem;
}
.navbar .logo {
  font-weight: bold;
  color: #1fa637;
  font-size: 1.3rem;
}
.navbar ul {
  list-style: none;
  display: flex;
  gap: 1.5rem;
  margin: 0;
  padding: 0;
}
.navbar ul li a {
  text-decoration: none;
  color: #23272f;
  font-weight: 500;
}
.navbar ul li a.active {
  color: #1fa637;
  border-bottom: 2px solid #1fa637;
}
footer {
  background: #f7f7f7;
  color: #555;
  text-align: center;
  padding: 1.5rem 0 0.8rem 0;
  margin-top: 2.5rem;
  border-top: 1px solid #eaeaea;
  font-size: 0.95rem;
}
"@ | Set-Content "$src\index.css"