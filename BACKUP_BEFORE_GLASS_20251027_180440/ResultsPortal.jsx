import React, { useState } from 'react';

export default function ResultsPortal() {
  const [searchId, setSearchId] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedModule, setSelectedModule] = useState('water');

  // TEST CATALOG
  const testCatalog = {
    water: [
      { id: 'w1', name: 'pH Level', category: 'Basic Quality', price: 25, desc: 'Acidity/alkalinity' },
      { id: 'w2', name: 'Turbidity', category: 'Basic Quality', price: 30, desc: 'Water clarity' },
      { id: 'w3', name: 'TDS', category: 'Basic Quality', price: 35, desc: 'Total dissolved solids' },
      { id: 'w4', name: 'Hardness', category: 'Basic Quality', price: 30, desc: 'Ca/Mg content' },
      { id: 'w5', name: 'Chlorine', category: 'Basic Quality', price: 25, desc: 'Disinfectant level' },
      { id: 'w6', name: 'Nitrate', category: 'Nutrients', price: 40, desc: 'NO3 analysis' },
      { id: 'w7', name: 'Nitrite', category: 'Nutrients', price: 40, desc: 'NO2 analysis' },
      { id: 'w8', name: 'Ammonia', category: 'Nutrients', price: 45, desc: 'NH3 analysis' },
      { id: 'w9', name: 'Phosphate', category: 'Nutrients', price: 45, desc: 'PO4 analysis' },
      { id: 'w10', name: 'E. coli', category: 'Microbial', price: 85, desc: 'Bacterial test' },
      { id: 'w11', name: 'Total Coliform', category: 'Microbial', price: 75, desc: 'Indicator bacteria' },
      { id: 'w12', name: 'Lead', category: 'Heavy Metals', price: 60, desc: 'Pb analysis' },
      { id: 'w13', name: 'Arsenic', category: 'Heavy Metals', price: 65, desc: 'As analysis' },
      { id: 'w14', name: 'Mercury', category: 'Heavy Metals', price: 70, desc: 'Hg analysis' },
      { id: 'w15', name: 'Cadmium', category: 'Heavy Metals', price: 60, desc: 'Cd analysis' }
    ],
    soil: [
      { id: 's1', name: 'Soil pH', category: 'Basic', price: 20, desc: 'Acidity level' },
      { id: 's2', name: 'Nitrogen', category: 'NPK', price: 35, desc: 'N content' },
      { id: 's3', name: 'Phosphorus', category: 'NPK', price: 35, desc: 'P content' },
      { id: 's4', name: 'Potassium', category: 'NPK', price: 35, desc: 'K content' },
      { id: 's5', name: 'Organic Matter', category: 'Basic', price: 40, desc: 'OM percentage' }
    ],
    alcohol: [
      { id: 'a1', name: 'ABV', category: 'Basic', price: 50, desc: 'Alcohol percentage' },
      { id: 'a2', name: 'Methanol', category: 'Safety', price: 75, desc: 'Toxic screening' },
      { id: 'a3', name: 'Congeners', category: 'Quality', price: 85, desc: 'Flavor compounds' }
    ],
    fuel: [
      { id: 'f1', name: 'Octane', category: 'Performance', price: 60, desc: 'Quality rating' },
      { id: 'f2', name: 'Cetane', category: 'Diesel', price: 65, desc: 'Ignition quality' },
      { id: 'f3', name: 'Sulfur', category: 'Emissions', price: 55, desc: 'Content analysis' }
    ]
  };

  const fetchResults = async () => {
    if (!searchId.trim()) {
      alert('Please enter Order ID');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8001/api/results/${searchId}`);
      if (!response.ok) throw new Error('Order not found');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const tests = testCatalog[selectedModule];
    const filtered = tests.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
  };

  const printResults = () => {
    window.print();
  };

  const downloadPDF = () => {
    alert('PDF generation: Convert this page to PDF using browser Print → Save as PDF');
    window.print();
  };

  return (
    <div style={{padding: '40px', background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <div style={{maxWidth: '1400px', margin: '0 auto'}}>
        
        {/* HEADER */}
        <h1 style={{fontSize: '2.5rem', color: '#06b6d4', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '15px'}}>
          🔍 View Your Test Results
        </h1>
        <p style={{color: '#94a3b8', fontSize: '1.1rem', marginBottom: '30px'}}>
          Search tests • Upload files • View results
        </p>

        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px'}}>
          
          {/* LEFT COLUMN */}
          <div>
            {/* 1. SEARCH BY ORDER ID */}
            <div style={{background: '#1e293b', padding: '25px', borderRadius: '16px', marginBottom: '20px', border: '2px solid #334155'}}>
              <h3 style={{color: '#06b6d4', marginBottom: '15px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
                🔍 Search by Order ID
              </h3>
              <label style={{display: 'block', color: '#94a3b8', marginBottom: '10px', fontSize: '0.9rem'}}>
                Order ID or Traceability ID
              </label>
              <div style={{display: 'flex', gap: '10px'}}>
                <input
                  type="text"
                  value={searchId}
                  onChange={e => setSearchId(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && fetchResults()}
                  placeholder="WATER-GreenValley-A12-1234567890"
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#0f172a',
                    border: '2px solid #334155',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '0.95rem'
                  }}
                />
                <button
                  onClick={fetchResults}
                  disabled={loading}
                  style={{
                    padding: '12px 28px',
                    background: loading ? '#334155' : 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: '700',
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? '⏳' : '🔍'} Search
                </button>
              </div>
              {error && (
                <div style={{marginTop: '12px', padding: '10px', background: '#ef444420', border: '2px solid #ef4444', borderRadius: '8px', color: '#ef4444', fontSize: '0.9rem'}}>
                  ❌ {error}
                </div>
              )}
            </div>

            {/* 2. BROWSE TEST CATALOG */}
            <div style={{background: '#1e293b', padding: '25px', borderRadius: '16px', border: '2px solid #334155'}}>
              <h3 style={{color: '#10b981', marginBottom: '15px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
                🔬 Browse Test Catalog
              </h3>
              
              {/* Module Tabs */}
              <div style={{display: 'flex', gap: '8px', marginBottom: '15px', flexWrap: 'wrap'}}>
                {Object.keys(testCatalog).map(mod => (
                  <button
                    key={mod}
                    onClick={() => {setSelectedModule(mod); setSearchResults([]); setSearchQuery('');}}
                    style={{
                      padding: '8px 16px',
                      background: selectedModule === mod ? '#10b981' : '#0f172a',
                      border: `2px solid ${selectedModule === mod ? '#10b981' : '#334155'}`,
                      borderRadius: '6px',
                      color: selectedModule === mod ? 'white' : '#94a3b8',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textTransform: 'capitalize',
                      fontSize: '0.85rem'
                    }}
                  >
                    {mod === 'water' && '💧'} {mod === 'soil' && '🌱'} {mod === 'alcohol' && '🧪'} {mod === 'fuel' && '⛽'} {mod}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <div style={{display: 'flex', gap: '8px', marginBottom: '15px'}}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder={`Search ${selectedModule} tests...`}
                  style={{
                    flex: 1,
                    padding: '10px',
                    background: '#0f172a',
                    border: '2px solid #334155',
                    borderRadius: '6px',
                    color: 'white',
                    fontSize: '0.9rem'
                  }}
                />
                <button
                  onClick={handleSearch}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '6px',
                    color: 'white',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  🔍
                </button>
              </div>

              {/* Results */}
              <div style={{maxHeight: '350px', overflowY: 'auto'}}>
                {searchResults.length > 0 ? (
                  searchResults.map(test => (
                    <div key={test.id} style={{padding: '12px', background: '#0f172a', borderRadius: '8px', marginBottom: '8px', border: '1px solid #334155'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px'}}>
                        <div style={{color: 'white', fontWeight: '600', fontSize: '0.95rem'}}>{test.name}</div>
                        <div style={{color: '#10b981', fontWeight: '700', fontSize: '1rem'}}>${test.price}</div>
                      </div>
                      <div style={{color: '#06b6d4', fontSize: '0.75rem', marginBottom: '3px'}}>{test.category}</div>
                      <div style={{color: '#94a3b8', fontSize: '0.85rem'}}>{test.desc}</div>
                    </div>
                  ))
                ) : searchQuery ? (
                  <div style={{textAlign: 'center', padding: '30px', color: '#64748b', fontSize: '0.9rem'}}>No tests found</div>
                ) : (
                  <div style={{textAlign: 'center', padding: '30px', color: '#64748b'}}>
                    <div style={{fontSize: '2.5rem', marginBottom: '8px'}}>🔬</div>
                    <div style={{fontSize: '0.9rem'}}>Search for {selectedModule} tests</div>
                    <div style={{marginTop: '8px', color: '#10b981', fontSize: '1rem', fontWeight: '700'}}>{testCatalog[selectedModule].length} tests available</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div>
            {/* 3. UPLOAD SAMPLE DATA */}
            <div style={{background: '#1e293b', padding: '25px', borderRadius: '16px', border: '2px solid #334155'}}>
              <h3 style={{color: '#f59e0b', marginBottom: '15px', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '10px'}}>
                📤 Upload Sample Data
              </h3>
              
              <div
                style={{
                  border: '3px dashed #334155',
                  borderRadius: '12px',
                  padding: '40px 20px',
                  textAlign: 'center',
                  background: '#0f172a',
                  marginBottom: '15px',
                  cursor: 'pointer'
                }}
                onClick={() => document.getElementById('fileUpload').click()}
              >
                <div style={{fontSize: '3.5rem', marginBottom: '12px'}}>📁</div>
                <div style={{color: 'white', fontWeight: '700', fontSize: '1.1rem', marginBottom: '8px'}}>
                  Drop files here or click to browse
                </div>
                <div style={{color: '#94a3b8', fontSize: '0.85rem', marginBottom: '12px'}}>
                  Supports: CSV, Excel, PDF, Images
                </div>
                <input
                  id="fileUpload"
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{display: 'none'}}
                  accept=".csv,.xlsx,.xls,.pdf,.jpg,.jpeg,.png"
                />
              </div>

              <button
                onClick={() => alert('Upload processing - files ready!')}
                disabled={uploadedFiles.length === 0}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: uploadedFiles.length > 0 ? 'linear-gradient(135deg, #f59e0b, #d97706)' : '#33415550',
                  border: 'none',
                  borderRadius: '8px',
                  color: 'white',
                  fontWeight: '700',
                  cursor: uploadedFiles.length > 0 ? 'pointer' : 'not-allowed',
                  marginBottom: '15px'
                }}
              >
                📤 Process Upload ({uploadedFiles.length} files)
              </button>

              {/* Upload Tips */}
              <div style={{padding: '12px', background: '#06b6d410', border: '2px solid #06b6d4', borderRadius: '8px'}}>
                <div style={{color: '#06b6d4', fontWeight: '700', marginBottom: '8px', fontSize: '0.9rem'}}>💡 Upload Tips:</div>
                <ul style={{color: '#94a3b8', fontSize: '0.8rem', margin: 0, paddingLeft: '18px', lineHeight: '1.6'}}>
                  <li>CSV for bulk data import</li>
                  <li>Excel spreadsheets supported</li>
                  <li>Photos of field conditions</li>
                  <li>PDF reports for analysis</li>
                </ul>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div style={{marginTop: '15px'}}>
                  <div style={{color: '#10b981', fontWeight: '700', marginBottom: '10px', fontSize: '0.9rem'}}>
                    ✅ Uploaded ({uploadedFiles.length})
                  </div>
                  {uploadedFiles.slice(0, 3).map((file, i) => (
                    <div key={i} style={{padding: '8px', background: '#0f172a', borderRadius: '6px', marginBottom: '6px', border: '1px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div style={{fontSize: '0.85rem', color: 'white', fontWeight: '600'}}>{file.name}</div>
                      <div style={{color: '#10b981'}}>✅</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 4. RESULTS DISPLAY (AFTER PAYMENT) */}
        {results && (
          <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', border: '2px solid #10b981', marginTop: '30px'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px'}}>
              <h2 style={{color: '#10b981', margin: 0, fontSize: '1.5rem'}}>✅ Test Results</h2>
              
              {/* PRINT/PDF BUTTONS */}
              <div style={{display: 'flex', gap: '10px'}} className="no-print">
                <button
                  onClick={printResults}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  🖨️ Print
                </button>
                <button
                  onClick={downloadPDF}
                  style={{
                    padding: '10px 20px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontWeight: '700',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  📄 Download PDF
                </button>
              </div>
            </div>

            {/* Order Info */}
            <div style={{background: '#0f172a', padding: '20px', borderRadius: '12px', marginBottom: '20px'}}>
              <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px'}}>
                <div>
                  <div style={{color: '#64748b', fontSize: '0.8rem', marginBottom: '5px'}}>Order ID</div>
                  <div style={{color: '#06b6d4', fontWeight: '700', fontFamily: 'monospace'}}>{results.order?.order_id}</div>
                </div>
                <div>
                  <div style={{color: '#64748b', fontSize: '0.8rem', marginBottom: '5px'}}>Customer</div>
                  <div style={{color: 'white', fontWeight: '600'}}>{results.order?.customer_name}</div>
                </div>
                <div>
                  <div style={{color: '#64748b', fontSize: '0.8rem', marginBottom: '5px'}}>Location</div>
                  <div style={{color: 'white', fontWeight: '600'}}>{results.order?.farm_name} - {results.order?.field_number}</div>
                </div>
              </div>
            </div>

            {/* Test Results Table */}
            {results.results && results.results.length > 0 && (
              <div style={{overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse'}}>
                  <thead>
                    <tr style={{borderBottom: '2px solid #334155'}}>
                      <th style={{textAlign: 'left', padding: '12px', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem'}}>Parameter</th>
                      <th style={{textAlign: 'center', padding: '12px', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem'}}>Result</th>
                      <th style={{textAlign: 'center', padding: '12px', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem'}}>Reference</th>
                      <th style={{textAlign: 'center', padding: '12px', color: '#94a3b8', fontWeight: '600', fontSize: '0.9rem'}}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.results.map((r, i) => (
                      <tr key={i} style={{borderBottom: '1px solid #334155'}}>
                        <td style={{padding: '12px', color: 'white', fontWeight: '600', fontSize: '0.9rem'}}>{r.parameter}</td>
                        <td style={{padding: '12px', textAlign: 'center', color: '#06b6d4', fontWeight: '700', fontSize: '1rem'}}>
                          {r.result_value} {r.result_unit}
                        </td>
                        <td style={{padding: '12px', textAlign: 'center', color: '#94a3b8', fontSize: '0.85rem'}}>{r.reference_range_text}</td>
                        <td style={{padding: '12px', textAlign: 'center'}}>
                          <span style={{
                            padding: '5px 10px',
                            background: r.interpretation === 'SAFE' ? '#10b98120' : '#f59e0b20',
                            color: r.interpretation === 'SAFE' ? '#10b981' : '#f59e0b',
                            borderRadius: '6px',
                            fontWeight: '700',
                            fontSize: '0.8rem'
                          }}>
                            {r.interpretation}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* DEMO BUTTON */}
        {!results && !loading && (
          <div style={{background: '#1e293b', padding: '25px', borderRadius: '16px', textAlign: 'center', border: '2px solid #06b6d4'}}>
            <h3 style={{color: '#06b6d4', marginBottom: '12px', fontSize: '1.1rem'}}>💡 Try Demo Data</h3>
            <p style={{color: '#94a3b8', marginBottom: '15px', fontSize: '0.9rem'}}>
              Use: <strong style={{color: '#06b6d4'}}>DEMO-WATER-001</strong>
            </p>
            <button
              onClick={() => {setSearchId('DEMO-WATER-001'); setTimeout(fetchResults, 100);}}
              style={{
                padding: '10px 20px',
                background: '#06b6d4',
                border: 'none',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Load Demo
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}