import React, { useState } from 'react';
import { Building2, MapPin, DollarSign, Upload, Camera, FileText, CheckCircle, X, Plus } from 'lucide-react';

export default function MortgageTabRealEstate() {
  const [view, setView] = useState('search');
  const [propertyType, setPropertyType] = useState('');
  const [region, setRegion] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [results, setResults] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showFinancingForm, setShowFinancingForm] = useState(false);
  
  const [newListing, setNewListing] = useState({
    type: '', region: '', price: '', beds: '', baths: '', sqft: '',
    descriptionEN: '', descriptionES: '', amenities: '', images: []
  });

  const [financingForm, setFinancingForm] = useState({
    name: '', email: '', phone: '', citizenship: '', downPayment: '',
    creditScore: '', needsFinancing: false, propertyId: null
  });

  const properties = [
    {
      id: 1, type: 'Condo', region: 'Cancun', price: 285000, beds: 2, baths: 2, sqft: 1200,
      descriptionEN: 'Beachfront luxury condo with stunning ocean views and modern finishes',
      descriptionES: 'Condominio de lujo frente al mar con vistas impresionantes al océano',
      amenities: ['Pool', 'Gym', 'Beach Access', 'Concierge', '24/7 Security'],
      images: ['https://via.placeholder.com/400x300?text=Cancun+Condo'], financingAvailable: true
    },
    {
      id: 2, type: 'Villa', region: 'Tulum', price: 650000, beds: 3, baths: 3, sqft: 2400,
      descriptionEN: 'Modern villa in jungle setting near beach with eco-friendly design',
      descriptionES: 'Villa moderna en entorno selvático cerca de la playa con diseño ecológico',
      amenities: ['Private Pool', 'Garden', 'Rooftop Terrace', 'Security', 'Solar Panels'],
      images: ['https://via.placeholder.com/400x300?text=Tulum+Villa'], financingAvailable: true
    },
    {
      id: 3, type: 'House', region: 'Puerto Vallarta', price: 425000, beds: 4, baths: 3, sqft: 2800,
      descriptionEN: 'Hillside home with panoramic bay views and sunset terrace',
      descriptionES: 'Casa en la ladera con vistas panorámicas de la bahía y terraza',
      amenities: ['Pool', 'Outdoor Kitchen', 'Garage', 'Ocean View', 'Garden'],
      images: ['https://via.placeholder.com/400x300?text=PV+House'], financingAvailable: true
    },
    {
      id: 4, type: 'Condo', region: 'Los Cabos', price: 890000, beds: 3, baths: 3, sqft: 2200,
      descriptionEN: 'Luxury oceanfront penthouse with private rooftop and infinity pool',
      descriptionES: 'Penthouse de lujo frente al mar con azotea privada y alberca infinita',
      amenities: ['Infinity Pool', 'Rooftop Terrace', 'Wine Cellar', 'Concierge', 'Valet'],
      images: ['https://via.placeholder.com/400x300?text=Cabo+Penthouse'], financingAvailable: true
    }
  ];

  const searchProperties = () => {
    if (!region && !propertyType && !priceRange) {
      setResults(properties);
      return;
    }

    let filtered = [...properties];
    if (region) filtered = filtered.filter(p => p.region === region);
    if (propertyType) filtered = filtered.filter(p => p.type === propertyType);
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(v => parseInt(v));
      filtered = filtered.filter(p => max ? (p.price >= min && p.price <= max) : p.price >= min);
    }
    if (bedrooms) {
      const minBeds = parseInt(bedrooms);
      filtered = filtered.filter(p => p.beds >= minBeds);
    }
    setResults(filtered);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewListing({...newListing, images: [...newListing.images, ...files.map(f => f.name)]});
  };

  const submitListing = () => {
    alert('Listing submitted for review! Our team will contact you within 24 hours.');
    setView('search');
    setNewListing({
      type: '', region: '', price: '', beds: '', baths: '', sqft: '',
      descriptionEN: '', descriptionES: '', amenities: '', images: []
    });
  };

  const submitFinancingRequest = () => {
    alert(`Financing request submitted for ${financingForm.name}! Our mortgage team will contact you within 24 hours.`);
    setShowFinancingForm(false);
    setSelectedProperty(null);
    setFinancingForm({
      name: '', email: '', phone: '', citizenship: '', downPayment: '',
      creditScore: '', needsFinancing: false, propertyId: null
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg shadow-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Building2 className="w-12 h-12" />
            <div>
              <h1 className="text-4xl font-bold">Mexico Real Estate</h1>
              <p className="text-xl">Bienes Raíces en México • Full Service Platform</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => setView('search')}
              className={`px-6 py-3 rounded-lg font-bold transition-all ${
                view === 'search' ? 'bg-white text-purple-600' : 'bg-purple-800 text-white'
              }`}>
              Search Properties
            </button>
            <button onClick={() => setView('addListing')}
              className={`px-6 py-3 rounded-lg font-bold transition-all flex items-center gap-2 ${
                view === 'addListing' ? 'bg-white text-purple-600' : 'bg-purple-800 text-white'
              }`}>
              <Plus className="w-5 h-5" />
              List Property
            </button>
          </div>
        </div>
      </div>

      {view === 'search' && (
        <>
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <MapPin className="w-7 h-7 text-purple-600" />
              Property Search
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block font-bold mb-2">Property Type / Tipo</label>
                <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg">
                  <option value="">All Types</option>
                  <option value="Condo">Condo</option>
                  <option value="House">House / Casa</option>
                  <option value="Villa">Villa</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Region / Región</label>
                <select value={region} onChange={(e) => setRegion(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg">
                  <option value="">All Regions</option>
                  <option value="Cancun">Cancún</option>
                  <option value="Tulum">Tulum</option>
                  <option value="Puerto Vallarta">Puerto Vallarta</option>
                  <option value="Los Cabos">Los Cabos</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Price Range (USD)</label>
                <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg">
                  <option value="">Any Price</option>
                  <option value="0-300000">Under $300K</option>
                  <option value="300000-600000">$300K - $600K</option>
                  <option value="600000-1000000">$600K - $1M</option>
                  <option value="1000000-99999999">Over $1M</option>
                </select>
              </div>
              <div>
                <label className="block font-bold mb-2">Bedrooms / Recámaras</label>
                <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 text-lg">
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
            <button onClick={searchProperties}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3">
              <MapPin className="w-6 h-6" />
              Search Properties
            </button>
          </div>

          {results.length > 0 && (
            <div className="grid grid-cols-1 gap-6">
              {results.map(property => (
                <div key={property.id} className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition-all">
                  <div className="grid grid-cols-3 gap-6 p-6">
                    <div className="col-span-1">
                      <img src={property.images[0]} alt={property.type} className="w-full h-64 object-cover rounded-lg" />
                      {property.financingAvailable && (
                        <div className="mt-3 bg-green-50 border-2 border-green-400 rounded-lg p-3 text-center">
                          <p className="font-bold text-green-700">✅ Financing Available</p>
                          <p className="text-xs text-green-600">Financiamiento Disponible</p>
                        </div>
                      )}
                    </div>

                    <div className="col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800">{property.type} - {property.region}</h3>
                          <p className="text-gray-600 flex items-center gap-2 mt-1">
                            <MapPin className="w-4 h-4" /> {property.region}, Mexico
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-purple-600">${property.price.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">USD</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="font-semibold text-gray-700 mb-1">Description:</p>
                        <p className="text-gray-600">{property.descriptionEN}</p>
                        <p className="font-semibold text-gray-700 mb-1 mt-3">Descripción:</p>
                        <p className="text-gray-600">{property.descriptionES}</p>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-purple-600">{property.beds}</p>
                          <p className="text-xs text-gray-600">Bedrooms</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-purple-600">{property.baths}</p>
                          <p className="text-xs text-gray-600">Bathrooms</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center">
                          <p className="text-2xl font-bold text-purple-600">{property.sqft}</p>
                          <p className="text-xs text-gray-600">Sq Ft</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 mb-2">Amenities:</p>
                        <div className="flex flex-wrap gap-2">
                          {property.amenities.map((amenity, idx) => (
                            <span key={idx} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => {
                            setSelectedProperty(property);
                            setShowFinancingForm(true);
                            setFinancingForm({...financingForm, propertyId: property.id});
                          }}
                          className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-lg font-bold hover:from-green-700 hover:to-teal-700">
                          Apply for Financing
                        </button>
                        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-pink-700">
                          Request Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {view === 'addListing' && (
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <Upload className="w-7 h-7 text-purple-600" />
            List Your Property / Publique Su Propiedad
          </h2>

          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block font-bold mb-2">Property Type</label>
              <select value={newListing.type} onChange={(e) => setNewListing({...newListing, type: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3">
                <option value="">Select Type</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="Villa">Villa</option>
                <option value="Land">Land / Terreno</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2">Region</label>
              <select value={newListing.region} onChange={(e) => setNewListing({...newListing, region: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3">
                <option value="">Select Region</option>
                <option value="Cancun">Cancún</option>
                <option value="Tulum">Tulum</option>
                <option value="Puerto Vallarta">Puerto Vallarta</option>
                <option value="Los Cabos">Los Cabos</option>
                <option value="CDMX">CDMX</option>
              </select>
            </div>
            <div>
              <label className="block font-bold mb-2">Price (USD)</label>
              <input type="number" value={newListing.price} onChange={(e) => setNewListing({...newListing, price: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" placeholder="e.g., 450000" />
            </div>
            <div>
              <label className="block font-bold mb-2">Square Feet</label>
              <input type="number" value={newListing.sqft} onChange={(e) => setNewListing({...newListing, sqft: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" placeholder="e.g., 2400" />
            </div>
            <div>
              <label className="block font-bold mb-2">Bedrooms</label>
              <input type="number" value={newListing.beds} onChange={(e) => setNewListing({...newListing, beds: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" placeholder="e.g., 3" />
            </div>
            <div>
              <label className="block font-bold mb-2">Bathrooms</label>
              <input type="number" value={newListing.baths} onChange={(e) => setNewListing({...newListing, baths: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" placeholder="e.g., 2" />
            </div>
            <div className="col-span-2">
              <label className="block font-bold mb-2">Description (English)</label>
              <textarea value={newListing.descriptionEN} onChange={(e) => setNewListing({...newListing, descriptionEN: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" rows="3"
                placeholder="Detailed property description..." />
            </div>
            <div className="col-span-2">
              <label className="block font-bold mb-2">Descripción (Español)</label>
              <textarea value={newListing.descriptionES} onChange={(e) => setNewListing({...newListing, descriptionES: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" rows="3"
                placeholder="Descripción detallada..." />
            </div>
            <div className="col-span-2">
              <label className="block font-bold mb-2">Amenities (comma-separated)</label>
              <input type="text" value={newListing.amenities} onChange={(e) => setNewListing({...newListing, amenities: e.target.value})}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3"
                placeholder="e.g., Pool, Gym, Beach Access" />
            </div>
            <div className="col-span-2">
              <label className="block font-bold mb-2 flex items-center gap-2">
                <Camera className="w-5 h-5" />
                Upload Property Photos
              </label>
              <input type="file" multiple accept="image/*" onChange={handleImageUpload}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" />
              {newListing.images.length > 0 && (
                <div className="mt-2 text-sm text-gray-600">
                  {newListing.images.length} image(s) uploaded
                </div>
              )}
            </div>
          </div>

          <button onClick={submitListing}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-lg font-bold text-xl flex items-center justify-center gap-3">
            <Upload className="w-6 h-6" />
            Submit Listing for Review
          </button>
        </div>
      )}

      {showFinancingForm && selectedProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Financing Application</h3>
                <h3 className="text-xl font-semibold text-gray-600">Solicitud de Financiamiento</h3>
                <p className="text-sm text-gray-600 mt-2">Property: {selectedProperty.type} in {selectedProperty.region}</p>
              </div>
              <button onClick={() => setShowFinancingForm(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
              <p className="font-bold text-blue-800 mb-2">Financing Available for USA Citizens</p>
              <p className="text-sm text-blue-700">
                Financiamiento disponible para ciudadanos de EE.UU. • Conditions apply
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block font-bold mb-2">Full Name / Nombre Completo *</label>
                <input type="text" value={financingForm.name} onChange={(e) => setFinancingForm({...financingForm, name: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Email *</label>
                  <input type="email" value={financingForm.email} onChange={(e) => setFinancingForm({...financingForm, email: e.target.value})}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" required />
                </div>
                <div>
                  <label className="block font-bold mb-2">Phone / Teléfono *</label>
                  <input type="tel" value={financingForm.phone} onChange={(e) => setFinancingForm({...financingForm, phone: e.target.value})}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" required />
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2">Citizenship / Ciudadanía *</label>
                <select value={financingForm.citizenship} onChange={(e) => setFinancingForm({...financingForm, citizenship: e.target.value})}
                  className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" required>
                  <option value="">Select / Seleccionar</option>
                  <option value="US">USA Citizen</option>
                  <option value="Mexican">Mexican National</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {financingForm.citizenship === 'US' && (
                <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4">
                  <p className="font-bold text-green-800 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    You may qualify for financing!
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold mb-2">Down Payment (USD)</label>
                  <input type="number" value={financingForm.downPayment} onChange={(e) => setFinancingForm({...financingForm, downPayment: e.target.value})}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3" placeholder="e.g., 150000" />
                </div>
                <div>
                  <label className="block font-bold mb-2">Credit Score Range</label>
                  <select value={financingForm.creditScore} onChange={(e) => setFinancingForm({...financingForm, creditScore: e.target.value})}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-3">
                    <option value="">Select</option>
                    <option value="740+">Excellent (740+)</option>
                    <option value="700-739">Good (700-739)</option>
                    <option value="660-699">Fair (660-699)</option>
                    <option value="620-659">Below Average (620-659)</option>
                  </select>
                </div>
              </div>

              <button onClick={submitFinancingRequest}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-3">
                <FileText className="w-6 h-6" />
                Submit Financing Request
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg shadow-lg p-8 border-2 border-gray-300">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800">Saul Garcia</h3>
          <p className="text-lg font-semibold text-gray-700">NMLS #337526</p>
          <p className="text-lg font-bold text-purple-700">Everwise Home Loans & Realty</p>
          <p className="text-sm text-gray-600">Company NMLS #1739012 | DRE #02067255</p>
          <p className="text-sm text-gray-600">15615 Alton Pkwy, Suite 450, Irvine, CA 92618</p>
          <p className="text-sm text-gray-600">Phone: 1-844-853-9300</p>
        </div>
      </div>
    </div>
  );
}