// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Tree from './components/Tree';
// import FamilyTree from './components/FamilyTree';
// import './styles.css';
// import './App.css';
// import './i18n';

// const App = () => (
//   <Router>
//     <Header toggleLanguage={() => { /* implement toggle language functionality here */ }} />
//     <Routes>
//       <Route path="/" element={<h1>Welcome to the Family Tree</h1>} />
//       <Route path="/tree" element={<Tree />} />
//     </Routes>
//   </Router>
// );

// export default App;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Tree from './components/Tree';
import './App.css';

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h1>{t('Family Tree')}</h1>} />
        <Route path="/tree" element={<Tree />} />
      </Routes>
    </Router>
  );
}

export default App;
