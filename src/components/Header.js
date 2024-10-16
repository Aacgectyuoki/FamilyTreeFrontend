import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleLanguage }) => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/tree">The Tree</Link></li>
        </ul>
        <button onClick={toggleLanguage}>Toggle Language</button>
      </nav>
    </header>
  );
};

export default Header;