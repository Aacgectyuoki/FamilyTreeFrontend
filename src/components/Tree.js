import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Hook for translations
import FamilyTreeSynium from './FamilyTreeSynium';

/** @typedef {Object} FamilyMember */
/** @property {{ en: string, ar: string }} name */

const dummyFamilyMembers = [
  {
    _id: '1',
    name: { en: 'John Doe', ar: 'جون دو' },
    birthYear: 1970,
    isAlive: true,
    gender: 'male',
    parents: [],
    children: ['2'],
  },
  {
    _id: '2',
    name: { en: 'Jane Doe', ar: 'جين دو' },
    birthYear: 1980,
    isAlive: true,
    gender: 'female',
    parents: ['1'],
    children: ['3', '4'],
  },
  {
    _id: '3',
    name: { en: 'Max Doe', ar: 'ماكس دو' },
    birthYear: 1996,
    isAlive: true,
    gender: 'male',
    parents: ['2'],
    children: [],
  },
  {
    _id: '4',
    name: { en: 'Alice Doe', ar: 'أليس دو' },
    birthYear: 1997,
    isAlive: true,
    gender: 'female',
    parents: ['2'],
    children: [],
  },
];

const Tree = () => {
  const { t, i18n } = useTranslation(); // Translation hook
  const [members, setMembers] = useState([]);

  useEffect(() => {
    setMembers(dummyFamilyMembers);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang)
      .then(() => console.log(`Language changed to ${newLang}`))
      .catch((err) => console.error('Language change error:', err));
  };

  return (
    <div className="tree-container">
      <button onClick={toggleLanguage}>{t('toggle_language')}</button>
      {members.length > 0 ? (
        <FamilyTreeSynium members={members} />
      ) : (
        <p>{t('loading_message')}</p>
      )}
    </div>
  );
};

export default Tree;
