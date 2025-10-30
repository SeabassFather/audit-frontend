import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Shield, ExternalLink, Eye, Phone, Mail, Globe } from 'lucide-react';

export default function USDAMarketplaceProactive() {
  const [showGrowerForm, setShowGrowerForm] = useState(false);

  const VERIFICATION_APIS = {
    usda_organic: 'https://organic.ams.usda.gov/integrity/',
    fda_registration: 'https://www.accessdata.fda.gov/scripts/furls/',
    mexico_senasica: 'https://www.gob.mx/senasica',
    globalgap: 'https://database.globalgap.org/search/',
    primus: 'https://www.primusgfs.com/SuppliersSearch.aspx'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-xl shadow-lg">
<<<<<<< HEAD
          <h1 className="text-4xl font-bold mb-2">🌽 USDA Verified Marketplace</h1>
          <p className="text-green-100 mb-4">Real-time certificate verification • Document management • Compliance tracking</p>
=======
          <h1 className="text-4xl font-bold mb-2">Ã°Å¸Å’Â½ USDA Verified Marketplace</h1>
          <p className="text-green-100 mb-4">Real-time certificate verification Ã¢â‚¬Â¢ Document management Ã¢â‚¬Â¢ Compliance tracking</p>
>>>>>>> my/push-branch
          <button
            onClick={() => setShowGrowerForm(true)}
            className="bg-white text-green-700 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition"
          >
            + Register as Certified Grower
          </button>
        </div>

        <CertificationVerificationPortal apis={VERIFICATION_APIS} />
        {showGrowerForm && <GrowerRegistrationModal onClose={() => setShowGrowerForm(false)} />}
      </div>
    </div>
  );
}

