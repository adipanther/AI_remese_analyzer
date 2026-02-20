import React, { useState, useEffect } from 'react';
import { analyzeResume, getJobRoles } from '../services/api';

const UploadForm = ({ onAnalysisComplete, onLoadingChange }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    jobRole: '',
  });
  const [file, setFile] = useState(null);
  const [jobRoles, setJobRoles] = useState([]);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    fetchJobRoles();
  }, []);

  const fetchJobRoles = async () => {
    try {
      const response = await getJobRoles();
      setJobRoles(response.data);
    } catch (err) {
      console.error('Error fetching job roles:', err);
      setError('Failed to load job roles');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Please upload a PDF file');
        setFile(null);
        setFileName('');
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        setFile(null);
        setFileName('');
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setError('');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Please enter your name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.jobRole) {
      setError('Please select a job role');
      return false;
    }
    if (!file) {
      setError('Please upload your resume (PDF format)');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    onLoadingChange(true);

    const submitData = new FormData();
    submitData.append('name', formData.name);
    submitData.append('email', formData.email);
    submitData.append('jobRole', formData.jobRole);
    submitData.append('resume', file);

    try {
      const response = await analyzeResume(submitData);
      onAnalysisComplete(response.data);
    } catch (err) {
      onLoadingChange(false);
      setError(
        err.response?.data?.message || 
        'Failed to analyze resume. Please try again.'
      );
    }
  };

  return (
    <div className="card">
      <h2 style={{ 
        marginBottom: '25px', 
        color: '#2d3748',
        fontSize: '2rem',
        fontWeight: '800',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        <span style={{fontSize: '2rem', marginRight: '10px'}}>📋</span>
        Upload Your Resume
      </h2>
      
      {error && (
        <div className="alert alert-error">
          <span style={{fontSize: '1.5rem'}}>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your.email@example.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobRole">Target Job Role *</label>
          <select
            id="jobRole"
            name="jobRole"
            value={formData.jobRole}
            onChange={handleInputChange}
          >
            <option value="">-- Select a job role --</option>
            {jobRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Upload Resume (PDF) *</label>
          <div className="file-input-wrapper">
            <label 
              htmlFor="resume" 
              className={`file-input-label ${fileName ? 'has-file' : ''}`}
            >
              {fileName ? (
                <>
                  <span style={{fontSize: '2rem', display: 'block', marginBottom: '8px'}}>✅</span>
                  <span style={{fontWeight: '600', fontSize: '1.1rem'}}>{fileName}</span>
                </>
              ) : (
                <>
                  <span style={{fontSize: '3rem', display: 'block', marginBottom: '10px'}}>📄</span>
                  <span style={{fontWeight: '600', fontSize: '1.1rem', display: 'block', marginBottom: '5px'}}>
                    Click to select PDF file
                  </span>
                  <small style={{ color: '#718096', fontSize: '0.9rem' }}>Maximum size: 5MB</small>
                </>
              )}
            </label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          <span>Analyze Resume</span>
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
