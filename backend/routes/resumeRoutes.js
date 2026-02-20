const express = require('express');
const router = express.Router();
const upload = require('../config/multer');
const {
  analyzeResumeController,
  getJobRolesController,
  getResumeHistory,
  getResumeById,
  deleteResume
} = require('../controllers/resumeController');

// @route   POST /api/resume/analyze
// @desc    Upload and analyze resume
// @access  Public
router.post('/analyze', upload.single('resume'), analyzeResumeController);

// @route   GET /api/resume/job-roles
// @desc    Get all available job roles
// @access  Public
router.get('/job-roles', getJobRolesController);

// @route   GET /api/resume/history
// @desc    Get resume analysis history
// @access  Public
router.get('/history', getResumeHistory);

// @route   GET /api/resume/:id
// @desc    Get single resume analysis by ID
// @access  Public
router.get('/:id', getResumeById);

// @route   DELETE /api/resume/:id
// @desc    Delete resume analysis
// @access  Public
router.delete('/:id', deleteResume);

module.exports = router;
