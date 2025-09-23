import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
// ... [all imports from previous Copilot response] ...
export default function App() {
  return (
    <div className="app-grid">
      <Navbar />
      <Sidebar />
      <main className="main-content">
        <Routes>
          {/* [all routes from previous Copilot response] */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
