// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import FamilyTree from './FamilyTreeSynium'; // Import FamilyTree component

// const Tree = () => {
//   const [members, setMembers] = useState([]); // State for family members
//   const [error, setError] = useState(null); // State for error handling

//   // Fetch family members from the backend API
//   useEffect(() => {
//     const fetchFamilyMembers = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/family');
//         setMembers(response.data); // Update state with fetched data
//         setError(null); // Clear any previous errors
//       } catch (error) {
//         console.error('Error fetching family members:', error);
//         setError('Error fetching family members. Please try again later.');
//       }
//     };

//     fetchFamilyMembers(); // Call the fetch function
//   }, []);

//   return (
//     <div className="tree-container">
//       {error && <div className="error-message">{error}</div>} 
//       {members.length > 0 ? ( 
//         <FamilyTree members={members} /> // Pass members to FamilyTree component
//       ) : (
//         <p>Loading family members...</p> // Display loading message
//       )}
//     </div>
//   );
// };

// export default Tree;

// Tree.js
import React, { useEffect, useState } from 'react';
import FamilyTreeSynium from './FamilyTreeSynium'; // Import the Synium family tree component

// Define the interface for a family member
/**
 * @typedef {Object} FamilyMember
 * @property {string} _id
 * @property {string} name
 * @property {number} birthYear
 * @property {boolean} isAlive
 * @property {string} gender
 * @property {string[]} parents
 * @property {FamilyMember[]} children
 */

const Tree = () => {
  const [members, setMembers] = useState(/** @type {FamilyMember[]} */([])); // State for family members
  const [error, setError] = useState(null); // State for error handling

  // Dummy data for testing
  const dummyFamilyMembers = [
    {
      _id: "1",
      name: "John Doe",
      birthYear: 1970,
      isAlive: true,
      gender: "male",
      parents: [],
      children: [
        {
          _id: "2",
          name: "Jane Doe",
          birthYear: 2000,
          isAlive: true,
          gender: "female",
          parents: ["1"],
          children: [],
        },
      ],
    },
  ];

  // UseEffect to load the dummy data
  useEffect(() => {
    console.log("Using dummy data for testing");
    setMembers(dummyFamilyMembers);
  }, []);

  return (
    <div className="tree-container">
      {error && <div className="error-message">{error}</div>}
      {members.length > 0 ? (
        <FamilyTreeSynium members={members} />
      ) : (
        <p>Loading family members...</p>
      )}
    </div>
  );
};

export default Tree;
