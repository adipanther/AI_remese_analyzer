// Predefined skill sets for different job roles
const jobSkills = {
  'MERN Developer': {
    required: [
      'mongodb', 'mongoose', 'express', 'expressjs', 'react', 'reactjs', 
      'nodejs', 'node.js', 'javascript', 'html', 'css', 'rest api', 'restful',
      'git', 'github', 'npm', 'json', 'ajax', 'async', 'promises',
      'jwt', 'authentication', 'authorization', 'redux', 'hooks',
      'cors', 'middleware', 'backend', 'frontend', 'full stack', 'fullstack'
    ],
    optional: [
      'typescript', 'next.js', 'nextjs', 'redux-toolkit', 'context api',
      'material-ui', 'bootstrap', 'tailwind', 'sass', 'webpack',
      'docker', 'aws', 'heroku', 'vercel', 'api', 'postman',
      'jest', 'testing', 'agile', 'scrum', 'websockets', 'socket.io'
    ]
  },
  'Java Developer': {
    required: [
      'java', 'spring', 'spring boot', 'springboot', 'hibernate',
      'jpa', 'mysql', 'sql', 'jdbc', 'maven', 'gradle',
      'rest api', 'restful', 'microservices', 'oop', 'object oriented',
      'multithreading', 'collections', 'exception handling',
      'git', 'junit', 'testing', 'design patterns'
    ],
    optional: [
      'spring security', 'spring cloud', 'kafka', 'rabbitmq',
      'redis', 'docker', 'kubernetes', 'jenkins', 'aws',
      'mongodb', 'postgresql', 'oracle', 'jms', 'soap',
      'tomcat', 'websphere', 'linux', 'agile', 'ci/cd'
    ]
  },
  'Data Analyst': {
    required: [
      'python', 'sql', 'excel', 'statistics', 'data analysis',
      'data visualization', 'pandas', 'numpy', 'matplotlib',
      'tableau', 'power bi', 'powerbi', 'data cleaning',
      'etl', 'reporting', 'dashboard', 'mysql', 'postgresql'
    ],
    optional: [
      'r', 'sas', 'spss', 'jupyter', 'machine learning', 'ml',
      'scikit-learn', 'seaborn', 'plotly', 'mongodb', 'nosql',
      'spark', 'hadoop', 'big data', 'aws', 'azure',
      'google analytics', 'a/b testing', 'regression', 'clustering'
    ]
  },
  'Python Developer': {
    required: [
      'python', 'django', 'flask', 'fastapi', 'rest api', 'restful',
      'sql', 'postgresql', 'mysql', 'oop', 'object oriented',
      'git', 'github', 'debugging', 'testing', 'unittest',
      'pip', 'virtual environment', 'json', 'api'
    ],
    optional: [
      'celery', 'redis', 'mongodb', 'docker', 'kubernetes',
      'aws', 'pandas', 'numpy', 'machine learning', 'ml',
      'selenium', 'beautifulsoup', 'web scraping', 'async',
      'pytest', 'ci/cd', 'linux', 'nginx', 'gunicorn'
    ]
  },
  'DevOps Engineer': {
    required: [
      'linux', 'docker', 'kubernetes', 'git', 'github', 'gitlab',
      'ci/cd', 'jenkins', 'aws', 'cloud', 'terraform',
      'ansible', 'scripting', 'bash', 'python', 'monitoring',
      'deployment', 'automation', 'containers'
    ],
    optional: [
      'azure', 'gcp', 'prometheus', 'grafana', 'elk stack',
      'helm', 'argocd', 'circleci', 'travis ci', 'maven',
      'gradle', 'nexus', 'artifactory', 'nginx', 'apache',
      'microservices', 'serverless', 'lambda', 'networking'
    ]
  }
};

/**
 * Analyzes resume text and matches it with job role requirements
 * @param {string} resumeText - Extracted text from resume
 * @param {string} jobRole - Target job role
 * @returns {object} Analysis results with match percentage, matched/missing skills, and suggestions
 */
