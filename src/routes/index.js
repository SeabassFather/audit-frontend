const express = require('express');
const router = express.Router();

// Import route modules
const authRoutes = require('./authRoutes');
const usdaRoutes = require('./usdaRoutes');
const waterRoutes = require('./waterRoutes');
const mortgageRoutes = require('./mortgageRoutes');
const factoringRoutes = require('./factoringRoutes');
const complianceRoutes = require('./complianceRoutes');
const uploadRoutes = require('./uploadRoutes');

// API Info endpoint
router.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'AuditDNA API v1.0',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      usda: '/api/usda',
      water: '/api/water',
      mortgage: '/api/mortgage',
      factoring: '/api/factoring',
      compliance: '/api/compliance',
      uploads: '/api/uploads'
    },
    documentation: 'https://docs.auditdna.com'
  });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/usda', usdaRoutes);
router.use('/water', waterRoutes);
router.use('/mortgage', mortgageRoutes);
router.use('/factoring', factoringRoutes);
router.use('/compliance', complianceRoutes);
router.use('/uploads', uploadRoutes);

module.exports = router;