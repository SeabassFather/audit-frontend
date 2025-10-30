import React, { useState } from "react";

const propertyTypes = [
  'Residential Home', 'Condo', 'Villa', 'Townhouse', 'Penthouse', 'Land/Lot', 'Beachfront', 'Oceanfront', 'Lakefront',
  'Mountain', 'Ranch/Farm', 'Commercial', 'Hotel/Resort', 'New Construction', 'Investment', 'Vacation Rental'
];

const regions = [
<<<<<<< HEAD
  '🏖️ BAJA CALIFORNIA (Pacific Coast)',
  'Ensenada, BC', 'Rosarito Beach, BC', 'Tijuana, BC', 'Puerto Nuevo, BC', 'La Bufadora, BC', 'San Felipe, BC (Sea of Cortez)', 'Mexicali, BC',
  '🏖️ BAJA CALIFORNIA SUR',
  'Cabo San Lucas, BCS', 'San José del Cabo, BCS', 'Cabo Corridor, BCS', 'East Cape (Los Barriles, Buena Vista), BCS', 'La Paz, BCS', 'Todos Santos, BCS', 'Loreto, BCS', 'Mulege, BCS',
  '🏖️ RIVIERA MAYA / QUINTANA ROO (Caribbean)',
  'Cancún, QR', 'Playa del Carmen, QR', 'Tulum, QR', 'Akumal, QR', 'Puerto Aventuras, QR', 'Puerto Morelos, QR', 'Isla Mujeres, QR', 'Cozumel, QR', 'Bacalar, QR', 'Mahahual, QR',
  '🏖️ PACIFIC COAST - JALISCO/NAYARIT',
  'Puerto Vallarta, Jalisco', 'Nuevo Vallarta, Nayarit', 'Bucerias, Nayarit', 'La Cruz de Huanacaxtle, Nayarit', 'Punta Mita, Nayarit', 'Sayulita, Nayarit', 'San Pancho (San Francisco), Nayarit', 'Lo de Marcos, Nayarit', 'Rincon de Guayabitos, Nayarit', 'San Blas, Nayarit',
  '🏖️ MAZATLÁN / SINALOA',
  'Mazatlán, Sinaloa', 'Cerritos, Sinaloa',
  '🏖️ OAXACA COAST',
  'Puerto Escondido, Oaxaca', 'Huatulco, Oaxaca', 'Zipolite, Oaxaca',
  '🏖️ SONORA (Sea of Cortez)',
  'Puerto Peñasco (Rocky Point), Sonora', 'San Carlos, Sonora', 'Guaymas, Sonora',
  '🏖️ YUCATÁN PENINSULA',
  'Mérida, Yucatán', 'Progreso, Yucatán', 'Sisal, Yucatán', 'Celestún, Yucatán', 'Valladolid, Yucatán',
  '🏖️ LAKE CHAPALA / AJIJIC (Expat Central)',
  'Ajijic, Jalisco', 'Chapala, Jalisco', 'Jocotepec, Jalisco', 'San Juan Cosalá, Jalisco',
  '🏖️ COLONIAL CITIES (Expat Favorites)',
  'San Miguel de Allende, Guanajuato', 'Guanajuato City, Guanajuato', 'Querétaro, Querétaro', 'Guadalajara, Jalisco', 'Puebla, Puebla',
  '🏖️ OTHER MAJOR CITIES',
  'Mexico City (CDMX)', 'Monterrey, Nuevo León', 'Playa Blanca, Sonora'
=======
  'Ã°Å¸Ââ€“Ã¯Â¸Â BAJA CALIFORNIA (Pacific Coast)',
  'Ensenada, BC', 'Rosarito Beach, BC', 'Tijuana, BC', 'Puerto Nuevo, BC', 'La Bufadora, BC', 'San Felipe, BC (Sea of Cortez)', 'Mexicali, BC',
  'Ã°Å¸Ââ€“Ã¯Â¸Â BAJA CALIFORNIA SUR',
  'Cabo San Lucas, BCS', 'San JosÃƒÂ© del Cabo, BCS', 'Cabo Corridor, BCS', 'East Cape (Los Barriles, Buena Vista), BCS', 'La Paz, BCS', 'Todos Santos, BCS', 'Loreto, BCS', 'Mulege, BCS',
  'Ã°Å¸Ââ€“Ã¯Â¸Â RIVIERA MAYA / QUINTANA ROO (Caribbean)',
  'CancÃƒÂºn, QR', 'Playa del Carmen, QR', 'Tulum, QR', 'Akumal, QR', 'Puerto Aventuras, QR', 'Puerto Morelos, QR', 'Isla Mujeres, QR', 'Cozumel, QR', 'Bacalar, QR', 'Mahahual, QR',
  'Ã°Å¸Ââ€“Ã¯Â¸Â PACIFIC COAST - JALISCO/NAYARIT',
  'Puerto Vallarta, Jalisco', 'Nuevo Vallarta, Nayarit', 'Bucerias, Nayarit', 'La Cruz de Huanacaxtle, Nayarit', 'Punta Mita, Nayarit', 'Sayulita, Nayarit', 'San Pancho (San Francisco), Nayarit', 'Lo de Marcos, Nayarit', 'Rincon de Guayabitos, Nayarit', 'San Blas, Nayarit',
  'Ã°Å¸Ââ€“Ã¯Â¸Â MAZATLÃƒÂN / SINALOA',
  'MazatlÃƒÂ¡n, Sinaloa', 'Cerritos, Sinaloa',
  'Ã°Å¸Ââ€“Ã¯Â¸Â OAXACA COAST',
  'Puerto Escondido, Oaxaca', 'Huatulco, Oaxaca', 'Zipolite, Oaxaca',
  'Ã°Å¸Ââ€“Ã¯Â¸Â SONORA (Sea of Cortez)',
  'Puerto PeÃƒÂ±asco (Rocky Point), Sonora', 'San Carlos, Sonora', 'Guaymas, Sonora',
  'Ã°Å¸Ââ€“Ã¯Â¸Â YUCATÃƒÂN PENINSULA',
  'MÃƒÂ©rida, YucatÃƒÂ¡n', 'Progreso, YucatÃƒÂ¡n', 'Sisal, YucatÃƒÂ¡n', 'CelestÃƒÂºn, YucatÃƒÂ¡n', 'Valladolid, YucatÃƒÂ¡n',
  'Ã°Å¸Ââ€“Ã¯Â¸Â LAKE CHAPALA / AJIJIC (Expat Central)',
  'Ajijic, Jalisco', 'Chapala, Jalisco', 'Jocotepec, Jalisco', 'San Juan CosalÃƒÂ¡, Jalisco',
  'Ã°Å¸Ââ€“Ã¯Â¸Â COLONIAL CITIES (Expat Favorites)',
  'San Miguel de Allende, Guanajuato', 'Guanajuato City, Guanajuato', 'QuerÃƒÂ©taro, QuerÃƒÂ©taro', 'Guadalajara, Jalisco', 'Puebla, Puebla',
  'Ã°Å¸Ââ€“Ã¯Â¸Â OTHER MAJOR CITIES',
  'Mexico City (CDMX)', 'Monterrey, Nuevo LeÃƒÂ³n', 'Playa Blanca, Sonora'
>>>>>>> my/push-branch
];

