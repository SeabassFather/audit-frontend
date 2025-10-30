const express = require('express');
const router = express.Router();
const usdaController = require('../controllers/usdaController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');
const cacheMiddleware = require('../middleware/cacheMiddleware');

// Public routes with optional auth
router.get('/price/:commodity', 
  optionalAuth, 
  cacheMiddleware(3600), 
  usdaController.getCommodityPrice
);

router.get('/prices/search', 
  optionalAuth, 
  cacheMiddleware(1800), 
  usdaController.searchPrices
);

router.get('/prices/trending', 
  cacheMiddleware(7200), 
  usdaController.getTrendingPrices
);

router.get('/market/:marketType', 
  optionalAuth, 
  cacheMiddleware(3600), 
  usdaController.getMarketPrices
);

router.get('/trends/:commodity', 
  optionalAuth, 
  cacheMiddleware(3600), 
  usdaController.getPriceTrends
);

router.get('/compare', 
  optionalAuth, 
  usdaController.comparePrices
);

router.get('/forecast/:commodity', 
  optionalAuth, 
  cacheMiddleware(7200), 
  usdaController.getForecast
);

// Protected routes
router.post('/price', 
  protect, 
  usdaController.createPriceRecord
);

router.put('/price/:id', 
  protect, 
  usdaController.updatePriceRecord
);

router.delete('/price/:id', 
  protect, 
  usdaController.deletePriceRecord
);

router.post('/sync', 
  protect, 
  usdaController.syncFromUSDA
);

// Admin routes
router.get('/stats', 
  protect, 
  usdaController.getStatistics
);

module.exports = router;