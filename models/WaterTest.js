const mongoose = require('mongoose');

const WaterTestSchema = new mongoose.Schema({
  propertyId: {
    type: String,
    required: true,
    index: true
  },
  testDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  testType: {
    type: String,
    enum: ['well', 'municipal', 'irrigation', 'drinking', 'wastewater'],
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zip: String,
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    }
  },
  chemistry: {
    pH: {
      value: Number,
      unit: 'pH',
      safe: Boolean
    },
    tds: {
      value: Number,
      unit: 'ppm',
      safe: Boolean
    },
    hardness: {
      value: Number,
      unit: 'mg/L',
      classification: {
        type: String,
        enum: ['soft', 'moderate', 'hard', 'very_hard']
      }
    },
    alkalinity: {
      value: Number,
      unit: 'mg/L'
    },
    chlorine: {
      free: Number,
      total: Number,
      combined: Number,
      unit: 'ppm'
    },
    turbidity: {
      value: Number,
      unit: 'NTU'
    },
    conductivity: {
      value: Number,
      unit: 'μS/cm'
    }
  },
  minerals: {
    calcium: { value: Number, unit: 'mg/L' },
    magnesium: { value: Number, unit: 'mg/L' },
    sodium: { value: Number, unit: 'mg/L' },
    potassium: { value: Number, unit: 'mg/L' },
    iron: { value: Number, unit: 'mg/L', safe: Boolean },
    manganese: { value: Number, unit: 'mg/L', safe: Boolean },
    sulfate: { value: Number, unit: 'mg/L' },
    chloride: { value: Number, unit: 'mg/L' },
    fluoride: { value: Number, unit: 'mg/L' },
    nitrate: { value: Number, unit: 'mg/L', safe: Boolean },
    nitrite: { value: Number, unit: 'mg/L', safe: Boolean }
  },
  contaminants: {
    lead: { value: Number, unit: 'ppb', safe: Boolean },
    arsenic: { value: Number, unit: 'ppb', safe: Boolean },
    copper: { value: Number, unit: 'mg/L', safe: Boolean },
    mercury: { value: Number, unit: 'ppb', safe: Boolean },
    bacteria: {
      totalColiform: { present: Boolean },
      eCoil: { present: Boolean }
    }
  },
  analysis: {
    scaleFormation: {
      risk: {
        type: String,
        enum: ['low', 'moderate', 'high', 'severe']
      },
      lsi: Number, // Langelier Saturation Index
      rsi: Number  // Ryznar Stability Index
    },
    corrosion: {
      risk: {
        type: String,
        enum: ['low', 'moderate', 'high', 'severe']
      }
    },
    overallQuality: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'unacceptable'],
      required: true
    },
    potable: {
      type: Boolean,
      required: true
    },
    recommendations: [String]
  },
  laboratory: {
    name: String,
    certificationNumber: String,
    analyst: String
  },
  attachments: [{
    filename: String,
    url: String,
    uploadDate: Date
  }],
  auditTrail: {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewDate: Date,
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'approved', 'flagged'],
      default: 'pending'
    }
  }
}, {
  timestamps: true
});

// Indexes
WaterTestSchema.index({ propertyId: 1, testDate: -1 });
WaterTestSchema.index({ 'location.coordinates': '2dsphere' });
WaterTestSchema.index({ 'analysis.overallQuality': 1 });

// Calculate hardness classification
WaterTestSchema.pre('save', function(next) {
  if (this.chemistry.hardness && this.chemistry.hardness.value) {
    const hardness = this.chemistry.hardness.value;
    if (hardness < 60) {
      this.chemistry.hardness.classification = 'soft';
    } else if (hardness < 120) {
      this.chemistry.hardness.classification = 'moderate';
    } else if (hardness < 180) {
      this.chemistry.hardness.classification = 'hard';
    } else {
      this.chemistry.hardness.classification = 'very_hard';
    }
  }
  next();
});

// Calculate scale formation risk (Langelier Saturation Index)
WaterTestSchema.methods.calculateLSI = function() {
  const pH = this.chemistry.pH?.value;
  const temp = 25; // Assume 25°C if not provided
  const tds = this.chemistry.tds?.value;
  const calcium = this.minerals.calcium?.value;
  const alkalinity = this.chemistry.alkalinity?.value;

  if (!pH || !tds || !calcium || !alkalinity) return null;

  // Simplified LSI calculation
  const pHs = (9.3 + 0.34) + Math.log10(tds) - 13.12 * Math.log10(temp + 273) + 34.55;
  const lsi = pH - pHs;

  this.analysis.scaleFormation.lsi = lsi;

  if (lsi < -2) {
    this.analysis.scaleFormation.risk = 'severe';
  } else if (lsi < -0.5) {
    this.analysis.scaleFormation.risk = 'moderate';
  } else if (lsi < 0.5) {
    this.analysis.scaleFormation.risk = 'low';
  } else {
    this.analysis.scaleFormation.risk = 'high';
  }

  return lsi;
};

// Check if water is potable
WaterTestSchema.methods.checkPotability = function() {
  let isPotable = true;
  const recommendations = [];

  // Check bacteria
  if (this.contaminants.bacteria?.totalColiform?.present) {
    isPotable = false;
    recommendations.push('Total coliform bacteria detected. Water requires disinfection.');
  }
  if (this.contaminants.bacteria?.eCoil?.present) {
    isPotable = false;
    recommendations.push('E. coli detected. Water is unsafe for drinking.');
  }

  // Check lead
  if (this.contaminants.lead && this.contaminants.lead.value > 15) {
    isPotable = false;
    recommendations.push('Lead levels exceed EPA limit. Use certified filter or alternative source.');
  }

  // Check nitrate
  if (this.minerals.nitrate && this.minerals.nitrate.value > 10) {
    isPotable = false;
    recommendations.push('Nitrate exceeds safe limit. Not safe for infants.');
  }

  // Check arsenic
  if (this.contaminants.arsenic && this.contaminants.arsenic.value > 10) {
    isPotable = false;
    recommendations.push('Arsenic exceeds safe limit. Treatment required.');
  }

  this.analysis.potable = isPotable;
  this.analysis.recommendations = recommendations;

  return isPotable;
};

module.exports = mongoose.model('WaterTest', WaterTestSchema);