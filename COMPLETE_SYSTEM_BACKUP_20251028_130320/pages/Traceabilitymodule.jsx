import React, { useState, useMemo } from 'react';
import { 
  Upload, FileText, AlertTriangle, CheckCircle, TrendingUp, Activity, 
  Droplet, Beaker, Leaf, Database, Download, Eye, X, Search, Microscope, 
  Heart, Thermometer, Wifi, Zap, TestTube
} from 'lucide-react';

/**
 * TraceabilityModule.jsx
 * COMPLETE WATER TECHNOLOGY & TRACEABILITY PLATFORM
 * 
 * Features:
 * - Tab 1: Lab Upload (Water/Soil test processing with scientific analysis)
 * - Tab 2: Technologies Marketplace (19 water tech solutions)
 * - Tab 3: Compliance Dashboard (EPA, USDA, FDA, GlobalGAP, SGMA)
 * - Tab 4: IoT Sensors (6 sensor types with real-time monitoring)
 * 
 * Scientific Database: E.Coli, Salmonella, Heavy Metals, Nutrients, Diseases
 */

// Complete Scientific Particle Database
const PARTICLE_DATABASE = {
  bacteria: [
    { 
      name: 'E. coli', 
      scientific: 'Escherichia coli',
      threshold: '0 CFU/100mL',
      severity: 'critical',
      health_impact: {
        positive: [],
        negative: ['Acute diarrhea', 'Kidney failure (HUS)', 'Severe dehydration', 'Abdominal cramping']
      },
      sources: ['Fecal contamination', 'Animal waste runoff', 'Sewage leaks'],
      treatment: 'UV sterilization, chlorination, boiling'
    },
    { 
      name: 'Salmonella', 
      scientific: 'Salmonella enterica',
      threshold: '0 CFU/100mL',
      severity: 'critical',
      health_impact: {
        positive: [],
        negative: ['Typhoid fever', 'Gastroenteritis', 'Septicemia', 'Intestinal perforation']
      },
      sources: ['Contaminated irrigation water', 'Animal feces', 'Cross-contamination'],
      treatment: 'Pasteurization, chemical disinfection'
    },
    { 
      name: 'Total Coliform', 
      scientific: 'Coliform bacteria group',
      threshold: '< 1 CFU/100mL',
      severity: 'high',
      health_impact: {
        positive: ['Indicator organisms (not always pathogenic)'],
        negative: ['Indicates possible fecal contamination', 'Gateway for pathogens']
      },
      sources: ['Soil, vegetation, water', 'Indicator of sanitation issues'],
      treatment: 'Chlorination, UV, ozonation'
    }
  ],
  heavy_metals: [
    {
      metal: 'Lead (Pb)',
      scientific: 'Toxic heavy metal - No biological function',
      threshold: '< 0.015 ppm (water), < 0.3 ppm (soil)',
      severity: 'critical',
      health_impact: {
        positive: [],
        negative: ['Neurological damage (children)', 'IQ reduction', 'Kidney damage', 'Reproductive toxicity', 'Anemia']
      },
      sources: ['Old pipes', 'Industrial contamination', 'Legacy pesticides'],
      bioaccumulation: 'High - accumulates in bones, brain, kidneys'
    },
    {
      metal: 'Arsenic (As)',
      scientific: 'Toxic metalloid - Carcinogenic',
      threshold: '< 0.010 ppm (water)',
      severity: 'critical',
      health_impact: {
        positive: [],
        negative: ['Skin/lung/bladder cancer', 'Cardiovascular disease', 'Diabetes', 'Neurological effects']
      },
      sources: ['Natural geological deposits', 'Mining', 'Pesticide residues'],
      bioaccumulation: 'Moderate - accumulates in skin, hair, nails'
    },
    {
      metal: 'Mercury (Hg)',
      scientific: 'Toxic heavy metal - Neurotoxin',
      threshold: '< 0.002 ppm (water)',
      severity: 'critical',
      health_impact: {
        positive: [],
        negative: ['Brain damage', 'Tremors', 'Vision/hearing loss', 'Developmental delays (children)']
      },
      sources: ['Industrial waste', 'Coal burning', 'Mining'],
      bioaccumulation: 'Very high - bioaccumulates in fish'
    },
    {
      metal: 'Cadmium (Cd)',
      scientific: 'Toxic heavy metal - Carcinogenic',
      threshold: '< 0.005 ppm (water)',
      severity: 'high',
      health_impact: {
        positive: [],
        negative: ['Kidney damage', 'Bone disease (itai-itai)', 'Lung cancer', 'Reproductive toxicity']
      },
      sources: ['Mining', 'Phosphate fertilizers', 'Industrial waste'],
      bioaccumulation: 'High - accumulates in kidneys, liver'
    }
  ],
  deficiencies: [
    {
      element: 'Nitrogen (N)',
      scientific: 'Macronutrient - Essential protein component',
      optimal_range: '20-200 ppm (water), 2-4% (tissue)',
      deficiency_symptoms: 'Chlorosis, stunted growth, pale leaves',
      human_health: {
        positive: ['Essential amino acid synthesis', 'Protein formation', 'DNA/RNA structure'],
        negative: ['Excess nitrates Ã¢â€ â€™ methemoglobinemia (blue baby syndrome)', 'Carcinogenic nitrosamine formation']
      },
      food_impact: 'Lower protein content, reduced nutritional value'
    },
    {
      element: 'Phosphorus (P)',
      scientific: 'Macronutrient - Energy transfer (ATP)',
      optimal_range: '5-50 ppm (water), 0.2-0.5% (tissue)',
      deficiency_symptoms: 'Purple discoloration, poor root development, delayed maturity',
      human_health: {
        positive: ['Bone/teeth formation', 'Energy metabolism', 'DNA/RNA synthesis'],
        negative: ['Excess in water Ã¢â€ â€™ eutrophication', 'Algal blooms']
      },
      food_impact: 'Reduced yield, poor fruit development'
    },
    {
      element: 'Potassium (K)',
      scientific: 'Macronutrient - Osmoregulation',
      optimal_range: '20-100 ppm (water), 2-5% (tissue)',
      deficiency_symptoms: 'Leaf edge burn, weak stems, poor disease resistance',
      human_health: {
        positive: ['Nerve function', 'Muscle contraction', 'Heart rhythm', 'Blood pressure regulation'],
        negative: ['Deficiency Ã¢â€ â€™ muscle weakness, cardiac arrhythmia']
      },
      food_impact: 'Essential electrolyte in human diet'
    },
    {
      element: 'Iron (Fe)',
      scientific: 'Micronutrient - Chlorophyll synthesis',
      optimal_range: '0.2-5 ppm (water), 50-300 ppm (tissue)',
      deficiency_symptoms: 'Interveinal chlorosis, yellowing young leaves',
      human_health: {
        positive: ['Hemoglobin formation', 'Oxygen transport', 'Energy production', 'Immune function'],
        negative: ['Excess Ã¢â€ â€™ liver damage (hemochromatosis)', 'Oxidative stress']
      },
      food_impact: 'Anemia prevention, essential for human nutrition'
    },
    {
      element: 'Zinc (Zn)',
      scientific: 'Micronutrient - Enzyme cofactor',
      optimal_range: '0.05-2 ppm (water), 20-100 ppm (tissue)',
      deficiency_symptoms: 'Stunted growth, small leaves, delayed maturity',
      human_health: {
        positive: ['Immune function', 'Wound healing', 'DNA synthesis', 'Taste/smell'],
        negative: ['Deficiency Ã¢â€ â€™ growth retardation, immune dysfunction']
      },
      food_impact: 'Critical micronutrient for human health'
    },
    {
      element: 'Calcium (Ca)',
      scientific: 'Macronutrient - Cell wall structure',
      optimal_range: '40-150 ppm (water), 0.5-3% (tissue)',
      deficiency_symptoms: 'Blossom end rot, tip burn, weak cell walls',
      human_health: {
        positive: ['Bone/teeth formation', 'Muscle contraction', 'Blood clotting', 'Nerve transmission'],
        negative: ['Deficiency Ã¢â€ â€™ osteoporosis, rickets']
      },
      food_impact: 'Essential mineral for skeletal health'
    }
  ]
};

