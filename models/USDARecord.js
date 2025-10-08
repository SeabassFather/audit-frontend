const mongoose = require('mongoose');

const USDARecordSchema = new mongoose.Schema({
  commodity: {
    type: String,
    required: [true, 'Commodity name is required'],
    trim: true,
    index: true
  },
  variety: {
    type: String,
    trim: true
  },
  grade: {
    type: String,
    trim: true
  },
  origin: {
    type: String,
    trim: true
  },
  marketType: {
    type: String,
    enum: ['terminal', 'shipping_point', 'retail', 'wholesale'],
    default: 'terminal'
  },
  priceData: {
    low: {
      type: Number,
      required: true
    },
    high: {
      type: Number,
      required: true
    },
    mostlyLow: Number,
    mostlyHigh: Number,
    average: {
      type: Number,
      required: true
    }
  },
  unit: {
    type: String,
    default: 'cwt',
    enum: ['cwt', 'lb', 'kg', 'bushel', 'ton', 'each']
  },
  reportDate: {
    type: Date,
    required: true,
    index: true
  },
  dataSource: {
    type: String,
    enum: ['AMS', 'MMN', 'NASS', 'manual'],
    required: true
  },
  sourceReportId: String,
  location: {
    city: String,
    state: String,
    region: String,
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
  volume: {
    quantity: Number,
    unit: String
  },
  quality: {
    organic: {
      type: Boolean,
      default: false
    },
    certifications: [String]
  },
  trends: {
    weekOverWeek: Number,
    monthOverMonth: Number,
    yearOverYear: Number
  },
  metadata: {
    fetchedAt: {
      type: Date,
      default: Date.now
    },
    lastUpdated: Date,
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 100
    },
    notes: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for fast queries
USDARecordSchema.index({ commodity: 1, reportDate: -1 });
USDARecordSchema.index({ 'location.state': 1, reportDate: -1 });
USDARecordSchema.index({ dataSource: 1, reportDate: -1 });
USDARecordSchema.index({ 'location.coordinates': '2dsphere' });

// Virtual for price range
USDARecordSchema.virtual('priceRange').get(function() {
  return this.priceData.high - this.priceData.low;
});

// Static method to get latest price for commodity
USDARecordSchema.statics.getLatestPrice = async function(commodity, state = null) {
  const query = { commodity };
  if (state) query['location.state'] = state;
  
  return this.findOne(query)
    .sort({ reportDate: -1 })
    .limit(1);
};

// Static method to get price trends
USDARecordSchema.statics.getPriceTrends = async function(commodity, days = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  return this.find({
    commodity,
    reportDate: { $gte: startDate }
  })
    .sort({ reportDate: 1 })
    .select('reportDate priceData commodity');
};

// Pre-save middleware to calculate average
USDARecordSchema.pre('save', function(next) {
  if (this.priceData.low && this.priceData.high) {
    this.priceData.average = (this.priceData.low + this.priceData.high) / 2;
  }
  next();
});

module.exports = mongoose.model('USDARecord', USDARecordSchema);