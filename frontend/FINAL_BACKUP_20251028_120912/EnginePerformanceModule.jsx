import React, { useState } from 'react';
import audioSystem from './audioSystem';
import { engineTestCatalog } from './engineTestCatalog';

function EnginePerformanceModule() {
  const [selectedTests, setSelectedTests] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState(['Oil Analysis']);
  const categories = engineTestCatalog;

  const toggleCategory = (category) => {
    setExpandedCategories(prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  const toggleTest = (testId) => {
    setSelectedTests(prev => prev.includes(testId) ? prev.filter(id => id !== testId) : [...prev, testId]);
  };

  const totalCost = selectedTests.reduce((sum, testId) => {
    const test = engineTestCatalog.find(t => t.id === testId);
    return sum + (test ? test.price : 0);
  }, 0);

  const getCategoryTests = (category) => engineTestCatalog.filter(t => t.category === category);

  return (
    <div style={{ minHeight: '100vh', background: '#1a2332', padding: '40px 20px' }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '56px', fontWeight: 'bold', color: '#8b5cf6', marginBottom: '40px', textAlign: 'center', textShadow: '0 0 20px rgba(139,92,246,0.5)' }}>
          Engine Diagnostics - 20 Tests Available
        </h1>
        <div style={{ background: '#0f1923', borderRadius: '24px', padding: '50px', border: '1px solid rgba(139,92,246,0.3)', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <div style={{ fontSize: '100px' }}></div>
              <div>
                <h2 style={{ fontSize: '36px', color: '#8b5cf6', marginBottom: '12px', fontWeight: '700' }}>Select Engine Tests</h2>
                <p style={{ color: '#64748b', fontSize: '18px' }}>Oil Analysis, Wear Metals, Viscosity, TBN, Contamination</p>
              </div>
            </div>
            <div style={{ background: 'rgba(139,92,246,0.1)', border: '2px solid rgba(139,92,246,0.4)', borderRadius: '20px', padding: '30px 50px', textAlign: 'center', minWidth: '250px' }}>
              <div style={{ fontSize: '16px', color: '#64748b', marginBottom: '8px' }}>Total Cost</div>
              <div style={{ fontSize: '56px', fontWeight: 'bold', color: '#8b5cf6', lineHeight: '1' }}>${totalCost}</div>
              <div style={{ fontSize: '16px', color: '#64748b', marginTop: '8px' }}>{selectedTests.length} tests selected</div>
            </div>
          </div>
          {categories.map(category => {
            const categoryTests = getCategoryTests(category);
            const isExpanded = expandedCategories.includes(category);
            return (
              <div key={category.name} style={{ marginBottom: '40px' }}>
                <div onMouseEnter={() => audioSystem.playHover()} onClick={() => toggleCategory(category)} style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '12px', padding: '20px 30px', marginBottom: isExpanded ? '24px' : '0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s' }}>
                  <h3 style={{ fontSize: '28px', color: '#8b5cf6', margin: 0, fontWeight: '700' }}>{category.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <span style={{ color: '#64748b', fontSize: '16px' }}>{categoryTests.length} tests</span>
                    <span style={{ fontSize: '24px', color: '#8b5cf6', transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}></span>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                    {categoryTests.map(test => (
                      <div key={test.id} onMouseEnter={() => audioSystem.playHover()} onClick={() => toggleTest(test.id)} style={{ background: selectedTests.includes(test.id) ? 'rgba(139,92,246,0.2)' : 'rgba(15,25,35,0.6)', border: selectedTests.includes(test.id) ? '2px solid rgba(139,92,246,0.6)' : '1px solid rgba(100,116,139,0.3)', borderRadius: '16px', padding: '24px', cursor: 'pointer', transition: 'all 0.3s', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '16px', right: '16px', width: '28px', height: '28px', borderRadius: '8px', background: selectedTests.includes(test.id) ? '#8b5cf6' : 'transparent', border: '2px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', fontWeight: 'bold' }}>
                          {selectedTests.includes(test.id) && ''}
                        </div>
                        <div style={{ paddingRight: '40px' }}>
                          <div style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '8px' }}>{test.name}</div>
                          <div style={{ fontSize: '24px', fontWeight: '700', color: '#8b5cf6', marginBottom: '4px' }}>${test.price}</div>
                          <div style={{ fontSize: '13px', color: '#64748b' }}>{test.id}</div>
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
              <button onMouseEnter={() => audioSystem.playHover()} onClick={() => setSelectedTests([])} style={{ background: 'rgba(100,116,139,0.2)', color: '#94a3b8', border: '1px solid rgba(100,116,139,0.4)', borderRadius: '12px', padding: '18px 40px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', flex: 1 }}>Clear Selection</button>
              <button style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: 'white', border: 'none', borderRadius: '12px', padding: '18px 40px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 8px 25px rgba(139,92,246,0.4)', flex: 2 }}>Submit Order - ${totalCost}</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EnginePerformanceModule;





