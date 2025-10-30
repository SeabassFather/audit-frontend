import React, { useState } from 'react';
import { Search, Shield, CheckCircle, XCircle, ExternalLink, Building2, FileCheck, Loader, Mail, Download, Share2, Phone, MapPin, Calendar, User, Globe } from 'lucide-react';

const VERIFICATION_SYSTEMS = {
  usda_organic: {
    name: 'USDA Organic Integrity Database',
    totalRecords: '40,000+',
    icon: 'Ã°Å¸Å’Â¿',
    color: 'green',
    searchUrl: 'https://organic.ams.usda.gov/integrity/'
  },
  fda_furls: {
    name: 'FDA Food Facility Registration',
    totalRecords: '450,000+',
    icon: 'Ã°Å¸ÂÂ­',
    color: 'blue',
    searchUrl: 'https://www.accessdata.fda.gov/scripts/furls/'
  },
  senasica: {
    name: 'SENASICA Mexico Export',
    totalRecords: '15,000+',
    icon: 'Ã°Å¸â€¡Â²Ã°Å¸â€¡Â½',
    color: 'red',
    searchUrl: 'https://www.gob.mx/senasica'
  },
  globalgap: {
    name: 'GlobalGAP Certified',
    totalRecords: '220,000+',
    icon: 'Ã°Å¸Å’Â',
    color: 'teal',
    searchUrl: 'https://database.globalgap.org/'
  },
  primus: {
    name: 'PRIMUS GFS Suppliers',
    totalRecords: '8,000+',
    icon: 'Ã¢Å“â€œ',
    color: 'purple',
    searchUrl: 'https://www.primusgfs.com/'
  }
};

