const fs = require('fs').promises;
const path = require('path');
const pdf = require('pdf-parse');
const Resume = require('../models/Resume');
const { analyzeResume, getJobRoles } = require('../utils/skillMatcher');

/**
 * Upload and analyze resume
 * @route POST /api/resume/analyze
 */
const analyzeResumeController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please upload a PDF file' 
      });
    }

    const { name, email, jobRole } = req.body;

    // Validate required fields
    if (!name || !email || !jobRole) {
      // Delete uploaded file if validation fails
      await fs.unlink(req.file.path);
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and job role are required' 
      });
    }

    // Validate job role
    const validRoles = getJobRoles();
    if (!validRoles.includes(jobRole)) {
      await fs.unlink(req.file.path);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid job role selected' 
      });
    }

    // Read and parse PDF
    const dataBuffer = await fs.readFile(req.file.path);
    const pdfData = await pdf(dataBuffer);
    const extractedText = pdfData.text;

    if (!extractedText || extractedText.trim().length < 50) {
      await fs.unlink(req.file.path);
      return res.status(400).json({ 
        success: false, 
        message: 'Could not extract sufficient text from PDF. Please ensure the PDF contains readable text.' 
      });
    }

    // Analyze resume against job role
    const analysis = analyzeResume(extractedText, jobRole);

    // Save to database
    const resume = new Resume({
      name,
      email,
      fileName: req.file.originalname,
      filePath: req.file.path,
      extractedText,
      jobRole,
      matchPercentage: analysis.matchPercentage,
      matchedSkills: analysis.matchedSkills,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions
    });

    await resume.save();

    // Return analysis results
    res.status(200).json({
      success: true,
      message: 'Resume analyzed successfully',
      data: {
        id: resume._id,
        name: resume.name,
        email: resume.email,
        jobRole: resume.jobRole,
        matchPercentage: analysis.matchPercentage,
        matchedSkills: analysis.matchedSkills,
        missingSkills: analysis.missingSkills,
        suggestions: analysis.suggestions,
        totalRequired: analysis.totalRequired,
        matchedRequired: analysis.matchedRequired,
        matchedOptional: analysis.matchedOptional,
        analyzedAt: resume.analyzedAt
      }
    });

  } catch (error) {
    console.error('Error analyzing resume:', error);
    
    // Clean up uploaded file in case of error
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch (unlinkError) {
        console.error('Error deleting file:', unlinkError);
      }
    }

    res.status(500).json({ 
      success: false, 
      message: 'Error analyzing resume', 
      error: error.message 
    });
  }
};

/**
 * Get all job roles
 * @route GET /api/resume/job-roles
 */
const getJobRolesController = async (req, res) => {
  try {
    const roles = getJobRoles();
    res.status(200).json({
      success: true,
      data: roles
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching job roles', 
      error: error.message 
    });
  }
};

/**
 * Get resume analysis history
 * @route GET /api/resume/history
 */
const getResumeHistory = async (req, res) => {
  try {
    const { email } = req.query;
    
    const query = email ? { email } : {};
    const resumes = await Resume.find(query)
      .sort({ analyzedAt: -1 })
      .select('-extractedText -filePath')
      .limit(20);

    res.status(200).json({
      success: true,
      count: resumes.length,
      data: resumes
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching history', 
      error: error.message 
    });
  }
};

/**
 * Get single resume analysis by ID
 * @route GET /api/resume/:id
 */
const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id)
      .select('-extractedText -filePath');

    if (!resume) {
      return res.status(404).json({ 
        success: false, 
        message: 'Resume not found' 
      });
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching resume', 
      error: error.message 
    });
  }
};

/**
 * Delete resume analysis
 * @route DELETE /api/resume/:id
 */
const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ 
        success: false, 
        message: 'Resume not found' 
      });
    }

    // Delete file from filesystem
    try {
      await fs.unlink(resume.filePath);
    } catch (fileError) {
      console.error('Error deleting file:', fileError);
    }

    // Delete from database
    await Resume.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Resume deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error deleting resume', 
      error: error.message 
    });
  }
};

module.exports = {
  analyzeResumeController,
  getJobRolesController,
  getResumeHistory,
  getResumeById,
  deleteResume
};
