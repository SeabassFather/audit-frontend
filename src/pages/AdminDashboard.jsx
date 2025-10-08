import React, { useState } from 'react';
import { Shield, CheckCircle, XCircle, Clock, Users, Home, TrendingUp, Bell } from 'lucide-react';

const AdminDashboard = ({ pendingListings = [], agents = [], approvedListings = [], onApprove, onReject }) => {
  const [selectedListing, setSelectedListing] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const [rejectReason, setRejectReason] = useState('');

  const handleApprove = (listingId) => { onApprove(listingId); setSelectedListing(null); };
  const handleReject = (listingId) => { if (!rejectReason.trim()) { alert('Please provide a reason for rejection'); return; } onReject(listingId, rejectReason); setSelectedListing(null); setRejectReason(''); };

  const formatPrice = (price) => { return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price); };

  const stats = [
    { icon: Clock, label: 'Pending Approval', value: pendingListings.length, color: 'bg-yellow-500', textColor: 'text-yellow-600' },
    { icon: CheckCircle, label: 'Approved Listings', value: approvedListings.length, color: 'bg-green-500', textColor: 'text-green-600' },
    { icon: Users, label: 'Active Agents', value: agents.length, color: 'bg-purple-500', textColor: 'text-purple-600' },
    { icon: TrendingUp, label: 'Total Value', value: formatPrice(approvedListings.reduce((sum, listing) => sum + (listing.price || 0), 0)), color: 'bg-blue-500', textColor: 'text-blue-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-red-600 to-purple-600 rounded-xl shadow-2xl p-6 mb-8 border-4 border-yellow-400">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-white p-3 rounded-full"><Shield className="w-8 h-8 text-red-600" /></div>
              <div><h1 className="text-3xl font-bold text-white flex items-center gap-2">ADMIN CONTROL PANEL<Bell className="w-6 h-6 text-yellow-400 animate-pulse" /></h1><p className="text-red-100">Saul Garcia - Platform Administrator</p></div>
            </div>
            {pendingListings.length > 0 && <div className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold animate-pulse">{pendingListings.length} NEW LISTINGS PENDING</div>}
          </div>
        </div>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
              <div className="flex items-center justify-between mb-3"><div className={`p-3 rounded-lg ${stat.color} bg-opacity-10`}><stat.icon className={`w-6 h-6 ${stat.textColor}`} /></div></div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-t-xl shadow-lg border-b-2 border-gray-200">
          <div className="flex gap-2 p-2">
            <button onClick={() => setActiveTab('pending')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'pending' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}><Clock className="w-5 h-5" />Pending Approval ({pendingListings.length})</button>
            <button onClick={() => setActiveTab('approved')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'approved' ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}><CheckCircle className="w-5 h-5" />Approved ({approvedListings.length})</button>
            <button onClick={() => setActiveTab('agents')} className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${activeTab === 'agents' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg' : 'text-gray-600 hover:bg-gray-100'}`}><Users className="w-5 h-5" />Agents ({agents.length})</button>
          </div>
        </div>
        <div className="bg-white rounded-b-xl shadow-lg p-6 min-h-[400px]">
          {activeTab === 'pending' && (
            <div>
              {pendingListings.length === 0 ? (
                <div className="text-center py-12"><Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-xl font-semibold text-gray-600">No pending listings</p><p className="text-gray-500">All listings have been reviewed</p></div>
              ) : (
                <div className="space-y-4">
                  {pendingListings.map((listing) => (
                    <div key={listing.listingId} className="border-2 border-yellow-200 rounded-xl p-6 bg-yellow-50 hover:shadow-lg transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">PENDING REVIEW</span>
                            <span className="text-sm text-gray-600">Listed {new Date(listing.createdAt).toLocaleDateString()}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{listing.location}</h3>
                          <p className="text-gray-600 mb-3">{listing.region} • {listing.propertyType}</p>
                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div><p className="text-sm text-gray-600">Price</p><p className="text-2xl font-bold text-purple-600">{formatPrice(listing.price)}</p></div>
                            <div><p className="text-sm text-gray-600">Owner Type</p><p className="font-semibold text-gray-900">{listing.ownerType}</p></div>
                          </div>
                          <div className="bg-white rounded-lg p-4 mb-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Listed By:</p>
                            <p className="font-bold text-gray-900">{listing.agentName}</p>
                            <p className="text-sm text-gray-600">{listing.agentAgency}</p>
                            <p className="text-sm text-gray-600">{listing.agentEmail} • {listing.agentPhone}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4">
                            <p className="text-sm font-semibold text-gray-700 mb-2">Property Owner:</p>
                            <p className="font-bold text-gray-900">{listing.ownerName}</p>
                            <p className="text-sm text-gray-600">{listing.ownerAddress}</p>
                            <p className="text-sm text-gray-600">{listing.ownerEmail} • {listing.ownerPhone}</p>
                          </div>
                        </div>
                        <div className="ml-6 flex flex-col gap-3">
                          <button onClick={() => setSelectedListing(listing)} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all whitespace-nowrap">Review Details</button>
                          <button onClick={() => handleApprove(listing.listingId)} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center gap-2"><CheckCircle className="w-5 h-5" />Approve</button>
                          <button onClick={() => setSelectedListing(listing)} className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all flex items-center gap-2"><XCircle className="w-5 h-5" />Reject</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'approved' && (
            <div>
              {approvedListings.length === 0 ? (
                <div className="text-center py-12"><Home className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-xl font-semibold text-gray-600">No approved listings yet</p></div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {approvedListings.map((listing) => (
                    <div key={listing.listingId} className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
                      <div className="flex items-center gap-2 mb-3"><CheckCircle className="w-5 h-5 text-green-600" /><span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">APPROVED</span></div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{listing.location}</h3>
                      <p className="text-gray-600 mb-2">{listing.region}</p>
                      <p className="text-2xl font-bold text-purple-600 mb-3">{formatPrice(listing.price)}</p>
                      <p className="text-sm text-gray-600">Agent: <span className="font-semibold">{listing.agentName}</span></p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {activeTab === 'agents' && (
            <div>
              {agents.length === 0 ? (
                <div className="text-center py-12"><Users className="w-16 h-16 text-gray-300 mx-auto mb-4" /><p className="text-xl font-semibold text-gray-600">No registered agents</p></div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {agents.map((agent) => (
                    <div key={agent.agentId} className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">{agent.fullName.charAt(0)}</div>
                        <div><h3 className="font-bold text-gray-900">{agent.fullName}</h3><p className="text-sm text-gray-600">{agent.agency}</p></div>
                      </div>
                      <div className="space-y-1 text-sm text-gray-700">
                        <p><strong>Email:</strong> {agent.email}</p>
                        <p><strong>Phone:</strong> {agent.phone}</p>
                        <p><strong>Registered:</strong> {new Date(agent.registeredAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        {selectedListing && activeTab === 'pending' && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50" onClick={() => setSelectedListing(null)}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Review Listing</h2>
              <div className="mb-6"><h3 className="font-bold text-lg mb-2">{selectedListing.location}</h3><p className="text-gray-600">{selectedListing.region} • {formatPrice(selectedListing.price)}</p></div>
              <div className="space-y-4 mb-6">
                <div><p className="text-sm font-semibold text-gray-700">Description (English):</p><p className="text-gray-600 bg-gray-50 p-3 rounded">{selectedListing.descriptionEnglish}</p></div>
                <div><p className="text-sm font-semibold text-gray-700">Descripción (Español):</p><p className="text-gray-600 bg-gray-50 p-3 rounded">{selectedListing.descriptionSpanish}</p></div>
              </div>
              <div className="mb-6"><label className="block text-sm font-semibold text-gray-700 mb-2">Reason for Rejection (optional)</label><textarea value={rejectReason} onChange={(e) => setRejectReason(e.target.value)} rows={4} placeholder="Enter reason for rejection..." className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500" /></div>
              <div className="flex gap-3">
                <button onClick={() => handleApprove(selectedListing.listingId)} className="flex-1 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-all flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" />Approve Listing</button>
                <button onClick={() => handleReject(selectedListing.listingId)} className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-all flex items-center justify-center gap-2"><XCircle className="w-5 h-5" />Reject Listing</button>
                <button onClick={() => { setSelectedListing(null); setRejectReason(''); }} className="px-6 bg-gray-300 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-400 transition-all">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
