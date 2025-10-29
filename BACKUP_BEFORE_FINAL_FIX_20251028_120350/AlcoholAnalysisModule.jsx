import React, { useState } from 'react';
import { alcoholTestCatalog } from './alcoholTestCatalog';
import { useLanguage } from './LanguageContext';
import audioSystem from './audioSystem';

function AlcoholAnalysisModule() {
  const { language } = useLanguage();
  const [selectedTests, setSelectedTests] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(['Purity']);
  const categories = alcoholTestCatalog;

  const toggleCategory = (category) => {
    setExpandedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const toggleTest = (testId) => {
    setSelectedTests(prev => prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]);
  };

  const totalCost = selectedTests.reduce((sum, testId) => {
    const test = alcoholTestCatalog.find(t => t.id === testId);
    return sum + (test ? test.price : 0);
  }, 0);

  const getCategoryTests = (category) => alcoholTestCatalog.filter(t => t.category === category);

  const handlePrint = () => window.print();
  const handleDownloadPDF = () => alert(language === 'es' ? 'Generando PDF...' : 'Generating PDF...');
  const handleEmail = () => alert(language === 'es' ? 'Enviando email...' : 'Sending email...');

  return (
    <div style={{ minHeight: '100vh', background: '#1a2332', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        
        {/* Header with Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#facc15', textShadow: '0 0 20px rgba(250,204,21,0.5)', margin: 0 }}>
            {language === 'es' ? 'Análisis de Alcohol - 25 Pruebas' : 'Alcohol Analysis - 25 Tests'}
          </h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button onMouseEnter={() => audioSystem.playHover()} onClick={() => { audioSystem.playClick();  audioSystem.playClick(); handlePrint();  }} style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.4)', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              ??? {language === 'es' ? 'Imprimir' : 'Print'}
            </button>
            <button onMouseEnter={() => audioSystem.playHover()} onClick={() => { audioSystem.playClick();  audioSystem.playClick(); handleDownloadPDF();  }} style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444', border: '1px solid rgba(239,68,68,0.4)', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              ?? PDF
            </button>
            <button onMouseEnter={() => audioSystem.playHover()} onClick={() => { audioSystem.playClick();  audioSystem.playClick(); handleEmail();  }} style={{ background: 'rgba(16,185,129,0.2)', color: '#10b981', border: '1px solid rgba(16,185,129,0.4)', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
              ?? Email
            </button>
          </div>
        </div>

        <div style={{ background: '#0f1923', borderRadius: '24px', padding: '50px', border: '1px solid rgba(250,204,21,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <div style={{ fontSize: '100px' }}>??</div>
              <div>
                <h2 style={{ fontSize: '36px', color: '#facc15', marginBottom: '12px', fontWeight: '700' }}>
                  {language === 'es' ? 'Seleccionar Pruebas' : 'Select Tests'}
                </h2>
                <p style={{ color: '#64748b', fontSize: '18px' }}>
                  {language === 'es' ? 'Pureza, Metanol, Congéneres' : 'Purity, Methanol, Congeners'}
                </p>
              </div>
            </div>
            <div style={{ background: 'rgba(250,204,21,0.1)', border: '2px solid rgba(250,204,21,0.4)', borderRadius: '20px', padding: '30px 50px', textAlign: 'center', minWidth: '250px' }}>
              <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '8px' }}>
                {language === 'es' ? 'Total' : 'Total'}
              </div>
              <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#facc15', lineHeight: '1' }}>${totalCost}</div>
              <div style={{ fontSize: '16px', color: '#64748b', marginTop: '8px' }}>
                {selectedTests.length} {language === 'es' ? 'pruebas' : 'tests'}
              </div>
            </div>
          </div>

          {categories.map(category => {
            const categoryTests = getCategoryTests(category);
            const isExpanded = expandedCategories.includes(category);
            return (
              <div key={category.name} style={{ marginBottom: '40px' }}>
                <div onMouseEnter={() => audioSystem.playHover()} onClick={() => toggleCategory(category)} style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: '12px', padding: '20px 30px', marginBottom: isExpanded ? '24px' : '0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '28px', color: '#facc15', margin: 0, fontWeight: '700' }}>
                    {language === 'es' ? getCategoryNameES(category) : category}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: '#64748b', fontSize: '16px' }}>
                      {categoryTests.length} {language === 'es' ? 'pruebas' : 'tests'}
                    </span>
                    <span style={{ fontSize: '24px', color: '#facc15', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>?</span>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {categoryTests.map(test => (
                      <div key={test.id} onMouseEnter={() => audioSystem.playHover()} onClick={() => toggleTest(test.id)} style={{ background: selectedTests.includes(test.id) ? 'rgba(250,204,21,0.2)' : 'rgba(15,25,35,0.6)', border: selectedTests.includes(test.id) ? '2px solid rgba(250,204,21,0.6)' : '1px solid rgba(100,116,139,0.3)', borderRadius: '16px', padding: '24px', cursor: 'pointer', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '16px', right: '16px', width: '28px', height: '28px', borderRadius: '8px', background: selectedTests.includes(test.id) ? '#facc15' : 'transparent', border: '2px solid #facc15', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1a2332', fontSize: '18px', fontWeight: 'bold' }}>
                          {selectedTests.includes(test.id) && '?'}
                        </div>
                        <div style={{ paddingRight: '40px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
                            {language === 'es' ? getTestNameES(test.name) : test.name}
                          </div>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#facc15', marginBottom: '4px' }}>${test.price}</div>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>
                            {test.id} • {test.turnaround || 3} {language === 'es' ? 'días' : 'days'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {selectedTests.length > 0 && (
            <div style={{ display: 'flex', gap: '20px', marginTop: '50px', paddingTop: '40px', borderTop: '1px solid rgba(100,116,139,0.3)' }}>
              <button onMouseEnter={() => audioSystem.playHover()} onClick={() => setSelectedTests([])} style={{ background: 'rgba(100,116,139,0.2)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.4)', borderRadius: '12px', padding: '18px 40px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', flex: 1 }}>
                {language === 'es' ? 'Limpiar' : 'Clear'}
              </button>
              <button style={{ background: 'linear-gradient(135deg, #facc15, #eab308)', color: '#1a2332', border: 'none', borderRadius: '12px', padding: '18px 40px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 25px rgba(250,204,21,0.4)', flex: 2 }}>
                {language === 'es' ? 'Enviar Orden' : 'Submit Order'} - ${totalCost}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Translation helpers
const getCategoryNameES = (category) => {
  const translations = {
    'Purity': 'Pureza',
    'Congeners': 'Congéneres',
    'Quality': 'Calidad',
    'Safety': 'Seguridad'
  };
  return translations[category] || category;
};

const getTestNameES = (testName) => {
  const translations = {
    'Ethanol Content (%)': 'Contenido de Etanol (%)',
    'Methanol Detection': 'Detección de Metanol',
    'Proof Verification': 'Verificación de Graduación',
    'Water Content': 'Contenido de Agua',
    'Acetaldehyde': 'Acetaldehído',
    'Isopropanol': 'Isopropanol',
    'N-Propanol': 'N-Propanol',
    'Complete Purity Panel': 'Panel Completo de Pureza'
  };
  return translations[testName] || testName;
};

export default AlcoholAnalysisModule;