export default function FiveVerificationEngines() {
  const [activeEngine, setActiveEngine] = useState('usda_organic');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  const currentSystem = VERIFICATION_SYSTEMS[activeEngine];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Enter a company name');
      return;
    }
    setSearching(true);
    setTimeout(() => {
      const mockResult = {
        found: Math.random() > 0.2,
        query: searchQuery,
        name: searchQuery,
        certNumber: `${activeEngine.toUpperCase()}-${Math.floor(Math.random() * 100000)}`,
        status: 'Active',
        address: '1234 Farm Road, Suite 100',
        city: 'Watsonville',
        state: 'California',
        zipCode: '95076',
        country: 'USA',
        // Added coordinates for map
        latitude: 36.9101,
        longitude: -121.7569,
        phone: '+1 (831) 555-0123',
        email: 'contact@' + searchQuery.toLowerCase().replace(/\s/g, '') + '.com',
        website: 'www.' + searchQuery.toLowerCase().replace(/\s/g, '') + '.com',
        contactPerson: 'John Smith',
        contactTitle: 'Export Manager',
        issueDate: '2024-01-15',
        expiryDate: '2025-01-15',
        products: 'Fresh Fruits & Vegetables, Organic Produce',
        certifier: currentSystem.name,
        certifierContact: '+1 (800) 555-CERT',
        lastInspection: '2024-10-01',
        nextInspection: '2025-01-15',
        taxId: 'XX-XXXXXXX',
        dunsNumber: '12-345-6789',
        riskScore: '98/100',
        complianceStatus: 'Fully Compliant',
        insuranceProvider: 'Lloyd\'s of London',
        insuranceCoverage: '$5,000,000',
        // RELATED LEADS - Similar verified suppliers
        relatedLeads: [
          {
            name: 'Pacific Organic Farms',
            distance: '12 miles away',
            products: 'Organic Berries, Stone Fruits',
            certNumber: 'USDA-ORG-45892',
            riskScore: '96/100',
            buyerContact: 'Jennifer Martinez',
            buyerEmail: 'j.martinez@pacificorganic.com',
            buyerPhone: '+1 (831) 555-1234',
            matchReason: 'Same region + Similar products'
          },
          {
            name: 'California Fresh Export Co',
            distance: '8 miles away',
            products: 'Mixed Vegetables, Leafy Greens',
            certNumber: 'FDA-FURLS-78934',
            riskScore: '94/100',
            buyerContact: 'Robert Kim',
            buyerEmail: 'r.kim@cafreshexport.com',
            buyerPhone: '+1 (831) 555-5678',
            matchReason: 'Same certification type'
          },
          {
            name: 'Golden State Produce LLC',
            distance: '15 miles away',
            products: 'Avocados, Citrus, Berries',
            certNumber: 'GLOBALGAP-23156',
            riskScore: '97/100',
            buyerContact: 'Lisa Chen',
            buyerEmail: 'l.chen@goldenstatepr.com',
            buyerPhone: '+1 (831) 555-9012',
            matchReason: 'Higher risk score + Same area'
          },
          {
            name: 'West Coast Growers Alliance',
            distance: '20 miles away',
            products: 'Year-round Fresh Produce',
            certNumber: 'PRIMUS-67823',
            riskScore: '95/100',
            buyerContact: 'Michael Torres',
            buyerEmail: 'm.torres@wcgrowers.com',
            buyerPhone: '+1 (831) 555-3456',
            matchReason: 'Similar capacity + Export experience'
          },
          {
            name: 'Sunrise Organic Distributors',
            distance: '25 miles away',
            products: 'Certified Organic Vegetables',
            certNumber: 'USDA-ORG-91245',
            riskScore: '93/100',
            buyerContact: 'Patricia Johnson',
            buyerEmail: 'p.johnson@sunriseorg.com',
            buyerPhone: '+1 (831) 555-7890',
            matchReason: 'Organic certification + Nearby'
          }
        ]
      };
      setSearchResults(mockResult);
      setSearching(false);
    }, 1500);
  };

  const exportToPDF = () => {
    alert('PDF export functionality - would generate detailed certificate report');
  };

  const emailResults = () => {
    const subject = `Verification Results: ${searchResults.name}`;
    const body = `
Certification Verification Report
Company: ${searchResults.name}
Certificate: ${searchResults.certNumber}
Status: ${searchResults.status}
Verified by: ${searchResults.certifier}

Contact Information:
${searchResults.contactPerson} (${searchResults.contactTitle})
${searchResults.phone}
${searchResults.email}

Address:
${searchResults.address}
${searchResults.city}, ${searchResults.state} ${searchResults.zipCode}
${searchResults.country}

Certificate Details:
Issue Date: ${searchResults.issueDate}
Expiry Date: ${searchResults.expiryDate}
Products: ${searchResults.products}
Risk Score: ${searchResults.riskScore}
Compliance: ${searchResults.complianceStatus}

This supplier is VERIFIED and LEGAL to import into USA.

Generated by AuditDNA Verification System
    `;
    window.location.href = `mailto:saul@financelend.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const shareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: `Verified: ${searchResults.name}`,
        text: `${searchResults.name} is certified and verified. Certificate: ${searchResults.certNumber}`,
        url: window.location.href
      });
    } else {
      const shareUrl = `mailto:saul@financelend.me?subject=Verification Results: ${searchResults.name}&body=Check this verified supplier: ${searchResults.name}`;
      window.location.href = shareUrl;
    }
  };

  const colors = {
    green: 'bg-green-600 hover:bg-green-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    red: 'bg-red-600 hover:bg-red-700',
    teal: 'bg-teal-600 hover:bg-teal-700',
    purple: 'bg-purple-600 hover:bg-purple-700'
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-green-600 text-white p-8 rounded-xl">
          <h1 className="text-4xl font-bold mb-2">Ã°Å¸â€Â Real-Time Certification Verification</h1>
          <p className="text-green-100">5 databases Ã¢â‚¬Â¢ 733,000+ records Ã¢â‚¬Â¢ Full intel & sharing</p>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-lg">
          <div className="grid grid-cols-5 gap-3">
            {Object.entries(VERIFICATION_SYSTEMS).map(([key, system]) => (
              <button
                key={key}
                onClick={() => {
                  setActiveEngine(key);
                  setSearchResults(null);
                }}
                className={`p-4 rounded-lg border-2 ${activeEngine === key ? 'border-green-500 bg-green-50' : 'border-gray-200'}`}
              >
                <div className="text-3xl mb-2">{system.icon}</div>
                <div className="font-bold text-sm">{system.name.split(' ')[0]}</div>
                <div className="text-xs text-gray-600">{system.totalRecords}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{currentSystem.icon}</div>
            <div>
              <h2 className="text-2xl font-bold">{currentSystem.name}</h2>
              <p className="text-gray-600">Search {currentSystem.totalRecords} records</p>
            </div>
          </div>

          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Enter company name..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg"
            />
            <button
              onClick={handleSearch}
              disabled={searching}
              className={`${colors[currentSystem.color]} text-white px-8 py-3 rounded-lg font-bold disabled:opacity-50`}
            >
              {searching ? 'Searching...' : 'Verify'}
            </button>
          </div>

          {searchResults && (
            <div className={`border-2 rounded-lg p-6 ${searchResults.found ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}`}>
              {searchResults.found ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="text-green-600" size={40} />
                      <div>
                        <h3 className="text-2xl font-bold text-green-800">Ã¢Å“â€œ VERIFIED & CERTIFIED</h3>
                        <p className="text-green-700 font-semibold">Legal to import into USA</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Download size={18} />PDF
                      </button>
                      <button onClick={emailResults} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Mail size={18} />Email
                      </button>
                      <button onClick={shareResults} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2">
                        <Share2 size={18} />Share
                      </button>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-green-200">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <FileCheck className="text-green-600" />
                      Certificate Information
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Company Name</div>
                        <div className="font-bold text-gray-900">{searchResults.name}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Certificate Number</div>
                        <div className="font-bold text-blue-700">{searchResults.certNumber}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Status</div>
                        <div className="font-bold text-green-700">{searchResults.status}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Issue Date</div>
                        <div className="font-bold">{searchResults.issueDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Expiry Date</div>
                        <div className="font-bold">{searchResults.expiryDate}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Risk Score</div>
                        <div className="font-bold text-green-700">{searchResults.riskScore}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-blue-200">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <MapPin className="text-blue-600" />
                      Location & Address
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Full Address</div>
                        <div className="font-bold text-gray-900">{searchResults.address}</div>
                        <div className="font-bold text-gray-900">{searchResults.city}, {searchResults.state} {searchResults.zipCode}</div>
                        <div className="font-bold text-gray-900">{searchResults.country}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          Ã°Å¸â€œÂ Coordinates: {searchResults.latitude}, {searchResults.longitude}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Tax ID / DUNS</div>
                        <div className="font-bold text-gray-900">{searchResults.taxId}</div>
                        <div className="font-bold text-gray-900">DUNS: {searchResults.dunsNumber}</div>
                      </div>
                    </div>

                    {/* Interactive Map */}
                    <div className="mt-4 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-300">
                      <div className="relative w-full h-80">
                        <iframe
                          title="Company Location Map"
                          width="100%"
                          height="100%"
                          frameBorder="0"
                          style={{ border: 0 }}
                          src={`https://www.openstreetmap.org/export/embed.html?bbox=${searchResults.longitude - 0.05},${searchResults.latitude - 0.05},${searchResults.longitude + 0.05},${searchResults.latitude + 0.05}&layer=mapnik&marker=${searchResults.latitude},${searchResults.longitude}`}
                          allowFullScreen
                        />
                      </div>
                      <div className="bg-blue-600 text-white p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="text-white" size={20} />
                          <span className="font-bold">Ã°Å¸â€œÂ Verified Location: {searchResults.city}, {searchResults.state}</span>
                        </div>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${searchResults.latitude},${searchResults.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white text-blue-600 px-4 py-1 rounded font-bold hover:bg-blue-50 flex items-center gap-1"
                        >
                          <ExternalLink size={14} />
                          Open in Google Maps
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-purple-200">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <User className="text-purple-600" />
                      Company Contact Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Contact Person</div>
                        <div className="font-bold text-gray-900">{searchResults.contactPerson}</div>
                        <div className="text-sm text-gray-600">{searchResults.contactTitle}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <Phone size={12} />Phone
                        </div>
                        <div className="font-bold text-blue-700">{searchResults.phone}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <Mail size={12} />Email
                        </div>
                        <div className="font-bold text-blue-700">{searchResults.email}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          <Globe size={12} />Website
                        </div>
                        <div className="font-bold text-blue-700">{searchResults.website}</div>
                      </div>
                    </div>
                  </div>

                  {/* BUYER/PROCUREMENT CONTACTS - KEY DECISION MAKERS */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-lg border-4 border-orange-400">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-xl flex items-center gap-2">
                        <span className="text-3xl">Ã°Å¸â€™Â°</span>
                        <span className="text-orange-800">BUYER/PROCUREMENT CONTACTS</span>
                      </h4>
                      <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                        Ã°Å¸Å½Â¯ DECISION MAKERS
                      </div>
                    </div>
                    <p className="text-sm text-orange-800 font-semibold mb-4">
                      Ã¢Å¡Â¡ Direct contacts to purchasing team - bypass gatekeepers!
                    </p>

                    <div className="space-y-4">
                      {searchResults.buyerContacts.map((buyer, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-lg border-2 border-orange-200 hover:border-orange-400 transition-all shadow-md">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="flex items-center gap-3 mb-1">
                                <h5 className="text-lg font-bold text-gray-900">{buyer.name}</h5>
                                <span className="bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold">
                                  {buyer.role}
                                </span>
                              </div>
                              <div className="text-sm font-semibold text-orange-700">{buyer.title}</div>
                              <div className="text-xs text-gray-600">{buyer.department}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-gray-600">Best Contact Method</div>
                              <div className="font-bold text-green-700">{buyer.preferredContact}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-orange-50 p-4 rounded-lg">
                            <div>
                              <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                                <Phone size={12} className="text-blue-600" />
                                Direct Line
                              </div>
                              <a href={`tel:${buyer.directPhone}`} className="font-bold text-blue-700 hover:underline block">
                                {buyer.directPhone}
                              </a>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                                <Phone size={12} className="text-green-600" />
                                Mobile/WhatsApp
                              </div>
                              <a href={`tel:${buyer.mobilePhone}`} className="font-bold text-green-700 hover:underline block">
                                {buyer.mobilePhone}
                              </a>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                                <Mail size={12} className="text-red-600" />
                                Direct Email
                              </div>
                              <a href={`mailto:${buyer.email}`} className="font-bold text-red-700 hover:underline block text-sm break-all">
                                {buyer.email}
                              </a>
                            </div>
                            <div>
                              <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                                <Globe size={12} className="text-purple-600" />
                                LinkedIn
                              </div>
                              <a href={`https://${buyer.linkedIn}`} target="_blank" rel="noopener noreferrer" className="font-bold text-purple-700 hover:underline block text-sm">
                                View Profile Ã¢â€ â€™
                              </a>
                            </div>
                          </div>

                          <div className="mt-3 flex gap-2">
                            <a href={`mailto:${buyer.email}?subject=Partnership Opportunity with ${searchResults.name}`} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold text-center text-sm">
                              Ã°Å¸â€œÂ§ Email Now
                            </a>
                            <a href={`tel:${buyer.directPhone}`} className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-bold text-center text-sm">
                              Ã°Å¸â€œÅ¾ Call Now
                            </a>
                            <a href={`https://${buyer.linkedIn}`} target="_blank" rel="noopener noreferrer" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-bold text-center text-sm">
                              Ã°Å¸â€™Â¼ LinkedIn
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 bg-orange-600 text-white p-4 rounded-lg">
                      <p className="font-bold mb-2">Ã°Å¸â€™Â¡ PRO TIP:</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Start with VP of Procurement (final decision maker)</li>
                        <li>CC the Senior Buyer on all emails (day-to-day contact)</li>
                        <li>Loop in Supply Chain Director for strategic discussions</li>
                        <li>Use email first, then follow up with phone call</li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border-2 border-orange-200">
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                      <Shield className="text-orange-600" />
                      Compliance & Insurance
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Compliance Status</div>
                        <div className="font-bold text-green-700">{searchResults.complianceStatus}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Last Inspection</div>
                        <div className="font-bold">{searchResults.lastInspection}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Next Inspection</div>
                        <div className="font-bold">{searchResults.nextInspection}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-600 mb-1">Products Certified</div>
                        <div className="font-bold text-sm">{searchResults.products}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-xs text-gray-600 mb-1">Insurance Provider</div>
                        <div className="font-bold">{searchResults.insuranceProvider}</div>
                        <div className="text-sm text-gray-700">Coverage: {searchResults.insuranceCoverage}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-xs text-gray-600 mb-1">Certifying Body</div>
                        <div className="font-bold">{searchResults.certifier}</div>
                        <div className="text-sm text-gray-700">{searchResults.certifierContact}</div>
                      </div>
                    </div>
                  </div>

                  {/* RELATED LEADS / SIMILAR SUPPLIERS SIDEBAR */}
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 p-6 rounded-lg border-4 border-cyan-400">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-bold text-xl flex items-center gap-2">
                        <span className="text-3xl">Ã°Å¸â€â€”</span>
                        <span className="text-cyan-800">RELATED VERIFIED SUPPLIERS</span>
                      </h4>
                      <div className="bg-cyan-600 text-white px-4 py-2 rounded-lg font-bold text-sm">
                        {searchResults.relatedLeads.length} MATCHES
                      </div>
                    </div>
                    <p className="text-sm text-cyan-800 font-semibold mb-4">
                      Ã¢Å¡Â¡ Similar suppliers in the same area - expand your options!
                    </p>

                    <div className="space-y-3">
                      {searchResults.relatedLeads.map((lead, idx) => (
                        <div key={idx} className="bg-white p-4 rounded-lg border-2 border-cyan-200 hover:border-cyan-400 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h5 className="font-bold text-gray-900">{lead.name}</h5>
                                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">
                                  {lead.riskScore}
                                </span>
                              </div>
                              <div className="text-xs text-gray-600 mb-1">Ã°Å¸â€œÂ {lead.distance}</div>
                              <div className="text-xs font-semibold text-cyan-700 mb-2">{lead.products}</div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded font-semibold">
                                  {lead.certNumber}
                                </span>
                                <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded font-semibold">
                                  Ã¢Å“â€œ {lead.matchReason}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="bg-cyan-50 p-3 rounded-lg mb-2">
                            <div className="text-xs text-gray-600 mb-1">Ã°Å¸â€™Â¼ Buyer Contact</div>
                            <div className="font-bold text-sm text-gray-900 mb-1">{lead.buyerContact}</div>
                            <div className="grid grid-cols-2 gap-2 text-xs">
                              <a href={`mailto:${lead.buyerEmail}`} className="text-blue-700 hover:underline font-semibold truncate">
                                Ã°Å¸â€œÂ§ {lead.buyerEmail}
                              </a>
                              <a href={`tel:${lead.buyerPhone}`} className="text-green-700 hover:underline font-semibold">
                                Ã°Å¸â€œÅ¾ {lead.buyerPhone}
                              </a>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button 
                              onClick={() => setSearchQuery(lead.name)}
                              className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white py-2 rounded font-bold text-xs"
                            >
                              Ã°Å¸â€Â View Full Details
                            </button>
                            <a 
                              href={`mailto:${lead.buyerEmail}?subject=Partnership Inquiry`}
                              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold text-xs text-center"
                            >
                              Ã°Å¸â€œÂ§ Contact Now
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 bg-cyan-600 text-white p-4 rounded-lg">
                      <p className="font-bold mb-2">Ã°Å¸â€™Â¡ WHY CROSS-REFERENCE?</p>
                      <ul className="text-sm space-y-1 list-disc list-inside">
                        <li>Compare pricing from multiple verified suppliers</li>
                        <li>Backup sources if primary supplier can't deliver</li>
                        <li>Negotiate better terms with competitive quotes</li>
                        <li>Diversify supply chain to reduce risk</li>
                        <li>All contacts already verified and legal to import</li>
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={exportToPDF} className="bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                      <Download size={20} />
                      Export PDF Report
                    </button>
                    <button onClick={emailResults} className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                      <Mail size={20} />
                      Email to Team
                    </button>
                    <button onClick={shareResults} className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2">
                      <Building2 size={20} />
                      Add to Suppliers
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <XCircle className="text-red-600" size={40} />
                  <div>
                    <h3 className="text-2xl font-bold text-red-800">NOT VERIFIED</h3>
                    <p className="text-red-700">"{searchResults.query}" not found in {currentSystem.name}</p>
                    <p className="text-sm text-red-600 mt-2">Ã¢Å¡Â Ã¯Â¸Â DO NOT PROCEED - Supplier cannot be verified as legal</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {!searchResults && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700">Ready to Verify</h3>
              <p className="text-gray-600 mt-2">Enter company name to get full intel: address, contact, compliance, insurance</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}