// Water Technology Solutions
const WATER_TECHNOLOGIES = [
  { id: 1, name: 'UV Sterilization System', category: 'Filtration', target: ['E.Coli', 'Salmonella', 'Viruses'], price: '$2,500 - $15,000', vendor: 'AquaPure Technologies' },
  { id: 2, name: 'Reverse Osmosis Plant', category: 'Filtration', target: ['Heavy Metals', 'Salts', 'Dissolved Solids'], price: '$5,000 - $50,000', vendor: 'WaterMax Systems' },
  { id: 3, name: 'Activated Carbon Filtration', category: 'Filtration', target: ['Chlorine', 'Pesticides', 'Organic Compounds'], price: '$1,000 - $8,000', vendor: 'PureFlow Inc' },
  { id: 4, name: 'Ozone Generator', category: 'Disinfection', target: ['Bacteria', 'Viruses', 'Algae'], price: '$3,000 - $12,000', vendor: 'OzoneTech Pro' },
  { id: 5, name: 'Chlorination System', category: 'Disinfection', target: ['Bacteria', 'Viruses', 'Pathogens'], price: '$500 - $5,000', vendor: 'ChloroGuard' },
  { id: 6, name: 'Soil pH Adjustment System', category: 'Soil', target: ['pH Imbalance', 'Nutrient Availability'], price: '$800 - $5,000', vendor: 'SoilBalance Systems' },
  { id: 7, name: 'Compost Tea Brewer', category: 'Soil', target: ['Beneficial Microbes', 'Soil Health'], price: '$600 - $3,500', vendor: 'OrganicSoil Pro' },
  { id: 8, name: 'Drip Irrigation Controller', category: 'Irrigation', target: ['Water Efficiency', 'Nutrient Delivery'], price: '$1,500 - $10,000', vendor: 'SmartIrrigate' },
  { id: 9, name: 'Fertigation System', category: 'Irrigation', target: ['Precise Nutrient Application', 'Water Conservation'], price: '$2,000 - $15,000', vendor: 'FertiFlow' },
  { id: 10, name: 'IoT Sensor Network', category: 'Monitoring', target: ['pH', 'EC', 'Temperature', 'Moisture'], price: '$2,000 - $20,000', vendor: 'AgriSense IoT' },
  { id: 11, name: 'Heavy Metal Removal System', category: 'Filtration', target: ['Lead', 'Arsenic', 'Mercury', 'Cadmium'], price: '$10,000 - $80,000', vendor: 'MetalPure Systems' },
  { id: 12, name: 'Aerobic Treatment Unit', category: 'Treatment', target: ['Organic Waste', 'BOD Reduction'], price: '$5,000 - $25,000', vendor: 'AeroClean' },
  { id: 13, name: 'Sand Filtration System', category: 'Filtration', target: ['Suspended Solids', 'Turbidity'], price: '$3,000 - $18,000', vendor: 'SandFilter Pro' },
  { id: 14, name: 'UV-C LED Disinfection', category: 'Disinfection', target: ['Bacteria', 'Viruses', 'Energy Efficient'], price: '$1,800 - $12,000', vendor: 'LED-UV Tech' },
  { id: 15, name: 'Rainwater Harvesting System', category: 'Conservation', target: ['Water Conservation', 'Sustainability'], price: '$2,500 - $20,000', vendor: 'RainCatch Systems' },
  { id: 16, name: 'Desalination Unit', category: 'Filtration', target: ['Salinity Reduction', 'Brackish Water'], price: '$15,000 - $150,000', vendor: 'DeSal Tech' },
  { id: 17, name: 'Bioremediation System', category: 'Treatment', target: ['Organic Pollutants', 'Pesticide Degradation'], price: '$8,000 - $40,000', vendor: 'BioClean Solutions' },
  { id: 18, name: 'Electrocoagulation System', category: 'Treatment', target: ['Heavy Metals', 'Suspended Solids'], price: '$12,000 - $60,000', vendor: 'ElectroWater' },
  { id: 19, name: 'Mobile Lab Testing Unit', category: 'Monitoring', target: ['On-Site Analysis', 'Rapid Results'], price: '$10,000 - $50,000', vendor: 'LabMobile Pro' }
];

