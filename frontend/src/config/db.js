const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

<<<<<<< HEAD
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
=======
    logger.info(`Ã¢Å“â€¦ MongoDB Connected: ${conn.connection.host}`);
>>>>>>> my/push-branch
    logger.info(`Database: ${conn.connection.name}`);

    // Connection events
    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting to reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    // Graceful shutdown
    process.on('SIGINT', async () => {
      await mongoose.connection.close();
      logger.info('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
<<<<<<< HEAD
    logger.error('❌ Database connection failed:', error.message);
=======
    logger.error('Ã¢ÂÅ’ Database connection failed:', error.message);
>>>>>>> my/push-branch
    process.exit(1);
  }
};

module.exports = connectDB;