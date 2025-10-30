const redis = require('redis');
const logger = require('../config/logger');

let redisClient;

// Initialize Redis client
if (process.env.ENABLE_CACHING === 'true') {
  redisClient = redis.createClient({
    host: process.env.REDIS_HOST || 'localhost',
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD,
    retry_strategy: (options) => {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        logger.error('Redis connection refused');
        return new Error('Redis connection refused');
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        return new Error('Redis retry time exhausted');
      }
      if (options.attempt > 10) {
        return undefined;
      }
      return Math.min(options.attempt * 100, 3000);
    }
  });

  redisClient.on('error', (err) => {
    logger.error('Redis Client Error:', err);
  });

  redisClient.on('connect', () => {
    logger.info('✅ Redis connected');
  });
}

// Cache middleware factory
const cache = (duration = 3600) => {
  return async (req, res, next) => {
    if (!redisClient || process.env.ENABLE_CACHING !== 'true') {
      return next();
    }

    const key = `cache:${req.originalUrl || req.url}`;

    try {
      const cachedData = await redisClient.get(key);

      if (cachedData) {
        logger.info(`Cache hit for ${key}`);
        return res.status(200).json(JSON.parse(cachedData));
      }

      // Store original json function
      const originalJson = res.json.bind(res);

      // Override json function to cache response
      res.json = (data) => {
        if (res.statusCode === 200) {
          redisClient.setex(key, duration, JSON.stringify(data));
          logger.info(`Cached response for ${key}`);
        }
        return originalJson(data);
      };

      next();
    } catch (error) {
      logger.error('Cache middleware error:', error);
      next();
    }
  };
};

// Clear cache by pattern
const clearCache = async (pattern) => {
  if (!redisClient) return;

  try {
    const keys = await redisClient.keys(pattern);
    if (keys.length > 0) {
      await redisClient.del(keys);
      logger.info(`Cleared ${keys.length} cache entries matching ${pattern}`);
    }
  } catch (error) {
    logger.error('Clear cache error:', error);
  }
};

module.exports = cache;
module.exports.clearCache = clearCache;
module.exports.redisClient = redisClient;