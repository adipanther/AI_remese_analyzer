import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://ai-resume-analyzer-1-11p8.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Resume API calls
export const analyzeResume = async (formData) => {
  const response = await axios.post(`${API_URL}/resume/analyze`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getJobRoles = async () => {
  const response = await api.get('/resume/job-roles');
  return response.data;
};

export const getResumeHistory = async (email = '') => {
  const response = await api.get(`/resume/history${email ? `?email=${email}` : ''}`);
  return response.data;
};

export const getResumeById = async (id) => {
  const response = await api.get(`/resume/${id}`);
  return response.data;
};

export const deleteResume = async (id) => {
  const response = await api.delete(`/resume/${id}`);
  return response.data;
};

export default api;
