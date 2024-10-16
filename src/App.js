import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Tree from './components/Tree'; // Placeholder for the family tree visualization

const App = () => {
  const [language, setLanguage] = useState('en');

  // Toggle between English and Arabic
  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  return (
    <Router>
      <Header toggleLanguage={toggleLanguage} />
      <Routes>
        <Route path="/" element={<React.Fragment><Tree language={language} /></React.Fragment>} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