function CertificationVerificationPortal({ apis }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('usda_organic');
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setSearching] = useState(false);

  const verificationTypes = [
    { key: 'usda_organic', label: 'USDA Organic', agency: 'USDA NOP', url: apis.usda_organic },
    { key: 'fda_registration', label: 'FDA Registration', agency: 'FDA FURLS', url: apis.fda_registration },
    { key: 'globalgap', label: 'GlobalGAP', agency: 'GlobalGAP DB', url: apis.globalgap },
    { key: 'primus', label: 'PRIMUS GFS', agency: 'PRIMUS', url: apis.primus },
    { key: 'senasica', label: 'SENASICA (Mexico)', agency: 'SENASICA', url: apis.mexico_senasica }
  ];

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      alert('Enter a certificate ID or company name');
      return;
    }
    setSearching(true);
    setTimeout(() => {
      setSearchResults({
        found: Math.random() > 0.2,
        certId: searchQuery,
        companyName: 'Organic Farms LLC',
        status: 'Active',
        issueDate: '2024-01-15',
        expiryDate: '2025-01-15',
        scope: 'Fruits, Vegetables, Nuts',
        certifyingBody: verificationTypes.find(v => v.key === searchType)?.agency,
<<<<<<< HEAD
        address: 'Michoacán, Mexico',
=======
        address: 'MichoacÃƒÂ¡n, Mexico',
>>>>>>> my/push-branch
        contact: '+52 443 123 4567'
      });
      setSearching(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="text-blue-600" size={32} />
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Certificate Verification Portal</h2>
          <p className="text-gray-600 text-sm">Verify grower certifications in real-time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none"
        >
          {verificationTypes.map(type => (
            <option key={type.key} value={type.key}>{type.label}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Enter Certificate ID or Company Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-blue-500 focus:outline-none md:col-span-2"
        />
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleSearch}
          disabled={searching}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {searching ? 'Searching...' : <><Eye size={20} />Verify Certificate</>}
        </button>
        <a
          href={verificationTypes.find(v => v.key === searchType)?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-300 flex items-center gap-2"
        >
          <ExternalLink size={20} />Official Database
        </a>
      </div>

      {searchResults && (
        <div className={`border-2 rounded-lg p-6 ${searchResults.found ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          {searchResults.found ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="text-green-600" size={32} />
<<<<<<< HEAD
                <h3 className="text-2xl font-bold text-green-800">Certificate Verified ✓</h3>
=======
                <h3 className="text-2xl font-bold text-green-800">Certificate Verified Ã¢Å“â€œ</h3>
>>>>>>> my/push-branch
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-semibold">Certificate ID:</span> {searchResults.certId}</div>
                <div><span className="font-semibold">Company:</span> {searchResults.companyName}</div>
                <div><span className="font-semibold">Status:</span> <span className="text-green-700 font-bold">{searchResults.status}</span></div>
                <div><span className="font-semibold">Certifying Body:</span> {searchResults.certifyingBody}</div>
                <div><span className="font-semibold">Issue Date:</span> {searchResults.issueDate}</div>
                <div><span className="font-semibold">Expiry Date:</span> {searchResults.expiryDate}</div>
                <div><span className="font-semibold">Location:</span> {searchResults.address}</div>
                <div><span className="font-semibold">Contact:</span> {searchResults.contact}</div>
                <div className="col-span-2"><span className="font-semibold">Scope:</span> {searchResults.scope}</div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <XCircle className="text-red-600" size={32} />
                <h3 className="text-2xl font-bold text-red-800">Certificate Not Found</h3>
              </div>
              <p className="text-red-700">Certificate ID "{searchQuery}" could not be verified.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function GrowerRegistrationModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '', dba: '', taxId: '', country: '', state: '', city: '', address: '',
    contactName: '', email: '', phone: '', whatsapp: '', website: ''
  });
  
  const [certifications, setCertifications] = useState({
    usda_organic: { id: '', file: null, verified: null },
    fda_registration: { id: '', file: null, verified: null },
    globalgap: { id: '', file: null, verified: null },
    primus: { id: '', file: null, verified: null },
    senasica: { id: '', file: null, verified: null },
    fsma: { id: '', file: null, verified: null }
  });

  const [companyDocs, setCompanyDocs] = useState([]);
  const [verifying, setVerifying] = useState(false);

  const certTypes = [
    { key: 'usda_organic', label: 'USDA Organic Certification', required: true, agency: 'USDA NOP' },
    { key: 'fda_registration', label: 'FDA Facility Registration', required: true, agency: 'FDA FURLS' },
    { key: 'globalgap', label: 'GlobalGAP Certification', required: false, agency: 'GlobalGAP' },
    { key: 'primus', label: 'PRIMUS GFS Audit', required: false, agency: 'PRIMUS' },
    { key: 'senasica', label: 'SENASICA Export Permit (Mexico)', required: false, agency: 'SENASICA' },
    { key: 'fsma', label: 'FSMA Compliance Certificate', required: true, agency: 'FDA' }
  ];

  const handleFileUpload = (certKey, file) => {
    setCertifications(prev => ({
      ...prev,
      [certKey]: { ...prev[certKey], file }
    }));
  };

  const verifyCertification = (certKey) => {
    setVerifying(true);
    setTimeout(() => {
      const isValid = Math.random() > 0.3;
      setCertifications(prev => ({
        ...prev,
        [certKey]: { ...prev[certKey], verified: isValid }
      }));
      setVerifying(false);
    }, 2000);
  };

  const handleCompanyDocUpload = (files) => {
    const newDocs = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString()
    }));
    setCompanyDocs(prev => [...prev, ...newDocs]);
  };

  const handleSubmit = () => {
    const requiredCerts = certTypes.filter(c => c.required);
    const allVerified = requiredCerts.every(c => 
      certifications[c.key].file && certifications[c.key].verified === true
    );

    if (!allVerified) {
      alert('Please upload and verify all required certifications!');
      return;
    }
    alert('Registration submitted! Review within 24-48 hours.');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full my-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-t-2xl">
          <h2 className="text-3xl font-bold">Certified Grower Registration</h2>
          <p className="text-green-100 mt-2">Step {step} of 3: {step === 1 ? 'Company Info' : step === 2 ? 'Certifications' : 'Documents'}</p>
        </div>

        <div className="p-8 space-y-8">
          {step === 1 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="text-green-600" />Company Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder="Legal Company Name *" value={formData.companyName} onChange={(e) => setFormData({...formData, companyName: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" required />
                <input type="text" placeholder="DBA (Doing Business As)" value={formData.dba} onChange={(e) => setFormData({...formData, dba: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" />
                <input type="text" placeholder="Tax ID / RFC *" value={formData.taxId} onChange={(e) => setFormData({...formData, taxId: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" required />
                <select value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" required>
                  <option value="">Select Country *</option>
                  <option value="USA">United States</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Guatemala">Guatemala</option>
                </select>
                <input type="text" placeholder="State/Region *" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" required />
                <input type="text" placeholder="City *" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" required />
                <input type="text" placeholder="Contact Name *" value={formData.contactName} onChange={(e) => setFormData({...formData, contactName: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" required />
                <input type="email" placeholder="Email *" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" required />
                <input type="tel" placeholder="Phone *" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" required />
                <input type="tel" placeholder="WhatsApp" value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} className="border-2 border-gray-300 rounded-lg px-4 py-3 focus:border-green-500 focus:outline-none" />
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Shield className="text-blue-600" />Certifications
              </h3>
              <div className="space-y-4">
                {certTypes.map(cert => (
                  <div key={cert.key} className="border-2 border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-gray-900">{cert.label} {cert.required && <span className="text-red-600">*</span>}</h4>
                        <p className="text-sm text-gray-600">Agency: {cert.agency}</p>
                      </div>
                      {certifications[cert.key].verified !== null && (
                        <div className="flex items-center gap-2">
                          {certifications[cert.key].verified ? (
                            <><CheckCircle className="text-green-600" size={24} /><span className="text-green-700 font-bold">Verified</span></>
                          ) : (
                            <><XCircle className="text-red-600" size={24} /><span className="text-red-700 font-bold">Invalid</span></>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input type="text" placeholder="Certificate ID" value={certifications[cert.key].id} onChange={(e) => setCertifications(prev => ({...prev, [cert.key]: { ...prev[cert.key], id: e.target.value }}))} className="border border-gray-300 rounded px-3 py-2" />
                      <div>
                        <label className="block">
                          <span className="sr-only">Upload</span>
                          <input type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileUpload(cert.key, e.target.files[0])} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                        </label>
<<<<<<< HEAD
                        {certifications[cert.key].file && <p className="text-xs text-gray-600 mt-1">✓ {certifications[cert.key].file.name}</p>}
=======
                        {certifications[cert.key].file && <p className="text-xs text-gray-600 mt-1">Ã¢Å“â€œ {certifications[cert.key].file.name}</p>}
>>>>>>> my/push-branch
                      </div>
                      <button type="button" onClick={() => verifyCertification(cert.key)} disabled={!certifications[cert.key].id || !certifications[cert.key].file || verifying} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                        {verifying ? 'Verifying...' : 'Verify Now'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Company Documents</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto text-gray-400 mb-3" size={48} />
                <p className="text-gray-600 mb-3">Upload additional documents</p>
                <p className="text-sm text-gray-500 mb-4">Articles, insurance, tax docs, bank statements</p>
                <label className="cursor-pointer">
                  <span className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 inline-block">Choose Files</span>
                  <input type="file" multiple accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={(e) => handleCompanyDocUpload(e.target.files)} className="hidden" />
                </label>
              </div>
              {companyDocs.length > 0 && (
                <div className="mt-4 space-y-2">
                  <h4 className="font-semibold text-gray-900">Uploaded Documents ({companyDocs.length})</h4>
                  {companyDocs.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="text-blue-600" size={20} />
                        <div>
                          <p className="font-medium text-gray-900">{doc.name}</p>
                          <p className="text-xs text-gray-500">{(doc.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300">Back</button>
            )}
            {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700">Next</button>
            ) : (
              <button onClick={handleSubmit} className="flex-1 bg-green-600 text-white py-4 rounded-lg font-bold hover:bg-green-700">Submit Registration</button>
            )}
            <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-bold hover:bg-gray-300">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}