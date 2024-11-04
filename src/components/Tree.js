import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios'; // Ensure axios is imported
import FamilyTreeSynium from './FamilyTreeSynium';
import UploadGedcom from './UploadGedcom';

// Define family members with relationships
const dummyFamilyMembers = [
  // First Generation
  {
    _id: '1',
    name: { en: 'John Doe', ar: 'جون دو' },
    birthYear: 1945,
    deathYear: 2005,
    isAlive: false,
    gender: 'male',
    spouses: ['9'],
    children: ['2'],
  },
  {
    _id: '9',
    name: { en: 'Linda Davis', ar: 'ليندا ديفيس' },
    birthYear: 1940,
    isAlive: true,
    gender: 'female',
    spouses: ['1'],
    children: ['2'],
  },

  // Second Generation
  {
    _id: '2',
    name: { en: 'Jane Doe', ar: 'جين دو' },
    birthYear: 1970,
    isAlive: true,
    gender: 'female',
    parents: ['1', '9'],
    spouses: ['10'],
    children: ['3', '4', '5'],
  },
  {
    _id: '10',
    name: { en: 'Mark Doe', ar: 'مارك دو' },
    birthYear: 1965,
    deathYear: 2010,
    isAlive: false,
    gender: 'male',
    spouses: ['2'],
    children: ['3', '4', '5'],
  },

  // Third Generation
  {
    _id: '3',
    name: { en: 'Max Doe', ar: 'ماكس دو' },
    birthYear: 1996,
    isAlive: true,
    gender: 'male',
    parents: ['2', '10'],
    spouses: ['11'],
    children: ['6'],
  },
  {
    _id: '4',
    name: { en: 'Alice Doe', ar: 'أليس دو' },
    birthYear: 1997,
    isAlive: true,
    gender: 'female',
    parents: ['2', '10'],
    spouses: [],
    children: [],
  },
  {
    _id: '5',
    name: { en: 'Henry Doe', ar: 'هنري دو' },
    birthYear: 2000,
    isAlive: true,
    gender: 'male',
    parents: ['2', '10'],
    spouses: [],
    children: [],
  },

  // Fourth Generation
  {
    _id: '6',
    name: { en: 'Eli Doe', ar: 'إيلي دو' },
    birthYear: 2020,
    isAlive: true,
    gender: 'male',
    parents: ['3'],
    spouses: [],
    children: [],
  },

  // Additional Ancestors
  {
    _id: '7',
    name: { en: 'Robert Doe', ar: 'روبرت دو' },
    birthYear: 1910,
    deathYear: 1985,
    isAlive: false,
    gender: 'male',
    spouses: ['8'],
    children: ['1'],
  },
  {
    _id: '8',
    name: { en: 'Sarah Doe', ar: 'سارة دو' },
    birthYear: 1915,
    deathYear: 1995,
    isAlive: false,
    gender: 'female',
    spouses: ['7'],
    children: ['1'],
  },

  // Extended Family
  {
    _id: '11',
    name: { en: 'Emily Stone', ar: 'إميلي ستون' },
    birthYear: 1998,
    isAlive: true,
    gender: 'female',
    spouses: ['3'],
    children: ['6'],
  },
  {
    _id: '12',
    name: { en: 'Michael Davis', ar: 'مايكل ديفيس' },
    birthYear: 1938,
    deathYear: 2002,
    isAlive: false,
    gender: 'male',
    spouses: ['9'],
    children: [],
  },
];

const Tree = () => {
  const { t, i18n } = useTranslation();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to fetch family members from the backend
  const fetchFamilyMembers = async () => {
    try {
      const response = await axios.get('/api/family');
      setMembers(response.data);
    } catch (error) {
      console.error("Error fetching family members:", error);
      setMembers(dummyFamilyMembers); // Use dummy data if fetch fails
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFamilyMembers();
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="tree-container">
      <UploadGedcom onUploadSuccess={fetchFamilyMembers} />

      <button onClick={toggleLanguage}>{t('toggle_language')}</button>
      {loading ? (
        <p>{t('loading_message')}</p>
      ) : (
        <FamilyTreeSynium members={members} /> // Render tree with family data
      )}
    </div>
  );
};

export default Tree;