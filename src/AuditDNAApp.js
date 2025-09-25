import React, { useState } from "react";
import {
  BarChart3, Shield, FileText, Upload, Search as SearchIcon, TrendingUp, Leaf, CreditCard, DollarSign
} from "lucide-react";
import servicesCatalogue from "./auditdna-services-catalogue"; // 285+ services, 10 pillars/categories
import AuditDNAApiService from "./audit-dna-search"; // your API search/upload class

const proModules = [
  {
    key: "mortgage",
    label: "Mortgage/Factoring Search",
    color: "#00ff88",
    icon: <BarChart3 size={22} />, 
    desc: "US/Mexico cross-border loan & factoring engine.",
  },
  {
    key: "usda",
    label: "USDA 5-Year Avg Pricing",
    color: "#4a96ff",
    icon: <TrendingUp size={22} />, 
    desc: "Commodity pricing dashboard with 5yr overlay.",
  },
  {
    key: "water",
    label: "Water Tech Upload/Analysis",
    color: "#84cc16",
    icon: <Leaf size={22} />, 
    desc: "Lab PDF/CSV upload, analytics, compliance.",
  },
  {
    key: "compliance",
    label: "Global Compliance & Ethics",
    color: "#ffb347",
    icon: <Shield size={22} />, 
    desc: "Search regulations, export briefing kits.",
  }
];

