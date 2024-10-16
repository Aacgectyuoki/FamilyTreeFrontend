import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Tree from './components/Tree';
import './styles.css';

const App = () => (
  <Router>
    <Header toggleLanguage={() => { /* implement toggle language functionality here */ }} />
    <Routes>
      <Route path="/" element={<h1>Welcome to the Family Tree</h1>} />
      <Route path="/tree" element={<Tree />} />
    </Routes>
  </Router>
);

export default App;