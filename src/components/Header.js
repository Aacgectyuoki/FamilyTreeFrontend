import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/tree">The Tree</Link>
      <button onClick={toggleLanguage}>Toggle Language</button>
    </div>
  );
};

export default Header;
