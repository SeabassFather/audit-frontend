import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Send, X, Upload, Search } from 'lucide-react';

export default function WaterTech() {
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [searchTest, setSearchTest] = useState('');
  const [contactForm, setContactForm] = useState({ 
    name: '', email: '', phone: '', company: '', message: '', files: [] 
  });

  const categories = ['Todos', 'FiltraciÃƒÂ³n', 'Suelo', 'Reciclaje', 'Riego', 'Sensores'];

  const waterTests = [
    'pH', 'EC (Electrical Conductivity)', 'TDS (Total Dissolved Solids)', 'SAR (Sodium Absorption Ratio)',
    'Calcium', 'Magnesium', 'Sodium', 'Potassium', 'Nitrate', 'Nitrite', 'Ammonium',
    'Boron', 'Chloride', 'Sulfates', 'Bicarbonates', 'Zinc', 'Manganese', 'Copper', 'Iron',
    'Lead', 'Cadmium', 'Chromium', 'Arsenic', 'Mercury', 'Residual Chlorine', 'Chloramine',
    'Bromine', 'Ozone Residuals', 'E. coli', 'Coliforms', 'Listeria', 'Salmonella',
    'Biofilm Detection', 'LSI (Langelier Saturation Index)', 'RSI (Ryznar Stability Index)',
    'Silica', 'Phosphates', 'COD (Chemical Oxygen Demand)', 'BOD (Biological Oxygen Demand)',
    'TSS (Total Suspended Solids)', 'Glyphosate', 'Atrazine', 'PFAS', 'Fluoride', 'Turbidity'
  ];

  const products = [
    { id: 1, nameEN: 'UV Sterilizer', nameES: 'Esterilizador UV', category: 'FiltraciÃƒÂ³n', status: 'Disponible', descEN: 'Kills bacteria and viruses using ultraviolet light technology', descES: 'Elimina bacterias y virus usando tecnologÃƒÂ­a de luz ultravioleta', targets: 'E.Coli, PatÃƒÂ³genos, Virus' },
    { id: 2, nameEN: 'Ozone Treatment System', nameES: 'Sistema de Tratamiento con Ozono', category: 'FiltraciÃƒÂ³n', status: 'Piloto', descEN: 'Oxidizes pathogens and organic matter in water', descES: 'Oxida patÃƒÂ³genos y materia orgÃƒÂ¡nica en el agua', targets: 'E.Coli, Materia OrgÃƒÂ¡nica, PatÃƒÂ³genos' },
    { id: 3, nameEN: 'Chlorination Unit', nameES: 'Unidad de CloraciÃƒÂ³n', category: 'FiltraciÃƒÂ³n', status: 'Disponible', descEN: 'Disinfects municipal and irrigation water supplies', descES: 'Desinfecta suministros de agua municipal y de riego', targets: 'E.Coli, PatÃƒÂ³genos, Bacterias' },
    { id: 4, nameEN: 'Reverse Osmosis System', nameES: 'Sistema de Ãƒâ€œsmosis Inversa', category: 'FiltraciÃƒÂ³n', status: 'Disponible', descEN: 'Removes salts, heavy metals, and dissolved impurities', descES: 'Elimina sales, metales pesados e impurezas disueltas', targets: 'TDS, Salinidad, Cloruro, Metales Pesados' },
    { id: 5, nameEN: 'Desalination Plant', nameES: 'Planta Desalinizadora', category: 'FiltraciÃƒÂ³n', status: 'Piloto', descEN: 'Converts seawater or brackish water into irrigation supply', descES: 'Convierte agua de mar o salobre en suministro de riego', targets: 'TDS, Cloruro, Boro, Salinidad' },
    { id: 6, nameEN: 'Activated Carbon Filter', nameES: 'Filtro de CarbÃƒÂ³n Activado', category: 'FiltraciÃƒÂ³n', status: 'Disponible', descEN: 'Removes chlorine, pesticides, and organic chemicals', descES: 'Elimina cloro, pesticidas y quÃƒÂ­micos orgÃƒÂ¡nicos', targets: 'Cloro, Pesticidas, Compuestos OrgÃƒÂ¡nicos' },
    { id: 7, nameEN: 'Ion Exchange System', nameES: 'Sistema de Intercambio IÃƒÂ³nico', category: 'FiltraciÃƒÂ³n', status: 'Disponible', descEN: 'Removes heavy metals and hardness from water', descES: 'Elimina metales pesados y dureza del agua', targets: 'ArsÃƒÂ©nico, Plomo, Cadmio, Dureza' },
    { id: 8, nameEN: 'Anaerobic Digester', nameES: 'Digestor AnaerÃƒÂ³bico', category: 'Reciclaje', status: 'Disponible', descEN: 'Converts organic waste into biogas and treated water', descES: 'Convierte residuos orgÃƒÂ¡nicos en biogÃƒÂ¡s y agua tratada', targets: 'BOD, COD, Residuos OrgÃƒÂ¡nicos' },
    { id: 9, nameEN: 'Wastewater Recycling Plant', nameES: 'Planta de Reciclaje de Aguas Residuales', category: 'Reciclaje', status: 'Disponible', descEN: 'Treats and recycles wastewater for agricultural reuse', descES: 'Trata y recicla aguas residuales para reutilizaciÃƒÂ³n agrÃƒÂ­cola', targets: 'BOD, COD, ReutilizaciÃƒÂ³n de Agua' },
    { id: 10, nameEN: 'Greenhouse Water Recycling', nameES: 'Reciclaje de Agua para Invernaderos', category: 'Reciclaje', status: 'Disponible', descEN: 'Captures and treats runoff from greenhouse operations', descES: 'Captura y trata escorrentÃƒÂ­a de operaciones de invernaderos', targets: 'Nutrientes, ReutilizaciÃƒÂ³n, Eficiencia' },
    { id: 11, nameEN: 'Gypsum Soil Amendment', nameES: 'Enmienda de Yeso para Suelo', category: 'Suelo', status: 'Disponible', descEN: 'Reclaims saline and sodic soils by improving structure', descES: 'Recupera suelos salinos y sÃƒÂ³dicos mejorando la estructura', targets: 'Salinidad, Sodio, Estructura del Suelo' },
    { id: 12, nameEN: 'Lime Amendment', nameES: 'Enmienda de Cal', category: 'Suelo', status: 'Disponible', descEN: 'Raises soil pH for acidic soil conditions', descES: 'Aumenta el pH del suelo para condiciones ÃƒÂ¡cidas', targets: 'pH ÃƒÂcido, Acidez del Suelo' },
    { id: 13, nameEN: 'Sulfur Amendment', nameES: 'Enmienda de Azufre', category: 'Suelo', status: 'Disponible', descEN: 'Lowers soil pH for alkaline soil conditions', descES: 'Reduce el pH del suelo para condiciones alcalinas', targets: 'pH Alcalino, Alcalinidad' },
    { id: 14, nameEN: 'Biochar', nameES: 'BiocarbÃƒÂ³n', category: 'Suelo', status: 'Disponible', descEN: 'Improves soil structure, water retention, and carbon sequestration', descES: 'Mejora estructura, retenciÃƒÂ³n de agua y secuestro de carbono', targets: 'Materia OrgÃƒÂ¡nica, CEC, RetenciÃƒÂ³n de Agua' },
    { id: 15, nameEN: 'Compost', nameES: 'Composta', category: 'Suelo', status: 'Disponible', descEN: 'Adds organic matter and essential nutrients to soil', descES: 'AÃƒÂ±ade materia orgÃƒÂ¡nica y nutrientes esenciales al suelo', targets: 'Materia OrgÃƒÂ¡nica, Nutrientes' },
    { id: 16, nameEN: 'Cover Crops', nameES: 'Cultivos de Cobertura', category: 'Suelo', status: 'Disponible', descEN: 'Increases biomass, soil fertility, and prevents erosion', descES: 'Aumenta biomasa, fertilidad y previene erosiÃƒÂ³n', targets: 'NitrÃƒÂ³geno, Materia OrgÃƒÂ¡nica, ErosiÃƒÂ³n' },
    { id: 17, nameEN: 'Fertigation System', nameES: 'Sistema de Fertirriego', category: 'Riego', status: 'Disponible', descEN: 'Delivers nutrients efficiently through irrigation water', descES: 'Entrega nutrientes eficientemente a travÃƒÂ©s del agua de riego', targets: 'N, P, K, Micronutrientes, Eficiencia' },
    { id: 18, nameEN: 'Micronutrient Foliar Spray', nameES: 'AspersiÃƒÂ³n Foliar de Micronutrientes', category: 'Suelo', status: 'Disponible', descEN: 'Delivers trace elements directly to plant leaves', descES: 'Entrega elementos traza directamente a las hojas', targets: 'Zinc, Cobre, Hierro, Manganeso, Boro' },
    { id: 19, nameEN: 'Smart Soil Sensor', nameES: 'Sensor Inteligente de Suelo', category: 'Sensores', status: 'En RevisiÃƒÂ³n', descEN: 'Real-time monitoring of soil moisture, pH, and temperature', descES: 'Monitoreo en tiempo real de humedad, pH y temperatura', targets: 'pH, Humedad, Temperatura, Datos en Tiempo Real' },
    { id: 20, nameEN: 'AI Irrigation Controller', nameES: 'Controlador de Riego con IA', category: 'Sensores', status: 'Disponible', descEN: 'Adjusts irrigation schedules based on real-time data and forecasts', descES: 'Ajusta programas de riego basado en datos y pronÃƒÂ³sticos', targets: 'AutomatizaciÃƒÂ³n, Eficiencia, Ahorro de Agua' }
  ];

  const filteredProducts = categoryFilter === 'Todos' ? products : products.filter(p => p.category === categoryFilter);
  const filteredTests = waterTests.filter(test => test.toLowerCase().includes(searchTest.toLowerCase()));

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setContactForm({...contactForm, files: files});
  };

  const handleSubmit = () => {
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in required fields / Por favor complete los campos requeridos');
      return;
    }
    
    alert(`Consulta Enviada!\n\nProducto: ${selectedProduct?.nameEN} / ${selectedProduct?.nameES}\nNombre: ${contactForm.name}\nEmail: ${contactForm.email}\nArchivos: ${contactForm.files.length}\n\nUn email de confirmaciÃƒÂ³n ha sido enviado.`);
    setShowContactModal(false);
    setContactForm({ name: '', email: '', phone: '', company: '', message: '', files: [] });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-lg shadow-2xl p-8 text-white">
        <div className="flex items-center gap-4">
          <div className="text-6xl">Ã°Å¸â€™Â§</div>
          <div>
            <h1 className="text-4xl font-bold">Water & Soil Technology Marketplace</h1>
            <h2 className="text-2xl font-semibold mt-1">Mercado de TecnologÃƒÂ­a de Agua y Suelo</h2>
            <p className="text-lg mt-2 opacity-90">Solutions matched to test problems / Soluciones adaptadas a problemas</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-6">
          <label className="block text-lg font-bold mb-3">Search Water Tests / Buscar Pruebas de Agua</label>
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchTest}
              onChange={(e) => setSearchTest(e.target.value)}
              placeholder="Type to search: pH, TDS, Nitrates, etc..."
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-lg text-lg focus:border-blue-500"
            />
          </div>
          {searchTest && (
            <div className="mt-3 max-h-60 overflow-y-auto border-2 border-gray-200 rounded-lg">
              {filteredTests.length > 0 ? (
                filteredTests.map((test, idx) => (
                  <div key={idx} className="px-4 py-2 hover:bg-blue-50 cursor-pointer border-b">
                    {test}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500">No tests found / No se encontraron pruebas</div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Filter by Category / Filtrar por CategorÃƒÂ­a</h2>
          <select 
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-6 py-3 font-semibold text-lg"
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div className="space-y-4">
          {filteredProducts.map(product => (
            <div key={product.id} className="border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-400 transition-all shadow-md">
              <div 
                onClick={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
                className="flex justify-between items-center p-6 cursor-pointer bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-cyan-50"
              >
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800">{product.nameEN}</h3>
                  <p className="text-xl font-semibold text-blue-600 mt-1">{product.nameES}</p>
                  <p className="text-sm text-gray-600 mt-2">CategorÃƒÂ­a / Category: {product.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`px-5 py-2 rounded-full font-bold text-sm ${
                    product.status === 'Disponible' ? 'bg-green-100 text-green-700' : 
                    product.status === 'Piloto' ? 'bg-blue-100 text-blue-700' : 
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {product.status}
                  </span>
                  {expandedProduct === product.id ? 
                    <ChevronUp className="w-8 h-8 text-blue-600" /> : 
                    <ChevronDown className="w-8 h-8 text-gray-600" />
                  }
                </div>
              </div>

              {expandedProduct === product.id && (
                <div className="p-8 bg-white border-t-4 border-blue-400">
                  <div className="grid grid-cols-2 gap-8 mb-6">
                    <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
                      <p className="text-sm font-bold text-blue-700 mb-3">ENGLISH DESCRIPTION:</p>
                      <p className="text-gray-800 text-lg">{product.descEN}</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
                      <p className="text-sm font-bold text-green-700 mb-3">DESCRIPCIÃƒâ€œN EN ESPAÃƒâ€˜OL:</p>
                      <p className="text-gray-800 text-lg">{product.descES}</p>
                    </div>
                  </div>
                  
                  <div className="mb-6 bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
                    <p className="text-sm font-bold text-yellow-800 mb-2">TARGETS / OBJETIVOS:</p>
                    <p className="text-gray-800 text-lg font-semibold">{product.targets}</p>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowContactModal(true);
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-lg"
                  >
                    <Send className="w-6 h-6" />
                    Request Quote / Solicitar CotizaciÃƒÂ³n
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Request Quote / Solicitar CotizaciÃƒÂ³n</h2>
                <p className="text-xl text-blue-600 mt-2">{selectedProduct?.nameEN}</p>
                <p className="text-lg text-green-600">{selectedProduct?.nameES}</p>
              </div>
              <button onClick={() => setShowContactModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-8 h-8" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2 text-lg">Name / Nombre *</label>
                <input 
                  type="text" 
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500"
                  placeholder="Full name / Nombre completo"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-lg">Email / Correo ElectrÃƒÂ³nico *</label>
                <input 
                  type="email" 
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-lg">Phone / TelÃƒÂ©fono</label>
                <input 
                  type="tel" 
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500"
                  placeholder="+52 or +1"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-lg">Company / Empresa</label>
                <input 
                  type="text" 
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500"
                  placeholder="Company name / Nombre de empresa"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-lg">Message / Mensaje *</label>
                <textarea 
                  rows="5"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500"
                  placeholder="Describe your project, area of concern, or specific needs... / Describa su proyecto, ÃƒÂ¡rea de preocupaciÃƒÂ³n o necesidades especÃƒÂ­ficas..."
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-lg flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Upload Documents / Subir Documentos
                </label>
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg focus:border-blue-500"
                  accept=".pdf,.csv,.xlsx,.xls,.doc,.docx,.jpg,.jpeg,.png"
                />
                {contactForm.files.length > 0 && (
                  <div className="mt-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <p className="font-semibold mb-2">Files Selected / Archivos Seleccionados:</p>
                    <ul className="text-sm space-y-1">
                      {contactForm.files.map((f, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="text-blue-600">Ã°Å¸â€œÅ½</span> {f.name} ({(f.size / 1024).toFixed(1)} KB)
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!contactForm.name || !contactForm.email || !contactForm.message}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3 shadow-lg disabled:cursor-not-allowed"
              >
                <Send className="w-6 h-6" />
                Submit Inquiry / Enviar Consulta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
