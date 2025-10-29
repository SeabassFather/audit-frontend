import React, { useState } from "react";

// --- CONSTRUCTION PROJECT CARD (US CITIZENS) ---
const text = {
  english: {
    title: "US Citizen Construction Project Finance",
    subtitle: "Finance your home construction in Mexico (US Collateral Accepted)",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    projectAddress: "Project Address in Mexico",
    projectType: "Project Type",
    projectCost: "Estimated Project Cost (USD)",
    landOwned: "Do you own the land?",
    landValue: "Estimated Land Value (USD)",
    timeline: "Expected Timeline (months)",
    usCollateral: "I have US collateral to pledge",
    notes: "Additional Notes / Questions",
    submit: "Submit Project for Review",
    thankyou: "Thank you! Our construction finance team will contact you."
  },
  spanish: {
    title: "Financiamiento de Proyecto de ConstrucciÃƒÂ³n (Ciudadanos EE.UU.)",
    subtitle: "Financie su proyecto de construcciÃƒÂ³n en MÃƒÂ©xico (Colateral en EE.UU. aceptado)",
    fullName: "Nombre Completo",
    email: "Correo ElectrÃƒÂ³nico",
    phone: "NÃƒÂºmero de TelÃƒÂ©fono",
    projectAddress: "DirecciÃƒÂ³n del Proyecto en MÃƒÂ©xico",
    projectType: "Tipo de Proyecto",
    projectCost: "Costo Estimado del Proyecto (USD)",
    landOwned: "Ã‚Â¿Es dueÃƒÂ±o del terreno?",
    landValue: "Valor Estimado del Terreno (USD)",
    timeline: "Tiempo Estimado (meses)",
    usCollateral: "Tengo colateral en EE.UU. para ofrecer",
    notes: "Notas Adicionales / Preguntas",
    submit: "Enviar Proyecto para RevisiÃƒÂ³n",
    thankyou: "Ã‚Â¡Gracias! Nuestro equipo de financiamiento se comunicarÃƒÂ¡."
  }
};

const PROJECT_TYPES = [
  { en: "Single Family Home", es: "Casa Unifamiliar" },
  { en: "Condo/Apartment", es: "Departamento/Condominio" },
  { en: "Custom Villa", es: "Villa Personalizada" },
  { en: "Multi-Unit", es: "Multi-Unidad" },
  { en: "Other", es: "Otro" }
];

function ConstructionProjectCard({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    projectAddress: "",
    projectType: "",
    projectCost: "",
    landOwned: "",
    landValue: "",
    timeline: "",
    usCollateral: false,
    notes: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm((prev) => ({ ...prev, [name]: checked }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-10 mt-10">
      <div className="bg-gradient-to-r from-blue-700 to-red-600 px-8 py-6 flex items-center">
        <svg className="w-8 h-8 text-white mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><rect x="3" y="12" width="18" height="8" rx="2"/><path d="M6 12V7a6 6 0 1112 0v5"/></svg>
        <div>
          <h2 className="text-2xl font-bold text-white">{t.title}</h2>
          <p className="text-blue-100 mt-1">{t.subtitle}</p>
        </div>
      </div>
      {submitted ? (
        <div className="p-8">
          <div className="bg-green-50 text-green-700 font-semibold rounded-lg p-4 text-center">
            {t.thankyou}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.fullName} *</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.email} *</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.phone} *</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.projectAddress} *</label>
            <input
              type="text"
              name="projectAddress"
              value={form.projectAddress}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.projectType} *</label>
            <select
              name="projectType"
              value={form.projectType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{language === "english" ? "Select project type" : "Seleccione tipo de proyecto"}</option>
              {PROJECT_TYPES.map(pt => (
                <option key={pt.en} value={language === "english" ? pt.en : pt.es}>
                  {language === "english" ? pt.en : pt.es}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.projectCost} *</label>
            <input
              type="number"
              name="projectCost"
              value={form.projectCost}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.landOwned} *</label>
            <select
              name="landOwned"
              value={form.landOwned}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">{language === "english" ? "Select" : "Seleccione"}</option>
              <option value="yes">{language === "english" ? "Yes" : "SÃƒÂ­"}</option>
              <option value="no">{language === "english" ? "No" : "No"}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.landValue}</label>
            <input
              type="number"
              name="landValue"
              value={form.landValue}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.timeline}</label>
            <input
              type="number"
              name="timeline"
              value={form.timeline}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-1">
              <input
                type="checkbox"
                name="usCollateral"
                checked={form.usCollateral}
                onChange={handleChange}
                className="accent-blue-700"
              />
              {t.usCollateral}
            </label>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.notes}</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 min-h-[60px]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-700 to-red-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            {t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

export default ConstructionProjectCard;
