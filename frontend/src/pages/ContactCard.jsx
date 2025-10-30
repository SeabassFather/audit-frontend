import React, { useState } from "react";

const text = {
  english: {
    title: "Contact Us",
    subtitle: "Have questions? Our team is here to help.",
    name: "Your Name",
    email: "Your Email",
    message: "Message",
    submit: "Send Message",
    thankyou: "Thank you! We will reply as soon as possible."
  },
  spanish: {
<<<<<<< HEAD
    title: "Contáctenos",
    subtitle: "¿Preguntas? Nuestro equipo está aquí para ayudar.",
=======
    title: "ContÃƒÂ¡ctenos",
    subtitle: "Ã‚Â¿Preguntas? Nuestro equipo estÃƒÂ¡ aquÃƒÂ­ para ayudar.",
>>>>>>> my/push-branch
    name: "Su Nombre",
    email: "Su Correo",
    message: "Mensaje",
    submit: "Enviar Mensaje",
<<<<<<< HEAD
    thankyou: "¡Gracias! Le responderemos lo antes posible."
=======
    thankyou: "Ã‚Â¡Gracias! Le responderemos lo antes posible."
>>>>>>> my/push-branch
  }
};

function ContactCard({ language = "english" }) {
  const t = text[language];
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden mb-10 mt-10">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-6">
        <h2 className="text-2xl font-bold text-white">{t.title}</h2>
        <p className="text-purple-100 mt-1">{t.subtitle}</p>
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500"
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
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{t.message} *</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border-2 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[80px]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold text-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
          >
            {t.submit}
          </button>
        </form>
      )}
    </div>
  );
}

export default ContactCard;
