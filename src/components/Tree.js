import React from 'react';

const Tree = ({ language }) => {
  return (
    <div>
      <h1>{language === 'en' ? 'Family Tree' : 'شجرة العائلة'}</h1>
      {/* Tree visualization will go here */}
    </div>
  );
};

export default Tree;