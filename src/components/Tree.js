import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FamilyTree from './FamilyTree'; // Import FamilyTree component

const Tree = () => {
  const [members, setMembers] = useState([]); // State for family members
  const [error, setError] = useState(null); // State for error handling

  // Fetch family members from the backend API
  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/family');
        setMembers(response.data); // Update state with fetched data
        setError(null); // Clear any previous errors
      } catch (error) {
        console.error('Error fetching family members:', error);
        setError('Error fetching family members. Please try again later.');
      }
    };

    fetchFamilyMembers(); // Call the fetch function
  }, []);

  return (
    <div className="tree-container">
      {error && <div className="error-message">{error}</div>} 
      {members.length > 0 ? ( 
        <FamilyTree members={members} /> // Pass members to FamilyTree component
      ) : (
        <p>Loading family members...</p> // Display loading message
      )}
    </div>
  );
};

export default Tree;
