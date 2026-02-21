const mongoose = require('mongoose');

const connectDB = async () => {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  // Primary attempt: use the provided MONGODB_URI (SRV URI preferred)
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, opts);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.error(`Primary MongoDB connection failed: ${error.message}`);

    // If SRV lookup failed (common in restricted networks), try fallback
    const shouldFallback = /querySrv|ENOTFOUND|ECONNREFUSED/i.test(error.message || '');
    if (!shouldFallback) {
      console.error('Non-recoverable MongoDB error. Exiting.');
      process.exit(1);
    }
  }

  // Fallback: use seed hosts from environment to avoid SRV DNS lookup
  try {
    const seeds = process.env.MONGODB_SEEDS;
    if (!seeds) {
      throw new Error('MONGODB_SEEDS not set for fallback connection');
    }

    // Build a standard (non-SRV) connection string. We include retryWrites and w=majority.
    const fallbackUri = `mongodb://${seeds}/resume_analyzer?ssl=true&retryWrites=true&w=majority`;

    const conn = await mongoose.connect(fallbackUri, opts);
    console.log(`MongoDB Connected using fallback seeds: ${conn.connection.host}`);
    return;
  } catch (fallbackError) {
    console.error(`Fallback MongoDB connection failed: ${fallbackError.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
