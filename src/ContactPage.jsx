import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const ContactPage = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    audioSystem.playSuccess();
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)', padding: '3rem 2rem', color: '#fff' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h1 style={{ fontSize: '3rem', textAlign: 'center', color: '#64b5f6', marginBottom: '1rem', textShadow: '0 0 30px rgba(100, 181, 246, 0.6)' }}>
          {language === 'es' ? '📞 Contáctanos' : '📞 Contact Us'}
        </h1>
        <p style={{ textAlign: 'center', color: '#b0bec5', fontSize: '1.2rem', marginBottom: '3rem' }}>
          {language === 'es' 
            ? 'Estamos aquí para ayudarte con tus necesidades de análisis de datos'
            : 'We\'re here to help with your data analysis needs'}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
          
          {/* CONTACT INFO */}
          <div>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', border: '2px solid rgba(100, 181, 246, 0.3)', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', color: '#64b5f6', marginBottom: '1.5rem' }}>
                {language === 'es' ? '🏢 Información de Contacto' : '🏢 Contact Information'}
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📧</div>
                <div style={{ color: '#b0bec5', marginBottom: '0.3rem' }}>{language === 'es' ? 'Email' : 'Email'}</div>
                <a href="mailto:support@auditdna.com" style={{ color: '#64b5f6', fontSize: '1.1rem', textDecoration: 'none' }}>
                  support@auditdna.com
                </a>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📱</div>
                <div style={{ color: '#b0bec5', marginBottom: '0.3rem' }}>{language === 'es' ? 'Teléfono' : 'Phone'}</div>
                <a href="tel:+15551234567" style={{ color: '#64b5f6', fontSize: '1.1rem', textDecoration: 'none' }}>
                  +1 (555) 123-4567
                </a>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🕐</div>
                <div style={{ color: '#b0bec5', marginBottom: '0.3rem' }}>
                  {language === 'es' ? 'Horario de Atención' : 'Business Hours'}
                </div>
                <div style={{ color: '#fff', fontSize: '1rem' }}>
                  {language === 'es' ? 'Lun - Vie: 8:00 AM - 6:00 PM EST' : 'Mon - Fri: 8:00 AM - 6:00 PM EST'}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📍</div>
                <div style={{ color: '#b0bec5', marginBottom: '0.3rem' }}>
                  {language === 'es' ? 'Dirección' : 'Address'}
                </div>
                <div style={{ color: '#fff', fontSize: '1rem', lineHeight: '1.6' }}>
                  AuditDNA Supreme<br/>
                  1234 Analysis Drive<br/>
                  Suite 500<br/>
                  Technology City, TC 12345<br/>
                  United States
                </div>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', border: '2px solid rgba(100, 181, 246, 0.3)' }}>
              <h3 style={{ fontSize: '1.5rem', color: '#64b5f6', marginBottom: '1rem' }}>
                {language === 'es' ? '🔗 Enlaces Rápidos' : '🔗 Quick Links'}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <a href="/water" style={{ color: '#b0bec5', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                  💧 {language === 'es' ? 'Análisis de Agua' : 'Water Analysis'}
                </a>
                <a href="/soil" style={{ color: '#b0bec5', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                  🌱 {language === 'es' ? 'Análisis de Suelo' : 'Soil Analysis'}
                </a>
                <a href="/ag" style={{ color: '#b0bec5', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                  🌾 {language === 'es' ? 'Ciencias Agrícolas' : 'AG Sciences'}
                </a>
                <a href="/engine" style={{ color: '#b0bec5', textDecoration: 'none', transition: 'all 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.color = '#64b5f6'} onMouseLeave={(e) => e.currentTarget.style.color = '#b0bec5'}>
                  🔧 {language === 'es' ? 'Análisis de Motor' : 'Engine Analysis'}
                </a>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div>
            <div style={{ background: 'rgba(45, 55, 72, 0.9)', padding: '2rem', borderRadius: '20px', border: '2px solid rgba(100, 181, 246, 0.3)' }}>
              <h2 style={{ fontSize: '1.8rem', color: '#64b5f6', marginBottom: '1.5rem' }}>
                {language === 'es' ? '✉️ Envíanos un Mensaje' : '✉️ Send us a Message'}
              </h2>

              {submitted ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '2px solid #10b981', borderRadius: '15px', padding: '2rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                  <div style={{ color: '#10b981', fontSize: '1.3rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {language === 'es' ? '¡Mensaje Enviado!' : 'Message Sent!'}
                  </div>
                  <div style={{ color: '#b0bec5' }}>
                    {language === 'es' 
                      ? 'Te contactaremos pronto.'
                      : 'We\'ll get back to you soon.'}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#b0bec5', marginBottom: '0.5rem' }}>
                      {language === 'es' ? 'Nombre *' : 'Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#b0bec5', marginBottom: '0.5rem' }}>
                      {language === 'es' ? 'Email *' : 'Email *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#b0bec5', marginBottom: '0.5rem' }}>
                      {language === 'es' ? 'Teléfono' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#b0bec5', marginBottom: '0.5rem' }}>
                      {language === 'es' ? 'Asunto *' : 'Subject *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
                    />
                  </div>

                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', color: '#b0bec5', marginBottom: '0.5rem' }}>
                      {language === 'es' ? 'Mensaje *' : 'Message *'}
                    </label>
                    <textarea
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows="6"
                      style={{ width: '100%', padding: '0.8rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{ width: '100%', padding: '1rem', background: 'linear-gradient(135deg, #64b5f6 0%, #42a5f5 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.3s ease' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(100, 181, 246, 0.5)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {language === 'es' ? '📤 Enviar Mensaje' : '📤 Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactPage;
