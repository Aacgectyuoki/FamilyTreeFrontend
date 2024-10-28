// import React, { useEffect, useState, useRef } from 'react';
// import Tree from 'react-d3-tree';

// const containerStyles = {
//   width: '100%',
//   height: '100vh',
// };

// const transformData = (members) => {
//   const map = new Map();
//   members.forEach((member) =>
//     map.set(member._id, { ...member, children: [] })
//   );

//   const roots = [];
//   members.forEach((member) => {
//     if (member.parents.length > 0) {
//       member.parents.forEach((parentId) => {
//         const parent = map.get(parentId);
//         parent.children.push(map.get(member._id));
//       });
//     } else {
//       roots.push(map.get(member._id));
//     }
//   });

//   return roots;
// };

// const FamilyTree = ({ members }) => {
//   const treeContainer = useRef(null);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const transformedData = transformData(members);
//     setData(transformedData);
//   }, [members]);

//   return (
//     <div style={containerStyles} ref={treeContainer}>
//       {data.length > 0 ? (
//         <Tree
//           data={data}
//           orientation="vertical"
//           translate={{ x: 200, y: 50 }}
//           pathFunc="elbow"
//           zoomable={true}
//           separation={{ siblings: 1.5, nonSiblings: 2 }}
//           nodeSize={{ x: 200, y: 150 }}
//         />
//       ) : (
//         <p>Loading family tree...</p>
//       )}
//     </div>
//   );
// };

// export default FamilyTree;


// import React, { useState, useEffect, useRef } from 'react';
// import Tree from 'react-d3-tree';

// const containerStyles = {
//   width: '100%',
//   height: '100vh',
// };

// const FamilyTree = ({ members }) => {
//   const treeContainer = useRef(null);
//   const [data, setData] = useState([]);

//   const transformData = (members) => {
//     const map = new Map();
//     members.forEach((member) =>
//       map.set(member._id, { ...member, children: [] })
//     );

//     const roots = [];
//     members.forEach((member) => {
//       if (member.parents.length > 0) {
//         member.parents.forEach((parentId) => {
//           const parent = map.get(parentId);
//           if (parent) parent.children.push(map.get(member._id));
//         });
//       } else {
//         roots.push(map.get(member._id));
//       }
//     });

//     return roots;
//   };

//   useEffect(() => {
//     setData(transformData(members));
//   }, [members]);

//   const handleNodeClick = (nodeData) => {
//     alert(`Clicked on: ${nodeData.name}`);
//   };

//   return (
//     <div style={containerStyles} ref={treeContainer}>
//       <Tree
//         data={data}
//         orientation="vertical"
//         translate={{ x: 200, y: 50 }}
//         pathFunc="elbow"
//         zoomable={true}
//         separation={{ siblings: 1.5, nonSiblings: 2 }}
//         onNodeClick={(node) => handleNodeClick(node.data)}
//       />
//     </div>
//   );
// };

// export default FamilyTree;
