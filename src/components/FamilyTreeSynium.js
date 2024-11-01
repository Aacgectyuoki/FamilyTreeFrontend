import React, { Component, createRef } from 'react';
import Tree from 'react-d3-tree';
import '../styles/FamilyTreeSynium.css'; // Custom styles for the tree layout.

const containerStyles = {
  width: '100%',
  height: '100vh',
  background: '#f8f9fa', // Synium-like light background
};

const nodeSize = { x: 300, y: 200 }; // Adjust node dimensions for better spacing.

class FamilyTreeSynium extends Component {
  constructor(props) {
    super(props);
    this.treeContainer = createRef();
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({ data: this.transformData(this.props.members) });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.members !== this.props.members) {
      this.setState({ data: this.transformData(this.props.members) });
    }
  }

  // Transform members to hierarchical data format
  transformData = (members) => {
    const map = new Map();
    members.forEach((member) =>
      map.set(member._id, { ...member, children: [] })
    );

    const roots = [];

    members.forEach((member) => {
      if (member.parents && member.parents.length > 0) {
        member.parents.forEach((parentId) => {
          const parent = map.get(parentId);
          if (parent) {
            parent.children.push(map.get(member._id));
          }
        });
      } else {
        roots.push(map.get(member._id));
      }
    });

    return roots;
  };

  renderCustomNode = ({ nodeDatum, toggleNode }) => {
    const spouses = nodeDatum.spouses || [];
    const people = [nodeDatum, ...spouses.map(spouseId => this.props.members.find(member => member._id === spouseId))];

    return (
      <g>
        <rect width="250" height="150" x="-125" y="-75" fill="#fff" stroke="#000" strokeWidth="1" />
        {people.map((person, index) => (
          <g key={person._id} transform={`translate(${index * 80 - (people.length - 1) * 40}, 0)`}>
            <circle r={20} fill={person.gender === 'male' ? '#ADD8E6' : '#FFC0CB'} />
            <text fill="black" x="0" y="-30" textAnchor="middle">
              {person.name.en}
            </text>
            {person.birthYear && (
              <text fill="gray" x="0" y="40" textAnchor="middle">
                {`${person.birthYear} - ${person.isAlive ? 'Present' : person.deathYear}`}
              </text>
            )}
          </g>
        ))}
      </g>
    );
  };

  render() {
    const { data } = this.state;

    if (!data.length) {
      console.error("Data is undefined or empty");
      return <div>Data is undefined or empty</div>;
    }

    return (
      <div style={containerStyles} ref={this.treeContainer}>
        <Tree
          data={data}
          orientation="vertical"
          translate={{ x: 500, y: 100 }}
          pathFunc="elbow" // Use elbow links for curves.
          nodeSize={nodeSize}
          separation={{ siblings: 1, nonSiblings: 2 }}
          zoomable
          renderCustomNodeElement={(rd3tProps) => this.renderCustomNode(rd3tProps)}
        />
      </div>
    );
  }
}

export default FamilyTreeSynium;