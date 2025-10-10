import React, { useState } from 'react';
import { Search, Upload, DollarSign, TrendingUp, FileText, Shield, MapPin, Calendar, Package, CheckCircle, X, ShoppingCart, Bell, BarChart3, Award, Calculator } from 'lucide-react';

export default function USDA() {
  const [activeTab, setActiveTab] = useState('pricing');
  const [showListingModal, setShowListingModal] = useState(false);

  // Simple mock data
  const listings = [
    {
      id: 'ID-1',
      crop: 'Avocado Hass',
      cropEs: 'Aguacate Hass',
      hectares: 45,
      season: 'Year-round',
      seasonEs: 'Todo el aÃ±o',
      targetPrice: '$24-28/case',
      certs: ['GlobalGAP', 'PRIMUS'],
      state: 'MichoacÃ¡n, MX',
      volume: '500 tons/week',
    },
    {
      id: 'ID-2',
      crop: 'Organic Strawberries',
      cropEs: 'Fresas OrgÃ¡nicas',
      hectares: 12,
      season: 'Nov - Apr',
      seasonEs: 'Nov - Abr',
      targetPrice: '$18-22/flat',
      certs: ['GlobalGAP', 'Organic'],
      state: 'Baja California, MX',
      volume: '200 tons/week',
    },
  ];

  // Factoring quick calc
  const [invoiceAmount, setInvoiceAmount] = useState('');
  const [advancePercent, setAdvancePercent] = useState(85);
  const [factoringTier, setFactoringTier] = useState('standard');
  const tierRate = { standard: 3.5, expedited: 4.0, international: 4.5 };
  const amount = parseFloat(invoiceAmount || '0');
  const rate = tierRate[factoringTier];
  const fee = amount > 0 ? ((amount * rate) / 100).toFixed(2) : '0.00';
  const advance = amount > 0 ? ((amount * advancePercent) / 100).toFixed(2) : '0.00';

  // Pricing quick demo
  const fob = { low: 24.0, avg: 26.0, high: 28.0 };
  const landed = {
    west: (fob.avg * 1.05).toFixed(2),
    mid: (fob.avg * 1.12).toFixed(2),
    east: (fob.avg * 1.18).toFixed(2),
  };
  const wholesale = (parseFloat(landed.mid) * 1.2).toFixed(2);
  const retail = {
    min: (parseFloat(wholesale) * 1.25).toFixed(2),
    max: (parseFloat(wholesale) * 1.5).toFixed(2),
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">USDA Pricing & Trade Portal</h1>
            <p className="text-green-100">Pricing â€¢ Marketplace â€¢ Factoring â€¢ Compliance</p>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <span className="text-sm opacity-90">Notifications</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow p-2">
        <div className="flex gap-2 flex-wrap">
          <TabBtn icon={Search} label="Pricing & Search" active={activeTab === 'pricing'} onClick={() => setActiveTab('pricing')} />
          <TabBtn icon={ShoppingCart} label="Marketplace" active={activeTab === 'marketplace'} onClick={() => setActiveTab('marketplace')} />
          <TabBtn icon={DollarSign} label="Factoring" active={activeTab === 'factoring'} onClick={() => setActiveTab('factoring')} />
          <TabBtn icon={Shield} label="Compliance" active={activeTab === 'compliance'} onClick={() => setActiveTab('compliance')} />
          <TabBtn icon={BarChart3} label="Regional Pricing" active={activeTab === 'regional'} onClick={() => setActiveTab('regional')} />
        </div>
      </div>

      {/* Pricing & Search */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
              <TrendingUp className="text-green-600" />
              Quick Pricing Snapshot
            </h2>
            <p className="text-sm text-gray-500 mb-4">FOB, landed by region, and wholesale/retail estimates</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Stat title="FOB Low" value={`$${fob.low.toFixed(2)}`} tone="green" />
              <Stat title="FOB Avg" value={`$${fob.avg.toFixed(2)}`} tone="green" />
              <Stat title="FOB High" value={`$${fob.high.toFixed(2)}`} tone="green" />
              <Stat title="Wholesale (Midwest)" value={`$${wholesale}`} tone="blue" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <LaneCard label="West Coast" value={`$${landed.west}`} color="blue" />
              <LaneCard label="Midwest" value={`$${landed.mid}`} color="orange" />
              <LaneCard label="East Coast" value={`$${landed.east}`} color="purple" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <Stat title="Retail Min (Est.)" value={`$${retail.min}`} tone="purple" />
              <Stat title="Retail Max (Est.)" value={`$${retail.max}`} tone="purple" />
            </div>
          </div>
        </div>
      )}

      {/* Marketplace */}
      {activeTab === 'marketplace' && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <ShoppingCart />
                Grower Marketplace
              </h2>
              <p className="text-sm text-gray-500">Connect with certified growers</p>
            </div>
            <button
              onClick={() => setShowListingModal(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              List Your Crop
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((l) => (
              <div key={l.id} className="border border-gray-200 rounded-lg p-4 hover:shadow transition">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-gray-900">{l.crop}</h3>
                    <p className="text-xs text-gray-500 italic">{l.cropEs}</p>
                  </div>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{l.id}</span>
                </div>

                <div className="space-y-2 text-sm text-gray-700 mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="font-semibold">{l.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4 text-blue-600" />
                    <div className="flex flex-col">
                      <span>
                        {l.hectares} hectares â€¢ {l.volume}
                      </span>
                      <span className="text-xs text-gray-500 italic">{l.hectares} hectÃ¡reas</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <div className="flex flex-col">
                      <span>{l.season}</span>
                      <span className="text-xs text-gray-500 italic">{l.seasonEs}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-700" />
                    <div className="flex flex-col">
                      <span className="font-bold text-green-700">{l.targetPrice}</span>
                      <span className="text-xs text-gray-500 italic">Precio objetivo</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {l.certs.map((cert) => (
                    <span key={cert} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {cert}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
                  Contact Grower
                </button>
              </div>
            ))}
          </div>

          {/* Listing Modal */}
          {showListingModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowListingModal(false)}>
              <div className="bg-white rounded-lg p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">List Your Crop</h3>
                    <p className="text-xs text-gray-500">Publicar tu Cultivo</p>
                  </div>
                  <button onClick={() => setShowListingModal(false)} className="text-gray-400 hover:text-gray-600">
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Crop Type" />
                  <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Hectares" type="number" />
                  <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="State / Region" />
                  <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Season" />
                  <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Target Price" />
                  <input className="border border-gray-300 rounded-lg px-3 py-2" placeholder="Weekly Volume (tons)" type="number" />
                  <div className="md:col-span-2 flex gap-2 justify-end mt-2">
                    <button type="button" onClick={() => setShowListingModal(false)} className="border border-gray-300 px-4 py-2 rounded-lg">
                      Cancel
                    </button>
                    <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg">
                      Submit Listing
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Factoring */}
      {activeTab === 'factoring' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <FileText className="text-purple-600" />
            Factoring Calculator
          </h2>
          <p className="text-sm text-gray-500 mb-4">Estimate advance and fees based on invoice amount and tier</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Invoice Amount ($)</label>
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                type="number"
                placeholder="50000"
                value={invoiceAmount}
                onChange={(e) => setInvoiceAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Advance %</label>
              <input
                className="w-full"
                type="range"
                min="80"
                max="90"
                value={advancePercent}
                onChange={(e) => setAdvancePercent(parseInt(e.target.value || '85', 10))}
              />
              <div className="text-sm font-semibold mt-1">{advancePercent}%</div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Service Tier</label>
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 w-full"
                value={factoringTier}
                onChange={(e) => setFactoringTier(e.target.value)}
              >
                <option value="standard">Standard</option>
                <option value="expedited">Expedited</option>
                <option value="international">International</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoTile title="Estimated Rate" value={`${rate.toFixed(1)}%`} color="purple" icon={Calculator} />
            <InfoTile title="Advance Amount" value={`$${advance}`} color="green" icon={DollarSign} />
            <InfoTile title="Factoring Fee" value={`$${fee}`} color="blue" icon={FileText} />
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <ul className="text-sm text-gray-700 space-y-1">
              <li>â€¢ 24-48 hour approvals</li>
              <li>â€¢ No minimum volume</li>
              <li>â€¢ Cross-border (MX/CA/SA â†’ USA) supported</li>
            </ul>
          </div>
        </div>
      )}

      {/* Compliance */}
      {activeTab === 'compliance' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <Shield className="text-green-700" />
            Food Safety & Compliance
          </h2>
          <p className="text-sm text-gray-500 mb-4">Key certifications for US import eligibility</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BadgeCard icon={Shield} title="FDA Registration" ok text="Registered" />
            <BadgeCard icon={FileText} title="FSMA Compliant" ok text="Compliant" />
            <BadgeCard icon={Award} title="GlobalGAP" warn text="Certified/Verify" />
            <BadgeCard icon={Award} title="PRIMUS GFS" warn text="Certified/Verify" />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Required Certifications</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>â€¢ FDA Registration</li>
                <li>â€¢ FSMA Compliance</li>
                <li>â€¢ HACCP Plan</li>
                <li>â€¢ GlobalGAP or PRIMUS</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Import Documents</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>â€¢ Phytosanitary Certificate</li>
                <li>â€¢ Commercial Invoice</li>
                <li>â€¢ Bill of Lading</li>
                <li>â€¢ Packing List</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Need Help?</h4>
              <p className="text-sm text-gray-700 mb-3">Our team can assist with compliance and import prep.</p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold">
                Contact Compliance Expert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Regional Pricing (static demo) */}
      {activeTab === 'regional' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
            <BarChart3 className="text-blue-700" />
            Regional Market Pricing (Demo)
          </h2>
          <p className="text-sm text-gray-500 mb-4">Illustrative averages by US region</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <RegionTile region="West Coast" avg="$38.90" low="$35.28" high="$42.50" />
            <RegionTile region="Midwest" avg="$41.30" low="$37.63" high="$45.00" />
            <RegionTile region="East Coast" avg="$43.90" low="$39.65" high="$48.20" />
          </div>
        </div>
      )}
    </div>
  );
}

/* Helper subcomponents */

function TabBtn({ icon: Icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition ${
        active ? 'bg-green-600 text-white shadow' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function Stat({ title, value, tone = 'gray' }) {
  const color =
    tone === 'green' ? 'text-green-700' : tone === 'blue' ? 'text-blue-700' : tone === 'purple' ? 'text-purple-700' : 'text-gray-800';
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="text-xs text-gray-600 font-semibold mb-1">{title}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
    </div>
  );
}

function LaneCard({ label, value, color }) {
  const border =
    color === 'blue' ? 'border-blue-400 bg-blue-50' : color === 'orange' ? 'border-orange-400 bg-orange-50' : 'border-purple-400 bg-purple-50';
  const text = color === 'blue' ? 'text-blue-800' : color === 'orange' ? 'text-orange-800' : 'text-purple-800';
  return (
    <div className={`rounded-lg p-4 border-2 ${border}`}>
      <div className="text-sm text-gray-700 mb-1">{label}</div>
      <div className={`text-2xl font-bold ${text}`}>{value}</div>
    </div>
  );
}

function InfoTile({ title, value, color, icon: Icon }) {
  const ring =
    color === 'green'
      ? 'border-green-200 bg-green-50'
      : color === 'blue'
      ? 'border-blue-200 bg-blue-50'
      : 'border-purple-200 bg-purple-50';
  const text = color === 'green' ? 'text-green-700' : color === 'blue' ? 'text-blue-700' : 'text-purple-700';
  return (
    <div className={`rounded-lg p-4 border-2 ${ring}`}>
      <div className="text-sm text-gray-600 mb-1 flex items-center gap-2">
        <Icon className={`w-4 h-4 ${text}`} />
        <span>{title}</span>
      </div>
      <div className={`text-3xl font-bold ${text}`}>{value}</div>
    </div>
  );
}

function BadgeCard({ icon: Icon, title, ok, warn, text }) {
  const ring = ok ? 'border-green-500 bg-green-50' : warn ? 'border-yellow-500 bg-yellow-50' : 'border-red-500 bg-red-50';
  const dot = ok ? 'text-green-600' : warn ? 'text-yellow-600' : 'text-red-600';
  const status = ok ? 'âœ…' : warn ? 'âš ï¸' : 'âŒ';
  return (
    <div className={`border-2 rounded-lg p-4 ${ring}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon className={`w-5 h-5 ${dot}`} />
        <span className="font-bold">{title}</span>
      </div>
      <div className="text-sm">
        {status} {text}
      </div>
    </div>
  );
}

function RegionTile({ region, avg, low, high }) {
  return (
    <div className="rounded-lg p-6 border-2 border-gray-200 bg-white">
      <div className="text-lg font-bold text-gray-900">{region}</div>
      <div className="mt-2 text-sm text-gray-600">Wholesale Average</div>
      <div className="text-3xl font-bold text-gray-900">{avg}</div>
      <div className="text-xs text-gray-500 mt-1">Range: {low} - {high}</div>
      <div className="mt-3 text-xs text-gray-500 flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-green-600" />
        USDA Market News (demo)
      </div>
    </div>
  );
}


