import React, { useRef, useEffect } from 'react';
import Tree from 'react-d3-tree';

const FamilyTreeSynium = ({ data }) => {
  const treeContainer = useRef(null);

  useEffect(() => {
    // Any additional setup can go here
  }, [data]);

  const containerStyles = {
    width: '100%',
    height: '100vh',
  };

  // Ensure data is not undefined
  if (!data) {
    console.error("Data is undefined");
    return <div>Data is undefined</div>;
  }

  return (
    <div style={containerStyles} ref={treeContainer}>
      <Tree
        data={data}
        orientation="vertical" // Adjust for visualization
        translate={{ x: 500, y: 100 }}
        pathFunc="elbow" // Curved links like Synium's tree
        zoomable={true}
        nodeSize={{ x: 300, y: 200 }}
        separation={{ siblings: 1, nonSiblings: 2 }}
        nodeSvgShape={{
          shape: 'circle',
          shapeProps: {
            r: 20,
            fill: '#ffa500',
          },
        }}
        linkSvgShape={{
          shape: 'path',
          shapeProps: {
            stroke: '#ccc',
            strokeWidth: 2,
          },
        }}
        renderCustomNodeElement={(rd3tProps) =>
          renderCustomNode({ ...rd3tProps })
        }
      />
    </div>
  );
};

// Custom render function for each node
const renderCustomNode = ({ nodeDatum, toggleNode }) => (
  <g>
    <circle r={20} onClick={toggleNode} />
    <text fill="black" strokeWidth="1" x="25">
      {nodeDatum.name}
    </text>
    {nodeDatum.birthYear && (
      <text fill="gray" x="25" dy="20">
        {`${nodeDatum.birthYear} - ${nodeDatum.isAlive ? 'Present' : nodeDatum.deathYear}`}
      </text>
    )}
  </g>
);

export default FamilyTreeSynium;