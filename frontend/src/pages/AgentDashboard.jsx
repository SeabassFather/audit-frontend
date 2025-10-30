<<<<<<< HEAD
import React from 'react';
import { Home, Clock, CheckCircle, QrCode, DollarSign } from 'lucide-react';

const AgentDashboard = ({ agentData, listings = [] }) => {
  const myListings = listings.filter(listing => listing.agentId === agentData.agentId);
  const pendingCount = myListings.filter(l => l.status === 'pending_agreement' || l.status === 'pending_approval').length;
  const approvedCount = myListings.filter(l => l.status === 'approved').length;
  const totalValue = myListings.reduce((sum, listing) => sum + (listing.price || 0), 0);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  const getStatusBadge = (status) => {
    const badges = {
      'pending_agreement': { color: 'bg-yellow-100 text-yellow-800', text: 'Pending Agreement' },
      'pending_approval': { color: 'bg-orange-100 text-orange-800', text: 'Pending Admin Approval' },
      'approved': { color: 'bg-green-100 text-green-800', text: 'Approved & Live' },
      'rejected': { color: 'bg-red-100 text-red-800', text: 'Rejected' }
    };
    return badges[status] || badges['pending_approval'];
  };

  const generateQRCode = (propertyId) => {
    const url = `https://auditdna.com/property/${propertyId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-3xl">{agentData.fullName.charAt(0)}</div>
            <div><h1 className="text-3xl font-bold">{agentData.fullName}</h1><p className="text-purple-100 text-lg">{agentData.agency}</p></div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <p><strong>Email:</strong> {agentData.email}</p>
            <p><strong>Phone:</strong> {agentData.phone}</p>
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between mb-2"><Home className="w-8 h-8 text-blue-500" /><span className="text-3xl font-bold text-gray-900">{myListings.length}</span></div>
            <p className="text-gray-600 font-semibold">Total Listings</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between mb-2"><Clock className="w-8 h-8 text-yellow-500" /><span className="text-3xl font-bold text-gray-900">{pendingCount}</span></div>
            <p className="text-gray-600 font-semibold">Pending Review</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between mb-2"><CheckCircle className="w-8 h-8 text-green-500" /><span className="text-3xl font-bold text-gray-900">{approvedCount}</span></div>
            <p className="text-gray-600 font-semibold">Approved & Live</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between mb-2"><DollarSign className="w-8 h-8 text-purple-500" /></div>
            <p className="text-2xl font-bold text-gray-900">{formatPrice(totalValue)}</p>
            <p className="text-gray-600 font-semibold">Total Value</p>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><Home className="w-7 h-7 text-purple-600" />My Listings</h2>
          {myListings.length === 0 ? (
            <div className="text-center py-12"><Home className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-xl font-semibold text-gray-600 mb-2">No listings yet</p><p className="text-gray-500">Upload your first property to get started</p></div>
          ) : (
            <div className="space-y-6">
              {myListings.map((listing) => {
                const statusBadge = getStatusBadge(listing.status);
                return (
                  <div key={listing.listingId} className="border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusBadge.color}`}>{statusBadge.text}</span>
                          <span className="text-sm text-gray-500">Listed {new Date(listing.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{listing.location}</h3>
                        <p className="text-gray-600 mb-3">{listing.region} • {listing.propertyType}</p>
                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div><p className="text-sm text-gray-600">Price</p><p className="text-xl font-bold text-purple-600">{formatPrice(listing.price)}</p></div>
                          <div><p className="text-sm text-gray-600">Square Feet</p><p className="font-semibold text-gray-900">{listing.squareFeet?.toLocaleString()}</p></div>
                          <div><p className="text-sm text-gray-600">Beds / Baths</p><p className="font-semibold text-gray-900">{listing.bedrooms || 'N/A'} / {listing.bathrooms || 'N/A'}</p></div>
                        </div>
                        <p className="text-sm text-gray-700 line-clamp-2 bg-gray-50 p-3 rounded">{listing.descriptionEnglish}</p>
                      </div>
                      {listing.status === 'approved' && (
                        <div className="ml-6 text-center">
                          <img src={generateQRCode(listing.listingId)} alt="QR Code" className="w-32 h-32 rounded-lg shadow-lg mb-2" />
                          <button onClick={() => { const link = document.createElement('a'); link.href = generateQRCode(listing.listingId); link.download = `qr-${listing.listingId}.png`; link.click(); }} className="text-xs bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-all flex items-center gap-1"><QrCode className="w-3 h-3" />Download QR</button>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-3 pt-4 border-t border-gray-200">
                      {listing.status === 'pending_agreement' && <span className="text-sm text-gray-600 italic">⚠️ Waiting for commission agreement signature</span>}
                      {listing.status === 'pending_approval' && <span className="text-sm text-gray-600 italic">⏳ Your listing is under admin review</span>}
                      {listing.status === 'approved' && <span className="text-sm text-green-600 font-semibold flex items-center gap-1"><CheckCircle className="w-4 h-4" />Your listing is LIVE and visible to buyers!</span>}
                      {listing.status === 'rejected' && listing.rejectReason && <div className="text-sm text-red-600"><strong>Rejection Reason:</strong> {listing.rejectReason}</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="mt-8 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6 border-2 border-purple-300">
          <h3 className="text-lg font-bold text-gray-900 mb-2">📊 Commission Structure</h3>
          <p className="text-gray-700">You earn <strong className="text-purple-600">50% commission</strong> on all approved listings that result in a sale. AuditDNA Elite handles marketing, financing coordination, and platform management for the other 50%.</p>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
=======
import React from "react";

export default function AgentDashboard() {
  return (
    <div>
      <h1>Agent Dashboard</h1>
      {/* Add your agent dashboard content here */}
    </div>
  );
}
>>>>>>> my/push-branch
