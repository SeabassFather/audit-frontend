const WaterTest = require('../models/WaterTest');
const waterService = require('../services/waterService');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../config/logger');

// Calculate TDS
exports.calculateTDS = async (req, res, next) => {
  try {
    const { conductivity, temperature } = req.body;
    const tds = waterService.calculateTDS(conductivity, temperature);
    
    res.status(200).json({
      status: 'success',
      data: {
        tds,
        unit: 'ppm',
        classification: waterService.classifyTDS(tds)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Calculate hardness
exports.calculateHardness = async (req, res, next) => {
  try {
    const { calcium, magnesium } = req.body;
    const hardness = waterService.calculateHardness(calcium, magnesium);
    
    res.status(200).json({
      status: 'success',
      data: {
        hardness,
        unit: 'mg/L',
        classification: waterService.classifyHardness(hardness)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Calculate LSI (Langelier Saturation Index)
exports.calculateLSI = async (req, res, next) => {
  try {
    const { pH, temperature, tds, calcium, alkalinity } = req.body;
    const lsi = waterService.calculateLSI(pH, temperature, tds, calcium, alkalinity);
    
    res.status(200).json({
      status: 'success',
      data: {
        lsi,
        scaleRisk: waterService.interpretLSI(lsi),
        recommendation: waterService.getLSIRecommendation(lsi)
      }
    });
  } catch (error) {
    next(error);
  }
};

// Calculate chlorine
exports.calculateChlorine = async (req, res, next) => {
  try {
    const { freeChlorine, totalChlorine } = req.body;
    const combined = totalChlorine - freeChlorine;
    
    res.status(200).json({
      status: 'success',
      data: {
        freeChlorine,
        totalChlorine,
        combinedChlorine: combined,
        safe: freeChlorine >= 0.2 && freeChlorine <= 4.0
      }
    });
  } catch (error) {
    next(error);
  }
};

// Create water test
exports.createWaterTest = async (req, res, next) => {
  try {
    const testData = {
      ...req.body,
      'auditTrail.createdBy': req.user._id
    };

    const waterTest = await WaterTest.create(testData);
    
    // Calculate LSI if data available
    if (waterTest.chemistry.pH && waterTest.chemistry.tds && 
        waterTest.minerals.calcium && waterTest.chemistry.alkalinity) {
      waterTest.calculateLSI();
    }
    
    // Check potability
    waterTest.checkPotability();
    await waterTest.save();

    res.status(201).json({
      status: 'success',
      data: waterTest
    });
  } catch (error) {
    logger.error('Error creating water test:', error);
    next(error);
  }
};

// Get water test by ID
exports.getWaterTest = async (req, res, next) => {
  try {
    const waterTest = await WaterTest.findById(req.params.id)
      .populate('auditTrail.createdBy', 'name email')
      .populate('auditTrail.reviewedBy', 'name email');

    if (!waterTest) {
      return next(new AppError('Water test not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: waterTest
    });
  } catch (error) {
    next(error);
  }
};

// Get tests by property
exports.getTestsByProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    const { limit = 50, sort = '-testDate' } = req.query;

    const tests = await WaterTest.find({ propertyId })
      .sort(sort)
      .limit(parseInt(limit))
      .populate('auditTrail.createdBy', 'name email');

    res.status(200).json({
      status: 'success',
      results: tests.length,
      data: tests
    });
  } catch (error) {
    next(error);
  }
};

// Update water test
exports.updateWaterTest = async (req, res, next) => {
  try {
    const waterTest = await WaterTest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!waterTest) {
      return next(new AppError('Water test not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: waterTest
    });
  } catch (error) {
    next(error);
  }
};

// Delete water test
exports.deleteWaterTest = async (req, res, next) => {
  try {
    const waterTest = await WaterTest.findByIdAndDelete(req.params.id);

    if (!waterTest) {
      return next(new AppError('Water test not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Analyze water quality
exports.analyzeWaterQuality = async (req, res, next) => {
  try {
    const analysis = waterService.comprehensiveAnalysis(req.body);

    res.status(200).json({
      status: 'success',
      data: analysis
    });
  } catch (error) {
    next(error);
  }
};

// Check potability
exports.checkPotability = async (req, res, next) => {
  try {
    const waterTest = await WaterTest.findById(req.params.id);

    if (!waterTest) {
      return next(new AppError('Water test not found', 404));
    }

    const isPotable = waterTest.checkPotability();
    await waterTest.save();

    res.status(200).json({
      status: 'success',
      data: {
        potable: isPotable,
        recommendations: waterTest.analysis.recommendations
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get recommendations
exports.getRecommendations = async (req, res, next) => {
  try {
    const waterTest = await WaterTest.findById(req.params.id);

    if (!waterTest) {
      return next(new AppError('Water test not found', 404));
    }

    const recommendations = waterService.generateRecommendations(waterTest);

    res.status(200).json({
      status: 'success',
      data: recommendations
    });
  } catch (error) {
    next(error);
  }
};

// Batch upload tests
exports.batchUploadTests = async (req, res, next) => {
  try {
    const { tests } = req.body;

    if (!Array.isArray(tests)) {
      return next(new AppError('Tests must be an array', 400));
    }

    const createdTests = await WaterTest.insertMany(
      tests.map(test => ({
        ...test,
        'auditTrail.createdBy': req.user._id
      }))
    );

    res.status(201).json({
      status: 'success',
      results: createdTests.length,
      data: createdTests
    });
  } catch (error) {
    next(error);
  }
};

// Get test summary
exports.getTestSummary = async (req, res, next) => {
  try {
    const summary = await WaterTest.aggregate([
      {
        $group: {
          _id: '$analysis.overallQuality',
          count: { $sum: 1 },
          avgTDS: { $avg: '$chemistry.tds.value' },
          avgpH: { $avg: '$chemistry.pH.value' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: summary
    });
  } catch (error) {
    next(error);
  }
};

// Get flagged tests
exports.getFlaggedTests = async (req, res, next) => {
  try {
    const flagged = await WaterTest.find({
      $or: [
        { 'analysis.potable': false },
        { 'analysis.overallQuality': { $in: ['poor', 'unacceptable'] } },
        { 'auditTrail.status': 'flagged' }
      ]
    })
      .sort({ testDate: -1 })
      .populate('auditTrail.createdBy', 'name email');

    res.status(200).json({
      status: 'success',
      results: flagged.length,
      data: flagged
    });
  } catch (error) {
    next(error);
  }
};