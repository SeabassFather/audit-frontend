import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

const ProduceScienceVerification = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState('dashboard'); // dashboard, enroll, crm, verification

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0a0a0a 0%, #0f172a 50%, #1e1b4b 100%)', color: '#fff' }}>
      
      {/* HEADER */}
      <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', borderBottom: '2px solid rgba(59, 130, 246, 0.3)', padding: '2rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', color: '#3b82f6', marginBottom: '0.5rem', textShadow: '0 0 30px rgba(59, 130, 246, 0.6)' }}>
             AuditDNA Produce Science Verification Analyses
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#60a5fa', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            POWERED BY AI
          </p>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            {language === 'es' 
              ? 'Plataforma Internacional de Verificación Empresarial para Productores'
              : 'Enterprise International Verification Platform for Producers'}
          </p>
        </div>
      </div>

      {/* NAVIGATION */}
      <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderBottom: '1px solid rgba(59, 130, 246, 0.2)', padding: '1rem 2rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {[
            { id: 'dashboard', icon: '', label: language === 'es' ? 'Panel' : 'Dashboard' },
            { id: 'enroll', icon: '', label: language === 'es' ? 'Inscribir Productor' : 'Enroll Grower' },
            { id: 'verification', icon: '', label: language === 'es' ? 'Verificaciones' : 'Verifications' },
            { id: 'crm', icon: '', label: 'CRM' },
            { id: 'compliance', icon: '', label: language === 'es' ? 'Cumplimiento Global' : 'Global Compliance' },
            { id: 'reports', icon: '', label: language === 'es' ? 'Reportes' : 'Reports' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveView(item.id); audioSystem.playClick(); }}
              style={{
                padding: '0.8rem 1.5rem',
                background: activeView === item.id ? 'rgba(59, 130, 246, 0.3)' : 'rgba(30, 41, 59, 0.4)',
                border: activeView === item.id ? '2px solid #3b82f6' : '2px solid rgba(59, 130, 246, 0.2)',
                borderRadius: '10px',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: activeView === item.id ? 'bold' : 'normal',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (activeView !== item.id) {
                  e.currentTarget.style.background = 'rgba(59, 130, 246, 0.2)';
                  e.currentTarget.style.borderColor = '#3b82f6';
                }
              }}
              onMouseLeave={(e) => {
                if (activeView !== item.id) {
                  e.currentTarget.style.background = 'rgba(30, 41, 59, 0.4)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
                }
              }}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT AREA */}
      <div style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          
          {activeView === 'dashboard' && <DashboardView language={language} />}
          {activeView === 'enroll' && <EnrollmentView language={language} />}
          {activeView === 'verification' && <VerificationView language={language} />}
          {activeView === 'crm' && <CRMView language={language} />}
          {activeView === 'compliance' && <ComplianceView language={language} />}
          {activeView === 'reports' && <ReportsView language={language} />}

        </div>
      </div>

      <button 
        onClick={() => navigate('/')} 
        style={{ 
          position: 'fixed', 
          bottom: '2rem', 
          left: '2rem', 
          padding: '1rem 2rem', 
          background: 'rgba(30, 41, 59, 0.9)', 
          border: '2px solid #64748b', 
          borderRadius: '12px', 
          color: '#fff', 
          cursor: 'pointer',
          zIndex: 1000
        }}
      >
         {language === 'es' ? 'Inicio' : 'Home'}
      </button>

    </div>
  );
};

