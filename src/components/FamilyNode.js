import React from 'react';
import PropTypes from 'prop-types';

const FamilyNode = ({ member, children }) => {
  return (
    <div className="family-node">
      <div className="member-info">
        <div className="member-name">{member.name.en}</div>
        <div className="member-details">
          <div>Birth Year: {member.birthYear}</div>
          {member.deathYear && <div>Death Year: {member.deathYear}</div>}
          <div>Gender: {member.gender}</div>
        </div>
      </div>
      {children && <div className="member-children">{children}</div>}
    </div>
  );
};

FamilyNode.propTypes = {
  member: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.shape({
      en: PropTypes.string.isRequired,
      ar: PropTypes.string,
    }).isRequired,
    birthYear: PropTypes.number,
    deathYear: PropTypes.number,
    gender: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  children: PropTypes.node,
};

export default FamilyNode;
