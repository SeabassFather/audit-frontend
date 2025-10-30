import html2pdf from 'html2pdf.js';

export const ExportUtils = {
  handlePrint: () => {
    window.print();
  },

  handlePDF: (elementRef, filename = 'AuditDNA_Report.pdf') => {
    const element = elementRef.current;
    const opt = {
      margin: 0.5,
      filename: filename,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  },

  handleEmail: (emailAddress, reportData, language) => {
    if (!emailAddress) {
      alert(language === 'es' ? 'Por favor ingrese un correo electrónico' : 'Please enter an email address');
      return false;
    }
    // In production, this would call your backend API
    console.log('Sending report to:', emailAddress, reportData);
    alert(`${language === 'es' ? '✅ Informe enviado a' : '✅ Report sent to'}: ${emailAddress}`);
    return true;
  }
};

export const ExportButtons = ({ onPrint, onPDF, onEmail, selectedCount, language }) => {
  if (selectedCount === 0) return null;
  
  return (
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem', flexWrap: 'wrap' }}>
      <button 
        onClick={onPrint}
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem',
          boxShadow: '0 10px 30px rgba(6, 182, 212, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        🖨️ {language === 'es' ? 'Imprimir' : 'Print'}
      </button>
      <button 
        onClick={onPDF}
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem',
          boxShadow: '0 10px 30px rgba(239, 68, 68, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        📄 {language === 'es' ? 'Descargar PDF' : 'Download PDF'}
      </button>
      <button 
        onClick={onEmail}
        style={{
          padding: '1rem 2rem',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          border: 'none',
          borderRadius: '12px',
          color: '#fff',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontSize: '1rem',
          boxShadow: '0 10px 30px rgba(16, 185, 129, 0.4)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        📧 {language === 'es' ? 'Enviar Email' : 'Send Email'}
      </button>
    </div>
  );
};

export const EmailModal = ({ show, onClose, onSend, language }) => {
  const [email, setEmail] = React.useState('');
  
  if (!show) return null;
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '25px',
        padding: '3rem',
        maxWidth: '500px',
        width: '90%',
        border: '3px solid #10b981',
        boxShadow: '0 30px 80px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ color: '#10b981', marginBottom: '2rem', fontSize: '2rem', textAlign: 'center' }}>
          📧 {language === 'es' ? 'Enviar Informe por Email' : 'Email Report'}
        </h3>
        <input
          type="email"
          placeholder={language === 'es' ? 'correo@ejemplo.com' : 'email@example.com'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '1.2rem',
            background: 'rgba(30, 41, 59, 0.8)',
            border: '2px solid #334155',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '1.1rem',
            marginBottom: '2rem',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#10b981'}
          onBlur={(e) => e.target.style.borderColor = '#334155'}
        />
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => { onSend(email); setEmail(''); }}
            style={{
              flex: 1,
              padding: '1.2rem',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            {language === 'es' ? '✅ Enviar' : '✅ Send'}
          </button>
          <button 
            onClick={() => { onClose(); setEmail(''); }}
            style={{
              flex: 1,
              padding: '1.2rem',
              background: 'rgba(100, 116, 139, 0.3)',
              border: '2px solid #64748b',
              borderRadius: '12px',
              color: '#fff',
              fontWeight: 'bold',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            {language === 'es' ? '❌ Cancelar' : '❌ Cancel'}
          </button>
        </div>
      </div>
    </div>
  );
};
