import React, { useState } from "react";

const text = {
  english: {
    title: "Agent Registration",
    subtitle: "Join AuditDNA Elite Real Estate Platform",
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    agency: "Agency Name",
    uploadPhotos: "Upload Photos (optional)",
    uploadDocs: "Upload Legal Documents (optional)",
    terms: "By registering, you agree to comply with all platform terms and conditions, including the 50/50 commission split agreement on all transactions. You certify that all information provided is accurate and that you have the authority to list properties on behalf of property owners.",
    submit: "Complete Registration",
    thankyou: "Thank you! You are now registered."
  },
  spanish: {
    title: "Registro de Agente",
    subtitle: "ÃƒÅ¡nase a la Plataforma Elite de Bienes RaÃƒÂ­ces AuditDNA",
    fullName: "Nombre Completo",
    email: "Correo ElectrÃƒÂ³nico",
    phone: "NÃƒÂºmero de TelÃƒÂ©fono",
    agency: "Nombre de la Agencia",
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    terms: "Al registrarse, acepta cumplir con todos los tÃƒÂ©rminos y condiciones de la plataforma, incluido el acuerdo de divisiÃƒÂ³n de comisiÃƒÂ³n 50/50 en todas las transacciones. Certifica que toda la informaciÃƒÂ³n proporcionada es precisa y que tiene la autoridad para listar propiedades en nombre de los propietarios.",
    submit: "Completar Registro",
    thankyou: "Ã‚Â¡Gracias! Ahora estÃƒÂ¡ registrado."
  }
};

function AgentRegistrationCard({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    agency: ""
  });
  const [photos, setPhotos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = e => {
    setPhotos(Array.from(e.target.files));
  };

  const handleDocChange = e => {
    setDocs(Array.from(e.target.files));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-10 mt-10">
      <div className="bg-gradient-to-r from-yellow-50 to-green-100 px-8 py-6">
        <h2 className="text-2xl font-bold text-green-900">{t.title}</h2>
        <p className="text-green-700 mt-1">{t.subtitle}</p>
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.agency} *</label>
            <input
              type="text"
              name="agency"
              value={form.agency}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p className="text-sm text-gray-700 leading-relaxed">{t.terms}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.uploadPhotos}</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.uploadDocs}</label>
            <input
              type="file"
              name="docs"
              accept="application/pdf,image/*"
              multiple
              onChange={handleDocChange}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-yellow-200 text-gray-900 py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            {t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

export default AgentRegistrationCard;