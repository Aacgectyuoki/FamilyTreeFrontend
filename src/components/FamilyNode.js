import React, { useState } from 'react';

const FamilyNode = ({ member }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    if (member.children && member.children.length > 0) {
      setExpanded(!expanded);
    }
  };

  const getClassNames = () => {
    if (member.gender === 'male') {
      return member.isAlive ? 'light-green' : 'dark-green';
    } else if (member.gender === 'female') {
      return member.isAlive ? 'pink' : 'dark-pink';
    }
  };

  return (
    <div className={`family-node ${getClassNames()}`} onClick={toggleExpand}>
      <div className="person-card">
        <h4>{member.name}</h4>
        <p>{member.birthYear || 'Unknown'} - {member.deathYear || 'Present'}</p>
      </div>
      {expanded && member.children && (
        <div className="children">
          {member.children.map(child => (
            <FamilyNode key={child._id} member={child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FamilyNode;