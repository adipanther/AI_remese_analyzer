const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  extractedText: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    required: true,
    enum: ['MERN Developer', 'Java Developer', 'Data Analyst', 'Python Developer', 'DevOps Engineer']
  },
  matchPercentage: {
    type: Number,
    required: true
  },
  matchedSkills: [{
    type: String
  }],
  missingSkills: [{
    type: String
  }],
  suggestions: [{
    type: String
  }],
  analyzedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', resumeSchema);