// Example property data for display (should be passed in real app)
const sampleProperties = [
<<<<<<< HEAD
  {id: 1, type: 'Condo', region: 'Cancún, QR', price: 285000, beds: 2, baths: 2, sqft: 1200, descriptionEN: 'Beachfront luxury condo with stunning ocean views', descriptionES: 'Condominio de lujo frente al mar con vistas al océano', amenities: ['Pool', 'Gym', 'Beach Access', 'Concierge', '24/7 Security'], images: ['https://via.placeholder.com/400x300?text=Cancun+Condo'], financingAvailable: true},
  {id: 2, type: 'Villa', region: 'Tulum, QR', price: 650000, beds: 3, baths: 3, sqft: 2400, descriptionEN: 'Modern villa in jungle setting near beach', descriptionES: 'Villa moderna en entorno selvático cerca de la playa', amenities: ['Private Pool', 'Garden', 'Rooftop', 'Solar Panels'], images: ['https://via.placeholder.com/400x300?text=Tulum+Villa'], financingAvailable: true},
  {id: 3, type: 'Residential Home', region: 'Puerto Vallarta, Jalisco', price: 425000, beds: 4, baths: 3, sqft: 2800, descriptionEN: 'Hillside home with panoramic bay views', descriptionES: 'Casa en ladera con vistas panorámicas', amenities: ['Pool', 'Outdoor Kitchen', 'Garage', 'Ocean View'], images: ['https://via.placeholder.com/400x300?text=PV+House'], financingAvailable: true}
=======
  {id: 1, type: 'Condo', region: 'CancÃƒÂºn, QR', price: 285000, beds: 2, baths: 2, sqft: 1200, descriptionEN: 'Beachfront luxury condo with stunning ocean views', descriptionES: 'Condominio de lujo frente al mar con vistas al ocÃƒÂ©ano', amenities: ['Pool', 'Gym', 'Beach Access', 'Concierge', '24/7 Security'], images: ['https://via.placeholder.com/400x300?text=Cancun+Condo'], financingAvailable: true},
  {id: 2, type: 'Villa', region: 'Tulum, QR', price: 650000, beds: 3, baths: 3, sqft: 2400, descriptionEN: 'Modern villa in jungle setting near beach', descriptionES: 'Villa moderna en entorno selvÃƒÂ¡tico cerca de la playa', amenities: ['Private Pool', 'Garden', 'Rooftop', 'Solar Panels'], images: ['https://via.placeholder.com/400x300?text=Tulum+Villa'], financingAvailable: true},
  {id: 3, type: 'Residential Home', region: 'Puerto Vallarta, Jalisco', price: 425000, beds: 4, baths: 3, sqft: 2800, descriptionEN: 'Hillside home with panoramic bay views', descriptionES: 'Casa en ladera con vistas panorÃƒÂ¡micas', amenities: ['Pool', 'Outdoor Kitchen', 'Garage', 'Ocean View'], images: ['https://via.placeholder.com/400x300?text=PV+House'], financingAvailable: true}
>>>>>>> my/push-branch
];

