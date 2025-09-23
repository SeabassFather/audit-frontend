import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import USDA from "./pages/USDA";
import Mortgage from "./pages/Mortgage";
import Factoring from "./pages/Factoring";
export default function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-3 border-b border-gray-200">
        {[
          ["/", "Home"],
          ["/usda", "USDA Pricing"],
          ["/services", "Services"],
          ["/mortgage", "Mortgage"],
          ["/factoring", "Factoring"],
        ].map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              "px-2 py-1 rounded-md " +
              (isActive ? "bg-yellow-200" : "hover:bg-gray-100")
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usda" element={<USDA />} />
        <Route path="/services" element={<Services />} />
        <Route path="/mortgage" element={<Mortgage />} />
        <Route path="/factoring" element={<Factoring />} />
      </Routes>
    </BrowserRouter>
  );
}

