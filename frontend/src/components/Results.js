import React from 'react';
import MatchChart from './MatchChart';

const Results = ({ results, onNewAnalysis }) => {
  const getScoreClass = (percentage) => {
    if (percentage >= 80) return 'score-excellent';
    if (percentage >= 60) return 'score-good';
    if (percentage >= 40) return 'score-moderate';
    return 'score-low';
  };

  const getScoreLabel = (percentage) => {
    if (percentage >= 80) return 'Excellent Match!';
    if (percentage >= 60) return 'Good Match';
    if (percentage >= 40) return 'Moderate Match';
    return 'Needs Improvement';
  };

  return (
    <div className="results-container">
      {/* Success Alert */}
      <div className="alert alert-success">
        <span style={{fontSize: '1.5rem'}}>✓</span>
        <span>Resume analyzed successfully for <strong>{results.name}</strong></span>
      </div>

      {/* Match Score */}
      <div className="card match-score">
        <h2 style={{ 
          marginBottom: '25px', 
          color: '#2d3748',
          fontSize: '1.8rem',
          fontWeight: '700'
        }}>
          <span style={{marginRight: '10px'}}>🎯</span>
          Match Score for {results.jobRole}
        </h2>
        <div className={`score-circle ${getScoreClass(results.matchPercentage)}`}>
          {results.matchPercentage}%
        </div>
        <div className="score-label">{getScoreLabel(results.matchPercentage)}</div>
        <p style={{ marginTop: '18px', color: '#718096', fontSize: '1.1rem', fontWeight: '500' }}>
          Matched <strong style={{color: '#667eea'}}>{results.matchedRequired}</strong> out of{' '}
          <strong style={{color: '#667eea'}}>{results.totalRequired}</strong> required skills
        </p>
      </div>

      {/* Chart Visualization */}
      <div className="card">
        <h3 style={{ 
          marginBottom: '20px', 
          color: '#2d3748',
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>
          <span style={{marginRight: '10px'}}>📊</span>
          Skills Distribution
        </h3>
        <MatchChart results={results} />
      </div>

      {/* Skills Grid */}
      <div className="skills-grid">
        {/* Matched Skills */}
        <div className="skill-card">
          <h3>
            <span style={{fontSize: '1.5rem'}}>✓</span>
            <span>Matched Skills ({results.matchedSkills.length})</span>
          </h3>
          <div className="skill-tags">
            {results.matchedSkills.length > 0 ? (
              results.matchedSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag matched"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p style={{ color: '#718096', fontStyle: 'italic' }}>No skills matched</p>
            )}
          </div>
        </div>

        {/* Missing Skills */}
        <div className="skill-card">
          <h3>
            <span style={{fontSize: '1.5rem'}}>⚠️</span>
            <span>Missing Skills ({results.missingSkills.length})</span>
          </h3>
          <div className="skill-tags">
            {results.missingSkills.length > 0 ? (
              results.missingSkills.map((skill, index) => (
                <span 
                  key={index} 
                  className="skill-tag missing"
                  style={{animationDelay: `${index * 0.05}s`}}
                >
                  {skill}
                </span>
              ))
            ) : (
              <p style={{ color: '#718096', fontStyle: 'italic' }}>No missing skills - Perfect match! 🎉</p>
            )}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      <div className="card">
        <h3 style={{ 
          marginBottom: '20px', 
          color: '#2d3748',
          fontSize: '1.5rem',
          fontWeight: '700'
        }}>
          <span style={{marginRight: '10px'}}>💡</span>
          Improvement Suggestions
        </h3>
        <ul className="suggestions-list">
          {results.suggestions.map((suggestion, index) => (
            <li key={index}>
              <span style={{ color: '#667eea', fontSize: '22px', fontWeight: 'bold' }}>➤</span>
              <span style={{fontSize: '1.05rem', lineHeight: '1.6'}}>{suggestion}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="nav-buttons">
        <button onClick={onNewAnalysis} className="btn btn-primary">
          <span style={{fontSize: '1.3rem'}}>📄</span>
          <span>Analyze Another Resume</span>
        </button>
      </div>

      {/* Analysis Details */}
      <div className="card" style={{ 
        marginTop: '25px', 
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        borderLeft: '5px solid #667eea'
      }}>
        <h4 style={{ 
          color: '#2d3748', 
          marginBottom: '15px',
          fontSize: '1.3rem',
          fontWeight: '700'
        }}>
          <span style={{marginRight: '8px'}}>📋</span>
          Analysis Details
        </h4>
        <div style={{ fontSize: '15px', color: '#4a5568', lineHeight: '1.8' }}>
          <p><strong style={{color: '#2d3748'}}>Name:</strong> {results.name}</p>
          <p><strong style={{color: '#2d3748'}}>Email:</strong> {results.email}</p>
          <p><strong style={{color: '#2d3748'}}>Job Role:</strong> {results.jobRole}</p>
          <p><strong style={{color: '#2d3748'}}>Analyzed On:</strong> {new Date(results.analyzedAt).toLocaleString()}</p>
          <p><strong style={{color: '#2d3748'}}>Analysis ID:</strong> <code style={{
            background: '#e2e8f0',
            padding: '2px 8px',
            borderRadius: '4px',
            fontSize: '13px'
          }}>{results.id}</code></p>
        </div>
      </div>
    </div>
  );
};

export default Results;