export default function PropertySearch() {
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState('');
  const [bedroomsFilter, setBedroomsFilter] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    let filtered = [...sampleProperties];
    if (propertyTypeFilter) filtered = filtered.filter(p => p.type === propertyTypeFilter);
    if (regionFilter) filtered = filtered.filter(p => p.region === regionFilter);
    if (priceRangeFilter) {
      const [min, max] = priceRangeFilter.split('-').map(v => parseInt(v));
      filtered = filtered.filter(p => max ? (p.price >= min && p.price <= max) : p.price >= min);
    }
    if (bedroomsFilter) filtered = filtered.filter(p => p.beds >= parseInt(bedroomsFilter));
    setResults(filtered);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
        <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        Property Search
      </h2>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-bold mb-2">Property Type</label>
          <select value={propertyTypeFilter} onChange={e => setPropertyTypeFilter(e.target.value)} className="w-full border-2 border-gray-300 rounded-lg px-4 py-3">
            <option value="">All Types</option>
            {propertyTypes.map((t, i) => <option key={i} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2">Region</label>
          <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} className="w-full border-2 border-gray-300 rounded-lg px-4 py-3">
            <option value="">All Regions</option>
<<<<<<< HEAD
            {regions.map((r, i) => r.startsWith('🏖️') ? <option key={i} disabled style={{fontWeight:'bold',color:'#666'}}>{r}</option> : <option key={i} value={r}>{r}</option>)}
=======
            {regions.map((r, i) => r.startsWith('Ã°Å¸Ââ€“Ã¯Â¸Â') ? <option key={i} disabled style={{fontWeight:'bold',color:'#666'}}>{r}</option> : <option key={i} value={r}>{r}</option>)}
>>>>>>> my/push-branch
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2">Price Range (USD)</label>
          <select value={priceRangeFilter} onChange={e => setPriceRangeFilter(e.target.value)} className="w-full border-2 border-gray-300 rounded-lg px-4 py-3">
            <option value="">Any Price</option>
            <option value="0-200000">Under $200K</option>
            <option value="200000-400000">$200K - $400K</option>
            <option value="400000-600000">$400K - $600K</option>
            <option value="600000-1000000">$600K - $1M</option>
            <option value="1000000-99999999">Over $1M</option>
          </select>
        </div>
        <div>
          <label className="block font-bold mb-2">Bedrooms</label>
          <select value={bedroomsFilter} onChange={e => setBedroomsFilter(e.target.value)} className="w-full border-2 border-gray-300 rounded-lg px-4 py-3">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
          </select>
        </div>
      </div>
      <button onClick={handleSearch} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        Search Properties
      </button>

      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-6 mt-8">
          {results.map(p => (
            <div key={p.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all">
              <div className="grid grid-cols-3 gap-6 p-6">
                <div className="col-span-1">
                  <img src={p.images[0]} alt={p.type} className="w-full h-64 object-cover rounded-lg" />
<<<<<<< HEAD
                  {p.financingAvailable && <div className="mt-3 bg-green-50 border-2 border-green-400 rounded-lg p-3 text-center"><p className="font-bold text-green-700">✅ Financing Available</p><p className="text-xs text-green-600">Financiamiento Disponible</p></div>}
=======
                  {p.financingAvailable && <div className="mt-3 bg-green-50 border-2 border-green-400 rounded-lg p-3 text-center"><p className="font-bold text-green-700">Ã¢Å“â€¦ Financing Available</p><p className="text-xs text-green-600">Financiamiento Disponible</p></div>}
>>>>>>> my/push-branch
                </div>
                <div className="col-span-2">
                  <div className="flex justify-between items-start mb-4">
                    <div><h3 className="text-2xl font-bold text-gray-800">{p.type} - {p.region}</h3><p className="text-gray-600 flex items-center gap-2 mt-1">{p.region}</p></div>
                    <div className="text-right"><p className="text-3xl font-bold text-purple-600">${p.price.toLocaleString()}</p><p className="text-sm text-gray-600">USD</p></div>
                  </div>
<<<<<<< HEAD
                  <div className="mb-4"><p className="font-semibold text-gray-700 mb-1">Description:</p><p className="text-gray-600">{p.descriptionEN}</p><p className="font-semibold text-gray-700 mb-1 mt-3">Descripción:</p><p className="text-gray-600">{p.descriptionES}</p></div>
=======
                  <div className="mb-4"><p className="font-semibold text-gray-700 mb-1">Description:</p><p className="text-gray-600">{p.descriptionEN}</p><p className="font-semibold text-gray-700 mb-1 mt-3">DescripciÃƒÂ³n:</p><p className="text-gray-600">{p.descriptionES}</p></div>
>>>>>>> my/push-branch
                  {p.beds > 0 && <div className="grid grid-cols-3 gap-4 mb-4"><div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-2xl font-bold text-purple-600">{p.beds}</p><p className="text-xs text-gray-600">Bedrooms</p></div><div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-2xl font-bold text-purple-600">{p.baths}</p><p className="text-xs text-gray-600">Bathrooms</p></div><div className="bg-gray-50 rounded-lg p-3 text-center"><p className="text-2xl font-bold text-purple-600">{p.sqft}</p><p className="text-xs text-gray-600">Sq Ft</p></div></div>}
                  <div className="mb-4"><p className="text-sm font-semibold text-gray-700 mb-2">Amenities:</p><div className="flex flex-wrap gap-2">{p.amenities.map((a, idx) => <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">{a}</span>)}</div></div>
                  <div className="grid grid-cols-2 gap-3"><button className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-bold">Apply for Financing</button><button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold">Request Info</button></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}