// ================================================================
// DASHBOARD VIEW
// ================================================================
const DashboardView = ({ language }) => {
  const stats = [
    { icon: '', label: language === 'es' ? 'Productores Activos' : 'Active Growers', value: '247', color: '#10b981' },
    { icon: '', label: language === 'es' ? 'Verificaciones Este Mes' : 'Verifications This Month', value: '1,842', color: '#3b82f6' },
    { icon: '', label: language === 'es' ? 'Exportaciones Aprobadas' : 'Exports Approved', value: '3,156', color: '#8b5cf6' },
    { icon: '', label: language === 'es' ? 'Ingresos (MRR)' : 'Revenue (MRR)', value: '$47,293', color: '#f59e0b' },
    { icon: '', label: language === 'es' ? 'Países Activos' : 'Active Countries', value: '12', color: '#06b6d4' },
    { icon: '', label: language === 'es' ? 'Alertas Pendientes' : 'Pending Alerts', value: '23', color: '#ef4444' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '2rem' }}>
        {language === 'es' ? ' Panel de Control' : ' Dashboard'}
      </h2>

      {/* STATS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        {stats.map(stat => (
          <div key={stat.label} style={{ background: 'rgba(30, 41, 59, 0.6)', border: `2px solid ${stat.color}40`, borderRadius: '15px', padding: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '2.5rem', color: stat.color, fontWeight: 'bold', marginBottom: '0.5rem' }}>{stat.value}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* RECENT ACTIVITY */}
      <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(59, 130, 246, 0.3)' }}>
        <h3 style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '1.5rem' }}>
          {language === 'es' ? ' Actividad Reciente' : ' Recent Activity'}
        </h3>
        
        {[
          { time: '5 min ago', action: 'New verification request', grower: 'Rancho Verde (Avocados)', status: 'pending', color: '#f59e0b' },
          { time: '23 min ago', action: 'Export approved', grower: 'Los Pinos (Berries)  USA', status: 'approved', color: '#10b981' },
          { time: '1 hour ago', action: 'Lab verification complete', grower: 'Tierra Fértil (Carrots)', status: 'verified', color: '#3b82f6' },
          { time: '2 hours ago', action: 'Subscription renewed', grower: 'Agro Sol (Tomatoes) - Gold Tier', status: 'active', color: '#8b5cf6' },
          { time: '4 hours ago', action: 'Compliance alert', grower: 'Valle Verde (Lettuce) - Pesticide threshold', status: 'alert', color: '#ef4444' }
        ].map((activity, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(15, 23, 42, 0.4)', borderRadius: '10px', marginBottom: '1rem', border: `1px solid ${activity.color}30` }}>
            <div>
              <div style={{ color: '#fff', fontSize: '1rem', marginBottom: '0.3rem' }}>{activity.action}</div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{activity.grower}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: activity.color, fontWeight: 'bold', marginBottom: '0.3rem', textTransform: 'uppercase', fontSize: '0.85rem' }}>{activity.status}</div>
              <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{activity.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ================================================================
// ENROLLMENT VIEW
// ================================================================
const EnrollmentView = ({ language }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    growerName: '',
    farmName: '',
    country: '',
    currency: 'USD',
    products: [],
    gps: '',
    phone: '',
    email: '',
    tier: 'silver'
  });

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar', countries: ['USA', 'Ecuador', 'El Salvador'] },
    { code: 'MXN', symbol: 'MX$', name: 'Mexican Peso', countries: ['Mexico'] },
    { code: 'EUR', symbol: '', name: 'Euro', countries: ['Spain', 'France', 'Germany', 'Italy'] },
    { code: 'GBP', symbol: '', name: 'British Pound', countries: ['UK'] },
    { code: 'BRL', symbol: 'R$', name: 'Brazilian Real', countries: ['Brazil'] },
    { code: 'COP', symbol: 'COL$', name: 'Colombian Peso', countries: ['Colombia'] },
    { code: 'PEN', symbol: 'S/', name: 'Peruvian Sol', countries: ['Peru'] },
    { code: 'CLP', symbol: 'CLP$', name: 'Chilean Peso', countries: ['Chile'] },
    { code: 'ARS', symbol: 'ARS$', name: 'Argentine Peso', countries: ['Argentina'] },
    { code: 'GTQ', symbol: 'Q', name: 'Guatemalan Quetzal', countries: ['Guatemala'] }
  ];

  const subscriptionTiers = {
    bronze: { price: 99, priceDisplay: '$99', features: ['Quarterly uploads', 'Basic analysis', '90-day validity', 'Email support'] },
    silver: { price: 179, priceDisplay: '$179', features: ['Bi-monthly uploads', 'Full analysis', '60-day validity', 'Priority support', 'Export docs'] },
    gold: { price: 299, priceDisplay: '$299', features: ['Monthly uploads', 'Premium analysis', '30-day validity', 'Dedicated manager', 'Blockchain verify'] }
  };

  const getConvertedPrice = (usdPrice, currency) => {
    // Real-time conversion rates (would connect to API in production)
    const rates = {
      USD: 1,
      MXN: 17.2,
      EUR: 0.93,
      GBP: 0.79,
      BRL: 4.95,
      COP: 4100,
      PEN: 3.75,
      CLP: 950,
      ARS: 850,
      GTQ: 7.8
    };
    
    const converted = usdPrice * (rates[currency] || 1);
    const symbol = currencies.find(c => c.code === currency)?.symbol || '$';
    
    return `${symbol}${converted.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '2rem' }}>
        {language === 'es' ? ' Inscribir Nuevo Productor' : ' Enroll New Grower'}
      </h2>

      {/* PROGRESS STEPS */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
        {[
          { num: 1, label: language === 'es' ? 'Info Básica' : 'Basic Info' },
          { num: 2, label: language === 'es' ? 'Productos' : 'Products' },
          { num: 3, label: language === 'es' ? 'Suscripción' : 'Subscription' },
          { num: 4, label: language === 'es' ? 'Verificación' : 'Verification' }
        ].map(s => (
          <div key={s.num} style={{ textAlign: 'center' }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              borderRadius: '50%', 
              background: step >= s.num ? 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' : 'rgba(30, 41, 59, 0.6)',
              border: step >= s.num ? '2px solid #3b82f6' : '2px solid #475569',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#fff',
              margin: '0 auto 0.5rem'
            }}>
              {step > s.num ? '' : s.num}
            </div>
            <div style={{ color: step >= s.num ? '#3b82f6' : '#64748b', fontSize: '0.9rem' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* STEP 1: BASIC INFO */}
      {step === 1 && (
        <div style={{ maxWidth: '800px', margin: '0 auto', background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '3rem', border: '2px solid rgba(59, 130, 246, 0.3)' }}>
          <h3 style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '2rem' }}>
            {language === 'es' ? 'Información Básica' : 'Basic Information'}
          </h3>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
              {language === 'es' ? 'Nombre del Productor *' : 'Grower Name *'}
            </label>
            <input
              type="text"
              value={formData.growerName}
              onChange={(e) => setFormData({...formData, growerName: e.target.value})}
              style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
              placeholder={language === 'es' ? 'Juan Pérez' : 'John Smith'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
              {language === 'es' ? 'Nombre de la Finca *' : 'Farm Name *'}
            </label>
            <input
              type="text"
              value={formData.farmName}
              onChange={(e) => setFormData({...formData, farmName: e.target.value})}
              style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
              placeholder={language === 'es' ? 'Rancho Verde' : 'Green Valley Farm'}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                {language === 'es' ? 'País *' : 'Country *'}
              </label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
              >
                <option value="">{language === 'es' ? 'Seleccionar...' : 'Select...'}</option>
                <option value="Mexico"> Mexico</option>
                <option value="USA"> USA</option>
                <option value="Guatemala"> Guatemala</option>
                <option value="Honduras"> Honduras</option>
                <option value="El Salvador"> El Salvador</option>
                <option value="Nicaragua"> Nicaragua</option>
                <option value="Costa Rica"> Costa Rica</option>
                <option value="Panama"> Panama</option>
                <option value="Colombia"> Colombia</option>
                <option value="Ecuador"> Ecuador</option>
                <option value="Peru"> Peru</option>
                <option value="Brazil"> Brazil</option>
                <option value="Chile"> Chile</option>
                <option value="Argentina"> Argentina</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                {language === 'es' ? 'Moneda *' : 'Currency *'}
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
              >
                {currencies.map(curr => (
                  <option key={curr.code} value={curr.code}>
                    {curr.symbol} {curr.code} - {curr.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
              {language === 'es' ? 'Coordenadas GPS (Lat, Long) *' : 'GPS Coordinates (Lat, Long) *'}
            </label>
            <input
              type="text"
              value={formData.gps}
              onChange={(e) => setFormData({...formData, gps: e.target.value})}
              style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
              placeholder="19.4326, -99.1332"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                {language === 'es' ? 'Teléfono *' : 'Phone *'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
                placeholder="+52 555 123 4567"
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#94a3b8', marginBottom: '0.5rem' }}>
                Email *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                style={{ width: '100%', padding: '1rem', background: 'rgba(15, 23, 42, 0.6)', border: '2px solid #334155', borderRadius: '10px', color: '#fff', fontSize: '1rem' }}
                placeholder="productor@example.com"
              />
            </div>
          </div>

          <button
            onClick={() => { setStep(2); audioSystem.playClick(); }}
            style={{ width: '100%', padding: '1.2rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer', fontSize: '1.1rem' }}
          >
            {language === 'es' ? 'Siguiente ' : 'Next '}
          </button>
        </div>
      )}

      {/* STEP 3: SUBSCRIPTION TIER */}
      {step === 3 && (
        <div>
          <h3 style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '2rem', textAlign: 'center' }}>
            {language === 'es' ? 'Seleccionar Plan de Suscripción' : 'Select Subscription Plan'}
          </h3>

          <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '15px', padding: '1.5rem', marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '1.1rem', color: '#94a3b8', marginBottom: '0.5rem' }}>
              {language === 'es' ? 'Moneda seleccionada:' : 'Selected currency:'}
            </div>
            <div style={{ fontSize: '1.5rem', color: '#3b82f6', fontWeight: 'bold' }}>
              {currencies.find(c => c.code === formData.currency)?.symbol} {formData.currency} - {currencies.find(c => c.code === formData.currency)?.name}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', marginBottom: '2rem' }}>
            {Object.entries(subscriptionTiers).map(([tier, data]) => (
              <div
                key={tier}
                onClick={() => { setFormData({...formData, tier}); audioSystem.playClick(); }}
                style={{
                  background: formData.tier === tier ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 41, 59, 0.6)',
                  border: formData.tier === tier ? '3px solid #3b82f6' : '2px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '20px',
                  padding: '2rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase', color: tier === 'bronze' ? '#cd7f32' : tier === 'silver' ? '#c0c0c0' : '#ffd700', fontWeight: 'bold' }}>
                  {tier === 'bronze' ? '' : tier === 'silver' ? '' : ''} {tier}
                </div>
                <div style={{ fontSize: '2.5rem', color: '#3b82f6', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  {getConvertedPrice(data.price, formData.currency)}
                </div>
                <div style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  {language === 'es' ? 'por mes' : 'per month'}
                </div>
                <div style={{ textAlign: 'left', marginBottom: '1rem' }}>
                  {data.features.map((feature, idx) => (
                    <div key={idx} style={{ color: '#94a3b8', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                       {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <button
              onClick={() => { setStep(2); audioSystem.playClick(); }}
              style={{ padding: '1rem 2rem', background: 'rgba(100, 116, 139, 0.3)', border: '2px solid #64748b', borderRadius: '12px', color: '#fff', cursor: 'pointer' }}
            >
               {language === 'es' ? 'Atrás' : 'Back'}
            </button>
            <button
              onClick={() => { setStep(4); audioSystem.playClick(); }}
              style={{ padding: '1rem 2rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}
            >
              {language === 'es' ? 'Siguiente ' : 'Next '}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

// ================================================================
// CRM VIEW
// ================================================================
const CRMView = ({ language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const growers = [
    { id: 1, name: 'Rancho Verde', contact: 'Juan Pérez', country: ' Mexico', products: 'Avocados, Berries', tier: 'Gold', status: 'active', lastVerification: '2025-10-15', nextDue: '2025-11-15', compliance: 96, phone: '+52 555 123 4567', email: 'juan@ranchoverde.mx', verified: { phone: true, visit: true, lab: true, buyer: false } },
    { id: 2, name: 'Los Pinos', contact: 'Maria Garcia', country: ' Mexico', products: 'Berries, Tomatoes', tier: 'Silver', status: 'active', lastVerification: '2025-09-28', nextDue: '2025-11-28', compliance: 94, phone: '+52 444 987 6543', email: 'maria@lospinos.mx', verified: { phone: true, visit: false, lab: true, buyer: true } },
    { id: 3, name: 'Tierra Fértil', contact: 'Carlos Rodríguez', country: ' Guatemala', products: 'Carrots, Radishes', tier: 'Bronze', status: 'expiring_soon', lastVerification: '2025-07-20', nextDue: '2025-11-05', compliance: 92, phone: '+502 2345 6789', email: 'carlos@tierrafertil.gt', verified: { phone: true, visit: true, lab: true, buyer: true } },
    { id: 4, name: 'Agro Sol', contact: 'Ana Martinez', country: ' Colombia', products: 'Coffee, Avocados', tier: 'Gold', status: 'active', lastVerification: '2025-10-20', nextDue: '2025-11-20', compliance: 98, phone: '+57 1 234 5678', email: 'ana@agrosol.co', verified: { phone: true, visit: true, lab: true, buyer: true } },
    { id: 5, name: 'Valle Verde', contact: 'Roberto Silva', country: ' Brazil', products: 'Oranges, Soybeans', tier: 'Silver', status: 'alert', lastVerification: '2025-10-10', nextDue: '2025-10-30', compliance: 87, phone: '+55 11 9876 5432', email: 'roberto@valleverde.br', verified: { phone: true, visit: false, lab: true, buyer: false } }
  ];

  const filteredGrowers = growers.filter(g => {
    const matchesSearch = !searchQuery || 
      g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.products.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || g.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '2rem' }}>
        {language === 'es' ? ' Sistema CRM de Productores' : ' Grower CRM System'}
      </h2>

      {/* SEARCH & FILTERS */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder={language === 'es' ? ' Buscar productor, contacto, producto...' : ' Search grower, contact, product...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ flex: 1, minWidth: '300px', padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem' }}
        />
        
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '1rem', background: 'rgba(30, 41, 59, 0.6)', border: '2px solid #334155', borderRadius: '12px', color: '#fff', fontSize: '1rem' }}
        >
          <option value="all">{language === 'es' ? 'Todos los Estados' : 'All Statuses'}</option>
          <option value="active">{language === 'es' ? 'Activos' : 'Active'}</option>
          <option value="expiring_soon">{language === 'es' ? 'Por Vencer' : 'Expiring Soon'}</option>
          <option value="alert">{language === 'es' ? 'Alertas' : 'Alerts'}</option>
        </select>
      </div>

      {/* GROWERS TABLE */}
      <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(59, 130, 246, 0.3)', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(59, 130, 246, 0.3)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#3b82f6', fontWeight: 'bold' }}>{language === 'es' ? 'Productor' : 'Grower'}</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#3b82f6', fontWeight: 'bold' }}>{language === 'es' ? 'Contacto' : 'Contact'}</th>
              <th style={{ padding: '1rem', textAlign: 'left', color: '#3b82f6', fontWeight: 'bold' }}>{language === 'es' ? 'Productos' : 'Products'}</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}>{language === 'es' ? 'Nivel' : 'Tier'}</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}>{language === 'es' ? 'Cumplimiento' : 'Compliance'}</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}>{language === 'es' ? 'Verificado' : 'Verified'}</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}>{language === 'es' ? 'Estado' : 'Status'}</th>
              <th style={{ padding: '1rem', textAlign: 'center', color: '#3b82f6', fontWeight: 'bold' }}>{language === 'es' ? 'Acciones' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredGrowers.map(grower => (
              <tr key={grower.id} style={{ borderBottom: '1px solid rgba(59, 130, 246, 0.1)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '0.3rem' }}>{grower.name}</div>
                  <div style={{ color: '#64748b', fontSize: '0.85rem' }}>{grower.country}</div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ color: '#fff', marginBottom: '0.2rem' }}>{grower.contact}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{grower.phone}</div>
                  <div style={{ color: '#64748b', fontSize: '0.8rem' }}>{grower.email}</div>
                </td>
                <td style={{ padding: '1rem', color: '#94a3b8', fontSize: '0.9rem' }}>{grower.products}</td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '8px', 
                    background: grower.tier === 'Gold' ? 'rgba(251, 191, 36, 0.2)' : grower.tier === 'Silver' ? 'rgba(192, 192, 192, 0.2)' : 'rgba(205, 127, 50, 0.2)',
                    color: grower.tier === 'Gold' ? '#fbbf24' : grower.tier === 'Silver' ? '#c0c0c0' : '#cd7f32',
                    fontWeight: 'bold',
                    fontSize: '0.85rem'
                  }}>
                    {grower.tier === 'Gold' ? '' : grower.tier === 'Silver' ? '' : ''} {grower.tier}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ 
                    fontSize: '1.3rem', 
                    fontWeight: 'bold', 
                    color: grower.compliance >= 95 ? '#10b981' : grower.compliance >= 90 ? '#f59e0b' : '#ef4444',
                    marginBottom: '0.3rem'
                  }}>
                    {grower.compliance}%
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ 
                      width: `${grower.compliance}%`, 
                      height: '100%', 
                      background: grower.compliance >= 95 ? '#10b981' : grower.compliance >= 90 ? '#f59e0b' : '#ef4444'
                    }} />
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <span title={language === 'es' ? 'Teléfono verificado' : 'Phone verified'} style={{ fontSize: '1.2rem', opacity: grower.verified.phone ? 1 : 0.3 }}>
                      {grower.verified.phone ? '' : ''}
                    </span>
                    <span title={language === 'es' ? 'Visita realizada' : 'Visit completed'} style={{ fontSize: '1.2rem', opacity: grower.verified.visit ? 1 : 0.3 }}>
                      {grower.verified.visit ? '' : ''}
                    </span>
                    <span title={language === 'es' ? 'Laboratorio verificado' : 'Lab verified'} style={{ fontSize: '1.2rem', opacity: grower.verified.lab ? 1 : 0.3 }}>
                      {grower.verified.lab ? '' : ''}
                    </span>
                    <span title={language === 'es' ? 'Comprador verificado' : 'Buyer verified'} style={{ fontSize: '1.2rem', opacity: grower.verified.buyer ? 1 : 0.3 }}>
                      {grower.verified.buyer ? '' : ''}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '0.4rem 0.8rem', 
                    borderRadius: '8px', 
                    background: grower.status === 'active' ? 'rgba(16, 185, 129, 0.2)' : grower.status === 'expiring_soon' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                    color: grower.status === 'active' ? '#10b981' : grower.status === 'expiring_soon' ? '#f59e0b' : '#ef4444',
                    fontWeight: 'bold',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase'
                  }}>
                    {grower.status === 'active' ? ' Active' : grower.status === 'expiring_soon' ? ' Expiring' : ' Alert'}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <button
                    style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', border: 'none', borderRadius: '8px', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '0.3rem' }}
                    onClick={() => audioSystem.playClick()}
                  >
                    {language === 'es' ? 'Ver Detalle' : 'View Details'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredGrowers.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
            {language === 'es' ? 'No se encontraron productores' : 'No growers found'}
          </div>
        )}
      </div>
    </div>
  );
};

// ================================================================
// COMPLIANCE VIEW (WORLDWIDE STANDARDS)
// ================================================================
const ComplianceView = ({ language }) => {
  const worldwideStandards = [
    { region: 'North America', countries: ['USA', 'Canada', 'Mexico'], standards: ['FDA CFR 21', 'USDA NOP', 'CFIA', 'SENASICA'], icon: '' },
    { region: 'European Union', countries: ['27 member states'], standards: ['EU Reg 396/2005', 'EU Reg 1881/2006', 'EU 2018/848', 'GLOBALG.A.P.'], icon: '' },
    { region: 'Central America', countries: ['Guatemala', 'Honduras', 'El Salvador', 'Nicaragua', 'Costa Rica', 'Panama'], standards: ['COMIECO', 'RTCA', 'Local GAP'], icon: '' },
    { region: 'South America', countries: ['Brazil', 'Colombia', 'Peru', 'Chile', 'Argentina', 'Ecuador'], standards: ['ANVISA', 'ICA', 'SENASA', 'SAG', 'AGROCALIDAD'], icon: '' },
    { region: 'Asia', countries: ['China', 'Japan', 'South Korea', 'India'], standards: ['GB Standards', 'JFCRF', 'KFDA', 'FSSAI'], icon: '' },
    { region: 'Middle East', countries: ['UAE', 'Saudi Arabia', 'Qatar'], standards: ['GSO', 'SFDA', 'MOCCAE'], icon: '' }
  ];

  return (
    <div>
      <h2 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '2rem' }}>
        {language === 'es' ? ' Cumplimiento de Estándares Globales' : ' Global Compliance Standards'}
      </h2>

      <div style={{ background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '20px', padding: '2rem', marginBottom: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.5rem' }}>50+</div>
        <div style={{ fontSize: '1.2rem', color: '#94a3b8' }}>
          {language === 'es' ? 'Estándares Internacionales de Cumplimiento' : 'International Compliance Standards'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        {worldwideStandards.map(region => (
          <div key={region.region} style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '2rem', border: '2px solid rgba(59, 130, 246, 0.3)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>{region.icon}</div>
            <h3 style={{ fontSize: '1.5rem', color: '#3b82f6', marginBottom: '1rem', textAlign: 'center' }}>{region.region}</h3>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {language === 'es' ? 'Países:' : 'Countries:'}
              </div>
              <div style={{ color: '#fff', fontSize: '0.95rem' }}>{region.countries.join(', ')}</div>
            </div>

            <div>
              <div style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                {language === 'es' ? 'Estándares:' : 'Standards:'}
              </div>
              {region.standards.map(std => (
                <div key={std} style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.5rem 1rem', borderRadius: '8px', color: '#3b82f6', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                   {std}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ================================================================
// VERIFICATION VIEW
// ================================================================
const VerificationView = ({ language }) => {
  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '3rem', border: '2px solid rgba(59, 130, 246, 0.3)', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}></div>
      <h2 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1rem' }}>
        {language === 'es' ? 'Sistema de Verificaciones' : 'Verification System'}
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
        {language === 'es' ? 'Vista de verificaciones activas, pendientes y completadas' : 'View of active, pending, and completed verifications'}
      </p>
    </div>
  );
};

// ================================================================
// REPORTS VIEW
// ================================================================
const ReportsView = ({ language }) => {
  return (
    <div style={{ background: 'rgba(30, 41, 59, 0.6)', borderRadius: '20px', padding: '3rem', border: '2px solid rgba(59, 130, 246, 0.3)', textAlign: 'center' }}>
      <div style={{ fontSize: '4rem', marginBottom: '1rem' }}></div>
      <h2 style={{ fontSize: '2rem', color: '#3b82f6', marginBottom: '1rem' }}>
        {language === 'es' ? 'Generador de Reportes' : 'Report Generator'}
      </h2>
      <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>
        {language === 'es' ? 'Genera reportes personalizados de cumplimiento y verificación' : 'Generate custom compliance and verification reports'}
      </p>
    </div>
  );
};

export default ProduceScienceVerification;
