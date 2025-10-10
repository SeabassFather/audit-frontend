const FactoringFile = require('../models/FactoringFile');
const factoringService = require('../services/factoringService');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../config/logger');

// Create factoring file
exports.createFile = async (req, res, next) => {
  try {
    const file = await FactoringFile.create({
      ...req.body,
      assignedTo: req.user._id
    });

    // Calculate risk score
    file.calculateRiskScore();
    await file.save();

    res.status(201).json({
      status: 'success',
      data: file
    });
  } catch (error) {
    logger.error('Error creating factoring file:', error);
    next(error);
  }
};

// Get file
exports.getFile = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber })
      .populate('assignedTo', 'name email')
      .populate('verification.verifiedBy', 'name email');

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: file
    });
  } catch (error) {
    next(error);
  }
};

// Verify debtor
exports.verifyDebtor = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    file.verification.debtorContactVerified = true;
    file.verification.verifiedBy = req.user._id;
    file.verification.verifiedDate = new Date();
    
    file.timeline.push({
      event: 'Debtor contact verified',
      user: req.user._id,
      notes: req.body.notes
    });

    await file.save();

    res.status(200).json({
      status: 'success',
      data: file
    });
  } catch (error) {
    next(error);
  }
};

// Calculate advance
exports.calculateAdvance = async (req, res, next) => {
  try {
    const { invoiceAmount, advanceRate, feeRate } = req.body;

    const calculation = factoringService.calculateAdvance({
      invoiceAmount,
      advanceRate,
      feeRate
    });

    res.status(200).json({
      status: 'success',
      data: calculation
    });
  } catch (error) {
    next(error);
  }
};

// Approve advance
exports.approveAdvance = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    file.status = 'approved';
    file.advance.approvedAmount = req.body.approvedAmount || file.advance.requestedAmount;
    
    file.timeline.push({
      event: 'Advance approved',
      user: req.user._id,
      notes: req.body.notes
    });

    await file.save();

    res.status(200).json({
      status: 'success',
      data: file
    });
  } catch (error) {
    next(error);
  }
};

// Fund advance
exports.fundAdvance = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    if (file.status !== 'approved') {
      return next(new AppError('File must be approved before funding', 400));
    }

    file.status = 'funded';
    file.advance.disbursementDate = new Date();
    file.advance.disbursementMethod = req.body.disbursementMethod;
    
    file.timeline.push({
      event: 'Advance funded',
      user: req.user._id,
      notes: req.body.notes
    });

    await file.save();

    res.status(200).json({
      status: 'success',
      data: file
    });
  } catch (error) {
    next(error);
  }
};

// Record repayment
exports.recordRepayment = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    file.repayment.actualDate = new Date();
    file.repayment.amount = req.body.amount;
    file.repayment.method = req.body.method;
    file.repayment.status = req.body.amount >= file.invoice.amount ? 'paid' : 'partial';
    file.status = file.repayment.status === 'paid' ? 'repaid' : 'funded';
    
    file.timeline.push({
      event: `Repayment recorded: ${req.body.amount}`,
      user: req.user._id,
      notes: req.body.notes
    });

    await file.save();

    res.status(200).json({
      status: 'success',
      data: file
    });
  } catch (error) {
    next(error);
  }
};

// Get overdue files
exports.getOverdueFiles = async (req, res, next) => {
  try {
    const today = new Date();
    
    const overdue = await FactoringFile.find({
      'repayment.expectedDate': { $lt: today },
      'repayment.status': { $in: ['pending', 'partial'] }
    })
      .sort({ 'repayment.expectedDate': 1 })
      .populate('assignedTo', 'name email');

    res.status(200).json({
      status: 'success',
      results: overdue.length,
      data: overdue
    });
  } catch (error) {
    next(error);
  }
};

