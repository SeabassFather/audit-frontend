import React, { useState } from "react";

const text = {
  english: {
    title: "Contact Property Owner",
    subtitle: "Use this form to ask questions, schedule a tour, or request more details about a property.",
    name: "Your Name",
    email: "Your Email",
    phone: "Phone Number",
    address: "Property Address",
    message: "Message",
    uploadPhotos: "Upload Photos (optional)",
    uploadDocs: "Upload Legal Documents (optional)",
    submit: "Send Message",
    thankyou: "Thank you! The property owner will contact you soon."
  },
  spanish: {
    title: "Contactar al Propietario",
    subtitle: "Use este formulario para preguntar, agendar una visita o solicitar mÃƒÂ¡s informaciÃƒÂ³n sobre una propiedad.",
    name: "Su Nombre",
    email: "Su Correo",
    phone: "NÃƒÂºmero de TelÃƒÂ©fono",
    address: "Domicilio de la Propiedad",
    message: "Mensaje",
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    submit: "Enviar Mensaje",
    thankyou: "Ã‚Â¡Gracias! El propietario le contactarÃƒÂ¡ pronto."
  }
};

export default function OwnerContactCard({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [photos, setPhotos] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [docs, setDocs] = useState([]);

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
    // Here you could send `form`, `photos`, and `docs` to your backend or API!
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-green-200 overflow-hidden mb-10">
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.name} *</label>
            <input
              type="text"
              name="name"
              value={form.name}
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.address} *</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.message} *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300 min-h-[80px]"
            />
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