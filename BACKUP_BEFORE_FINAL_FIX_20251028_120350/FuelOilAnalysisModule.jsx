import React, { useState } from 'react';
import audioSystem from './audioSystem';
import { fuelOilTestCatalog } from './fuelOilTestCatalog';

function FuelOilAnalysisModule() {
  const [selectedTests, setSelectedTests] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(['Gasoline']);
  const categories = fuelOilTestCatalog;
  const toggleCategory = (category) => { setExpandedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]); };
  const toggleTest = (testId) => { setSelectedTests(prev => prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]); };
  const totalCost = selectedTests.reduce((sum, testId) => { const test = fuelOilTestCatalog.find(t => t.id === testId); return sum + (test ? test.price : 0); }, 0);
  const getCategoryTests = (category) => fuelOilTestCatalog.filter(t => t.category === category);

  return (
    <div style={{ minHeight: '100vh', background: '#1a2332', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#94a3b8', textShadow: '0 0 20px rgba(148,163,184,0.5)', margin: 0, marginBottom: '30px' }}>Fuel Testing - 30 Tests</h1>
        <div style={{ background: '#0f1923', borderRadius: '24px', padding: '50px', border: '1px solid rgba(148,163,184,0.3)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}><div style={{ fontSize: '100px' }}>?</div><div><h2 style={{ fontSize: '36px', color: '#94a3b8', marginBottom: '12px', fontWeight: '700' }}>Select Tests</h2></div></div>
            <div style={{ background: 'rgba(148,163,184,0.1)', border: '2px solid rgba(148,163,184,0.4)', borderRadius: '20px', padding: '30px 50px', textAlign: 'center', minWidth: '250px' }}><div style={{ fontSize: '56px', fontWeight: 'bold', color: '#94a3b8', lineHeight: '1' }}>${totalCost}</div><div style={{ fontSize: '16px', color: '#64748b', marginTop: '8px' }}>{selectedTests.length} tests</div></div>
          </div>
          {categories.map(category => { const categoryTests = getCategoryTests(category); const isExpanded = expandedCategories.includes(category); return (<div key={category.name} style={{ marginBottom: '40px' }}><div onMouseEnter={() => audioSystem.playHover()} onClick={() => toggleCategory(category)} style={{ background: 'rgba(148,163,184,0.1)', border: '1px solid rgba(148,163,184,0.3)', borderRadius: '12px', padding: '20px 30px', marginBottom: isExpanded ? '24px' : '0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><h3 style={{ fontSize: '28px', color: '#94a3b8', margin: 0, fontWeight: '700' }}>{category.name}</h3><span style={{ fontSize: '24px', color: '#94a3b8', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>?</span></div>{isExpanded && (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>{categoryTests.map(test => (<div key={test.id} onMouseEnter={() => audioSystem.playHover()} onClick={() => toggleTest(test.id)} style={{ background: selectedTests.includes(test.id) ? 'rgba(148,163,184,0.2)' : 'rgba(15,25,35,0.6)', border: selectedTests.includes(test.id) ? '2px solid rgba(148,163,184,0.6)' : '1px solid rgba(100,116,139,0.3)', borderRadius: '16px', padding: '24px', cursor: 'pointer', position: 'relative' }}><div style={{ position: 'absolute', top: '16px', right: '16px', width: '28px', height: '28px', borderRadius: '8px', background: selectedTests.includes(test.id) ? '#94a3b8' : 'transparent', border: '2px solid #94a3b8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>{selectedTests.includes(test.id) && '?'}</div><div style={{ paddingRight: '40px' }}><div style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{test.name}</div><div style={{ fontSize: '24px', fontWeight: '700', color: '#94a3b8', marginBottom: '4px' }}>${test.price}</div><div style={{ fontSize: '13px', color: '#64748b' }}>{test.id}</div></div></div>))}</div>)}</div>); })}
          {selectedTests.length > 0 && (<div style={{ marginTop: '50px' }}><button style={{ background: 'linear-gradient(135deg, #94a3b8, #64748b)', color: 'white', border: 'none', borderRadius: '12px', padding: '18px 40px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 25px rgba(148,163,184,0.4)', width: '100%' }}>Submit - ${totalCost}</button></div>)}
        </div>
      </div>
    </div>
  );
}

export default FuelOilAnalysisModule;





