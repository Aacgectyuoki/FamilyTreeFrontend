// import React from 'react';
// import { useTranslation } from 'react-i18next';
// import { Link } from 'react-router-dom';

// const Header = () => {
//   const { i18n } = useTranslation();

//   const toggleLanguage = () => {
//     const newLang = i18n.language === 'en' ? 'ar' : 'en';
//     i18n.changeLanguage(newLang);
//   };

//   return (
//     <div>
//       <Link to="/">Home</Link> | <Link to="/tree">Family Tree</Link>
//       <button onClick={toggleLanguage}>Toggle Language</button>
//     </div>
//   );
// };

// export default Header;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { i18n, t } = useTranslation(); // Ensure both i18n and t are accessed

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang).then(() => {
      console.log(`Language switched to: ${newLang}`);
    }).catch((err) => console.error('Error changing language:', err));
  };

  return (
    <div>
      <Link to="/">{t('home')}</Link> | <Link to="/tree">{t('family_tree')}</Link>
      <button onClick={toggleLanguage}>{t('toggle_language')}</button>
    </div>
  );
};

export default Header;
