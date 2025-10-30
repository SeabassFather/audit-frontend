import React, { useState, useEffect } from 'react';

export default function LabDashboard() {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModule, setSelectedModule] = useState('water');
  const [searchResults, setSearchResults] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // COMPLETE TEST CATALOG
  const testCatalog = {
    water: [
      { id: 'w1', name: 'pH Level', category: 'Basic Quality', price: 25, desc: 'Acidity/alkalinity measurement' },
      { id: 'w2', name: 'Turbidity', category: 'Basic Quality', price: 30, desc: 'Water clarity analysis' },
      { id: 'w3', name: 'Total Dissolved Solids (TDS)', category: 'Basic Quality', price: 35, desc: 'Mineral content' },
      { id: 'w4', name: 'Water Hardness', category: 'Basic Quality', price: 30, desc: 'Ca/Mg content' },
      { id: 'w5', name: 'Free Chlorine', category: 'Basic Quality', price: 25, desc: 'Disinfectant level' },
      { id: 'w6', name: 'Total Chlorine', category: 'Basic Quality', price: 30, desc: 'Combined chlorine' },
      { id: 'w7', name: 'Alkalinity', category: 'Basic Quality', price: 30, desc: 'Buffering capacity' },
      { id: 'w8', name: 'Conductivity', category: 'Basic Quality', price: 35, desc: 'Electrical conductivity' },
      { id: 'w9', name: 'Dissolved Oxygen', category: 'Basic Quality', price: 40, desc: 'O2 content' },
      { id: 'w10', name: 'Temperature', category: 'Basic Quality', price: 20, desc: 'Water temperature' },
      { id: 'w11', name: 'Nitrate (NO3)', category: 'Nutrients', price: 40, desc: 'Nitrogen compound' },
      { id: 'w12', name: 'Nitrite (NO2)', category: 'Nutrients', price: 40, desc: 'Nitrogen compound' },
      { id: 'w13', name: 'Ammonia (NH3)', category: 'Nutrients', price: 45, desc: 'Nitrogen compound' },
      { id: 'w14', name: 'Phosphate (PO4)', category: 'Nutrients', price: 45, desc: 'Phosphorus content' },
      { id: 'w15', name: 'Sulfate (SO4)', category: 'Nutrients', price: 40, desc: 'Sulfur compound' },
      { id: 'w16', name: 'E. coli', category: 'Microbial', price: 85, desc: 'Bacterial contamination' },
      { id: 'w17', name: 'Total Coliform', category: 'Microbial', price: 75, desc: 'Indicator bacteria' },
      { id: 'w18', name: 'Fecal Coliform', category: 'Microbial', price: 80, desc: 'Fecal contamination' },
      { id: 'w19', name: 'Enterococci', category: 'Microbial', price: 85, desc: 'Bacterial indicator' },
      { id: 'w20', name: 'Total Plate Count', category: 'Microbial', price: 70, desc: 'General bacteria' },
      { id: 'w21', name: 'Lead (Pb)', category: 'Heavy Metals', price: 60, desc: 'Toxic metal' },
      { id: 'w22', name: 'Arsenic (As)', category: 'Heavy Metals', price: 65, desc: 'Toxic metalloid' },
      { id: 'w23', name: 'Mercury (Hg)', category: 'Heavy Metals', price: 70, desc: 'Toxic metal' },
      { id: 'w24', name: 'Cadmium (Cd)', category: 'Heavy Metals', price: 60, desc: 'Toxic metal' },
      { id: 'w25', name: 'Chromium (Cr)', category: 'Heavy Metals', price: 60, desc: 'Toxic metal' },
      { id: 'w26', name: 'Copper (Cu)', category: 'Heavy Metals', price: 55, desc: 'Metal analysis' },
      { id: 'w27', name: 'Zinc (Zn)', category: 'Heavy Metals', price: 55, desc: 'Metal analysis' },
      { id: 'w28', name: 'Iron (Fe)', category: 'Heavy Metals', price: 50, desc: 'Metal analysis' },
      { id: 'w29', name: 'Manganese (Mn)', category: 'Heavy Metals', price: 50, desc: 'Metal analysis' },
      { id: 'w30', name: 'Aluminum (Al)', category: 'Heavy Metals', price: 55, desc: 'Metal analysis' }
    ],
    soil: [
      { id: 's1', name: 'Soil pH', category: 'Basic', price: 20, desc: 'Acidity/alkalinity' },
      { id: 's2', name: 'Nitrogen (N)', category: 'NPK', price: 35, desc: 'Primary macronutrient' },
      { id: 's3', name: 'Phosphorus (P)', category: 'NPK', price: 35, desc: 'Primary macronutrient' },
      { id: 's4', name: 'Potassium (K)', category: 'NPK', price: 35, desc: 'Primary macronutrient' },
      { id: 's5', name: 'Organic Matter', category: 'Basic', price: 40, desc: 'Soil health indicator' },
      { id: 's6', name: 'Cation Exchange Capacity', category: 'Basic', price: 45, desc: 'Nutrient retention' },
      { id: 's7', name: 'Soil Texture', category: 'Physical', price: 50, desc: 'Sand/Silt/Clay ratio' },
      { id: 's8', name: 'Bulk Density', category: 'Physical', price: 40, desc: 'Compaction measure' },
      { id: 's9', name: 'Water Holding Capacity', category: 'Physical', price: 45, desc: 'Moisture retention' },
      { id: 's10', name: 'Calcium (Ca)', category: 'Secondary', price: 30, desc: 'Secondary nutrient' },
      { id: 's11', name: 'Magnesium (Mg)', category: 'Secondary', price: 30, desc: 'Secondary nutrient' },
      { id: 's12', name: 'Sulfur (S)', category: 'Secondary', price: 30, desc: 'Secondary nutrient' },
      { id: 's13', name: 'Iron (Fe)', category: 'Micronutrients', price: 35, desc: 'Trace element' },
      { id: 's14', name: 'Zinc (Zn)', category: 'Micronutrients', price: 35, desc: 'Trace element' },
      { id: 's15', name: 'Manganese (Mn)', category: 'Micronutrients', price: 35, desc: 'Trace element' },
      { id: 's16', name: 'Copper (Cu)', category: 'Micronutrients', price: 35, desc: 'Trace element' },
      { id: 's17', name: 'Boron (B)', category: 'Micronutrients', price: 35, desc: 'Trace element' },
      { id: 's18', name: 'Molybdenum (Mo)', category: 'Micronutrients', price: 40, desc: 'Trace element' },
      { id: 's19', name: 'Chloride (Cl)', category: 'Micronutrients', price: 30, desc: 'Trace element' },
      { id: 's20', name: 'Sodium (Na)', category: 'Salinity', price: 30, desc: 'Salinity indicator' }
    ],
    alcohol: [
      { id: 'a1', name: 'Alcohol Purity (ABV)', category: 'Basic', price: 50, desc: 'Ethanol percentage' },
      { id: 'a2', name: 'Methanol Detection', category: 'Safety', price: 75, desc: 'Toxic alcohol screening' },
      { id: 'a3', name: 'Congeners Analysis', category: 'Quality', price: 85, desc: 'Flavor compounds' },
      { id: 'a4', name: 'Density/Specific Gravity', category: 'Basic', price: 30, desc: 'Density measurement' },
      { id: 'a5', name: 'pH Level', category: 'Basic', price: 25, desc: 'Acidity measurement' },
      { id: 'a6', name: 'Acetaldehyde', category: 'Impurities', price: 60, desc: 'Oxidation product' },
      { id: 'a7', name: 'Ethyl Acetate', category: 'Esters', price: 65, desc: 'Ester compound' },
      { id: 'a8', name: 'Higher Alcohols (Fusel)', category: 'Impurities', price: 70, desc: 'Byproduct alcohols' },
      { id: 'a9', name: 'Acetic Acid', category: 'Acids', price: 55, desc: 'Volatile acidity' },
      { id: 'a10', name: 'Phenolic Compounds', category: 'Quality', price: 80, desc: 'Flavor components' }
    ],
    fuel: [
      { id: 'f1', name: 'Octane Rating (RON)', category: 'Performance', price: 60, desc: 'Gasoline quality' },
      { id: 'f2', name: 'Cetane Number', category: 'Diesel', price: 65, desc: 'Diesel ignition quality' },
      { id: 'f3', name: 'Sulfur Content', category: 'Emissions', price: 55, desc: 'Environmental compliance' },
      { id: 'f4', name: 'Water Content', category: 'Contamination', price: 45, desc: 'Water contamination' },
      { id: 'f5', name: 'Sediment Content', category: 'Contamination', price: 50, desc: 'Particulate matter' },
      { id: 'f6', name: 'API Gravity', category: 'Basic', price: 40, desc: 'Density measure' },
      { id: 'f7', name: 'Flash Point', category: 'Safety', price: 50, desc: 'Ignition temperature' },
      { id: 'f8', name: 'Cloud Point', category: 'Cold Weather', price: 45, desc: 'Wax formation temp' },
      { id: 'f9', name: 'Pour Point', category: 'Cold Weather', price: 45, desc: 'Flow temperature' },
      { id: 'f10', name: 'Viscosity', category: 'Flow', price: 55, desc: 'Flow resistance' },
      { id: 'f11', name: 'Reid Vapor Pressure', category: 'Volatility', price: 60, desc: 'Evaporation tendency' },
      { id: 'f12', name: 'Ash Content', category: 'Quality', price: 50, desc: 'Combustion residue' },
      { id: 'f13', name: 'Carbon Residue', category: 'Quality', price: 55, desc: 'Deposit formation' },
      { id: 'f14', name: 'Total Acid Number', category: 'Degradation', price: 60, desc: 'Acidity level' },
      { id: 'f15', name: 'Oxidation Stability', category: 'Storage', price: 70, desc: 'Aging resistance' }
    ],
    engine: [
      { id: 'e1', name: 'Compression Test', category: 'Mechanical', price: 80, desc: 'Cylinder pressure' },
      { id: 'e2', name: 'Leak Down Test', category: 'Mechanical', price: 85, desc: 'Cylinder sealing' },
      { id: 'e3', name: 'Oil Analysis', category: 'Lubrication', price: 90, desc: 'Oil condition' },
      { id: 'e4', name: 'Coolant Analysis', category: 'Cooling', price: 70, desc: 'Coolant condition' },
      { id: 'e5', name: 'Emissions Test (CO)', category: 'Emissions', price: 65, desc: 'Carbon monoxide' },
      { id: 'e6', name: 'Emissions Test (HC)', category: 'Emissions', price: 65, desc: 'Hydrocarbons' },
      { id: 'e7', name: 'Emissions Test (NOx)', category: 'Emissions', price: 70, desc: 'Nitrogen oxides' },
      { id: 'e8', name: 'Fuel Efficiency Test', category: 'Performance', price: 95, desc: 'MPG/consumption' },
      { id: 'e9', name: 'Power Output Test', category: 'Performance', price: 100, desc: 'Horsepower/torque' },
      { id: 'e10', name: 'Ignition Timing', category: 'Tune-up', price: 60, desc: 'Timing accuracy' }
    ]
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8001/api/orders/pending');
      const data = await response.json();
      setPendingOrders(data.orders || []);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const tests = testCatalog[selectedModule];
    const filtered = tests.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.desc.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles([...uploadedFiles, ...files]);
    alert(`${files.length} file(s) uploaded successfully!`);
  };

  const stats = {
    pending: pendingOrders.filter(o => o.status === 'pending').length,
    processing: pendingOrders.filter(o => o.status === 'processing').length,
    completed: pendingOrders.filter(o => o.status === 'completed').length
  };

  return (
    <div style={{padding: '40px', background: '#0f172a', minHeight: '100vh', color: 'white'}}>
      <div style={{maxWidth: '1600px', margin: '0 auto'}}>
        
        <h1 style={{fontSize: '2.5rem', color: '#06b6d4', marginBottom: '30px'}}>
          Ã°Å¸â€Â¬ Lab Dashboard
        </h1>

        {/* STATS */}
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px'}}>
          <div style={{background: '#1e293b', padding: '25px', borderRadius: '16px', border: '2px solid #3b82f6'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>Ã¢ÂÂ³</div>
            <div style={{fontSize: '2rem', fontWeight: '700', color: '#3b82f6'}}>{stats.pending}</div>
            <div style={{color: '#94a3b8'}}>Pending Orders</div>
          </div>
          <div style={{background: '#1e293b', padding: '25px', borderRadius: '16px', border: '2px solid #f59e0b'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>Ã°Å¸â€Â¬</div>
            <div style={{fontSize: '2rem', fontWeight: '700', color: '#f59e0b'}}>{stats.processing}</div>
            <div style={{color: '#94a3b8'}}>Processing</div>
          </div>
          <div style={{background: '#1e293b', padding: '25px', borderRadius: '16px', border: '2px solid #10b981'}}>
            <div style={{fontSize: '2.5rem', marginBottom: '10px'}}>Ã¢Å“â€¦</div>
            <div style={{fontSize: '2rem', fontWeight: '700', color: '#10b981'}}>{stats.completed}</div>
            <div style={{color: '#94a3b8'}}>Completed</div>
          </div>
        </div>

        {/* TABS */}
        <div style={{display: 'flex', gap: '10px', marginBottom: '30px'}}>
          <button onClick={() => setActiveTab('orders')} style={{padding: '12px 24px', background: activeTab === 'orders' ? '#06b6d4' : '#1e293b', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: 'pointer'}}>
            Ã°Å¸â€œâ€¹ Active Orders
          </button>
          <button onClick={() => setActiveTab('search')} style={{padding: '12px 24px', background: activeTab === 'search' ? '#10b981' : '#1e293b', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: 'pointer'}}>
            Ã°Å¸â€Â Search Tests
          </button>
          <button onClick={() => setActiveTab('upload')} style={{padding: '12px 24px', background: activeTab === 'upload' ? '#f59e0b' : '#1e293b', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: 'pointer'}}>
            Ã°Å¸â€œÂ¤ Upload Reports
          </button>
        </div>

        {/* CONTENT */}
        <div style={{background: '#1e293b', padding: '30px', borderRadius: '16px', border: '2px solid #334155', minHeight: '500px'}}>
          
          {activeTab === 'orders' && (
            <div>
              <h2 style={{color: '#06b6d4', marginBottom: '20px'}}>Ã°Å¸â€œâ€¹ Active Orders</h2>
              {loading ? (
                <div style={{textAlign: 'center', padding: '60px', color: '#64748b'}}>Ã¢ÂÂ³ Loading...</div>
              ) : pendingOrders.length === 0 ? (
                <div style={{textAlign: 'center', padding: '60px', color: '#64748b'}}>No orders</div>
              ) : (
                pendingOrders.map(order => (
                  <div key={order.order_id} style={{padding: '20px', background: '#0f172a', border: '2px solid #334155', borderRadius: '12px', marginBottom: '15px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                      <div>
                        <div style={{color: '#06b6d4', fontWeight: '700', fontSize: '1.1rem', fontFamily: 'monospace', marginBottom: '5px'}}>{order.order_id}</div>
                        <div style={{color: '#94a3b8'}}>{order.customer_name}</div>
                      </div>
                      <div style={{padding: '6px 12px', background: '#3b82f620', border: '2px solid #3b82f6', borderRadius: '8px', color: '#3b82f6', fontWeight: '700', fontSize: '0.85rem', height: 'fit-content'}}>
                        {order.status?.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'search' && (
            <div>
              <h2 style={{color: '#10b981', marginBottom: '20px'}}>Ã°Å¸â€Â Search Test Catalog</h2>
              
              {/* MODULE SELECTOR */}
              <div style={{display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap'}}>
                {Object.keys(testCatalog).map(mod => (
                  <button key={mod} onClick={() => {setSelectedModule(mod); setSearchResults([]); setSearchQuery('');}} style={{padding: '10px 20px', background: selectedModule === mod ? '#10b981' : '#0f172a', border: `2px solid ${selectedModule === mod ? '#10b981' : '#334155'}`, borderRadius: '8px', color: selectedModule === mod ? 'white' : '#94a3b8', fontWeight: '700', cursor: 'pointer', textTransform: 'capitalize'}}>
                    {mod === 'water' && 'Ã°Å¸â€™Â§'} {mod === 'soil' && 'Ã°Å¸Å’Â±'} {mod === 'alcohol' && 'Ã°Å¸Â§Âª'} {mod === 'fuel' && 'Ã¢â€ºÂ½'} {mod === 'engine' && 'Ã°Å¸Å¡Å“'} {mod}
                  </button>
                ))}
              </div>

              {/* SEARCH INPUT */}
              <div style={{display: 'flex', gap: '10px', marginBottom: '20px'}}>
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSearch()} placeholder={`Search ${selectedModule} tests...`} style={{flex: 1, padding: '14px', background: '#0f172a', border: '2px solid #334155', borderRadius: '8px', color: 'white', fontSize: '1rem'}} />
                <button onClick={handleSearch} style={{padding: '14px 28px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: 'pointer'}}>Ã°Å¸â€Â Search</button>
              </div>

              {/* RESULTS */}
              <div style={{maxHeight: '500px', overflowY: 'auto'}}>
                {searchResults.length > 0 ? (
                  searchResults.map(test => (
                    <div key={test.id} style={{padding: '15px', background: '#0f172a', borderRadius: '10px', marginBottom: '10px', border: '1px solid #334155'}}>
                      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px'}}>
                        <div style={{color: 'white', fontWeight: '700', fontSize: '1.1rem'}}>{test.name}</div>
                        <div style={{color: '#10b981', fontWeight: '700', fontSize: '1.2rem'}}>${test.price}</div>
                      </div>
                      <div style={{color: '#06b6d4', fontSize: '0.85rem', marginBottom: '5px'}}>{test.category}</div>
                      <div style={{color: '#94a3b8', fontSize: '0.9rem'}}>{test.desc}</div>
                    </div>
                  ))
                ) : searchQuery ? (
                  <div style={{textAlign: 'center', padding: '60px', color: '#64748b'}}>No tests found</div>
                ) : (
                  <div style={{textAlign: 'center', padding: '60px', color: '#64748b'}}>
                    <div style={{fontSize: '3rem', marginBottom: '10px'}}>Ã°Å¸â€Â¬</div>
                    <div>Search {selectedModule} tests above</div>
                    <div style={{marginTop: '10px', color: '#10b981', fontSize: '1.2rem', fontWeight: '700'}}>{testCatalog[selectedModule].length} tests available</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'upload' && (
            <div>
              <h2 style={{color: '#f59e0b', marginBottom: '20px'}}>Ã°Å¸â€œÂ¤ Upload Reports & Data</h2>
              
              <div style={{border: '3px dashed #334155', borderRadius: '16px', padding: '60px 40px', textAlign: 'center', background: '#0f172a', marginBottom: '30px', cursor: 'pointer'}} onClick={() => document.getElementById('fileUpload').click()}>
                <div style={{fontSize: '5rem', marginBottom: '20px'}}>Ã°Å¸â€œÂ</div>
                <div style={{color: 'white', fontWeight: '700', fontSize: '1.3rem', marginBottom: '10px'}}>Drop files here or click to browse</div>
                <div style={{color: '#94a3b8', fontSize: '1rem', marginBottom: '20px'}}>Supports: CSV, Excel, PDF, Images, Reports</div>
                <input id="fileUpload" type="file" multiple onChange={handleFileUpload} style={{display: 'none'}} accept=".csv,.xlsx,.xls,.pdf,.jpg,.jpeg,.png,.doc,.docx" />
                <button style={{padding: '12px 32px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: '700', fontSize: '1rem', cursor: 'pointer'}}>Choose Files</button>
              </div>

              {/* UPLOADED FILES LIST */}
              {uploadedFiles.length > 0 && (
                <div>
                  <h3 style={{color: '#10b981', marginBottom: '15px'}}>Ã¢Å“â€¦ Uploaded Files ({uploadedFiles.length})</h3>
                  {uploadedFiles.map((file, i) => (
                    <div key={i} style={{padding: '15px', background: '#0f172a', borderRadius: '10px', marginBottom: '10px', border: '2px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div>
                        <div style={{color: 'white', fontWeight: '600'}}>{file.name}</div>
                        <div style={{color: '#94a3b8', fontSize: '0.85rem'}}>{(file.size / 1024).toFixed(2)} KB</div>
                      </div>
                      <div style={{color: '#10b981', fontSize: '1.5rem'}}>Ã¢Å“â€¦</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}