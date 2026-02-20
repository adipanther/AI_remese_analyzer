import React, { useState } from 'react';
import './App.css';
import UploadForm from './components/UploadForm';
import Results from './components/Results';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalysisComplete = (data) => {
    setResults(data);
    setLoading(false);
  };

  const handleNewAnalysis = () => {
    setResults(null);
  };

  const handleLoadingChange = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div className="App">
      <Header />
      
      <div className="container">
        {!results && !loading && (
          <UploadForm 
            onAnalysisComplete={handleAnalysisComplete}
            onLoadingChange={handleLoadingChange}
          />
        )}

        {loading && (
          <div className="card">
            <div className="loading">
              <div className="spinner"></div>
              <p>Analyzing your resume... Please wait</p>
            </div>
          </div>
        )}

        {results && !loading && (
          <Results 
            results={results}
            onNewAnalysis={handleNewAnalysis}
          />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
