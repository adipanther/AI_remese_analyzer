  require('dotenv').config();
  const express = require('express');
  const cors = require('cors');
  const path = require('path');
  const fs = require('fs');
  const connectDB = require('./config/db');
  const resumeRoutes = require('./routes/resumeRoutes');
  const errorHandler = require('./middleware/errorHandler');

  // Initialize express app
  const app = express();

  // Connect to MongoDB
  connectDB();

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(__dirname, 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  // Middleware
  app.use(cors({
    origin: "https://ai-new-resume-analyzer.vercel.app",
    credentials: true
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Routes
  app.get('/', (req, res) => {
    res.json({ 
      message: 'AI Resume Analyzer API', 
      version: '1.0.0',
      endpoints: {
        analyze: 'POST /api/resume/analyze',
        jobRoles: 'GET /api/resume/job-roles',
        history: 'GET /api/resume/history',
        getById: 'GET /api/resume/:id',
        delete: 'DELETE /api/resume/:id'
      }
    });
  });

  app.use('/api/resume', resumeRoutes);

  // Error handler (must be last)
  app.use(errorHandler);

  // Start server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
