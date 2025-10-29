/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const text = {
  english: {
    title: "List Your Property",
    subtitle: "Publish your property for buyers worldwide",
    propertyType: "Property Type",
    region: "Region",
    price: "Price (USD)",
    sqft: "Square Feet",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    descEng: "Description (English)",
    descEsp: "Description (Spanish)",
    amenities: "Amenities (comma separated)",
    address: "Property Address",
    uploadPhotos: "Upload Photos (optional)",
    uploadDocs: "Upload Legal Documents (optional)",
    submit: "Submit Listing for Review",
    thankyou: "Thank you! Your property listing is under review."
  },
  spanish: {
    title: "Publicar Propiedad",
    subtitle: "Publique su propiedad para compradores en todo el mundo",
    propertyType: "Tipo de Propiedad",
    region: "RegiÃƒÂ³n",
    price: "Precio (USD)",
    sqft: "Metros Cuadrados",
    bedrooms: "RecÃƒÂ¡maras",
    bathrooms: "BaÃƒÂ±os",
    descEng: "DescripciÃƒÂ³n (InglÃƒÂ©s)",
    descEsp: "DescripciÃƒÂ³n (EspaÃƒÂ±ol)",
    amenities: "Amenidades (separadas por comas)",
    address: "Domicilio de la Propiedad",
    uploadPhotos: "Subir Fotos (opcional)",
    uploadDocs: "Subir Documentos Legales (opcional)",
    submit: "Enviar Propiedad para RevisiÃƒÂ³n",
    thankyou: "Ã‚Â¡Gracias! Su propiedad estÃƒÂ¡ en revisiÃƒÂ³n."
  }
};

const PROPERTY_TYPES = [
  {en: "Residential", es: "Residencial"},
  {en: "Condo/Apartment", es: "Condominio/Apartamento"},
  {en: "Land/Lot", es: "Terreno/Lote"},
  {en: "Commercial", es: "Comercial"},
  {en: "Hotel/Resort", es: "Hotel/Resort"},
  {en: "Other", es: "Otro"}
];

export default function PropertyUploadForm({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({
    propertyType: "",
    region: "",
    price: "",
    sqft: "",
    bedrooms: "",
    bathrooms: "",
    descEng: "",
    descEsp: "",
    amenities: "",
    address: ""
  });
  const [photos, setPhotos] = useState([]);
  const [docs, setDocs] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };

  const handleDocChange = (e) => {
    setDocs(Array.from(e.target.files));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.propertyType} *</label>
            <select
              name="propertyType"
              value={form.propertyType}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            >
              <option value="">{language === "english" ? "Select property type" : "Seleccione tipo de propiedad"}</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type.en} value={language === "english" ? type.en : type.es}>
                  {language === "english" ? type.en : type.es}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.region} *</label>
            <input
              type="text"
              name="region"
              value={form.region}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.price} *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.sqft}</label>
              <input
                type="number"
                name="sqft"
                value={form.sqft}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.bedrooms}</label>
              <input
                type="number"
                name="bedrooms"
                value={form.bedrooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">{t.bathrooms}</label>
              <input
                type="number"
                name="bathrooms"
                value={form.bathrooms}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.descEng}</label>
            <textarea
              name="descEng"
              value={form.descEng}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.descEsp}</label>
            <textarea
              name="descEsp"
              value={form.descEsp}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.amenities}</label>
            <input
              type="text"
              name="amenities"
              value={form.amenities}
              onChange={handleChange}
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
