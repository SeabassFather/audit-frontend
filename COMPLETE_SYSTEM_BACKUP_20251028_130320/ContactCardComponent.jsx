import React, { useState } from 'react';

function ContactCardComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    urgent: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, send to backend
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ 
        fontSize: '56px', 
        fontWeight: 'bold', 
        background: 'linear-gradient(135deg, #14b8a6, #0d9488)', 
        WebkitBackgroundClip: 'text', 
        WebkitTextFillColor: 'transparent', 
        marginBottom: '40px', 
        textAlign: 'center'
      }}>
        Contact & Support
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        {/* Contact Info */}
        <div style={{ 
          background: 'rgba(30,41,59,0.6)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(20,184,166,0.3)', 
          borderRadius: '24px', 
          padding: '40px'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '24px' }}></div>
          <h2 style={{ fontSize: '32px', color: '#14b8a6', marginBottom: '30px', fontWeight: '700' }}>
            Get in Touch
          </h2>

          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}> Email</div>
              <div style={{ fontSize: '18px', color: 'white' }}>lab@auditdna.com</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>support@auditdna.com</div>
            </div>

            <div>
              <div style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}> Phone</div>
              <div style={{ fontSize: '18px', color: 'white' }}>1-800-AUDIT-DNA</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>(1-800-283-4836)</div>
            </div>

            <div>
              <div style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}> Emergency</div>
              <div style={{ fontSize: '18px', color: '#ef4444', fontWeight: '700' }}>1-800-URGENT-99</div>
              <div style={{ fontSize: '14px', color: '#64748b' }}>24/7 Priority Line</div>
            </div>

            <div>
              <div style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}> Address</div>
              <div style={{ fontSize: '16px', color: 'white', lineHeight: '1.6' }}>
                AuditDNA Supreme Laboratory<br />
                123 Science Park Drive<br />
                Agricultural Testing Center<br />
                Innovation City, IC 12345
              </div>
            </div>

            <div>
              <div style={{ fontSize: '16px', color: '#94a3b8', marginBottom: '8px', fontWeight: '600' }}> Hours</div>
              <div style={{ fontSize: '16px', color: 'white', lineHeight: '1.6' }}>
                Monday - Friday: 7:00 AM - 7:00 PM<br />
                Saturday: 8:00 AM - 4:00 PM<br />
                Sunday: Closed (Emergency only)
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ 
          background: 'rgba(30,41,59,0.6)', 
          backdropFilter: 'blur(16px)', 
          border: '1px solid rgba(20,184,166,0.3)', 
          borderRadius: '24px', 
          padding: '40px'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '24px' }}></div>
          <h2 style={{ fontSize: '32px', color: '#14b8a6', marginBottom: '30px', fontWeight: '700' }}>
            Send Message
          </h2>

          {submitted && (
            <div style={{ 
              background: 'rgba(16,185,129,0.2)', 
              border: '1px solid rgba(16,185,129,0.4)', 
              borderRadius: '12px', 
              padding: '16px', 
              marginBottom: '20px',
              color: '#10b981',
              fontSize: '16px',
              fontWeight: '600'
            }}>
               Message sent successfully! We'll respond within 24 hours.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block', fontWeight: '600' }}>
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(148,163,184,0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block', fontWeight: '600' }}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(148,163,184,0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block', fontWeight: '600' }}>
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(148,163,184,0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  outline: 'none'
                }}
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block', fontWeight: '600' }}>
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(148,163,184,0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="">Select subject...</option>
                <option value="general">General Inquiry</option>
                <option value="testing">Testing Services</option>
                <option value="results">Results Question</option>
                <option value="billing">Billing Issue</option>
                <option value="technical">Technical Support</option>
                <option value="urgent">Urgent Matter</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '8px', display: 'block', fontWeight: '600' }}>
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  fontSize: '16px',
                  background: 'rgba(15,23,42,0.6)',
                  border: '1px solid rgba(148,163,184,0.3)',
                  borderRadius: '10px',
                  color: 'white',
                  outline: 'none',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="urgent"
                  checked={formData.urgent}
                  onChange={handleChange}
                  style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                />
                <span style={{ color: '#ef4444', fontSize: '14px', fontWeight: '600' }}>
                   This is an urgent matter
                </span>
              </label>
            </div>

            <button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #14b8a6, #0d9488)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 40px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                width: '100%',
                boxShadow: '0 8px 25px rgba(20,184,166,0.4)',
                transition: 'all 0.3s'
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactCardComponent;