// IoT Sensors
const IOT_SENSORS = [
  { id: 1, name: 'pH Sensor', range: '0-14 pH', accuracy: 'Ã‚Â±0.1 pH', connectivity: 'WiFi/LoRa', price: '$150-$400', alerts: 'Real-time threshold alerts' },
  { id: 2, name: 'Dissolved Oxygen', range: '0-20 mg/L', accuracy: 'Ã‚Â±0.2 mg/L', connectivity: 'WiFi/LoRa', price: '$300-$800', alerts: 'Low oxygen warnings' },
  { id: 3, name: 'EC/TDS Meter', range: '0-10,000 Ã‚ÂµS/cm', accuracy: 'Ã‚Â±2%', connectivity: 'WiFi/LoRa', price: '$200-$500', alerts: 'Salinity alerts' },
  { id: 4, name: 'Nitrate Sensor', range: '0-100 ppm', accuracy: 'Ã‚Â±5%', connectivity: 'WiFi/LoRa', price: '$400-$1,200', alerts: 'Contamination alerts' },
  { id: 5, name: 'Soil Moisture', range: '0-100%', accuracy: 'Ã‚Â±3%', connectivity: 'WiFi/LoRa', price: '$100-$300', alerts: 'Irrigation triggers' },
  { id: 6, name: 'Temperature Probe', range: '-40 to 125Ã‚Â°C', accuracy: 'Ã‚Â±0.5Ã‚Â°C', connectivity: 'WiFi/LoRa', price: '$80-$200', alerts: 'Freeze/heat warnings' }
];