const analyzeResume = (resumeText, jobRole) => {
  if (!jobSkills[jobRole]) {
    throw new Error('Invalid job role');
  }

  // Convert resume text to lowercase for case-insensitive matching
  const resumeLower = resumeText.toLowerCase();
  
  const requiredSkills = jobSkills[jobRole].required;
  const optionalSkills = jobSkills[jobRole].optional;
  
  // Find matched required skills
  const matchedRequired = requiredSkills.filter(skill => {
    // Check if skill exists as a whole word or phrase
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(resumeLower);
  });
  
  // Find matched optional skills
  const matchedOptional = optionalSkills.filter(skill => {
    const regex = new RegExp(`\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(resumeLower);
  });
  
  // Combine matched skills
  const allMatchedSkills = [...matchedRequired, ...matchedOptional];
  
  // Find missing required skills
  const missingSkills = requiredSkills.filter(skill => !matchedRequired.includes(skill));
  
  // Calculate match percentage based on required skills
  const matchPercentage = Math.round((matchedRequired.length / requiredSkills.length) * 100);
  
  // Generate suggestions
  const suggestions = generateSuggestions(matchPercentage, missingSkills, jobRole);
  
  return {
    matchPercentage,
    matchedSkills: allMatchedSkills,
    missingSkills,
    suggestions,
    totalRequired: requiredSkills.length,
    matchedRequired: matchedRequired.length,
    matchedOptional: matchedOptional.length
  };
};

/**
 * Generates improvement suggestions based on analysis
 * @param {number} matchPercentage - Match percentage
 * @param {array} missingSkills - Array of missing skills
 * @param {string} jobRole - Target job role
 * @returns {array} Array of suggestion strings
 */
const generateSuggestions = (matchPercentage, missingSkills, jobRole) => {
  const suggestions = [];
  
  if (matchPercentage >= 80) {
    suggestions.push('Excellent match! Your resume aligns well with the job requirements.');
    suggestions.push('Consider highlighting your project experience more prominently.');
    suggestions.push('Add quantifiable achievements to strengthen your profile.');
  } else if (matchPercentage >= 60) {
    suggestions.push('Good match! Focus on developing the missing skills to improve your profile.');
    suggestions.push('Add relevant projects showcasing your existing skills.');
    suggestions.push(`Consider taking online courses for: ${missingSkills.slice(0, 3).join(', ')}`);
  } else if (matchPercentage >= 40) {
    suggestions.push('Moderate match. Significant skill development needed.');
    suggestions.push(`Priority skills to learn: ${missingSkills.slice(0, 5).join(', ')}`);
    suggestions.push('Work on personal projects to gain practical experience.');
    suggestions.push('Consider internships or entry-level positions to build experience.');
  } else {
    suggestions.push('Low match. Consider extensive upskilling or exploring other roles.');
    suggestions.push(`Critical skills to acquire: ${missingSkills.slice(0, 5).join(', ')}`);
    suggestions.push('Enroll in comprehensive training programs or bootcamps.');
    suggestions.push('Build a strong portfolio with multiple projects.');
  }
  
  // Role-specific suggestions
  if (jobRole === 'MERN Developer') {
    suggestions.push('Build full-stack projects using MERN stack and deploy them online.');
    suggestions.push('Contribute to open-source projects on GitHub.');
  } else if (jobRole === 'Java Developer') {
    suggestions.push('Create microservices-based applications using Spring Boot.');
    suggestions.push('Practice data structures and algorithms for technical interviews.');
  } else if (jobRole === 'Data Analyst') {
    suggestions.push('Create data visualization dashboards and share them in your portfolio.');
    suggestions.push('Participate in Kaggle competitions to improve analytical skills.');
  } else if (jobRole === 'Python Developer') {
    suggestions.push('Build REST APIs and web applications using Django or Flask.');
    suggestions.push('Automate tasks and create useful Python scripts for your portfolio.');
  } else if (jobRole === 'DevOps Engineer') {
    suggestions.push('Set up CI/CD pipelines for sample projects.');
    suggestions.push('Get AWS or Azure certifications to validate your cloud skills.');
  }
  
  return suggestions;
};

/**
 * Get all available job roles
 * @returns {array} Array of job role names
 */
const getJobRoles = () => {
  return Object.keys(jobSkills);
};

/**
 * Get skill requirements for a specific job role
 * @param {string} jobRole - Job role name
 * @returns {object} Required and optional skills
 */
const getJobSkillRequirements = (jobRole) => {
  return jobSkills[jobRole] || null;
};

module.exports = {
  analyzeResume,
  generateSuggestions,
  getJobRoles,
  getJobSkillRequirements,
  jobSkills
};
