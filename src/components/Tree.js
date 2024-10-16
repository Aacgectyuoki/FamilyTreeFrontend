import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FamilyNode from './FamilyNode';

const Tree = () => {
  const [members, setMembers] = useState<{ _id: string; [key: string]: any }[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/family');
        setMembers(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching family members:', error);
        setError('Error fetching family members. Please try again later.');
      }
    };

    fetchFamilyMembers();
  }, []);

  return (
    <div className="tree-container">
      {error && <div className="error-message">{error}</div>}
      {members.map(member => (
        <FamilyNode key={member._id} member={member} />
      ))}
    </div>
  );
};

export default Tree;