// Accordion Section for Left Pane
function AccordionNav({ categories, active, setActive, onSelectService }) {
  return (
    <aside className="accordion-nav">
      {categories.map(cat => (
        <div key={cat.key} className="accordion-section">
          <button
            className={`accordion-header${active === cat.key ? " active" : ""}`}
            onClick={() => setActive(cat.key)}
            style={{ borderLeftColor: cat.color }}
          >
            <span className="icon">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
          {active === cat.key && (
            <div className="accordion-body">
              {cat.services.map((svc, i) => (
                <div key={svc} className="accordion-service">
                  <button
                    className="service-link"
                    onClick={() => onSelectService(cat, svc)}
                  >
                    {svc}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </aside>
  );
}

// Main Service Panel (per service)
function ServicePanel({ category, service, uploading, uploadSuccess, uploadError, handleUpload }) {
  return (
    <div className="service-panel">
      <div className="title">{service}</div>
      <div className="desc">
        Upload all required documentation to begin your <b>{service}</b> audit/compliance verification.
      </div>
      <div>
        <input
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.jpg,.png"
          style={{ display: "none" }}
          id={`upload-${service}`}
          onChange={e => handleUpload(e, service)}
          disabled={uploading}
        />
        <label htmlFor={`upload-${service}`}> 
          <button className="upload-btn" disabled={uploading}>
            <Upload className="w-5 h-5" />
            {uploading ? "Uploading..." : "Upload Documentation"}
          </button>
        </label>
        {uploadSuccess && (
          <div className="upload-success">Upload successful!</div>
        )}
        {uploadError && (
          <div className="upload-error">Upload failed. Try again.</div>
        )}
      </div>
    </div>
  );
}

// Top Pro Module Row
function ProModuleRow({ modules, activeModule, setActiveModule }) {
  return (
    <div className="pro-modules-row">
      {modules.map(mod =>
        <button
          className={`pro-module-btn${activeModule === mod.key ? " active" : ""}`}
          key={mod.key}
          onClick={() => setActiveModule(mod.key)}
          style={{
            borderColor: activeModule === mod.key ? mod.color : "#232d44",
            color: activeModule === mod.key ? mod.color : undefined
          }}
        >
          {mod.icon}
          <span>{mod.label}</span>
        </button>
      )}
    </div>
  );
}

// Main Dashboard Layout
export default function AuditDNAApp() {
  const [activeCategory, setActiveCategory] = useState(servicesCatalogue[0].key);
  const [selectedService, setSelectedService] = useState({ category: servicesCatalogue[0], service: servicesCatalogue[0].services[0] });
  const [activeModule, setActiveModule] = useState(null); // null = show service panel
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  // Upload Handler
  const handleUpload = async (e, svc) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setUploadSuccess(false); setUploadError(false);
    try {
      const formData = new FormData();
      formData.append("service", svc);
      formData.append("category", activeCategory);
      formData.append("file", file);
      await fetch("/api/services/upload", { method: "POST", body: formData });
      setUploading(false); setUploadSuccess(true);
      setTimeout(() => setUploadSuccess(false), 2000);
    } catch {
      setUploading(false); setUploadError(true);
      setTimeout(() => setUploadError(false), 2000);
    }
  };

  // Service Selection Handler
  const handleSelectService = (cat, svc) => {
    setActiveModule(null);
    setActiveCategory(cat.key);
    setSelectedService({ category: cat, service: svc });
  };

  // --- CSS ---
  // (All premium CSS, dark, boxed, glowing, sticky left, etc.)
  // You can move this to a CSS file if desired.
  return (
    <div className="auditdna-root">
      <style>{`
        body, .auditdna-root { background: #12171e; color: #fff; font-family: 'Inter', 'Segoe UI', Arial, sans-serif; min-height: 100vh; }
        .auditdna-layout { display: flex; justify-content: center; align-items: flex-start; padding: 0; min-height: 100vh; }
        .accordion-nav {
          width: 320px;
          background: #181e2f;
          border-radius: 1.7rem;
          box-shadow: 0 6px 32px #00ff8822;
          padding: 2.3rem 1.2rem 2.3rem 1.2rem;
          margin: 2.5rem 0 2.5rem 2.5rem;
          position: sticky; top: 1.5rem; align-self: flex-start;
          min-height: 500px;
        }
        .accordion-section { margin-bottom: 1.3rem; }
        .accordion-header {
          width: 100%; text-align: left; background: none; border: none; font-size: 1.13em; font-weight: 700;
          padding: 0.65em 0.5em; border-left: 4px solid #232d44; color: #d4eaff;
          border-radius: 0.6em; cursor: pointer; display: flex; align-items: center; gap: 0.7em;
          transition: all .15s;
        }
        .accordion-header.active, .accordion-header:focus {
          background: #232d44;
          border-left-color: #00ff88;
          color: #00ff88;
        }
        .accordion-body { margin-top: 0.41em; margin-left: 1.6em; }
        .accordion-service { margin-bottom: 0.31em; }
        .service-link {
          background: none; border: none; color: #b8c5d1; font-size: 1em; cursor: pointer; text-align: left;
          padding: .23em .13em; border-radius: .4em; transition: background .15s, color .15s;
        }
        .service-link:hover, .service-link:focus { background: #00ff8822; color: #00ff88; }
        .main-pane {
          flex: 1; min-width: 440px; max-width: 700px;
          margin: 2.5rem 2.2rem 2.5rem 0; background: linear-gradient(132deg,rgba(25,35,46,.98) 90%,#00ff8830 100%);
          box-shadow: 0 10px 80px #00ff8830; border-radius: 2.3rem; padding: 2.7rem 2.7rem 2.8rem 2.7rem;
          display: flex; flex-direction: column; align-items: center;
        }
        .pro-modules-row { display: flex; gap: 1.7rem; margin-bottom: 2.1rem; }
        .pro-module-btn {
          flex: 1; background: linear-gradient(110deg,#181e2f 80%,#fff0 100%);
          border-radius: 1.2rem; border: 2.5px solid #222b3a; color: #fff;
          font-size: 1.13rem; font-weight: 700; padding: 1.2rem 1.2rem 1.2rem 1.2rem;
          display: flex; flex-direction: column; align-items: center; cursor: pointer;
          transition: box-shadow .19s, border-color .19s, background .13s; box-shadow: 0 6px 32px #00ff8822; min-width: 160px; outline: none;
        }
        .pro-module-btn.active, .pro-module-btn:focus {
          border-color: #00ff88; background: linear-gradient(110deg,#111a24 40%,#00ff8830 100%);
          color: #00ff88; box-shadow: 0 2px 18px #00ff8844;
        }
        .service-panel {
          background: #171d2a; border-radius: 1.1em; border: 1.5px solid #222b3a; box-shadow: 0 8px 32px #00ff8855;
          padding: 2.1em 1.5em 1.8em 1.5em; margin-top: 1.5em; width: 100%; max-width: 600px;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .service-panel .title {
          font-size: 1.23em; font-weight: 800; color: #00ff88; margin-bottom: .41em;
        }
        .service-panel .desc { color: #b8c5d1; font-size: 1em; margin-bottom: 1.1em; }
        .upload-btn {
          background: linear-gradient(90deg,#00ff88,#4a96ff); color: #0a0b0f; font-weight: 600; border: none;
          border-radius: 10px; padding: 0.7em 1.5em; cursor: pointer; font-size: 1.05em; margin-top: .3em;
          transition: box-shadow .16s; box-shadow: 0 2px 15px #00ff8888;
        }
        .upload-btn:active { box-shadow: 0 2px 8px #00ff8855; }
        .upload-success { color: #00ff88; font-size: .95em; font-weight: 600; margin-top: 0.35em; }
        .upload-error { color: #ff4d4d; font-size: .95em; font-weight: 600; margin-top: 0.35em; }
      `}</style>
      <div className="auditdna-layout">
        {/* Accordion Left Pane */}
        <AccordionNav
          categories={servicesCatalogue}
          active={activeCategory}
          setActive={setActiveCategory}
          onSelectService={handleSelectService}
        />
        {/* Main Pane */}
        <div className="main-pane">
          {/* Pro Module Buttons */}
          <ProModuleRow
            modules={proModules}
            activeModule={activeModule}
            setActiveModule={setActiveModule}
          />
          {/* Main Content */}
          {activeModule ? (
            <div style={{ width: "100%", marginTop: "2.5rem", color: "#fff", textAlign: "center" }}>
              <b>{proModules.find((m)=>m.key===activeModule)?.label}</b>
              <div style={{ opacity: 0.7, fontSize: "1.04em", margin: "1em 0 2em 0" }}>
                <i>[Module dashboard would be rendered here. Plug in your search engine/module component for "{activeModule}".]</i>
              </div>
            </div>
          ) : (
            <ServicePanel
              category={selectedService.category}
              service={selectedService.service}
              uploading={uploading}
              uploadSuccess={uploadSuccess}
              uploadError={uploadError}
              handleUpload={handleUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
}