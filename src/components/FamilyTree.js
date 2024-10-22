import React from 'react';

const TreeNode = ({ member, children = [] }) => (
  <div className="node">
    <strong>{member.name}</strong>
    <br />
    {member.birthYear} - {member.isAlive ? 'Present' : member.deathYear}

    {children.length > 0 && (
      <div className="children">
        <div className="connections">
          {children.map((child) => (
            <React.Fragment key={child._id}>
              <div className="line"></div>
              <TreeNode member={child} children={child.children || []} />
            </React.Fragment>
          ))}
        </div>
      </div>
    )}
  </div>
);

const FamilyTree = ({ members }) => {
  const roots = members.filter((member) => !member.parents.length);

  return (
    <div className="tree-container">
      {roots.map((root) => (
        <TreeNode key={root._id} member={root} children={root.children || []} />
      ))}
    </div>
  );
};

export default FamilyTree;
