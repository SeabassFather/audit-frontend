/* eslint-disable */
import React, { useState } from 'react';

export default function ContactCardComponent({ onContactSubmit, moduleType = 'general' }) {
  const [contactData, setContactData] = useState({
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'USA',
    purpose: '',
    notes: '',
    agreedToTerms: false,
    agreedToAIDisclaimer: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[\d\s\-\+\(\)]+$/.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};

    if (!contactData.fullName.trim()) newErrors.fullName = 'Required';
    if (!contactData.email.trim()) newErrors.email = 'Required';
    else if (!validateEmail(contactData.email)) newErrors.email = 'Invalid email';
    if (!contactData.phone.trim()) newErrors.phone = 'Required';
    else if (!validatePhone(contactData.phone)) newErrors.phone = 'Invalid phone';
    if (!contactData.agreedToTerms) newErrors.agreedToTerms = 'You must agree to terms';
    if (!contactData.agreedToAIDisclaimer) newErrors.agreedToAIDisclaimer = 'You must acknowledge AI disclaimer';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert('Please fill in all required fields correctly');
      return;
    }

    setErrors({});
    setSubmitted(true);

    if (onContactSubmit) {
      onContactSubmit({
        ...contactData,
        moduleType,
        timestamp: new Date().toISOString()
      });
    }
  };

  if (submitted) {
    return (
      <div style={{
        background: 'rgba(16, 185, 129, 0.1)',
        border: '2px solid #10b981',
        borderRadius: '16px',
        padding: '30px',
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <div style={{fontSize: '3rem', marginBottom: '15px'}}>Ã¢Å“â€¦</div>
        <h3 style={{color: '#10b981', marginBottom: '10px'}}>Contact Information Saved!</h3>
        <p style={{color: '#94a3b8'}}>
          We have your contact details. You can now proceed with your analysis.
        </p>
      </div>
    );
  }

  return (
    <div style={{
      background: '#1e293b',
      padding: '30px',
      borderRadius: '16px',
      border: '2px solid #334155',
      marginBottom: '30px'
    }}>
      <h3 style={{color: '#06b6d4', marginBottom: '20px', fontSize: '1.5rem'}}>
        Ã°Å¸â€œâ€¹ Contact Information
      </h3>
      <p style={{color: '#94a3b8', marginBottom: '25px'}}>
        Please provide your contact details so we can send you results and billing information.
      </p>

      <form onSubmit={handleSubmit}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
              Full Name *
            </label>
            <input
              type="text"
              value={contactData.fullName}
              onChange={e => setContactData({...contactData, fullName: e.target.value})}
              placeholder="John Doe"
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: `2px solid ${errors.fullName ? '#ef4444' : '#334155'}`,
                borderRadius: '8px',
                color: 'white'
              }}
            />
            {errors.fullName && <span style={{color: '#ef4444', fontSize: '0.85rem'}}>{errors.fullName}</span>}
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
              Company Name
            </label>
            <input
              type="text"
              value={contactData.companyName}
              onChange={e => setContactData({...contactData, companyName: e.target.value})}
              placeholder="ABC Farms LLC"
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: '2px solid #334155',
                borderRadius: '8px',
                color: 'white'
              }}
            />
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
              Email Address *
            </label>
            <input
              type="email"
              value={contactData.email}
              onChange={e => setContactData({...contactData, email: e.target.value})}
              placeholder="john@example.com"
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: `2px solid ${errors.email ? '#ef4444' : '#334155'}`,
                borderRadius: '8px',
                color: 'white'
              }}
            />
            {errors.email && <span style={{color: '#ef4444', fontSize: '0.85rem'}}>{errors.email}</span>}
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
              Phone Number *
            </label>
            <input
              type="tel"
              value={contactData.phone}
              onChange={e => setContactData({...contactData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: `2px solid ${errors.phone ? '#ef4444' : '#334155'}`,
                borderRadius: '8px',
                color: 'white'
              }}
            />
            {errors.phone && <span style={{color: '#ef4444', fontSize: '0.85rem'}}>{errors.phone}</span>}
          </div>
        </div>

        <div style={{marginTop: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
            Street Address
          </label>
          <input
            type="text"
            value={contactData.address}
            onChange={e => setContactData({...contactData, address: e.target.value})}
            placeholder="123 Farm Road"
            style={{
              width: '100%',
              padding: '12px',
              background: '#0f172a',
              border: '2px solid #334155',
              borderRadius: '8px',
              color: 'white'
            }}
          />
        </div>

        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: '20px'}}>
          <div>
            <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
              City
            </label>
            <input
              type="text"
              value={contactData.city}
              onChange={e => setContactData({...contactData, city: e.target.value})}
              placeholder="Los Angeles"
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: '2px solid #334155',
                borderRadius: '8px',
                color: 'white'
              }}
            />
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
              State
            </label>
            <input
              type="text"
              value={contactData.state}
              onChange={e => setContactData({...contactData, state: e.target.value})}
              placeholder="CA"
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: '2px solid #334155',
                borderRadius: '8px',
                color: 'white'
              }}
            />
          </div>

          <div>
            <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
              ZIP Code
            </label>
            <input
              type="text"
              value={contactData.zip}
              onChange={e => setContactData({...contactData, zip: e.target.value})}
              placeholder="90210"
              style={{
                width: '100%',
                padding: '12px',
                background: '#0f172a',
                border: '2px solid #334155',
                borderRadius: '8px',
                color: 'white'
              }}
            />
          </div>
        </div>

        <div style={{marginTop: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
            Purpose of Analysis
          </label>
          <select
            value={contactData.purpose}
            onChange={e => setContactData({...contactData, purpose: e.target.value})}
            style={{
              width: '100%',
              padding: '12px',
              background: '#0f172a',
              border: '2px solid #334155',
              borderRadius: '8px',
              color: 'white'
            }}
          >
            <option value="">Select purpose...</option>
            <option value="compliance">Regulatory Compliance</option>
            <option value="quality_control">Quality Control</option>
            <option value="troubleshooting">Troubleshooting Issues</option>
            <option value="certification">Certification Requirements</option>
            <option value="research">Research & Development</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div style={{marginTop: '20px'}}>
          <label style={{display: 'block', marginBottom: '8px', color: '#94a3b8', fontWeight: '600'}}>
            Additional Notes
          </label>
          <textarea
            value={contactData.notes}
            onChange={e => setContactData({...contactData, notes: e.target.value})}
            placeholder="Any special instructions or information we should know..."
            rows="3"
            style={{
              width: '100%',
              padding: '12px',
              background: '#0f172a',
              border: '2px solid #334155',
              borderRadius: '8px',
              color: 'white',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
        </div>

        <div style={{
          marginTop: '25px',
          padding: '20px',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '2px solid #f59e0b',
          borderRadius: '12px'
        }}>
          <div style={{display: 'flex', alignItems: 'start', gap: '12px', marginBottom: '15px'}}>
            <input
              type="checkbox"
              checked={contactData.agreedToAIDisclaimer}
              onChange={e => setContactData({...contactData, agreedToAIDisclaimer: e.target.checked})}
              style={{marginTop: '4px', width: '20px', height: '20px', cursor: 'pointer'}}
            />
            <label style={{color: '#f59e0b', lineHeight: '1.6', fontSize: '0.95rem'}}>
              <strong>Ã¢Å¡Â Ã¯Â¸Â AI Analysis Disclaimer:</strong> I understand that this analysis uses AI algorithms and is provided for informational purposes only. Results should not be considered as professional advice or replace laboratory testing. AuditDNA is not liable for decisions made based on these results. *
            </label>
          </div>
          {errors.agreedToAIDisclaimer && <span style={{color: '#ef4444', fontSize: '0.85rem'}}>{errors.agreedToAIDisclaimer}</span>}

          <div style={{display: 'flex', alignItems: 'start', gap: '12px'}}>
            <input
              type="checkbox"
              checked={contactData.agreedToTerms}
              onChange={e => setContactData({...contactData, agreedToTerms: e.target.checked})}
              style={{marginTop: '4px', width: '20px', height: '20px', cursor: 'pointer'}}
            />
            <label style={{color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem'}}>
              I agree to the <a href="#" style={{color: '#06b6d4', textDecoration: 'underline'}}>Terms of Service</a> and understand that billing will occur after file upload is complete. No charges will be made if upload is cancelled or fails. *
            </label>
          </div>
          {errors.agreedToTerms && <span style={{color: '#ef4444', fontSize: '0.85rem'}}>{errors.agreedToTerms}</span>}
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '16px',
            marginTop: '25px',
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            border: 'none',
            borderRadius: '12px',
            color: 'white',
            fontSize: '1.1rem',
            fontWeight: '700',
            cursor: 'pointer'
          }}
        >
          Ã¢Å“â€¦ Save Contact Information & Continue
        </button>
      </form>
    </div>
  );
}