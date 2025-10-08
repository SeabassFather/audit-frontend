const mongoose = require('mongoose');

const FactoringFileSchema = new mongoose.Schema({
  fileNumber: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  client: {
    name: {
      type: String,
      required: true
    },
    businessName: String,
    taxId: String,
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zip: String
    },
    industryType: {
      type: String,
      enum: ['produce', 'trucking', 'manufacturing', 'wholesale', 'distribution', 'other']
    }
  },
  debtor: {
    name: {
      type: String,
      required: true
    },
    creditRating: String,
    paymentHistory: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'unknown']
    },
    averagePaymentDays: Number,
    outstandingBalance: Number
  },
  invoice: {
    invoiceNumber: {
      type: String,
      required: true
    },
    invoiceDate: {
      type: Date,
      required: true
    },
    dueDate: Date,
    amount: {
      type: Number,
      required: true
    },
    description: String,
    commodities: [{
      name: String,
      quantity: Number,
      unit: String,
      pricePerUnit: Number,
      total: Number
    }],
    terms: String
  },
  advance: {
    requestedAmount: Number,
    approvedAmount: Number,
    advanceRate: {
      type: Number,
      default: 80, // percentage
      min: 50,
      max: 95
    },
    fee: {
      rate: Number, // percentage
      amount: Number
    },
    netAdvance: Number,
    disbursementDate: Date,
    disbursementMethod: {
      type: String,
      enum: ['wire', 'ach', 'check']
    }
  },
  repayment: {
    expectedDate: Date,
    actualDate: Date,
    amount: Number,
    method: String,
    status: {
      type: String,
      enum: ['pending', 'partial', 'paid', 'defaulted'],
      default: 'pending'
    },
    daysOutstanding: Number
  },
  riskAssessment: {
    score: {
      type: Number,
      min: 0,
      max: 100
    },
    level: {
      type: String,
      enum: ['minimal', 'low', 'moderate', 'high', 'severe']
    },
    factors: [{
      factor: String,
      impact: {
        type: String,
        enum: ['positive', 'neutral', 'negative']
      },
      weight: Number,
      description: String
    }],
    redFlags: [{
      type: String,
      severity: {
        type: String,
        enum: ['low', 'medium', 'high']
      },
      description: String
    }],
    approvalRecommendation: {
      type: String,
      enum: ['approve', 'approve_with_conditions', 'review_required', 'decline']
    }
  },
  verification: {
    invoiceVerified: Boolean,
    debtorContactVerified: Boolean,
    commodityDeliveryVerified: Boolean,
    noCrossSelling: Boolean,
    noDisputes: Boolean,
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verifiedDate: Date,
    notes: String
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'approved', 'funded', 'repaid', 'declined', 'defaulted'],
    default: 'submitted'
  },
  documents: [{
    type: {
      type: String,
      enum: ['invoice', 'delivery_receipt', 'purchase_order', 'aging_report', 'bank_statement', 'other']
    },
    filename: String,
    url: String,
    uploadDate: Date,
    verified: Boolean
  }],
  timeline: [{
    event: String,
    date: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    notes: String
  }],
  financials: {
    totalFacilityLimit: Number,
    currentOutstanding: Number,
    availableCredit: Number,
    utilizationRate: Number
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Indexes
FactoringFileSchema.index({ fileNumber: 1 });
FactoringFileSchema.index({ 'client.name': 1 });
FactoringFileSchema.index({ 'invoice.invoiceNumber': 1 });
FactoringFileSchema.index({ status: 1 });
FactoringFileSchema.index({ 'repayment.expectedDate': 1 });

// Calculate net advance
FactoringFileSchema.pre('save', function(next) {
  if (this.advance.approvedAmount && this.advance.fee.rate) {
    this.advance.fee.amount = (this.advance.approvedAmount * this.advance.fee.rate) / 100;
    this.advance.netAdvance = this.advance.approvedAmount - this.advance.fee.amount;
  }
  
  // Calculate advance amount if not set
  if (!this.advance.approvedAmount && this.invoice.amount && this.advance.advanceRate) {
    this.advance.approvedAmount = (this.invoice.amount * this.advance.advanceRate) / 100;
  }

  // Calculate days outstanding
  if (this.repayment.expectedDate && !this.repayment.actualDate) {
    const today = new Date();
    const expected = new Date(this.repayment.expectedDate);
    this.repayment.daysOutstanding = Math.floor((today - expected) / (1000 * 60 * 60 * 24));
  }

  next();
});

// Risk scoring algorithm
FactoringFileSchema.methods.calculateRiskScore = function() {
  let score = 100; // Start at 100 (lowest risk)
  const factors = [];

  // Debtor payment history
  if (this.debtor.paymentHistory) {
    switch (this.debtor.paymentHistory) {
      case 'excellent':
        factors.push({ factor: 'Payment History', impact: 'positive', weight: 15 });
        break;
      case 'good':
        score -= 5;
        factors.push({ factor: 'Payment History', impact: 'neutral', weight: 5 });
        break;
      case 'fair':
        score -= 15;
        factors.push({ factor: 'Payment History', impact: 'negative', weight: 15 });
        break;
      case 'poor':
        score -= 30;
        factors.push({ factor: 'Payment History', impact: 'negative', weight: 30 });
        break;
      default:
        score -= 10;
        factors.push({ factor: 'Payment History Unknown', impact: 'negative', weight: 10 });
    }
  }

  // Average payment days
  if (this.debtor.averagePaymentDays) {
    if (this.debtor.averagePaymentDays <= 30) {
      factors.push({ factor: 'Payment Speed', impact: 'positive', weight: 10 });
    } else if (this.debtor.averagePaymentDays <= 60) {
      score -= 5;
      factors.push({ factor: 'Payment Speed', impact: 'neutral', weight: 5 });
    } else {
      score -= 15;
      factors.push({ factor: 'Slow Payment', impact: 'negative', weight: 15 });
    }
  }

  // Invoice age
  const invoiceAge = Math.floor((Date.now() - new Date(this.invoice.invoiceDate)) / (1000 * 60 * 60 * 24));
  if (invoiceAge > 90) {
    score -= 25;
    factors.push({ factor: 'Old Invoice', impact: 'negative', weight: 25, description: `Invoice is ${invoiceAge} days old` });
  } else if (invoiceAge > 60) {
    score -= 15;
    factors.push({ factor: 'Aging Invoice', impact: 'negative', weight: 15 });
  }

  // Verification status
  if (!this.verification.invoiceVerified) {
    score -= 20;
    factors.push({ factor: 'Unverified Invoice', impact: 'negative', weight: 20 });
  }
  if (!this.verification.debtorContactVerified) {
    score -= 15;
    factors.push({ factor: 'Unverified Debtor', impact: 'negative', weight: 15 });
  }

  // Cross-selling check
  if (this.verification.noCrossSelling === false) {
    score -= 10;
    this.riskAssessment.redFlags.push({
      type: 'Cross-selling detected',
      severity: 'medium',
      description: 'Potential duplicate financing risk'
    });
  }

  // Disputes
  if (this.verification.noDisputes === false) {
    score -= 15;
    this.riskAssessment.redFlags.push({
      type: 'Invoice dispute',
      severity: 'high',
      description: 'Debtor has raised dispute on this invoice'
    });
  }

  // Determine risk level
  this.riskAssessment.score = Math.max(0, score);
  this.riskAssessment.factors = factors;

  if (score >= 80) {
    this.riskAssessment.level = 'minimal';
    this.riskAssessment.approvalRecommendation = 'approve';
  } else if (score >= 60) {
    this.riskAssessment.level = 'low';
    this.riskAssessment.approvalRecommendation = 'approve';
  } else if (score >= 40) {
    this.riskAssessment.level = 'moderate';
    this.riskAssessment.approvalRecommendation = 'approve_with_conditions';
  } else if (score >= 20) {
    this.riskAssessment.level = 'high';
    this.riskAssessment.approvalRecommendation = 'review_required';
  } else {
    this.riskAssessment.level = 'severe';
    this.riskAssessment.approvalRecommendation = 'decline';
  }

  return this.riskAssessment;
};

module.exports = mongoose.model('FactoringFile', FactoringFileSchema);