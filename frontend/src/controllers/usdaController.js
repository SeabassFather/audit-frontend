const USDARecord = require('../models/USDARecord');
const usdaService = require('../services/usdaService');
const { AppError } = require('../middleware/errorHandler');
const logger = require('../config/logger');

// Get commodity price
exports.getCommodityPrice = async (req, res, next) => {
  try {
    const { commodity } = req.params;
    const { state, source } = req.query;

    // Try to get from database first
    let priceData = await USDARecord.getLatestPrice(commodity, state);

    // If not found or older than 24 hours, fetch from USDA
    if (!priceData || (Date.now() - priceData.reportDate > 24 * 60 * 60 * 1000)) {
      logger.info(`Fetching fresh data for ${commodity} from USDA`);
      priceData = await usdaService.fetchCommodityPrice(commodity, source);
      
      if (priceData) {
        // Save to database
        const record = await USDARecord.create(priceData);
        priceData = record;
      }
    }

    if (!priceData) {
      return next(new AppError(`No price data found for ${commodity}`, 404));
    }

    res.status(200).json({
      status: 'success',
      data: priceData
    });
  } catch (error) {
    logger.error('Error in getCommodityPrice:', error);
    next(error);
  }
};

// Search prices
exports.searchPrices = async (req, res, next) => {
  try {
    const { commodity, state, marketType, startDate, endDate, limit = 50 } = req.query;

    const query = {};
    if (commodity) query.commodity = new RegExp(commodity, 'i');
    if (state) query['location.state'] = state;
    if (marketType) query.marketType = marketType;
    if (startDate || endDate) {
      query.reportDate = {};
      if (startDate) query.reportDate.$gte = new Date(startDate);
      if (endDate) query.reportDate.$lte = new Date(endDate);
    }

    const results = await USDARecord.find(query)
      .sort({ reportDate: -1 })
      .limit(parseInt(limit))
      .select('-__v');

    res.status(200).json({
      status: 'success',
      results: results.length,
      data: results
    });
  } catch (error) {
    logger.error('Error in searchPrices:', error);
    next(error);
  }
};

// Get price trends
exports.getPriceTrends = async (req, res, next) => {
  try {
    const { commodity } = req.params;
    const { days = 30 } = req.query;

    const trends = await USDARecord.getPriceTrends(commodity, parseInt(days));

    if (!trends || trends.length === 0) {
      return next(new AppError(`No trend data found for ${commodity}`, 404));
    }

    // Calculate statistics
    const prices = trends.map(t => t.priceData.average);
    const stats = {
      current: prices[prices.length - 1],
      average: prices.reduce((a, b) => a + b, 0) / prices.length,
      high: Math.max(...prices),
      low: Math.min(...prices),
      volatility: calculateVolatility(prices)
    };

    res.status(200).json({
      status: 'success',
      period: `${days} days`,
      statistics: stats,
      data: trends
    });
  } catch (error) {
    logger.error('Error in getPriceTrends:', error);
    next(error);
  }
};

// Get market prices
exports.getMarketPrices = async (req, res, next) => {
  try {
    const { marketType } = req.params;
    const { limit = 100 } = req.query;

    const prices = await USDARecord.find({ marketType })
      .sort({ reportDate: -1 })
      .limit(parseInt(limit))
      .select('-__v');

    res.status(200).json({
      status: 'success',
      marketType,
      results: prices.length,
      data: prices
    });
  } catch (error) {
    logger.error('Error in getMarketPrices:', error);
    next(error);
  }
};

// Compare prices
exports.comparePrices = async (req, res, next) => {
  try {
    const { commodities, state } = req.query;

    if (!commodities) {
      return next(new AppError('Please provide commodities to compare', 400));
    }

    const commodityList = commodities.split(',');
    const comparison = [];

    for (const commodity of commodityList) {
      const price = await USDARecord.getLatestPrice(commodity.trim(), state);
      if (price) {
        comparison.push({
          commodity: commodity.trim(),
          price: price.priceData,
          reportDate: price.reportDate,
          location: price.location
        });
      }
    }

    res.status(200).json({
      status: 'success',
      results: comparison.length,
      data: comparison
    });
  } catch (error) {
    logger.error('Error in comparePrices:', error);
    next(error);
  }
};

// Get trending prices
exports.getTrendingPrices = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const trending = await USDARecord.aggregate([
      {
        $match: {
          reportDate: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        }
      },
      {
        $group: {
          _id: '$commodity',
          avgPrice: { $avg: '$priceData.average' },
          count: { $sum: 1 },
          latestDate: { $max: '$reportDate' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: parseInt(limit)
      }
    ]);

    res.status(200).json({
      status: 'success',
      results: trending.length,
      data: trending
    });
  } catch (error) {
    logger.error('Error in getTrendingPrices:', error);
    next(error);
  }
};

// Create price record
exports.createPriceRecord = async (req, res, next) => {
  try {
    const record = await USDARecord.create({
      ...req.body,
      createdBy: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: record
    });
  } catch (error) {
    logger.error('Error in createPriceRecord:', error);
    next(error);
  }
};

// Update price record
exports.updatePriceRecord = async (req, res, next) => {
  try {
    const record = await USDARecord.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        'metadata.lastUpdated': Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!record) {
      return next(new AppError('Price record not found', 404));
    }

    res.status(200).json({
      status: 'success',
      data: record
    });
  } catch (error) {
    logger.error('Error in updatePriceRecord:', error);
    next(error);
  }
};

// Delete price record
exports.deletePriceRecord = async (req, res, next) => {
  try {
    const record = await USDARecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return next(new AppError('Price record not found', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    logger.error('Error in deletePriceRecord:', error);
    next(error);
  }
};

// Sync from USDA
exports.syncFromUSDA = async (req, res, next) => {
  try {
    const { commodities, source } = req.body;

    if (!commodities || !Array.isArray(commodities)) {
      return next(new AppError('Please provide an array of commodities', 400));
    }

    const results = await usdaService.batchFetchPrices(commodities, source);

    res.status(200).json({
      status: 'success',
      synced: results.length,
      data: results
    });
  } catch (error) {
    logger.error('Error in syncFromUSDA:', error);
    next(error);
  }
};

// Get statistics
exports.getStatistics = async (req, res, next) => {
  try {
    const stats = await USDARecord.aggregate([
      {
        $group: {
          _id: null,
          totalRecords: { $sum: 1 },
          avgPrice: { $avg: '$priceData.average' },
          commodities: { $addToSet: '$commodity' },
          sources: { $addToSet: '$dataSource' }
        }
      }
    ]);

    res.status(200).json({
      status: 'success',
      data: stats[0] || {}
    });
  } catch (error) {
    logger.error('Error in getStatistics:', error);
    next(error);
  }
};

// Get forecast (simple linear projection)
exports.getForecast = async (req, res, next) => {
  try {
    const { commodity } = req.params;
    const { days = 30 } = req.query;

    const historical = await USDARecord.getPriceTrends(commodity, 90);

    if (historical.length < 7) {
      return next(new AppError('Insufficient historical data for forecast', 400));
    }

    const forecast = usdaService.generateForecast(historical, parseInt(days));

    res.status(200).json({
      status: 'success',
      commodity,
      forecastDays: days,
      data: forecast
    });
  } catch (error) {
    logger.error('Error in getForecast:', error);
    next(error);
  }
};

// Helper function to calculate volatility
function calculateVolatility(prices) {
  const mean = prices.reduce((a, b) => a + b, 0) / prices.length;
  const squaredDiffs = prices.map(price => Math.pow(price - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / prices.length;
  return Math.sqrt(variance);
}