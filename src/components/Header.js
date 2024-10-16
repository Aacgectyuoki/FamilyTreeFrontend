import React from 'react';

const Header = ({ toggleLanguage }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>Home</li>
          <li>The Tree</li>
          <li>Contact</li>
        </ul>
        <button onClick={toggleLanguage}>Toggle Language</button>
      </nav>
    </header>
  );
};

export default Header;