// Get clients
exports.getClients = async (req, res, next) => {
  try {
    const clients = await FactoringFile.aggregate([
      {
        $group: {
          _id: '$client.name',
          totalFiles: { $sum: 1 },
          totalAdvanced: { $sum: '$advance.approvedAmount' },
          businessName: { $first: '$client.businessName' },
          email: { $first: '$client.email' }
        }
      },
      {
        $sort: { totalAdvanced: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      results: clients.length,
      data: clients
    });
  } catch (error) {
    next(error);
  }
};

// Get client history
exports.getClientHistory = async (req, res, next) => {
  try {
    const { clientName } = req.params;

    const history = await FactoringFile.find({ 'client.name': clientName })
      .sort({ createdAt: -1 })
      .select('fileNumber invoice.amount advance repayment status createdAt');

    res.status(200).json({
      status: 'success',
      results: history.length,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

// Get client credit limit
exports.getClientCreditLimit = async (req, res, next) => {
  try {
    const { clientName } = req.params;

    const analysis = await factoringService.calculateClientCreditLimit(clientName);

    res.status(200).json({
      status: 'success',
      data: analysis
    });
  } catch (error) {
    next(error);
  }
};

// Get debtor history
exports.getDebtorHistory = async (req, res, next) => {
  try {
    const { debtorName } = req.params;

    const history = await FactoringFile.find({ 'debtor.name': debtorName })
      .sort({ createdAt: -1 })
      .select('fileNumber invoice repayment client.name status');

    res.status(200).json({
      status: 'success',
      results: history.length,
      data: history
    });
  } catch (error) {
    next(error);
  }
};

// Get debtor risk
exports.getDebtorRisk = async (req, res, next) => {
  try {
    const { debtorName } = req.params;

    const riskAnalysis = await factoringService.analyzeDebtorRisk(debtorName);

    res.status(200).json({
      status: 'success',
      data: riskAnalysis
    });
  } catch (error) {
    next(error);
  }
};

// Get portfolio report
exports.getPortfolioReport = async (req, res, next) => {
  try {
    const report = await FactoringFile.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$invoice.amount' },
          totalAdvanced: { $sum: '$advance.approvedAmount' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: report
    });
  } catch (error) {
    next(error);
  }
};

// Get aging report
exports.getAgingReport = async (req, res, next) => {
  try {
    const files = await FactoringFile.find({
      status: { $in: ['funded', 'approved'] }
    }).select('fileNumber client.name invoice repayment');

    const aging = files.map(file => {
      const age = Math.floor((Date.now() - new Date(file.invoice.invoiceDate)) / (1000 * 60 * 60 * 24));
      return {
        fileNumber: file.fileNumber,
        client: file.client.name,
        invoiceAmount: file.invoice.amount,
        age,
        bucket: age <= 30 ? '0-30' : age <= 60 ? '31-60' : age <= 90 ? '61-90' : '90+'
      };
    });

    const summary = aging.reduce((acc, item) => {
      acc[item.bucket] = (acc[item.bucket] || 0) + item.invoiceAmount;
      return acc;
    }, {});

    res.status(200).json({
      status: 'success',
      summary,
      details: aging
    });
  } catch (error) {
    next(error);
  }
};

// Get concentration report
exports.getConcentrationReport = async (req, res, next) => {
  try {
    const clientConcentration = await FactoringFile.aggregate([
      {
        $match: { status: { $in: ['funded', 'approved'] } }
      },
      {
        $group: {
          _id: '$client.name',
          totalOutstanding: { $sum: '$advance.approvedAmount' },
          fileCount: { $sum: 1 }
        }
      },
      {
        $sort: { totalOutstanding: -1 }
      }
    ]);

    const debtorConcentration = await FactoringFile.aggregate([
      {
        $match: { status: { $in: ['funded', 'approved'] } }
      },
      {
        $group: {
          _id: '$debtor.name',
          totalOutstanding: { $sum: '$invoice.amount' },
          fileCount: { $sum: 1 }
        }
      },
      {
        $sort: { totalOutstanding: -1 }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: {
        byClient: clientConcentration,
        byDebtor: debtorConcentration
      }
    });
  } catch (error) {
    next(error);
  }
};

// Update status
exports.updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    file.status = status;
    file.timeline.push({
      event: `Status changed to ${status}`,
      user: req.user._id,
      notes: req.body.notes
    });

    await file.save();

    res.status(200).json({
      status: 'success',
      data: file
    });
  } catch (error) {
    next(error);
  }
};: file
    });
  } catch (error) {
    next(error);
  }
};

// Get all files
exports.getAllFiles = async (req, res, next) => {
  try {
    const { status, client, debtor, limit = 50, page = 1 } = req.query;

    const query = {};
    if (status) query.status = status;
    if (client) query['client.name'] = new RegExp(client, 'i');
    if (debtor) query['debtor.name'] = new RegExp(debtor, 'i');

    const files = await FactoringFile.find(query)
      .limit(parseInt(limit))
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })
      .populate('assignedTo', 'name email');

    const total = await FactoringFile.countDocuments(query);

    res.status(200).json({
      status: 'success',
      results: files.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: files
    });
  } catch (error) {
    next(error);
  }
};

// Update file
exports.updateFile = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOneAndUpdate(
      { fileNumber: req.params.fileNumber },
      req.body,
      { new: true, runValidators: true }
    );

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: file
    });
  } catch (error) {
    next(error);
  }
};

// Delete file
exports.deleteFile = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOneAndDelete({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Parse invoice
exports.parseInvoice = async (req, res, next) => {
  try {
    const { invoiceData } = req.body;

    const parsed = await factoringService.parseInvoice(invoiceData);

    res.status(200).json({
      status: 'success',
      data: parsed
    });
  } catch (error) {
    next(error);
  }
};

// Calculate risk
exports.calculateRisk = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    const risk = file.riskAssessment;

    res.status(200).json({
      status: 'success',
      data: risk
    });
  } catch (error) {
    next(error);
  }
};

// Recalculate risk
exports.recalculateRisk = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    const risk = file.calculateRiskScore();
    await file.save();

    res.status(200).json({
      status: 'success',
      data: risk
    });
  } catch (error) {
    next(error);
  }
};

// Verify invoice
exports.verifyInvoice = async (req, res, next) => {
  try {
    const file = await FactoringFile.findOne({ fileNumber: req.params.fileNumber });

    if (!file) {
      return next(new AppError('Factoring file not found', 404));
    }

    file.verification.invoiceVerified = true;
    file.verification.verifiedBy = req.user._id;
    file.verification.verifiedDate = new Date();
    
    file.timeline.push({
      event: 'Invoice verified',
      user: req.user._id,
      notes: req.body.notes
    });

    await file.save();

    res.status(200).json({
      status: 'success',
      data