export default function TraceabilityModule() {
  const [activeTab, setActiveTab] = useState('upload');

  const tabs = [
    { id: 'upload', label: 'Lab Upload', icon: Upload },
    { id: 'marketplace', label: 'Technologies', icon: Droplet },
    { id: 'compliance', label: 'Compliance', icon: CheckCircle },
    { id: 'sensors', label: 'IoT Sensors', icon: Activity }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Water Technology & Traceability
        </h1>
        <p className="text-gray-300">Lab analysis, IoT monitoring, and compliance tracking</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                  : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Icon size={18} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-lg p-6">
        {activeTab === 'upload' && <LabUploadTab />}
        {activeTab === 'marketplace' && <MarketplaceTab />}
        {activeTab === 'compliance' && <ComplianceTab />}
        {activeTab === 'sensors' && <SensorsTab />}
      </div>
    </div>
  );
}

// ========================================
// TAB 1: LAB UPLOAD & ANALYSIS
// ========================================

function LabUploadTab() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setAnalyzing(true);

      // Simulate analysis
      setTimeout(() => {
        setResults({
          fileName: file.name,
          uploadDate: new Date().toLocaleDateString(),
          sampleType: 'Water Sample',
          detections: [
            { particle: 'E. coli', value: '0.5 CFU/100mL', status: 'critical', db: PARTICLE_DATABASE.bacteria[0] },
            { particle: 'Lead (Pb)', value: '0.018 ppm', status: 'warning', db: PARTICLE_DATABASE.heavy_metals[0] },
            { particle: 'Nitrogen (N)', value: '15 ppm', status: 'deficient', db: PARTICLE_DATABASE.deficiencies[0] }
          ]
        });
        setAnalyzing(false);
      }, 2000);
    }
  };

  const filteredDatabase = useMemo(() => {
    if (!searchTerm) return PARTICLE_DATABASE;
    
    const term = searchTerm.toLowerCase();
    return {
      bacteria: PARTICLE_DATABASE.bacteria.filter(b => 
        b.name.toLowerCase().includes(term) || 
        b.scientific.toLowerCase().includes(term)
      ),
      heavy_metals: PARTICLE_DATABASE.heavy_metals.filter(m => 
        m.metal.toLowerCase().includes(term) || 
        m.scientific.toLowerCase().includes(term)
      ),
      deficiencies: PARTICLE_DATABASE.deficiencies.filter(d => 
        d.element.toLowerCase().includes(term) || 
        d.scientific.toLowerCase().includes(term)
      )
    };
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Lab Report Upload & Analysis</h2>
      
      {/* File Upload */}
      <div className="border-2 border-dashed border-cyan-400/50 rounded-lg p-8 text-center hover:border-cyan-400 transition">
        <input
          type="file"
          accept=".pdf,.csv,.xlsx"
          onChange={handleFileUpload}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <Upload size={48} className="mx-auto mb-4 text-cyan-400" />
          <div className="text-lg font-semibold mb-2">Upload Lab Report</div>
          <div className="text-sm text-gray-400">PDF, CSV, or Excel Ã¢â‚¬Â¢ Water or Soil Tests</div>
        </label>
      </div>

      {/* Analysis Results */}
      {analyzing && (
        <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg p-6 text-center">
          <Activity className="animate-spin mx-auto mb-4" size={32} />
          <div className="font-bold">Analyzing sample data...</div>
        </div>
      )}

      {results && (
        <div className="bg-white/10 rounded-lg p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-bold text-xl">{results.fileName}</div>
              <div className="text-sm text-gray-400">{results.sampleType} Ã¢â‚¬Â¢ {results.uploadDate}</div>
            </div>
            <button className="px-4 py-2 bg-cyan-500 rounded-lg font-bold hover:bg-cyan-600">
              <Download size={16} className="inline mr-2" />
              Export Report
            </button>
          </div>

          <div className="space-y-3">
            {results.detections.map((detection, idx) => (
              <ParticleCard key={idx} detection={detection} />
            ))}
          </div>
        </div>
      )}

      {/* Scientific Database Search */}
      <div className="bg-white/10 rounded-lg p-6 space-y-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Database size={24} className="text-cyan-400" />
          Scientific Particle Database
        </h3>

        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search bacteria, heavy metals, nutrients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-lg focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Bacteria */}
        {filteredDatabase.bacteria.length > 0 && (
          <div>
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Microscope size={18} className="text-red-400" />
              Bacteria ({filteredDatabase.bacteria.length})
            </h4>
            <div className="space-y-2">
              {filteredDatabase.bacteria.map((bacteria, idx) => (
                <DatabaseCard key={idx} type="bacteria" data={bacteria} />
              ))}
            </div>
          </div>
        )}

        {/* Heavy Metals */}
        {filteredDatabase.heavy_metals.length > 0 && (
          <div>
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <AlertTriangle size={18} className="text-yellow-400" />
              Heavy Metals ({filteredDatabase.heavy_metals.length})
            </h4>
            <div className="space-y-2">
              {filteredDatabase.heavy_metals.map((metal, idx) => (
                <DatabaseCard key={idx} type="metal" data={metal} />
              ))}
            </div>
          </div>
        )}

        {/* Nutrient Deficiencies */}
        {filteredDatabase.deficiencies.length > 0 && (
          <div>
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <Leaf size={18} className="text-green-400" />
              Nutrients & Deficiencies ({filteredDatabase.deficiencies.length})
            </h4>
            <div className="space-y-2">
              {filteredDatabase.deficiencies.map((deficiency, idx) => (
                <DatabaseCard key={idx} type="deficiency" data={deficiency} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ParticleCard({ detection }) {
  const [expanded, setExpanded] = useState(false);
  const db = detection.db;

  return (
    <div className="bg-white/5 rounded-lg p-4 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${
            detection.status === 'critical' ? 'bg-red-500' : 
            detection.status === 'warning' ? 'bg-yellow-500' : 'bg-orange-500'
          }`} />
          <div>
            <div className="font-bold">{detection.particle}</div>
            <div className="text-sm text-gray-400">{db.scientific || db.metal || db.element}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="font-bold text-lg">{detection.value}</div>
          <div className="text-sm text-gray-400">Threshold: {db.threshold || db.optimal_range}</div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="text-cyan-400 text-sm font-semibold hover:underline"
      >
        {expanded ? 'Hide' : 'Show'} Details
      </button>

      {expanded && (
        <div className="mt-4 space-y-3 text-sm">
          {db.health_impact && (
            <div>
              <div className="font-semibold text-red-400 mb-1">Ã¢Å¡Â Ã¯Â¸Â Health Impacts:</div>
              <ul className="list-disc list-inside text-gray-300">
                {db.health_impact.negative?.map((impact, i) => (
                  <li key={i}>{impact}</li>
                ))}
              </ul>
            </div>
          )}

          {db.sources && (
            <div>
              <div className="font-semibold text-yellow-400 mb-1">Ã°Å¸â€œÂ Sources:</div>
              <div className="text-gray-300">{Array.isArray(db.sources) ? db.sources.join(', ') : db.sources}</div>
            </div>
          )}

          {db.treatment && (
            <div>
              <div className="font-semibold text-green-400 mb-1">Ã°Å¸â€™Å  Treatment:</div>
              <div className="text-gray-300">{db.treatment}</div>
            </div>
          )}

          {db.bioaccumulation && (
            <div>
              <div className="font-semibold text-purple-400 mb-1">Ã°Å¸Â§Â¬ Bioaccumulation:</div>
              <div className="text-gray-300">{db.bioaccumulation}</div>
            </div>
          )}

          {db.food_impact && (
            <div>
              <div className="font-semibold text-blue-400 mb-1">Ã°Å¸ÂÅ½ Food Impact:</div>
              <div className="text-gray-300">{db.food_impact}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DatabaseCard({ type, data }) {
  const [expanded, setExpanded] = useState(false);

  const getIcon = () => {
    if (type === 'bacteria') return <Microscope size={18} className="text-red-400" />;
    if (type === 'metal') return <AlertTriangle size={18} className="text-yellow-400" />;
    return <Leaf size={18} className="text-green-400" />;
  };

  const getName = () => {
    if (type === 'bacteria') return data.name;
    if (type === 'metal') return data.metal;
    return data.element;
  };

  return (
    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {getIcon()}
          <div>
            <div className="font-semibold">{getName()}</div>
            <div className="text-xs text-gray-400">{data.scientific}</div>
          </div>
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-cyan-400 text-xs hover:underline"
        >
          {expanded ? <X size={16} /> : <Eye size={16} />}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 space-y-2 text-xs">
          <div>
            <span className="text-gray-400">Threshold/Range:</span>
            <div className="font-semibold">{data.threshold || data.optimal_range}</div>
          </div>
          {data.health_impact && (
            <div>
              <span className="text-gray-400">Health Impact:</span>
              <ul className="list-disc list-inside text-gray-300 mt-1">
                {data.health_impact.positive?.map((p, i) => <li key={i} className="text-green-400">{p}</li>)}
                {data.health_impact.negative?.map((n, i) => <li key={i} className="text-red-400">{n}</li>)}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ========================================
// TAB 2: TECHNOLOGIES MARKETPLACE
// ========================================

function MarketplaceTab() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', 'Filtration', 'Disinfection', 'Soil', 'Irrigation', 'Monitoring', 'Treatment', 'Conservation'];

  const filtered = selectedCategory === 'all' 
    ? WATER_TECHNOLOGIES 
    : WATER_TECHNOLOGIES.filter(t => t.category === selectedCategory);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Water Technology Marketplace</h2>
      <p className="text-gray-300">19 technologies for water treatment, soil management, and IoT monitoring</p>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-cyan-500 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {cat === 'all' ? 'All Technologies' : cat}
          </button>
        ))}
      </div>

      {/* Technology Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(tech => (
          <div key={tech.id} className="bg-white/10 p-6 rounded-lg hover:bg-white/15 transition">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-bold text-lg">{tech.name}</div>
                <div className="text-sm text-cyan-400">{tech.category}</div>
              </div>
              <Droplet size={24} className="text-cyan-400" />
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Targets:</span>
                <div className="font-semibold">{tech.target.join(', ')}</div>
              </div>
              <div>
                <span className="text-gray-400">Price Range:</span>
                <div className="font-bold text-green-400">{tech.price}</div>
              </div>
              <div>
                <span className="text-gray-400">Vendor:</span>
                <div className="font-semibold">{tech.vendor}</div>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold hover:opacity-90">
              Request Quote
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
// TAB 3: COMPLIANCE DASHBOARD
// ========================================

function ComplianceTab() {
  const audits = [
    { name: 'EPA Safe Drinking Water Act', status: 'compliant', lastAudit: '2025-09-15' },
    { name: 'USDA Irrigation Water', status: 'compliant', lastAudit: '2025-08-20' },
    { name: 'FDA FSMA Produce Safety', status: 'pending', lastAudit: '2025-07-10' },
    { name: 'GlobalGAP Water & Soil', status: 'compliant', lastAudit: '2025-10-01' },
    { name: 'California SGMA Groundwater', status: 'non-compliant', lastAudit: '2025-06-05' },
    { name: 'Cross-Border Export', status: 'compliant', lastAudit: '2025-09-25' }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Compliance Dashboard</h2>
      <p className="text-gray-300">Track EPA, USDA, FDA, GlobalGAP, and SGMA compliance</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-500/20 border border-green-500/30 p-4 rounded-lg">
          <div className="text-sm text-gray-300">Compliant</div>
          <div className="text-3xl font-bold text-green-400">4</div>
        </div>
        <div className="bg-yellow-500/20 border border-yellow-500/30 p-4 rounded-lg">
          <div className="text-sm text-gray-300">Pending</div>
          <div className="text-3xl font-bold text-yellow-400">1</div>
        </div>
        <div className="bg-red-500/20 border border-red-500/30 p-4 rounded-lg">
          <div className="text-sm text-gray-300">Non-Compliant</div>
          <div className="text-3xl font-bold text-red-400">1</div>
        </div>
      </div>

      <div className="space-y-3">
        {audits.map((audit, idx) => (
          <div key={idx} className="bg-white/10 p-4 rounded-lg flex items-center justify-between">
            <div>
              <div className="font-bold">{audit.name}</div>
              <div className="text-sm text-gray-400">Last audit: {audit.lastAudit}</div>
            </div>
            <div>
              {audit.status === 'compliant' && (
                <span className="px-3 py-1 rounded bg-green-500/20 text-green-400 text-sm font-bold">Compliant</span>
              )}
              {audit.status === 'pending' && (
                <span className="px-3 py-1 rounded bg-yellow-500/20 text-yellow-400 text-sm font-bold">Pending</span>
              )}
              {audit.status === 'non-compliant' && (
                <span className="px-3 py-1 rounded bg-red-500/20 text-red-400 text-sm font-bold">Action Required</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================================
// TAB 4: IOT SENSORS
// ========================================

function SensorsTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">IoT Sensor Network</h2>
      <p className="text-gray-300">6 sensor types for real-time water and soil monitoring</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {IOT_SENSORS.map(sensor => (
          <div key={sensor.id} className="bg-white/10 p-6 rounded-lg">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="font-bold text-lg">{sensor.name}</div>
                <div className="text-sm text-gray-400">{sensor.connectivity}</div>
              </div>
              <Activity size={24} className="text-cyan-400" />
            </div>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Range:</span>
                <div className="font-semibold">{sensor.range}</div>
              </div>
              <div>
                <span className="text-gray-400">Accuracy:</span>
                <div className="font-semibold">{sensor.accuracy}</div>
              </div>
              <div>
                <span className="text-gray-400">Price:</span>
                <div className="font-bold text-green-400">{sensor.price}</div>
              </div>
              <div>
                <span className="text-gray-400">Alerts:</span>
                <div className="font-semibold text-cyan-400">{sensor.alerts}</div>
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-bold hover:opacity-90">
              Configure Sensor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}